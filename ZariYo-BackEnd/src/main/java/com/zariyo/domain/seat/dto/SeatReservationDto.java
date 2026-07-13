package com.zariyo.domain.seat.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

/**
 * 실시간 좌석 예약, 임시 선점, 확정, 반납 등에 사용되는 API DTO 모음입니다.
 */
public class SeatReservationDto {

    @Getter
    @Setter
    @Schema(description = "좌석 5분 임시 선점 요청 모델")
    public static class ReserveRequest {
        @Schema(description = "선점하려는 좌석의 2D 배치도 고유 식별자(UUID)", example = "c83f12ab-f756-42d8-9db8-028a2a89345c", requiredMode = Schema.RequiredMode.REQUIRED)
        private String seatId;

        @Schema(description = "요청하는 사용자 고유 ID", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
        private Long userId;
    }

    @Getter
    @Setter
    @Schema(description = "예약 최종 확정 요청 모델")
    public static class ConfirmRequest {
        @Schema(description = "최종 확정할 임시 선점 좌석의 고유 식별자(UUID)", example = "c83f12ab-f756-42d8-9db8-028a2a89345c", requiredMode = Schema.RequiredMode.REQUIRED)
        private String seatId;

        @Schema(description = "최종 예약 확정자 사용자 고유 ID", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
        private Long userId;

        @Schema(description = "이용 인원 수", example = "2", minimum = "1")
        private int peopleCount;
    }

    @Getter
    @Setter
    @Schema(description = "이용 완료 및 반납 요청 모델")
    public static class ReturnRequest {
        @Schema(description = "반납하려는 좌석의 고유 식별자(UUID)", example = "c83f12ab-f756-42d8-9db8-028a2a89345c", requiredMode = Schema.RequiredMode.REQUIRED)
        private String seatId;

        @Schema(description = "반납하는 사용자 또는 소유 사장님의 고유 ID", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
        private Long userId;
    }

    @Getter
    @Schema(description = "임시 선점 요청 처리 결과 응답 모델")
    public static class ReserveResponse {
        @Schema(description = "임시 선점 성공 여부", example = "true")
        private boolean success;

        @Schema(description = "수행 결과 메시지", example = "5분 동안 좌석이 임시 선점되었습니다.")
        private String message;

        @Schema(description = "선점된 좌석 UUID ID", example = "c83f12ab-f756-42d8-9db8-028a2a89345c")
        private String seatId;

        @Schema(description = "선점한 사용자 ID", example = "2")
        private Long userId;

        @Schema(description = "선점 상태 유지 제한 시간 (남은 초 단위)", example = "300")
        private long timeLeft;

        @Schema(description = "임시 선점 만료 예정 시각")
        private LocalDateTime expiresAt;

        public ReserveResponse(boolean success, String message, String seatId, Long userId, long timeLeft, LocalDateTime expiresAt) {
            this.success = success;
            this.message = message;
            this.seatId = seatId;
            this.userId = userId;
            this.timeLeft = timeLeft;
            this.expiresAt = expiresAt;
        }
    }

    @Getter
    @Schema(description = "예약 확정 결과 응답 모델")
    public static class ConfirmResponse {
        @Schema(description = "확정 처리 성공 여부", example = "true")
        private boolean success;

        @Schema(description = "수행 결과 메시지", example = "좌석 예약이 최종 확정되었습니다.")
        private String message;

        @Schema(description = "생성된 예약 건의 RDB 식별 ID", example = "10")
        private Long reservationId;

        public ConfirmResponse(boolean success, String message, Long reservationId) {
            this.success = success;
            this.message = message;
            this.reservationId = reservationId;
        }
    }

    @Getter
    @Schema(description = "좌석 반납(이용 완료) 결과 응답 모델")
    public static class ReturnResponse {
        @Schema(description = "반납 처리 성공 여부", example = "true")
        private boolean success;

        @Schema(description = "수행 결과 메시지", example = "이용이 완료되어 좌석이 공석으로 전환되었습니다.")
        private String message;

        public ReturnResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
    }

    @Getter
    @Schema(description = "실시간 좌석 상태 응답 모델")
    public static class SeatStatusResponse {
        @Schema(description = "좌석 고유 식별자(UUID)", example = "c83f12ab-f756-42d8-9db8-028a2a89345c")
        private String id;

        @Schema(description = "좌석 명칭", example = "3번 테이블")
        private String label;

        @Schema(description = "배치 요소 타입", example = "table-4")
        private String type;

        @Schema(description = "현재 상태 (available: 공석, held: 임시선점중, reserved: 예약완료)", example = "held")
        private String status;

        @Schema(description = "현재 좌석 점유/선점 중인 사용자 고유 ID (공석일 시 null)", example = "2")
        private Long userId;

        @Schema(description = "임시 선점의 잔여 시간 (held 상태일 시 초 단위, 공석/예약완료 시 0)", example = "245")
        private long timeLeft;

        public SeatStatusResponse(String id, String label, String type, String status, Long userId, long timeLeft) {
            this.id = id;
            this.label = label;
            this.type = type;
            this.status = status;
            this.userId = userId;
            this.timeLeft = timeLeft;
        }
    }
}
