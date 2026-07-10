package com.zariyo.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA는 기본 생성자가 필수입니다.
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String email;

    private String name;

    @Enumerated(EnumType.STRING)
    private Role role;

    // 생성자 (ID는 DB가 자동 생성하므로 제외)
    public User(String email, String name, Role role) {
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public enum Role {
        ROLE_CUSTOMER, ROLE_OWNER
    }
}
