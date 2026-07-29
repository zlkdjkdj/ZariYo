package com.zariyo.domain.user.service;

import com.zariyo.domain.user.dto.UserDto;
import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.repository.UserRepository;
import com.zariyo.global.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * 회원 관련 비즈니스 로직(회원가입, 로그인 검증, 카카오 소셜 로그인 및 JWT 토큰 발급)을 처리하는 서비스 클래스입니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${kakao.client-id}")
    private String kakaoClientId;

    @Value("${kakao.client-secret:}")
    private String kakaoClientSecret;

    @Value("${kakao.redirect-uri:http://localhost:5173/auth/kakao/callback}")
    private String kakaoRedirectUri;

    /**
     * 일반 회원 가입을 처리하고 JWT 토큰 세트를 함께 발급합니다.
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
     * 일반 로그인을 수행하고 검증 후 JWT 토큰 세트를 발급합니다.
     */
    public UserDto.TokenResponse login(UserDto.LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 이메일입니다."));

        return createTokenResponse(user);
    }

    /**
     * 카카오 소셜 로그인 인가 코드를 수신하여 카카오 회원 정보 조회 및 로그인/자동회원가입을 진행합니다.
     */
    @Transactional
    public UserDto.TokenResponse loginWithKakao(UserDto.KakaoLoginRequest request) {
        // 1. 카카오 OAuth 토큰 발급 API 호출
        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoClientId.trim());
        params.add("redirect_uri", kakaoRedirectUri.trim());
        params.add("code", request.getCode().trim());
        if (kakaoClientSecret != null && !kakaoClientSecret.isBlank()) {
            params.add("client_secret", kakaoClientSecret.trim());
        }

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, tokenHeaders);

        try {
            ResponseEntity<Map<String, Object>> tokenResponseEntity = restTemplate.exchange(
                    "https://kauth.kakao.com/oauth/token",
                    HttpMethod.POST,
                    tokenRequest,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            Map<String, Object> tokenResponseBody = tokenResponseEntity.getBody();
            if (tokenResponseBody == null || !tokenResponseBody.containsKey("access_token")) {
                throw new IllegalArgumentException("카카오 소셜 로그인 토큰 발급 실패. 인가 코드를 확인해 주세요.");
            }

            String kakaoAccessToken = (String) tokenResponseBody.get("access_token");

            // 2. 카카오 사용자 프로필 조회 API 호출
            HttpHeaders profileHeaders = new HttpHeaders();
            profileHeaders.setBearerAuth(kakaoAccessToken);
            profileHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<String> profileRequest = new HttpEntity<>(profileHeaders);

            ResponseEntity<Map<String, Object>> profileResponse = restTemplate.exchange(
                    "https://kapi.kakao.com/v2/user/me",
                    HttpMethod.GET,
                    profileRequest,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            Map<String, Object> body = profileResponse.getBody();
            if (body == null || !body.containsKey("id")) {
                throw new IllegalArgumentException("카카오 회원 프로필 정보를 불러오는데 실패했습니다.");
            }

            Object idObj = body.get("id");
            String email = null;
            String name = null;

            if (body.get("kakao_account") instanceof Map<?, ?> kakaoAccount) {
                email = (String) kakaoAccount.get("email");
                if (kakaoAccount.get("profile") instanceof Map<?, ?> profile) {
                    name = (String) profile.get("nickname");
                }
            }

            if (email == null || email.isBlank()) {
                email = "kakao_" + idObj + "@kakao.com";
            }
            if (name == null || name.isBlank()) {
                name = "카카오 회원";
            }

            final String userEmail = email;
            final String userName = name;

            // 3. DB 사용자 조회 또는 신규 회원 자동 가입
            User user = userRepository.findByEmail(userEmail)
                    .orElseGet(() -> userRepository.save(
                            new User(userEmail, userName, User.Role.ROLE_CUSTOMER, User.UserStatus.ACTIVE)
                    ));

            if (user.getStatus() == User.UserStatus.SUSPENDED) {
                throw new IllegalStateException("정지된 계정입니다. 관리자에게 문의해 주세요.");
            }

            return createTokenResponse(user);

        } catch (HttpStatusCodeException e) {
            String errorResponseBody = e.getResponseBodyAsString();
            log.error("=== KAKAO OAUTH ERROR BODY ===: {}", errorResponseBody);
            throw new IllegalArgumentException("카카오 소셜 인증 실패 (" + e.getStatusCode() + "): " + errorResponseBody);
        }
    }

    /**
     * Refresh Token을 검증하여 새로운 Access/Refresh 토큰 세트를 재발급합니다.
     */
    @Transactional
    public UserDto.TokenResponse refresh(UserDto.RefreshTokenRequest request) {
        String token = request.getRefreshToken();
        if (token == null || !jwtProvider.validateToken(token)) {
            throw new IllegalArgumentException("유효하지 않거나 만료된 Refresh Token입니다.");
        }

        var claims = jwtProvider.parseClaims(token);
        Long userId = Long.parseLong(claims.getSubject());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 계정입니다."));

        if (user.getStatus() == User.UserStatus.SUSPENDED) {
            throw new IllegalStateException("정지된 계정입니다. 관리자에게 문의하세요.");
        }

        return createTokenResponse(user);
    }

    private UserDto.TokenResponse createTokenResponse(User user) {
        String accessToken = jwtProvider.createAccessToken(user.getId(), user.getEmail(), user.getRole().name());
        String refreshToken = jwtProvider.createRefreshToken(user.getId());
        UserDto.Response userResponse = UserDto.Response.from(user);

        return new UserDto.TokenResponse(accessToken, refreshToken, userResponse);
    }
}
