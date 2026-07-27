package com.zariyo.domain.menu.entity;

import com.zariyo.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 메뉴 카테고리를 나타내는 데이터베이스 엔티티입니다. (예: 메인 요리, 사이드 디쉬, 음료/디저트)
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @Column(nullable = false, length = 50)
    private String name;

    private int displayOrder;

    public Category(Store store, String name, int displayOrder) {
        this.store = store;
        this.name = name;
        this.displayOrder = displayOrder;
    }

    public void updateCategory(String name, int displayOrder) {
        this.name = name;
        this.displayOrder = displayOrder;
    }
}
