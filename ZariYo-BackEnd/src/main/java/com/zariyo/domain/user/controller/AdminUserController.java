package com.zariyo.domain.user.controller;

import com.zariyo.domain.user.dto.AdminUserDto;
import com.zariyo.domain.user.dto.UserDto;
import com.zariyo.domain.user.service.AdminUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Admin User API", description = "관리자 전용 회원 관리 API")
@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @Operation(summary = "전체 회원 목록 및 검색/필터 조회", description = "이메일/이름 키워드, 역할, 상태별 필터링된 회원 목록을 반환합니다.")
    @GetMapping
    public ResponseEntity<List<UserDto.Response>> getAllUsers(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status) {
        List<UserDto.Response> users = adminUserService.getAllUsers(query, role, status);
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "관리자 요약 통계 정보 조회", description = "총 회원 수, 사장님 수, 손님 수, 관리자 수, 정지 회원 수 통계를 조회합니다.")
    @GetMapping("/stats")
    public ResponseEntity<AdminUserDto.UserStatsResponse> getUserStats() {
        AdminUserDto.UserStatsResponse stats = adminUserService.getUserStats();
        return ResponseEntity.ok(stats);
    }

    @Operation(summary = "회원 권한/역할 변경", description = "특정 회원의 역할군(ROLE_CUSTOMER, ROLE_OWNER, ROLE_ADMIN)을 수정합니다.")
    @PatchMapping("/{userId}/role")
    public ResponseEntity<UserDto.Response> updateUserRole(
            @PathVariable Long userId,
            @RequestBody AdminUserDto.UpdateRoleRequest request) {
        UserDto.Response response = adminUserService.updateUserRole(userId, request.getRole());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "회원 계정 상태 변경", description = "특정 회원의 상태(ACTIVE, SUSPENDED, INACTIVE)를 수정합니다.")
    @PatchMapping("/{userId}/status")
    public ResponseEntity<UserDto.Response> updateUserStatus(
            @PathVariable Long userId,
            @RequestBody AdminUserDto.UpdateStatusRequest request) {
        UserDto.Response response = adminUserService.updateUserStatus(userId, request.getStatus());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "회원 삭제", description = "특정 회원 계정을 삭제합니다.")
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminUserService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}
