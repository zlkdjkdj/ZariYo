package com.zariyo.domain.staffcall.controller;

import com.zariyo.domain.staffcall.dto.StaffCallDto;
import com.zariyo.domain.staffcall.service.StaffCallService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Staff Call API", description = "손님 테이블 편의 서비스 / 직원 호출 및 사장님 관제 처리 API")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StaffCallController {

    private final StaffCallService staffCallService;

    @Operation(summary = "직원 호출 등록", description = "손님이 키오스크/테이블 오더에서 편의 요청(얼음물, 앞치마 등) 또는 직원 호출을 등록합니다.")
    @PostMapping("/stores/{storeId}/staff-calls")
    public ResponseEntity<StaffCallDto.Response> createStaffCall(
            @Parameter(description = "매장 ID", example = "1") @PathVariable("storeId") Long storeId,
            @RequestBody StaffCallDto.CreateRequest request) {
        StaffCallDto.Response response = staffCallService.createStaffCall(storeId, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "매장 직원 호출 목록 조회", description = "특정 매장의 미처리 또는 전체 직원 호출 목록을 최신순으로 조회합니다.")
    @GetMapping("/stores/{storeId}/staff-calls")
    public ResponseEntity<List<StaffCallDto.Response>> getStaffCalls(
            @Parameter(description = "매장 ID", example = "1") @PathVariable("storeId") Long storeId,
            @Parameter(description = "처리 완료 여부 (선택 사항)", example = "false") @RequestParam(value = "isResolved", required = false) Boolean isResolved) {
        List<StaffCallDto.Response> responses = staffCallService.getStaffCalls(storeId, isResolved);
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "직원 호출 처리 완료", description = "사장님/직원이 해당 직원 호출 요청을 조치 및 완료 처리합니다.")
    @PatchMapping("/staff-calls/{callId}/resolve")
    public ResponseEntity<StaffCallDto.Response> resolveStaffCall(
            @Parameter(description = "직원 호출 ID", example = "1") @PathVariable("callId") Long callId) {
        StaffCallDto.Response response = staffCallService.resolveStaffCall(callId);
        return ResponseEntity.ok(response);
    }
}
