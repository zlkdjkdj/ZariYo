package com.zariyo.domain.reservation.entity;

import com.zariyo.domain.seat.entity.Seat;
import com.zariyo.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * 최종 예약이 완료된 내역을 보존하는 영속성 엔티티입니다.
 * 프론트엔드의 ReservationItem 규격에 대응합니다.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    private int peopleCount;

    @Column(nullable = false)
    private LocalDateTime reservationTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status;

    public Reservation(User user, Seat seat, int peopleCount, LocalDateTime reservationTime, ReservationStatus status) {
        this.user = user;
        this.seat = seat;
        this.peopleCount = peopleCount;
        this.reservationTime = reservationTime;
        this.status = status;
    }

    public void updateStatus(ReservationStatus status) {
        this.status = status;
    }

    public enum ReservationStatus {
        PENDING, COMPLETED, NOSHOW;

        public static ReservationStatus fromString(String statusStr) {
            switch (statusStr.toLowerCase()) {
                case "pending": return PENDING;
                case "completed": return COMPLETED;
                case "noshow": return NOSHOW;
                default: throw new IllegalArgumentException("지원하지 않는 예약 상태 값입니다: " + statusStr);
            }
        }

        public String toFrontendString() {
            return name().toLowerCase();
        }
    }
}
