package com.zariyo.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 프로젝트 내 모든 Controller 단에서 발생하는 예외를 전역으로 감지해
 * 프론트엔드가 요구하는 규격화된 ErrorResponse 포맷으로 반환해주는 컨트롤러 어드바이스 클래스입니다.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 비즈니스 로직 상 검증 오류 (IllegalArgumentException) 발생 시
     * HTTP 400 Bad Request 에러로 응답합니다.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        log.warn("비즈니스 검증 오류 발생 - 메시지: {}", e.getMessage());
        ErrorResponse response = ErrorResponse.of(e.getMessage(), "BAD_REQUEST");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * 서버나 인프라 상의 잘못된 상태 전환 검증 오류 (IllegalStateException) 발생 시
     * HTTP 400 Bad Request 에러로 응답합니다. (또는 상황에 맞게 409 Conflict 등으로 매핑 가능)
     */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalStateException(IllegalStateException e) {
        log.warn("시스템 상태 제어 오류 발생 - 메시지: {}", e.getMessage());
        ErrorResponse response = ErrorResponse.of(e.getMessage(), "INVALID_STATE");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * 그 외 예상치 못한 예외 발생 시 시스템 크래시를 방지하고
     * HTTP 500 Internal Server Error로 정규화하여 처리합니다.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception e) {
        log.error("알 수 없는 시스템 장애가 발생했습니다.", e);
        String detailedMsg = e.getClass().getSimpleName() + ": " + (e.getMessage() != null ? e.getMessage() : e.toString());
        ErrorResponse response = ErrorResponse.of(detailedMsg, "INTERNAL_SERVER_ERROR");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
