package com.zariyo.domain.store.entity;

import com.zariyo.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;

/**
 * 사장님이 소유한 매장 정보를 담는 데이터베이스 엔티티 클래스입니다.
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "stores")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    private String address;

    private String weekdayStart;
    private String weekdayEnd;
    private String weekendStart;
    private String weekendEnd;
    private String breakStart;
    private String breakEnd;
    private String holiday;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User owner;

    public Store(String name, String address, String weekdayStart, String weekdayEnd,
                 String weekendStart, String weekendEnd, String breakStart, String breakEnd,
                 String holiday, User owner) {
        this.name = name;
        this.address = address;
        this.weekdayStart = weekdayStart;
        this.weekdayEnd = weekdayEnd;
        this.weekendStart = weekendStart;
        this.weekendEnd = weekendEnd;
        this.breakStart = breakStart;
        this.breakEnd = breakEnd;
        this.holiday = holiday;
        this.owner = owner;
    }

    // 매장 레이아웃 및 정보를 수정할 때 사용하는 편의 메서드
    public void updateStoreInfo(String name, String address, String weekdayStart, String weekdayEnd,
                                String weekendStart, String weekendEnd, String breakStart, String breakEnd,
                                String holiday) {
        this.name = name;
        this.address = address;
        this.weekdayStart = weekdayStart;
        this.weekdayEnd = weekdayEnd;
        this.weekendStart = weekendStart;
        this.weekendEnd = weekendEnd;
        this.breakStart = breakStart;
        this.breakEnd = breakEnd;
        this.holiday = holiday;
    }
}

