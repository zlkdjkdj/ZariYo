package com.zariyo.domain.user.dto;

import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.entity.User.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 인증(가입/로그인) API 요청 및 응답 데이터를 정의하는 DTO 클래스입니다.
 */
public class UserDto {

    @Getter
    @Setter
    @Schema(description = "회원 가입 요청 데이터 모델")
    public static class SignupRequest {
        @Schema(description = "사용자 이메일 주소", example = "owner@zariyo.com", requiredMode = Schema.RequiredMode.REQUIRED)
        private String email;

        @Schema(description = "사용자 이름 또는 상호명", example = "홍길동", requiredMode = Schema.RequiredMode.REQUIRED)
        private String name;

        @Schema(description = "사용자 역할군 (ROLE_CUSTOMER, ROLE_OWNER)", example = "ROLE_OWNER", requiredMode = Schema.RequiredMode.REQUIRED)
        private Role role;
    }

    @Getter
    @Setter
    @Schema(description = "로그인 요청 데이터 모델")
    public static class LoginRequest {
        @Schema(description = "로그인할 사용자 이메일 주소", example = "owner@zariyo.com", requiredMode = Schema.RequiredMode.REQUIRED)
        private String email;
    }

    @Getter
    @Schema(description = "회원 인증 처리 응답 데이터 모델")
    public static class Response {
        @Schema(description = "사용자 고유 DB 식별 번호 (ID)", example = "1")
        private Long id;

        @Schema(description = "사용자 이메일 주소", example = "owner@zariyo.com")
        private String email;

        @Schema(description = "사용자 이름", example = "홍길동")
        private String name;

        @Schema(description = "사용자 권한/역할군", example = "ROLE_OWNER")
        private String role;

        public Response(Long id, String email, String name, String role) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.role = role;
        }

        public static Response from(User user) {
            return new Response(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole().name()
            );
        }
    }
}
