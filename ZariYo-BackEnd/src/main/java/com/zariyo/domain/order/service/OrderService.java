package com.zariyo.domain.order.service;

import com.zariyo.domain.menu.entity.MenuItem;
import com.zariyo.domain.menu.repository.MenuItemRepository;
import com.zariyo.domain.order.dto.OrderDto;
import com.zariyo.domain.order.entity.Order;
import com.zariyo.domain.order.entity.OrderItem;
import com.zariyo.domain.order.entity.OrderStatus;
import com.zariyo.domain.order.repository.OrderRepository;
import com.zariyo.domain.store.entity.Store;
import com.zariyo.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class OrderService {

    private final StoreRepository storeRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderRepository orderRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public OrderDto.Response createOrder(Long storeId, OrderDto.CreateRequest request) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매장입니다. ID: " + storeId));

        String orderNumber = "ORD-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();

        int totalAmount = 0;
        for (OrderDto.ItemRequest itemReq : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 메뉴입니다. ID: " + itemReq.getMenuItemId()));
            if (!menuItem.isSoldOut()) {
                totalAmount += menuItem.getPrice() * itemReq.getQuantity();
            }
        }

        Order order = new Order(
                orderNumber,
                store,
                request.getTableNumber(),
                totalAmount,
                OrderStatus.PENDING,
                request.getOrderType()
        );

        for (OrderDto.ItemRequest itemReq : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 메뉴입니다. ID: " + itemReq.getMenuItemId()));

            if (menuItem.isSoldOut()) {
                throw new IllegalStateException("해당 메뉴는 품절 상태입니다: " + menuItem.getName());
            }

            OrderItem orderItem = new OrderItem(order, menuItem, itemReq.getQuantity(), menuItem.getPrice(), itemReq.getOptionsSummary());
            order.addOrderItem(orderItem);
        }

        // 총 결제 금액 동기화
        Order savedOrder = orderRepository.save(order);
        OrderDto.Response response = OrderDto.Response.from(savedOrder);

        // STOMP 웹소켓 브로드캐스팅 (/topic/stores/{storeId}/orders)
        messagingTemplate.convertAndSend("/topic/stores/" + storeId + "/orders", response);

        return response;
    }

    public List<OrderDto.Response> getOrdersByStore(Long storeId, OrderStatus status) {
        List<Order> orders;
        if (status != null) {
            orders = orderRepository.findByStoreIdAndStatusOrderByCreatedAtDesc(storeId, status);
        } else {
            orders = orderRepository.findByStoreIdOrderByCreatedAtDesc(storeId);
        }
        return orders.stream()
                .map(OrderDto.Response::from)
                .collect(Collectors.toList());
    }

    public OrderDto.Response getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 주문입니다. ID: " + orderId));
        return OrderDto.Response.from(order);
    }

    @Transactional
    public OrderDto.Response updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 주문입니다. ID: " + orderId));

        order.updateStatus(status);
        OrderDto.Response response = OrderDto.Response.from(order);

        // STOMP 웹소켓 상태 변경 브로드캐스팅
        messagingTemplate.convertAndSend("/topic/stores/" + order.getStore().getId() + "/orders", response);

        return response;
    }
}

