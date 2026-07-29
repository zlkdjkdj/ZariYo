package com.zariyo.global.config;

import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            userRepository.save(new User("admin@zariyo.com", "최고 관리자", User.Role.ROLE_ADMIN, User.UserStatus.ACTIVE));
            userRepository.save(new User("owner@zariyo.com", "김사장 (강남 메인점)", User.Role.ROLE_OWNER, User.UserStatus.ACTIVE));
            userRepository.save(new User("ceo.park@zariyo.com", "박대표 (홍대 아지트)", User.Role.ROLE_OWNER, User.UserStatus.ACTIVE));
            userRepository.save(new User("user1@naver.com", "이민수", User.Role.ROLE_CUSTOMER, User.UserStatus.ACTIVE));
            userRepository.save(new User("user2@kakao.com", "정수진", User.Role.ROLE_CUSTOMER, User.UserStatus.ACTIVE));
            userRepository.save(new User("spammer@test.com", "악성이용자", User.Role.ROLE_CUSTOMER, User.UserStatus.SUSPENDED));
        }
    }
}
