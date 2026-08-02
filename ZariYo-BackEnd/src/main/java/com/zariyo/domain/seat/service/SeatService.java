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
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
 * 동시성 제어의 안정성을 확보하기 위해 Redisson 분산 락(Distributed Lock)과 Redis 캐시를 활용하며 STOMP 웹소켓 브로드캐스팅을 지원합니다.
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
    // STOMP 웹소켓 메시지 템플릿
    private final SimpMessagingTemplate messagingTemplate;

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
            List<Reservation> reservations = reservationRepository.findByStoreIdOrderByCreatedAtDesc(storeId);
            Optional<Reservation> activeRes = reservations.stream()
                    .filter(r -> r.getReservedTableLabel().equals(elementId) && r.getStatus() == Reservation.ReservationStatus.PENDING)
                    .findFirst();

            String status = "available"; // 기본값: 공석
            
            if (tempUserId != null) {
                status = "held"; // 5분 임시 선점중
            } else if (activeRes.isPresent()) {
                status = "reserved"; // 예약이 최종 확정됨
            }

            Long activeUserId = tempUserId;


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
            acquired = lock.tryLock(5, 10, TimeUnit.SECONDS);
            
            if (!acquired) {
                return new SeatReservationDto.ReserveResponse(false, "좌석 선점 요청량이 많아 실패했습니다. 다시 시도해 주세요.", seatId, userId, 0, null);
            }

            Seat seat = findSeatOrThrow(seatId);

            if (!seat.isReservable()) {
                return new SeatReservationDto.ReserveResponse(false, "예약이 불가능한 좌석입니다.", seatId, userId, 0, null);
            }

            String redisKey = REDIS_TEMP_KEY_PREFIX + seatId;
            String existingOccupant = redisTemplate.opsForValue().get(redisKey);
            
            if (existingOccupant != null) {
                return new SeatReservationDto.ReserveResponse(false, "다른 사용자가 이미 선점 중인 좌석입니다.", seatId, userId, 0, null);
            }

            List<Reservation> activeRes = reservationRepository.findByStoreIdOrderByCreatedAtDesc(seat.getStore().getId());
            boolean isReservedInDb = activeRes.stream()
                    .anyMatch(r -> r.getReservedTableLabel().equals(seatId) && r.getStatus() == Reservation.ReservationStatus.PENDING);

            
            if (isReservedInDb) {
                return new SeatReservationDto.ReserveResponse(false, "이미 최종 예약 확정이 완료된 좌석입니다.", seatId, userId, 0, null);
            }

            if (!userRepository.existsById(userId)) {
                throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
            }

            // Redis에 5분(300초) 만료 설정으로 임시 점유 정보 저장
            redisTemplate.opsForValue().set(redisKey, String.valueOf(userId), TEMP_OCCUPY_TTL_SECONDS, TimeUnit.SECONDS);
            
            LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(TEMP_OCCUPY_TTL_SECONDS);
            log.info("좌석 임시 선점 성공 - 좌석 ID: {}, 유저 ID: {}, 만료시각: {}", seatId, userId, expiresAt);
            
            SeatReservationDto.ReserveResponse response = new SeatReservationDto.ReserveResponse(
                    true,
                    "5분간 좌석을 임시로 선점했습니다. 시간 내에 결제 또는 최종 확정을 진행해 주세요.",
                    seatId,
                    userId,
                    TEMP_OCCUPY_TTL_SECONDS,
                    expiresAt
            );

            // STOMP 웹소켓 실시간 브로드캐스팅 (/topic/stores/{storeId}/seats)
            broadcastSeatStatuses(seat.getStore().getId());

            return response;
            
        } catch (InterruptedException e) {
            log.error("임시 선점 도중 인터럽트 예외 발생", e);
            Thread.currentThread().interrupt();
            return new SeatReservationDto.ReserveResponse(false, "시스템 처리 오류가 발생했습니다.", seatId, userId, 0, null);
        } finally {
            if (acquired && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    /**
     * 3. 최종 예약 확정 API
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

        Seat seat = findSeatOrThrow(seatId);
        User user = findUserOrThrow(userId);

        Reservation reservation = new Reservation(
                seat.getStore(),
                user.getName(),
                user.getEmail(),
                request.getPeopleCount(),
                seat.getElementId(),
                "실시간"
        );
        Reservation savedReservation = reservationRepository.save(reservation);

        redisTemplate.delete(redisKey);
        
        log.info("예약 최종 확정 완료 - 예약 ID: {}, 좌석 ID: {}, 유저 ID: {}", savedReservation.getId(), seatId, userId);
        
        // STOMP 웹소켓 실시간 브로드캐스팅
        broadcastSeatStatuses(seat.getStore().getId());

        return new SeatReservationDto.ConfirmResponse(true, "예약 최종 확정이 완료되었습니다.", savedReservation.getId());
    }

    /**
     * 4. 좌석 반납 API
     */
    @Transactional
    public SeatReservationDto.ReturnResponse returnSeat(SeatReservationDto.ReturnRequest request) {
        String seatId = request.getSeatId();
        
        if (seatId == null) {
            return new SeatReservationDto.ReturnResponse(false, "잘못된 요청 인자입니다.");
        }
        
        Seat seat = findSeatOrThrow(seatId);
        List<Reservation> reservations = reservationRepository.findByStoreIdOrderByCreatedAtDesc(seat.getStore().getId());
        
        Optional<Reservation> activeRes = reservations.stream()
                .filter(r -> r.getReservedTableLabel().equals(seatId) && r.getStatus() == Reservation.ReservationStatus.PENDING)
                .findFirst();

        if (activeRes.isEmpty()) {
            return new SeatReservationDto.ReturnResponse(false, "반납할 활성화된 예약 내역이 없습니다.");
        }


        Reservation reservation = activeRes.get();
        reservation.updateStatus(Reservation.ReservationStatus.COMPLETED);
        
        log.info("좌석 반납 완료 - 예약 ID: {}, 좌석 ID: {}", reservation.getId(), seatId);

        // STOMP 웹소켓 실시간 브로드캐스팅
        broadcastSeatStatuses(seat.getStore().getId());

        return new SeatReservationDto.ReturnResponse(true, "성공적으로 반납 완료 처리되었습니다.");
    }

    private void broadcastSeatStatuses(Long storeId) {
        try {
            List<SeatReservationDto.SeatStatusResponse> statuses = getSeatStatuses(storeId);
            messagingTemplate.convertAndSend("/topic/stores/" + storeId + "/seats", statuses);
        } catch (Exception e) {
            log.error("STOMP 웹소켓 좌석 상태 브로드캐스팅 실패", e);
        }
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

