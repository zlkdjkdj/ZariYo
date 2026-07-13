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
 * 회원 인증(가입/로그인) API 요청을 받아 처리하는 웹 컨트롤러입니다.
 * 
 * - @RestController: JSON 형태로 데이터를 반환하는 REST API 서버의 엔드포인트를 선언합니다.
 * - @RequestMapping("/api/v1/auth"): 공통 URI 경로를 설정합니다.
 * - @CrossOrigin: 서로 다른 포트(프론트엔드 5173, 백엔드 8080) 간의 자원 공유를 허용합니다.
 */
@Tag(name = "Auth API", description = "회원 인증 (가입 및 로그인) API")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    /**
     * 회원 가입 API 엔드포인트
     * - POST http://localhost:8080/api/v1/auth/signup
     */
    @Operation(summary = "회원 가입", description = "이메일, 이름, 역할군(ROLE_CUSTOMER / ROLE_OWNER) 정보를 제공받아 회원가입 처리를 수행합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "회원가입 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 가입 정보 (중복 이메일 또는 누락된 필드)")
    })
    @PostMapping("/signup")
    public ResponseEntity<UserDto.Response> signup(@RequestBody UserDto.SignupRequest request) {
        // @RequestBody: HTTP Request Body of JSON data is mapped into Java Object
        UserDto.Response response = authService.signup(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 로그인 API 엔드포인트
     * - POST http://localhost:8080/api/v1/auth/login
     */
    @Operation(summary = "로그인", description = "제공된 이메일 계정을 조회하여 로그인에 해당하는 사용자 객체를 반환합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "로그인 성공"),
        @ApiResponse(responseCode = "400", description = "가입되지 않은 이메일 계정 입력")
    })
    @PostMapping("/login")
    public ResponseEntity<UserDto.Response> login(@RequestBody UserDto.LoginRequest request) {
        UserDto.Response response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
