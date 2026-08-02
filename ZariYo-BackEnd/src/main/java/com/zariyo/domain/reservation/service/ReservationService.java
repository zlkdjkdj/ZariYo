package com.zariyo.domain.reservation.service;

import com.zariyo.domain.reservation.dto.ReservationDto;
import com.zariyo.domain.reservation.entity.Reservation;
import com.zariyo.domain.reservation.repository.ReservationRepository;
import com.zariyo.domain.store.entity.Store;
import com.zariyo.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class ReservationService {

    private final StoreRepository storeRepository;
    private final ReservationRepository reservationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public ReservationDto.Response createReservation(Long storeId, ReservationDto.CreateRequest request) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매장입니다. ID: " + storeId));

        Reservation reservation = new Reservation(
                store,
                request.getGuestName(),
                request.getGuestPhone(),
                request.getPeopleCount(),
                request.getReservedTableLabel(),
                request.getReservationTime()
        );

        Reservation savedReservation = reservationRepository.save(reservation);
        ReservationDto.Response response = ReservationDto.Response.from(savedReservation);

        // STOMP 웹소켓 실시간 예약 브로드캐스팅 (/topic/stores/{storeId}/reservations)
        messagingTemplate.convertAndSend("/topic/stores/" + storeId + "/reservations", response);

        return response;
    }

    public List<ReservationDto.Response> getReservations(Long storeId) {
        return reservationRepository.findByStoreIdOrderByCreatedAtDesc(storeId)
                .stream()
                .map(ReservationDto.Response::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReservationDto.Response updateStatus(Long reservationId, String newStatusStr) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 예약입니다. ID: " + reservationId));

        Reservation.ReservationStatus status = Reservation.ReservationStatus.valueOf(newStatusStr.toUpperCase());
        reservation.updateStatus(status);

        ReservationDto.Response response = ReservationDto.Response.from(reservation);
        messagingTemplate.convertAndSend("/topic/stores/" + reservation.getStore().getId() + "/reservations", response);

        return response;
    }
}
