package com.zariyo.domain.user.service;

import com.zariyo.domain.user.dto.UserDto;
import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.repository.UserRepository;
import com.zariyo.global.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 회원 관련 비즈니스 로직(회원가입, 로그인 검증 및 JWT 토큰 발급)을 처리하는 서비스 클래스입니다.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    /**
     * 회원 가입을 처리하고 JWT 토큰 세트를 함께 발급합니다.
     */
    @Transactional
    public UserDto.TokenResponse signup(UserDto.SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 가입된 이메일 주소입니다.");
        }

        User user = new User(request.getEmail(), request.getName(), request.getRole());
        User savedUser = userRepository.save(user);

        return createTokenResponse(savedUser);
    }

    /**
     * 로그인을 수행하고 검증 후 JWT 토큰 세트를 발급합니다.
     */
    public UserDto.TokenResponse login(UserDto.LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 이메일입니다."));

        return createTokenResponse(user);
    }

    private UserDto.TokenResponse createTokenResponse(User user) {
        String accessToken = jwtProvider.createAccessToken(user.getId(), user.getEmail(), user.getRole().name());
        String refreshToken = jwtProvider.createRefreshToken(user.getId());
        UserDto.Response userResponse = UserDto.Response.from(user);

        return new UserDto.TokenResponse(accessToken, refreshToken, userResponse);
    }
}
