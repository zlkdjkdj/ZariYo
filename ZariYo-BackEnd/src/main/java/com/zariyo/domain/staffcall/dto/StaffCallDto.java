package com.zariyo.domain.staffcall.dto;

import com.zariyo.domain.staffcall.entity.StaffCall;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class StaffCallDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "직원 호출 생성 요청 DTO")
    public static class CreateRequest {
        @Schema(description = "테이블 번호", example = "T03")
        private String tableNumber;

        @Schema(description = "요청 항목 목록", example = "[\"시원한 얼음물\", \"일회용 앞치마\"]")
        private List<String> requestItems;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "직원 호출 응답 DTO")
    public static class Response {
        @Schema(description = "직원 호출 ID", example = "1")
        private Long id;

        @Schema(description = "테이블 번호", example = "T03")
        private String tableNumber;

        @Schema(description = "요청 항목 텍스트", example = "시원한 얼음물, 일회용 앞치마")
        private String requestItems;

        @Schema(description = "처리 완료 여부", example = "false")
        private boolean isResolved;

        @Schema(description = "요청 시간", example = "2026-07-27T12:35:00")
        private LocalDateTime createdAt;

        @Schema(description = "처리 시간", example = "2026-07-27T12:36:00")
        private LocalDateTime resolvedAt;

        public static Response from(StaffCall staffCall) {
            return Response.builder()
                    .id(staffCall.getId())
                    .tableNumber(staffCall.getTableNumber())
                    .requestItems(staffCall.getRequestItems())
                    .isResolved(staffCall.isResolved())
                    .createdAt(staffCall.getCreatedAt())
                    .resolvedAt(staffCall.getResolvedAt())
                    .build();
        }
    }
}
