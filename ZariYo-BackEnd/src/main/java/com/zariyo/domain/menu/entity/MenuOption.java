package com.zariyo.domain.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 메뉴의 추가/커스텀 옵션을 나타내는 엔티티입니다. (예: 치즈 추가, 곱빼기 등)
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "menu_options")
public class MenuOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private int price;

    public MenuOption(MenuItem menuItem, String name, int price) {
        this.menuItem = menuItem;
        this.name = name;
        this.price = price;
    }
}
