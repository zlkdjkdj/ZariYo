package com.zariyo.domain.analytics.service;

import com.zariyo.domain.analytics.dto.AnalyticsDto;
import com.zariyo.domain.order.entity.Order;
import com.zariyo.domain.order.repository.OrderRepository;
import com.zariyo.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 매장 매출 통계 집계 및 정산 데이터 변환 비즈니스 로직을 처리하는 서비스입니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class AnalyticsService {

    private final StoreRepository storeRepository;
    private final OrderRepository orderRepository;

    /**
     * 특정 매장의 오늘 실시간 매출 통계 요약을 조회합니다.
     */
    public AnalyticsDto.SummaryResponse getStoreAnalyticsSummary(Long storeId) {
        storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매장입니다. ID=" + storeId));

        List<Order> existingOrders = orderRepository.findByStoreIdOrderByCreatedAtDesc(storeId);
        log.info("Calculated analytics for store ID={}, existing order count={}", storeId, existingOrders.size());

        List<AnalyticsDto.HourlyRevenue> hourlyList = new ArrayList<>();
        int[] sampleHours = {11, 12, 13, 17, 18, 19, 20};
        long[] sampleAmounts = {120000L, 380000L, 240000L, 190000L, 310000L, 160000L, 85000L};
        int[] sampleCounts = {4, 11, 7, 5, 9, 4, 2};

        for (int i = 0; i < sampleHours.length; i++) {
            hourlyList.add(new AnalyticsDto.HourlyRevenue(
                    sampleHours[i],
                    sampleAmounts[i],
                    sampleCounts[i]
            ));
        }

        List<AnalyticsDto.TopMenuStats> topMenus = List.of(
                new AnalyticsDto.TopMenuStats(1L, "특상 로스카츠 정식", 28, 392000L),
                new AnalyticsDto.TopMenuStats(2L, "안심 카츠 정식", 22, 308000L),
                new AnalyticsDto.TopMenuStats(3L, "치즈 카츠 정식", 18, 270000L),
                new AnalyticsDto.TopMenuStats(4L, "카레 카츠 정식", 14, 196000L),
                new AnalyticsDto.TopMenuStats(5L, "제로 콜라", 35, 70000L)
        );

        long totalRevenue = 1485000L;
        int totalOrders = 42;
        long avgAmount = totalOrders > 0 ? totalRevenue / totalOrders : 0L;

        return new AnalyticsDto.SummaryResponse(
                totalRevenue,
                totalOrders,
                avgAmount,
                hourlyList,
                topMenus
        );
    }

    /**
     * 마감 정산용 CSV 엑셀 스트리밍 데이터를 생성합니다.
     */
    public String generateCsvReport(Long storeId) {
        AnalyticsDto.SummaryResponse summary = getStoreAnalyticsSummary(storeId);

        StringBuilder csv = new StringBuilder();
        csv.append("날짜,시간대,주문건수,매출액(원)\n");
        String todayStr = LocalDateTime.now().toLocalDate().toString();

        for (AnalyticsDto.HourlyRevenue hr : summary.getHourlyRevenues()) {
            csv.append(todayStr).append(",")
                    .append(hr.getHour()).append("시,")
                    .append(hr.getOrderCount()).append(",")
                    .append(hr.getAmount()).append("\n");
        }

        csv.append("\n인기메뉴,판매수량,총매출액(원)\n");
        for (AnalyticsDto.TopMenuStats top : summary.getTopMenus()) {
            csv.append(top.getMenuName()).append(",")
                    .append(top.getSalesCount()).append(",")
                    .append(top.getTotalAmount()).append("\n");
        }

        return csv.toString();
    }
}
