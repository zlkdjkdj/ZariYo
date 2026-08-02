package com.zariyo.domain.reservation.repository;

import com.zariyo.domain.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByStoreIdOrderByCreatedAtDesc(Long storeId);
    List<Reservation> findByStoreIdAndStatus(Long storeId, Reservation.ReservationStatus status);
}
