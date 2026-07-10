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
@Table(name = "stores") // 1. 매장 테이블 이름을 stores로 지정합니다.
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 2. 자동 증가되는 기본키(PK)

    @Column(nullable = false, length = 100)
    private String name; // 3. 필수값(NOT NULL) 지정

    private String address; // 4. 일반 주소 컬럼

    // 5. [핵심] 객체 연관관계 매핑 (다대일 관계)
    // 여러 개의 매장(Many)은 한 명의 사장님(One)이 소유할 수 있습니다.
    @ManyToOne(fetch = FetchType.LAZY) // 지연 로딩: 매장 정보를 가져올 때 당장 유저 정보가 필요 없으면 나중에 가져오는 성능 최적화 옵션
    @JoinColumn(name = "user_id")      // 실제 DB의 stores 테이블에 user_id 라는 이름의 컬럼(외래키, FK)을 생성합니다.
    private User owner;

    public Store(String name, String address, User owner) {
        this.name = name;
        this.address = address;
        this.owner = owner;
    }
}
