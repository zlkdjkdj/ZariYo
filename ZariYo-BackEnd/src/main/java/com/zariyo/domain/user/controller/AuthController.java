package com.zariyo.domain.user.controller;

import com.zariyo.domain.user.dto.UserDto;
import com.zariyo.domain.user.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 회원 인증(가입/로그인 및 JWT 토큰 발급) API 요청을 받아 처리하는 웹 컨트롤러입니다.
 */
@Tag(name = "Auth API", description = "회원 인증 (가입, 로그인 및 JWT 토큰 발급) API")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "회원 가입 및 JWT 토큰 발급", description = "이메일, 이름, 역할군(ROLE_CUSTOMER / ROLE_OWNER) 정보를 받아 회원가입을 완료하고 Access/Refresh 토큰을 발급합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "회원가입 및 JWT 토큰 발급 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 가입 정보 (중복 이메일 또는 누락된 필드)")
    })
    @PostMapping("/signup")
    public ResponseEntity<UserDto.TokenResponse> signup(@RequestBody UserDto.SignupRequest request) {
        UserDto.TokenResponse response = authService.signup(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "로그인 및 JWT 토큰 발급", description = "계정 조회를 거쳐 인증 후 JWT Access/Refresh 토큰 세트를 발급합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "로그인 및 JWT 토큰 발급 성공"),
        @ApiResponse(responseCode = "400", description = "가입되지 않은 이메일 계정 입력")
    })
    @PostMapping("/login")
    public ResponseEntity<UserDto.TokenResponse> login(@RequestBody UserDto.LoginRequest request) {
        UserDto.TokenResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Refresh Token을 이용한 토큰 재발급", description = "발급받았던 Refresh Token을 이용해 새로운 Access Token 및 Refresh Token 세트를 재발급합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "토큰 재발급 성공"),
        @ApiResponse(responseCode = "400", description = "유효하지 않거나 만료된 Refresh Token")
    })
    @PostMapping("/refresh")
    public ResponseEntity<UserDto.TokenResponse> refresh(@RequestBody UserDto.RefreshTokenRequest request) {
        UserDto.TokenResponse response = authService.refresh(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "카카오 소셜 로그인 인가 코드 수신 및 토큰 발급", description = "카카오 소셜 인증 후 받은 인가 코드(code)를 전달받아 회원가입/로그인 후 ZariYo JWT 토큰을 발급합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "카카오 소셜 로그인 성공"),
        @ApiResponse(responseCode = "400", description = "유효하지 않은 카카오 인가 코드")
    })
    @PostMapping("/kakao")
    public ResponseEntity<UserDto.TokenResponse> loginWithKakao(@RequestBody UserDto.KakaoLoginRequest request) {
        UserDto.TokenResponse response = authService.loginWithKakao(request);
        return ResponseEntity.ok(response);
    }
}
