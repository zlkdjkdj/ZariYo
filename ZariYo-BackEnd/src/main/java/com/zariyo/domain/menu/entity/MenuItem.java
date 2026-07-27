package com.zariyo.domain.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * 개별 메뉴 항목 정보를 나타내는 엔티티입니다.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private int price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    private String badge; // 예: "BEST", "NEW"

    private boolean isPopular;

    private boolean isSoldOut;

    @OneToMany(mappedBy = "menuItem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MenuOption> options = new ArrayList<>();

    public MenuItem(Category category, String name, int price, String description, String imageUrl, String badge, boolean isPopular, boolean isSoldOut) {
        this.category = category;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.badge = badge;
        this.isPopular = isPopular;
        this.isSoldOut = isSoldOut;
    }

    public void updateMenuItem(String name, int price, String description, String imageUrl, String badge, boolean isPopular, boolean isSoldOut) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.badge = badge;
        this.isPopular = isPopular;
        this.isSoldOut = isSoldOut;
    }

    public void toggleSoldOut(boolean isSoldOut) {
        this.isSoldOut = isSoldOut;
    }

    public void addOption(MenuOption option) {
        this.options.add(option);
    }

    public void clearOptions() {
        this.options.clear();
    }
}
