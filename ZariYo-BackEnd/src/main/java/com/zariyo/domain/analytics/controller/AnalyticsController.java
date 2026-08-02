package com.zariyo.domain.analytics.controller;

import com.zariyo.domain.analytics.dto.AnalyticsDto;
import com.zariyo.domain.analytics.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

/**
 * 실시간 매출 분석 통계 및 CSV 엑셀 파일 내보내기를 담당하는 REST 컨트롤러입니다.
 */
@Tag(name = "Analytics API", description = "실시간 매출 분석 BI & 마감 정산 CSV 내보내기 API")
@RestController
@RequestMapping("/api/v1/stores/{storeId}/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @Operation(summary = "실시간 매출 요약 통계 조회", description = "오늘 총매출액, 객단가, 시간대별 매출 추이 및 인기 메뉴 TOP 5를 반환합니다.")
    @GetMapping("/summary")
    public ResponseEntity<AnalyticsDto.SummaryResponse> getAnalyticsSummary(@PathVariable("storeId") Long storeId) {
        AnalyticsDto.SummaryResponse summary = analyticsService.getStoreAnalyticsSummary(storeId);
        return ResponseEntity.ok(summary);
    }

    @Operation(summary = "마감 정산 CSV 엑셀 다운로드", description = "매장의 일별/시간대별 매출 및 메뉴 매출 내역을 CSV 파일 포맷으로 반환합니다.")
    @GetMapping("/export-csv")
    public ResponseEntity<byte[]> exportCsvReport(@PathVariable("storeId") Long storeId) {
        String csvContent = analyticsService.generateCsvReport(storeId);
        byte[] csvBytes = csvContent.getBytes(StandardCharsets.UTF_8);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv; charset=UTF-8"));
        headers.setContentDispositionFormData("attachment", "zariyo_sales_report_store_" + storeId + ".csv");

        return ResponseEntity.ok()
                .headers(headers)
                .body(csvBytes);
    }
}
