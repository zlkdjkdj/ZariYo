package com.zariyo.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA는 기본 생성자가 필수입니다.
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    private String name;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    private LocalDateTime createdAt;

    // 생성자 (ID는 DB가 자동 생성하므로 제외)
    public User(String email, String name, Role role) {
        this.email = email;
        this.name = name;
        this.role = role;
        this.status = UserStatus.ACTIVE;
        this.createdAt = LocalDateTime.now();
    }

    public User(String email, String name, Role role, UserStatus status) {
        this.email = email;
        this.name = name;
        this.role = role;
        this.status = status != null ? status : UserStatus.ACTIVE;
        this.createdAt = LocalDateTime.now();
    }

    public void updateRole(Role role) {
        if (role != null) {
            this.role = role;
        }
    }

    public void updateStatus(UserStatus status) {
        if (status != null) {
            this.status = status;
        }
    }

    public enum Role {
        ROLE_CUSTOMER, ROLE_OWNER, ROLE_ADMIN
    }

    public enum UserStatus {
        ACTIVE, SUSPENDED, INACTIVE
    }
}

