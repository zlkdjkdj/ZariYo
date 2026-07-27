package com.zariyo.domain.staffcall.repository;

import com.zariyo.domain.staffcall.entity.StaffCall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffCallRepository extends JpaRepository<StaffCall, Long> {
    List<StaffCall> findByStoreIdOrderByCreatedAtDesc(Long storeId);
    List<StaffCall> findByStoreIdAndIsResolvedOrderByCreatedAtDesc(Long storeId, boolean isResolved);
}
