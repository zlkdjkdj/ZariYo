package com.zariyo.domain.reservation.dto;

import com.zariyo.domain.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class ReservationDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequest {
        private String guestName;
        private String guestPhone;
        private int peopleCount;
        private String reservedTableLabel;
        private String reservationTime;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private Long storeId;
        private String guestName;
        private String guestPhone;
        private int peopleCount;
        private String reservedTableLabel;
        private String reservationTime;
        private String status;
        private LocalDateTime createdAt;

        public static Response from(Reservation reservation) {
            return new Response(
                reservation.getId(),
                reservation.getStore().getId(),
                reservation.getGuestName(),
                reservation.getGuestPhone(),
                reservation.getPeopleCount(),
                reservation.getReservedTableLabel(),
                reservation.getReservationTime(),
                reservation.getStatus().name(),
                reservation.getCreatedAt()
            );
        }
    }
}
