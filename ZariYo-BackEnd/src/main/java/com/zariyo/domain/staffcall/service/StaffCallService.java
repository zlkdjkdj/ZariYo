package com.zariyo.domain.staffcall.service;

import com.zariyo.domain.staffcall.dto.StaffCallDto;
import com.zariyo.domain.staffcall.entity.StaffCall;
import com.zariyo.domain.staffcall.repository.StaffCallRepository;
import com.zariyo.domain.store.entity.Store;
import com.zariyo.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class StaffCallService {

    private final StoreRepository storeRepository;
    private final StaffCallRepository staffCallRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public StaffCallDto.Response createStaffCall(Long storeId, StaffCallDto.CreateRequest request) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매장입니다. ID: " + storeId));

        String requestItemsStr = String.join(", ", request.getRequestItems());

        StaffCall staffCall = new StaffCall(store, request.getTableNumber(), requestItemsStr);
        StaffCall savedStaffCall = staffCallRepository.save(staffCall);

        StaffCallDto.Response response = StaffCallDto.Response.from(savedStaffCall);

        // STOMP 웹소켓 브로드캐스팅 (/topic/stores/{storeId}/staff-calls)
        messagingTemplate.convertAndSend("/topic/stores/" + storeId + "/staff-calls", response);

        return response;
    }

    public List<StaffCallDto.Response> getStaffCalls(Long storeId, Boolean isResolved) {
        List<StaffCall> staffCalls;
        if (isResolved != null) {
            staffCalls = staffCallRepository.findByStoreIdAndIsResolvedOrderByCreatedAtDesc(storeId, isResolved);
        } else {
            staffCalls = staffCallRepository.findByStoreIdOrderByCreatedAtDesc(storeId);
        }
        return staffCalls.stream()
                .map(StaffCallDto.Response::from)
                .collect(Collectors.toList());
    }

    /**
     * 미조치된 직원 호출 목록만 실시간 조회합니다.
     */
    public List<StaffCallDto.Response> getUnresolvedStaffCalls(Long storeId) {
        return getStaffCalls(storeId, false);
    }

    @Transactional
    public StaffCallDto.Response resolveStaffCall(Long callId) {
        StaffCall staffCall = staffCallRepository.findById(callId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 직원 호출 요청입니다. ID: " + callId));

        staffCall.resolve();
        StaffCallDto.Response response = StaffCallDto.Response.from(staffCall);

        // STOMP 웹소켓 처리 완료 브로드캐스팅
        messagingTemplate.convertAndSend("/topic/stores/" + staffCall.getStore().getId() + "/staff-calls", response);

        return response;
    }

}

