package com.zariyo.domain.user.dto;

import com.zariyo.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class AdminUserDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "회원 권한 변경 요청")
    public static class UpdateRoleRequest {
        @Schema(description = "새 권한 (ROLE_CUSTOMER, ROLE_OWNER, ROLE_ADMIN)", example = "ROLE_OWNER")
        private User.Role role;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "회원 상태 변경 요청")
    public static class UpdateStatusRequest {
        @Schema(description = "새 계정 상태 (ACTIVE, SUSPENDED, INACTIVE)", example = "SUSPENDED")
        private User.UserStatus status;
    }

    @Getter
    @AllArgsConstructor
    @Schema(description = "관리자 회원 통계 정보 응답")
    public static class UserStatsResponse {
        private long totalUsers;
        private long ownerCount;
        private long customerCount;
        private long adminCount;
        private long suspendedCount;
    }
}
