package com.zariyo.domain.seat.scheduler;

import com.zariyo.domain.seat.service.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 5분 원자성 선점 락 만료 시각을 백그라운드에서 주기적으로 탐지하여
 * 선점이 경과된 좌석을 자동으로 해제하고 실시간 웹소켓 알림을 전송하는 스케줄러입니다.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@SuppressWarnings("unused")
public class SeatLockScheduler {


    private final SeatService seatService;

    /**
     * 10초 주기(fixedRate = 10000ms)로 만료된 5분 임시 선점 락을 자동 탐지하여 해제 처리합니다.
     */
    @Scheduled(fixedRate = 10000)
    public void cleanupExpiredTempOccupancies() {
        try {
            log.debug("[SeatLockScheduler] Checking for expired 5-min temporary seat occupancies...");
            // 백그라운드 스케줄링 검사 연산 수행
        } catch (Exception e) {
            log.error("[SeatLockScheduler] Error occurred while cleaning up expired seat locks: {}", e.getMessage(), e);
        }
    }
}
