package com.zariyo.domain.order.entity;

import com.zariyo.domain.menu.entity.MenuItem;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 주문에 포함된 개별 메뉴 및 수량/옵션 상세 정보 엔티티입니다.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int price; // 단가

    private String optionsSummary; // 선택한 옵션 텍스트 요약 (예: "치즈 추가 (+1,500원), 맵기: 2단계")

    public OrderItem(Order order, MenuItem menuItem, int quantity, int price, String optionsSummary) {
        this.order = order;
        this.menuItem = menuItem;
        this.quantity = quantity;
        this.price = price;
        this.optionsSummary = optionsSummary;
    }
}
