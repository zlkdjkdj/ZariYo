package com.zariyo.domain.user.service;

import com.zariyo.domain.user.dto.UserDto;
import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 회원 관련 비즈니스 로직(회원가입, 로그인 검증)을 처리하는 서비스 클래스입니다.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;

    /**
     * 회원 가입을 처리합니다. 이메일 중복 검사를 진행합니다.
     */
    @Transactional
    public UserDto.Response signup(UserDto.SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 가입된 이메일 주소입니다.");
        }
        
        // 1. DTO -> Entity 변환 및 저장
        User user = new User(request.getEmail(), request.getName(), request.getRole());
        User savedUser = userRepository.save(user);
        
        // 2. Entity -> Response DTO 반환
        return UserDto.Response.from(savedUser);
    }

    /**
     * 로그인을 수행합니다. 이메일 유무 체크를 통해 간단한 회원 검증을 수행합니다.
     */
    public UserDto.Response login(UserDto.LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 이메일입니다."));
        
        return UserDto.Response.from(user);
    }
}
