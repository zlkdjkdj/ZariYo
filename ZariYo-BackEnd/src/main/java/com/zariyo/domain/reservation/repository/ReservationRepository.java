package com.zariyo.domain.reservation.repository;

import com.zariyo.domain.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findBySeatStoreId(Long storeId);
}
