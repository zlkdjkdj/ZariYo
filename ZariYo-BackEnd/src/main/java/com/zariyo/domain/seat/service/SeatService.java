package com.zariyo.domain.seat.service;

import com.zariyo.domain.reservation.entity.Reservation;
import com.zariyo.domain.reservation.repository.ReservationRepository;
import com.zariyo.domain.seat.dto.SeatReservationDto;
import com.zariyo.domain.seat.entity.Seat;
import com.zariyo.domain.seat.repository.SeatRepository;
import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * 실시간 좌석 예약(5분 임시 선점), 최종 확정 및 반납 비즈니스 로직을 처리하는 핵심 서비스 클래스입니다.
 * 
 * 동시성 제어의 안정성을 확보하기 위해 Redisson 분산 락(Distributed Lock)과 Redis 캐시를 활용합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class SeatService {

    private final SeatRepository seatRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    
    // Redis 조작을 위한 템플릿
    private final StringRedisTemplate redisTemplate;
    // Redisson 분산 락 클라이언트
    private final RedissonClient redissonClient;

    private static final String REDIS_TEMP_KEY_PREFIX = "seat:temp_occupied:";
    private static final long TEMP_OCCUPY_TTL_SECONDS = 300L; // 5분(300초)

    /**
     * 1. 매장의 전체 좌석 실시간 상태 조회 API
     * Redis 캐시와 RDB 데이터를 교차 검증하여 실시간 좌석 상태를 도출합니다.
     */
    public List<SeatReservationDto.SeatStatusResponse> getSeatStatuses(Long storeId) {
        List<Seat> seats = seatRepository.findByStoreId(storeId);
        
        return seats.stream().map(seat -> {
            String elementId = seat.getElementId();
            String redisKey = REDIS_TEMP_KEY_PREFIX + elementId;
            
            // Redis에서 임시 선점 여부 확인
            String tempUserIdStr = redisTemplate.opsForValue().get(redisKey);
            Long tempUserId = tempUserIdStr != null ? Long.parseLong(tempUserIdStr) : null;
            long timeLeft = 0L;
            
            if (tempUserId != null) {
                // Redis 키의 남은 TTL(초)을 가져옵니다.
                Long expire = redisTemplate.getExpire(redisKey, TimeUnit.SECONDS);
                timeLeft = (expire != null && expire > 0) ? expire : 0L;
            }

            // DB에서 예약 완료 또는 사용 중인 최종 예약 정보 가져오기
            // 예약 리스트 중 해당 좌석에 대응하고 상태가 PENDING인 내역을 확인합니다.
            List<Reservation> reservations = reservationRepository.findBySeatStoreId(storeId);
            Optional<Reservation> activeRes = reservations.stream()
                    .filter(r -> r.getSeat().getElementId().equals(elementId) && r.getStatus() == Reservation.ReservationStatus.PENDING)
                    .findFirst();

            String status = "available"; // 기본값: 공석
            
            if (tempUserId != null) {
                status = "held"; // 5분 임시 선점중
            } else if (activeRes.isPresent()) {
                status = "reserved"; // 예약이 최종 확정됨
            }

            Long activeUserId = tempUserId != null ? tempUserId : (activeRes.map(r -> r.getUser().getId()).orElse(null));

            return new SeatReservationDto.SeatStatusResponse(
                    elementId,
                    seat.getLabel(),
                    seat.getType().toFrontendString(),
                    status,
                    activeUserId,
                    timeLeft
            );
        }).collect(Collectors.toList());
    }

    /**
     * 2. 5분 임시 선점 API (동시성 제어가 탑재된 핵심 로직)
     * 
     * Redisson 분산 락을 취득한 뒤, 여러 유저가 동시에 하나의 좌석을 선택해도 오직 단 한 명만 5분간 좌석을 임시 점유할 수 있도록 차단합니다.
     */
    @Transactional
    public SeatReservationDto.ReserveResponse reserveSeatTemporary(SeatReservationDto.ReserveRequest request) {
        String seatId = request.getSeatId();
        Long userId = request.getUserId();
        
        if (seatId == null || userId == null) {
            return new SeatReservationDto.ReserveResponse(false, "잘못된 요청 인자입니다.", seatId, userId, 0, null);
        }
        
        // 분산 락의 이름 설정 (해당 좌석 고유 키로 락 획득 경쟁 유도)
        String lockKey = "lock:seat:" + seatId;
        RLock lock = redissonClient.getLock(lockKey);
        
        boolean acquired = false;
        try {
            // tryLock 파라미터 설명:
            // 1. waitTime (5초): 최대 5초 동안 락이 해제되기를 대기하며 재시도합니다.
            // 2. leaseTime (10초): 락을 획득한 후 10초가 지나면 자동으로 락을 해제합니다. (데드락 방지)
            // 3. TimeUnit: 시간 단위
            acquired = lock.tryLock(5, 10, TimeUnit.SECONDS);
            
            if (!acquired) {
                return new SeatReservationDto.ReserveResponse(false, "좌석 선점 요청량이 많아 실패했습니다. 다시 시도해 주세요.", seatId, userId, 0, null);
            }

            // 락 획득 후 임계 영역(Critical Section) 진입
            // 1. 좌석 엔티티 존재 확인
            Seat seat = findSeatOrThrow(seatId);

            if (!seat.isReservable()) {
                return new SeatReservationDto.ReserveResponse(false, "예약이 불가능한 좌석입니다.", seatId, userId, 0, null);
            }

            // 2. 이미 Redis에 임시 선점 상태인지 검사
            String redisKey = REDIS_TEMP_KEY_PREFIX + seatId;
            String existingOccupant = redisTemplate.opsForValue().get(redisKey);
            
            if (existingOccupant != null) {
                return new SeatReservationDto.ReserveResponse(false, "다른 사용자가 이미 선점 중인 좌석입니다.", seatId, userId, 0, null);
            }

            // 3. DB에 최종 확정 예약이 걸려있는지 검사
            List<Reservation> activeRes = reservationRepository.findBySeatStoreId(seat.getStore().getId());
            boolean isAlreadyReserved = activeRes.stream()
                    .anyMatch(r -> r.getSeat().getElementId().equals(seatId) && r.getStatus() == Reservation.ReservationStatus.PENDING);
            
            if (isAlreadyReserved) {
                return new SeatReservationDto.ReserveResponse(false, "이미 최종 예약 확정이 완료된 좌석입니다.", seatId, userId, 0, null);
            }

            // 4. 회원 검증
            if (!userRepository.existsById(userId)) {
                throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
            }

            // 5. [핵심] Redis에 5분(300초) 만료 설정으로 임시 점유 정보 저장
            redisTemplate.opsForValue().set(redisKey, String.valueOf(userId), TEMP_OCCUPY_TTL_SECONDS, TimeUnit.SECONDS);
            
            LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(TEMP_OCCUPY_TTL_SECONDS);
            log.info("좌석 임시 선점 성공 - 좌석 ID: {}, 유저 ID: {}, 만료시각: {}", seatId, userId, expiresAt);
            
            return new SeatReservationDto.ReserveResponse(
                    true,
                    "5분간 좌석을 임시로 선점했습니다. 시간 내에 결제 또는 최종 확정을 진행해 주세요.",
                    seatId,
                    userId,
                    TEMP_OCCUPY_TTL_SECONDS,
                    expiresAt
            );
            
        } catch (InterruptedException e) {
            log.error("임시 선점 도중 인터럽트 예외 발생", e);
            Thread.currentThread().interrupt();
            return new SeatReservationDto.ReserveResponse(false, "시스템 처리 오류가 발생했습니다.", seatId, userId, 0, null);
        } finally {
            // 락 획득에 성공했다면 비즈니스 완료 후 락 해제
            if (acquired && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    /**
     * 3. 최종 예약 확정 API
     * 
     * 임시 선점 기한 내에 요청한 경우에만 RDB에 최종 예약 정보를 저장하고 Redis의 임시 선점 데이터를 지웁니다.
     */
    @Transactional
    public SeatReservationDto.ConfirmResponse confirmReservation(SeatReservationDto.ConfirmRequest request) {
        String seatId = request.getSeatId();
        Long userId = request.getUserId();
        
        if (seatId == null || userId == null) {
            return new SeatReservationDto.ConfirmResponse(false, "잘못된 요청 인자입니다.", null);
        }
        
        String redisKey = REDIS_TEMP_KEY_PREFIX + seatId;
        String occupantIdStr = redisTemplate.opsForValue().get(redisKey);
        
        if (occupantIdStr == null) {
            return new SeatReservationDto.ConfirmResponse(false, "임시 선점 시간이 초과되었거나 선점 이력이 없습니다.", null);
        }
        
        Long occupantId = Long.parseLong(occupantIdStr);
        if (!occupantId.equals(userId)) {
            return new SeatReservationDto.ConfirmResponse(false, "본인이 선점한 좌석만 최종 확정할 수 있습니다.", null);
        }

        // DB 검증 및 영속화
        Seat seat = findSeatOrThrow(seatId);
        User user = findUserOrThrow(userId);

        // 최종 예약 엔티티 생성 및 데이터베이스 저장
        Reservation reservation = new Reservation(
                user,
                seat,
                request.getPeopleCount(),
                LocalDateTime.now(),
                Reservation.ReservationStatus.PENDING // PENDING 상태로 시작 (이용 전 상태)
        );
        Reservation savedReservation = reservationRepository.save(reservation);

        // Redis 임시 선점 키 제거 (최종 확정이 완료되었으므로 불필요)
        redisTemplate.delete(redisKey);
        
        log.info("예약 최종 확정 완료 - 예약 ID: {}, 좌석 ID: {}, 유저 ID: {}", savedReservation.getId(), seatId, userId);
        return new SeatReservationDto.ConfirmResponse(true, "예약 최종 확정이 완료되었습니다.", savedReservation.getId());
    }

    /**
     * 4. 좌석 반납 API
     * 
     * 사용 완료된 예약의 상태를 COMPLETED로 변경하여 다시 해당 좌석이 공석으로 드러나게 만듭니다.
     */
    @Transactional
    public SeatReservationDto.ReturnResponse returnSeat(SeatReservationDto.ReturnRequest request) {
        String seatId = request.getSeatId();
        
        if (seatId == null) {
            return new SeatReservationDto.ReturnResponse(false, "잘못된 요청 인자입니다.");
        }
        
        // PENDING 상태인 예약을 찾아 COMPLETED로 업데이트
        Seat seat = findSeatOrThrow(seatId);
        List<Reservation> reservations = reservationRepository.findBySeatStoreId(seat.getStore().getId());
        
        Optional<Reservation> activeRes = reservations.stream()
                .filter(r -> r.getSeat().getElementId().equals(seatId) && r.getStatus() == Reservation.ReservationStatus.PENDING)
                .findFirst();

        if (activeRes.isEmpty()) {
            return new SeatReservationDto.ReturnResponse(false, "반납할 활성화된 예약 내역이 없습니다.");
        }

        Reservation reservation = activeRes.get();
        reservation.updateStatus(Reservation.ReservationStatus.COMPLETED); // 완료 처리 (반납 완료)
        
        log.info("좌석 반납 완료 - 예약 ID: {}, 좌석 ID: {}", reservation.getId(), seatId);
        return new SeatReservationDto.ReturnResponse(true, "성공적으로 반납 완료 처리되었습니다.");
    }

    private Seat findSeatOrThrow(String seatId) {
        return seatRepository.findByElementId(seatId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 좌석입니다."));
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    }
}
