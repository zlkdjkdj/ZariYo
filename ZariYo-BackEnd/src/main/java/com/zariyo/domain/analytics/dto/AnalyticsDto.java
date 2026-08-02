package com.zariyo.domain.analytics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 실시간 매출 통계 BI 및 마감 정산 관련 DTO 클래스 모음입니다.
 */
public class AnalyticsDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "매출 요약 통계 응답 DTO")
    public static class SummaryResponse {

        @Schema(description = "오늘 총 매출액 (원)", example = "1485000")
        private Long todayTotalRevenue;

        @Schema(description = "오늘 총 주문 건수", example = "42")
        private Integer todayOrderCount;

        @Schema(description = "평균 객단가 (원)", example = "35357")
        private Long averageOrderAmount;

        @Schema(description = "시간대별 매출 추이 목록")
        private List<HourlyRevenue> hourlyRevenues;

        @Schema(description = "인기 메뉴 TOP 5 통계 목록")
        private List<TopMenuStats> topMenus;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "시간대별 매출 DTO")
    public static class HourlyRevenue {

        @Schema(description = "시간대 (0~23)", example = "12")
        private Integer hour;

        @Schema(description = "해당 시간대 매출액 (원)", example = "320000")
        private Long amount;

        @Schema(description = "주문 건수", example = "11")
        private Integer orderCount;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "인기 메뉴 통계 DTO")
    public static class TopMenuStats {

        @Schema(description = "메뉴 ID", example = "1")
        private Long menuId;

        @Schema(description = "메뉴 이름", example = "특상 로스카츠 정식")
        private String menuName;

        @Schema(description = "판매 수량", example = "28")
        private Integer salesCount;

        @Schema(description = "총 매출액 (원)", example = "392000")
        private Long totalAmount;
    }
}
