package com.zariyo.domain.store.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

/**
 *  매장 정보 및 레이아웃 배치 데이터를 정의하는 DTO 클래스입니다.
 */
public class StoreDto {

    @Getter
    @Setter
    @Schema(description = "매장 및 2D 배치도 일괄 저장 요청 모델")
    public static class SaveRequest {
        @Schema(description = "매장명", example = "할리스 커피 강남역점", requiredMode = Schema.RequiredMode.REQUIRED)
        private String name;

        @Schema(description = "매장 지번/도로명 주소", example = "서울시 강남구 역삼동 825-24", requiredMode = Schema.RequiredMode.REQUIRED)
        private String address;

        @Schema(description = "평일 영업 시작 시각 (HH:mm)", example = "09:00")
        private String weekdayStart;

        @Schema(description = "평일 영업 마감 시각 (HH:mm)", example = "22:00")
        private String weekdayEnd;

        @Schema(description = "주말 영업 시작 시각 (HH:mm)", example = "10:00")
        private String weekendStart;

        @Schema(description = "주말 영업 마감 시각 (HH:mm)", example = "21:00")
        private String weekendEnd;

        @Schema(description = "휴게 시간 시작 시각 (HH:mm)", example = "15:00")
        private String breakStart;

        @Schema(description = "휴게 시간 종료 시각 (HH:mm)", example = "16:00")
        private String breakEnd;

        @Schema(description = "정기 휴무 요일 (콤마 구분)", example = "월요일,화요일")
        private String holiday;

        @Schema(description = "매장 소유자(사장님) 고유 ID", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
        private Long ownerId;

        @Schema(description = "2D 그리드 내 배치된 가구 및 좌석 상세 목록")
        private List<PlacedElementDto> elements;
    }

    @Getter
    @Setter
    @Schema(description = "2D 그리드 배치 요소 상세 정보 모델")
    public static class PlacedElementDto {
        @Schema(description = "프론트엔드 배치도 상의 고유 UUID 식별자", example = "c83f12ab-f756-42d8-9db8-028a2a89345c", requiredMode = Schema.RequiredMode.REQUIRED)
        private String id;

        @Schema(description = "가구 및 좌석 타입 (table-2, table-4, table-bar, socket, door, toilet, counter 등)", example = "table-4", requiredMode = Schema.RequiredMode.REQUIRED)
        private String type;

        @Schema(description = "좌석 번호 또는 가구 레이블 명칭", example = "3번 테이블")
        private String label;

        @Schema(description = "그리드 평면상의 X 좌표 (px)", example = "120")
        private int x;

        @Schema(description = "그리드 평면상의 Y 좌표 (px)", example = "240")
        private int y;

        @Schema(description = "요소 가로 너비 (px)", example = "80")
        private int width;

        @Schema(description = "요소 세로 높이 (px)", example = "80")
        private int height;

        @Schema(description = "실제 좌석 예약 가능 여부 (테이블 외의 출입구/콘센트는 false)", example = "true")
        private boolean isReservable;

        @Schema(description = "5분 임시 선점 기능 활성화 여부", example = "true")
        private boolean isTempOccupiedEnabled;
    }

    @Getter
    @Schema(description = "매장 정보 응답 모델")
    public static class Response {
        @Schema(description = "매장 고유 DB 식별 ID", example = "1")
        private Long id;

        @Schema(description = "매장 명칭", example = "할리스 커피 강남역점")
        private String name;

        @Schema(description = "매장 주소", example = "서울시 강남구 역삼동 825-24")
        private String address;

        @Schema(description = "평일 오픈 시각", example = "09:00")
        private String weekdayStart;

        @Schema(description = "평일 마감 시각", example = "22:00")
        private String weekdayEnd;

        @Schema(description = "주말 오픈 시각", example = "10:00")
        private String weekendStart;

        @Schema(description = "주말 마감 시각", example = "21:00")
        private String weekendEnd;

        @Schema(description = "브레이크 타임 시작 시각", example = "15:00")
        private String breakStart;

        @Schema(description = "브레이크 타임 마감 시각", example = "16:00")
        private String breakEnd;

        @Schema(description = "정기 휴무 요일 명세", example = "월요일,화요일")
        private String holiday;

        public Response(Long id, String name, String address, String weekdayStart, String weekdayEnd,
                        String weekendStart, String weekendEnd, String breakStart, String breakEnd,
                        String holiday) {
            this.id = id;
            this.name = name;
            this.address = address;
            this.weekdayStart = weekdayStart;
            this.weekdayEnd = weekdayEnd;
            this.weekendStart = weekendStart;
            this.weekendEnd = weekendEnd;
            this.breakStart = breakStart;
            this.breakEnd = breakEnd;
            this.holiday = holiday;
        }

        public static Response from(com.zariyo.domain.store.entity.Store store) {
            return new Response(
                store.getId(),
                store.getName(),
                store.getAddress(),
                store.getWeekdayStart(),
                store.getWeekdayEnd(),
                store.getWeekendStart(),
                store.getWeekendEnd(),
                store.getBreakStart(),
                store.getBreakEnd(),
                store.getHoliday()
            );
        }
    }
}
