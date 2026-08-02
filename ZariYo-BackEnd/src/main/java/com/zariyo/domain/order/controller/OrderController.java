package com.zariyo.domain.order.controller;

import com.zariyo.domain.order.dto.OrderDto;
import com.zariyo.domain.order.entity.OrderStatus;
import com.zariyo.domain.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Order API", description = "키오스크/테이블 오더 접수 및 주문 상태(KDS/대시보드) 관제 API")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "신규 주문 생성 (키오스크/테이블 오더)", description = "손님이 키오스크 또는 테이블 오더를 통해 신규 주문을 접수합니다.")
    @PostMapping("/stores/{storeId}/orders")
    public ResponseEntity<OrderDto.Response> createOrder(
            @Parameter(description = "매장 ID", example = "1") @PathVariable("storeId") Long storeId,
            @RequestBody OrderDto.CreateRequest request) {
        OrderDto.Response response = orderService.createOrder(storeId, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "매장 주문 목록 조회", description = "특정 매장의 전체 또는 특정 상태(PENDING, PREPARING 등)의 주문 목록을 최신순으로 조회합니다.")
    @GetMapping("/stores/{storeId}/orders")
    public ResponseEntity<List<OrderDto.Response>> getOrders(
            @Parameter(description = "매장 ID", example = "1") @PathVariable("storeId") Long storeId,
            @Parameter(description = "주문 상태 (선택 사항)", example = "PENDING") @RequestParam(value = "status", required = false) OrderStatus status) {
        List<OrderDto.Response> responses = orderService.getOrdersByStore(storeId, status);
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "단일 주문 상세 조회", description = "특정 주문의 상세 정보 및 포함 상품 목록을 조회합니다.")
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<OrderDto.Response> getOrder(
            @Parameter(description = "주문 ID", example = "1") @PathVariable("orderId") Long orderId) {
        OrderDto.Response response = orderService.getOrderById(orderId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "주문 상태 변경 (사장님/KDS 관제)", description = "주문 상태를 변경합니다 (PENDING ➔ PREPARING ➔ SERVED ➔ COMPLETED / CANCELLED).")
    @PatchMapping("/orders/{orderId}/status")
    public ResponseEntity<OrderDto.Response> updateOrderStatus(
            @Parameter(description = "주문 ID", example = "1") @PathVariable("orderId") Long orderId,
            @Parameter(description = "변경할 주문 상태", example = "PREPARING") @RequestParam("status") OrderStatus status) {
        OrderDto.Response response = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "주방 KDS 조리 목록 조회", description = "주방 KDS용 조리 대기(PENDING/PREPARING) 주문 목록을 실시간 조회합니다.")
    @GetMapping("/stores/{storeId}/orders/kds")
    public ResponseEntity<List<OrderDto.Response>> getKdsOrders(
            @Parameter(description = "매장 ID", example = "1") @PathVariable("storeId") Long storeId) {
        List<OrderDto.Response> responses = orderService.getOrdersByStore(storeId, OrderStatus.PENDING);
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "주방 셰프 원터치 조리 완료 릴레이", description = "주방 KDS 셰프가 조리 완료 버튼 클릭 시 상태를 전환하고 웹소켓 릴레이를 전송합니다.")
    @PatchMapping("/orders/{orderId}/cook-complete")
    public ResponseEntity<OrderDto.Response> completeCook(
            @Parameter(description = "주문 ID", example = "1") @PathVariable("orderId") Long orderId) {
        OrderDto.Response response = orderService.completeCook(orderId);
        return ResponseEntity.ok(response);
    }
}

