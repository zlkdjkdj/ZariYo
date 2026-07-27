package com.zariyo.domain.store.service;

import com.zariyo.domain.seat.entity.Seat;
import com.zariyo.domain.seat.repository.SeatRepository;
import com.zariyo.domain.store.dto.StoreDto;
import com.zariyo.domain.store.entity.Store;
import com.zariyo.domain.store.repository.StoreRepository;
import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 매장 관리 및 드래그 앤 드롭 배치 데이터(레이아웃)의 영속성 처리를 담당하는 서비스 클래스입니다.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class StoreService {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final SeatRepository seatRepository;

    /**
     * 사장님이 설정한 매장 기본 정보 및 배치 레이아웃(좌석 정보 등)을 일괄 저장합니다.
     * 
     * - @Transactional: 여러 비즈니스 단계(매장 저장 -> 기존 좌석 삭제 -> 새 좌석 일괄 등록)를 
     *   하나의 트랜잭션 단위로 묶어 에러 발생 시 모든 작업이 롤백되도록 원자성을 보장합니다.
     */
    @Transactional
    public StoreDto.Response saveStoreWithLayout(StoreDto.SaveRequest request) {
        // 1. 매장을 등록하는 사장님 회원 확인
        User owner = findOwnerOrThrow(request.getOwnerId());

        // 2. 해당 사장님이 소유한 매장이 존재하는지 조회
        List<Store> existingStores = storeRepository.findByOwnerId(owner.getId());
        Store storeTemp;
        
        if (!existingStores.isEmpty()) {
            // 이미 매장이 있는 경우 -> 기존 정보 갱신(Update)
            storeTemp = existingStores.get(0);
            storeTemp.updateStoreInfo(
                    request.getName(),
                    request.getAddress(),
                    request.getWeekdayStart(),
                    request.getWeekdayEnd(),
                    request.getWeekendStart(),
                    request.getWeekendEnd(),
                    request.getBreakStart(),
                    request.getBreakEnd(),
                    request.getHoliday()
            );
        } else {
            // 매장이 없는 경우 -> 신규 매장 생성(Insert)
            storeTemp = new Store(
                    request.getName(),
                    request.getAddress(),
                    request.getWeekdayStart(),
                    request.getWeekdayEnd(),
                    request.getWeekendStart(),
                    request.getWeekendEnd(),
                    request.getBreakStart(),
                    request.getBreakEnd(),
                    request.getHoliday(),
                    owner
            );
            storeTemp = storeRepository.save(storeTemp);
        }

        final Store store = storeTemp;

        // 3. 기존의 좌석 배치 레이아웃 정보 벌크 삭제
        seatRepository.deleteByStoreId(store.getId());

        // 4. 새로운 좌석 배치 레이아웃 정보 벌크 저장
        if (request.getElements() != null) {
            List<Seat> seatsToSave = request.getElements().stream()
                    .map(dto -> new Seat(
                            dto.getId(),
                            store,
                            Seat.SeatType.fromString(dto.getType()),
                            dto.getLabel(),
                            dto.getX(),
                            dto.getY(),
                            dto.getWidth(),
                            dto.getHeight(),
                            dto.isReservable(),
                            dto.isTempOccupiedEnabled()
                    ))
                    .collect(Collectors.toList());
            seatRepository.saveAll(seatsToSave);
        }

        return StoreDto.Response.from(store);
    }

    /**
     * 사장님 ID로 소유한 매장 정보 리스트를 조회합니다.
     */
    public List<StoreDto.Response> getStoresByOwner(Long ownerId) {
        return storeRepository.findByOwnerId(ownerId).stream()
                .map(StoreDto.Response::from)
                .collect(Collectors.toList());
    }

    private User findOwnerOrThrow(Long ownerId) {
        if (ownerId != null) {
            var userOpt = userRepository.findById(ownerId);
            if (userOpt.isPresent()) return userOpt.get();
        }
        // DB에 존재하는 첫 번째 사장님 유저 반환 (폴백)
        List<User> users = userRepository.findAll();
        if (!users.isEmpty()) {
            return users.get(0);
        }
        throw new IllegalArgumentException("회원가입된 사장님 정보가 없습니다. 회원가입 후 시도해 주세요.");
    }

    /**
     * 특정 매장 ID에 배치된 좌석/가구 레이아웃 정보를 프론트엔드 규격 DTO로 변환하여 조회합니다.
     */
    public List<StoreDto.PlacedElementDto> getStoreLayout(Long storeId) {
        List<Seat> seats = seatRepository.findByStoreId(storeId);
        return seats.stream()
                .map(seat -> {
                    StoreDto.PlacedElementDto dto = new StoreDto.PlacedElementDto();
                    dto.setId(seat.getElementId());
                    dto.setType(seat.getType().toFrontendString());
                    dto.setLabel(seat.getLabel());
                    dto.setX(seat.getX());
                    dto.setY(seat.getY());
                    dto.setWidth(seat.getWidth());
                    dto.setHeight(seat.getHeight());
                    dto.setReservable(seat.isReservable());
                    dto.setTempOccupiedEnabled(seat.isTempOccupiedEnabled());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
