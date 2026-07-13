package com.zariyo.domain.seat.repository;

import com.zariyo.domain.seat.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByStoreId(Long storeId);
    Optional<Seat> findByElementId(String elementId);
    void deleteByStoreId(Long storeId);
}
