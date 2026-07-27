package com.zariyo.domain.order.dto;

import com.zariyo.domain.order.entity.Order;
import com.zariyo.domain.order.entity.OrderItem;
import com.zariyo.domain.order.entity.OrderStatus;
import com.zariyo.domain.order.entity.OrderType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "주문 상품 항목 요청 DTO")
    public static class ItemRequest {
        @Schema(description = "메뉴 ID", example = "101")
        private Long menuItemId;

        @Schema(description = "주문 수량", example = "2")
        private int quantity;

        @Schema(description = "선택 옵션 요약", example = "치즈 추가 (+1,500원)")
        private String optionsSummary;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "주문 생성 요청 DTO")
    public static class CreateRequest {
        @Schema(description = "테이블/좌석 식별 번호", example = "T01")
        private String tableNumber;

        @Schema(description = "주문 방식 (EAT_IN, TAKE_OUT)", example = "EAT_IN")
        private OrderType orderType;

        @Schema(description = "주문 상품 목록")
        private List<ItemRequest> items;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "주문 상품 항목 응답 DTO")
    public static class ItemResponse {
        @Schema(description = "주문 상품 ID", example = "501")
        private Long id;

        @Schema(description = "메뉴 ID", example = "101")
        private Long menuItemId;

        @Schema(description = "메뉴명", example = "시그니처 토마호크 스테이크")
        private String menuItemName;

        @Schema(description = "단가", example = "48000")
        private int price;

        @Schema(description = "수량", example = "2")
        private int quantity;

        @Schema(description = "옵션 요약", example = "치즈 추가 (+1,500원)")
        private String optionsSummary;

        public static ItemResponse from(OrderItem orderItem) {
            return ItemResponse.builder()
                    .id(orderItem.getId())
                    .menuItemId(orderItem.getMenuItem().getId())
                    .menuItemName(orderItem.getMenuItem().getName())
                    .price(orderItem.getPrice())
                    .quantity(orderItem.getQuantity())
                    .optionsSummary(orderItem.getOptionsSummary())
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "주문 상세 응답 DTO")
    public static class Response {
        @Schema(description = "주문 ID", example = "1")
        private Long id;

        @Schema(description = "주문 번호", example = "ORD-20260727-001")
        private String orderNumber;

        @Schema(description = "테이블 번호", example = "T01")
        private String tableNumber;

        @Schema(description = "총 결제 금액", example = "96000")
        private int totalAmount;

        @Schema(description = "주문 상태 (PENDING, PREPARING, SERVED, COMPLETED, CANCELLED)", example = "PENDING")
        private OrderStatus status;

        @Schema(description = "주문 유형 (EAT_IN, TAKE_OUT)", example = "EAT_IN")
        private OrderType orderType;

        @Schema(description = "주문 상품 목록")
        private List<ItemResponse> items;

        @Schema(description = "주문 시각", example = "2026-07-27T12:30:00")
        private LocalDateTime createdAt;

        public static Response from(Order order) {
            List<ItemResponse> itemResponses = order.getOrderItems().stream()
                    .map(ItemResponse::from)
                    .collect(Collectors.toList());

            return Response.builder()
                    .id(order.getId())
                    .orderNumber(order.getOrderNumber())
                    .tableNumber(order.getTableNumber())
                    .totalAmount(order.getTotalAmount())
                    .status(order.getStatus())
                    .orderType(order.getOrderType())
                    .items(itemResponses)
                    .createdAt(order.getCreatedAt())
                    .build();
        }
    }
}
