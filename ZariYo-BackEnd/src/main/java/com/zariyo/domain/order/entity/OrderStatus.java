package com.zariyo.domain.order.entity;

public enum OrderStatus {
    PENDING,    // 주문 접수 대기
    PREPARING,  // 조리 중 (KDS)
    SERVED,     // 서빙 완료
    COMPLETED,  // 퇴장/결제 완료
    CANCELLED   // 주문 취소
}
