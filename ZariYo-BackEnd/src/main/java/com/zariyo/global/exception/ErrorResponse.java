package com.zariyo.global.exception;

import lombok.Getter;

/**
 * 전역 예외 처리 시 프론트엔드로 통일되게 반환할 에러 공통 응답 DTO입니다.
 */
@Getter
public class ErrorResponse {

    private final boolean success;
    private final String message;
    private final String code;

    public ErrorResponse(String message, String code) {
        this.success = false;
        this.message = message;
        this.code = code;
    }

    public static ErrorResponse of(String message, String code) {
        return new ErrorResponse(message, code);
    }
}
