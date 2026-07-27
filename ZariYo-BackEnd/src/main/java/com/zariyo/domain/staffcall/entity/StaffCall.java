package com.zariyo.domain.staffcall.entity;

import com.zariyo.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 테이블/키오스크에서의 직원 호출 및 편의 서비스 요청을 담는 엔티티입니다.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "staff_calls")
public class StaffCall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(nullable = false)
    private String tableNumber;

    @Column(nullable = false, length = 255)
    private String requestItems; // 예: "시원한 얼음물, 일회용 앞치마"

    private boolean isResolved;

    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;

    public StaffCall(Store store, String tableNumber, String requestItems) {
        this.store = store;
        this.tableNumber = tableNumber;
        this.requestItems = requestItems;
        this.isResolved = false;
        this.createdAt = LocalDateTime.now();
    }

    public void resolve() {
        this.isResolved = true;
        this.resolvedAt = LocalDateTime.now();
    }
}
