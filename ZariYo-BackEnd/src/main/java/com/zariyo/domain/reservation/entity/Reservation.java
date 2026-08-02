package com.zariyo.domain.reservation.entity;

import com.zariyo.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 손님의 2D 좌석 지정 예약 정보를 데이터베이스에 저장하는 엔티티 클래스입니다.
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
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(nullable = false, length = 50)
    private String guestName;

    @Column(nullable = false, length = 20)
    private String guestPhone;

    @Column(nullable = false)
    private int peopleCount;

    @Column(nullable = false, length = 50)
    private String reservedTableLabel;

    @Column(nullable = false, length = 20)
    private String reservationTime; // 예: "18:30"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReservationStatus status = ReservationStatus.PENDING;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum ReservationStatus {
        PENDING, COMPLETED, NOSHOW, CANCELLED
    }

    public Reservation(Store store, String guestName, String guestPhone, int peopleCount, String reservedTableLabel, String reservationTime) {
        this.store = store;
        this.guestName = guestName;
        this.guestPhone = guestPhone;
        this.peopleCount = peopleCount;
        this.reservedTableLabel = reservedTableLabel;
        this.reservationTime = reservationTime;
        this.status = ReservationStatus.PENDING;
    }

    public void updateStatus(ReservationStatus newStatus) {
        this.status = newStatus;
    }
}
