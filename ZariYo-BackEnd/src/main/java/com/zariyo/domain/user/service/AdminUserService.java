package com.zariyo.domain.user.service;

import com.zariyo.domain.user.dto.AdminUserDto;
import com.zariyo.domain.user.dto.UserDto;
import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class AdminUserService {

    private final UserRepository userRepository;

    /**
     * 회원 목록 검색 및 필터링 조회
     */
    public List<UserDto.Response> getAllUsers(String query, String role, String status) {
        return userRepository.findAll().stream()
                .filter(u -> {
                    if (query != null && !query.isBlank()) {
                        String q = query.toLowerCase();
                        boolean matchEmail = u.getEmail() != null && u.getEmail().toLowerCase().contains(q);
                        boolean matchName = u.getName() != null && u.getName().toLowerCase().contains(q);
                        if (!matchEmail && !matchName) return false;
                    }
                    if (role != null && !role.isBlank() && !"ALL".equalsIgnoreCase(role)) {
                        if (u.getRole() == null || !u.getRole().name().equalsIgnoreCase(role)) return false;
                    }
                    if (status != null && !status.isBlank() && !"ALL".equalsIgnoreCase(status)) {
                        if (u.getStatus() == null || !u.getStatus().name().equalsIgnoreCase(status)) return false;
                    }
                    return true;
                })
                .map(UserDto.Response::from)
                .collect(Collectors.toList());
    }

    /**
     * 관리자 요약 통계 조회
     */
    public AdminUserDto.UserStatsResponse getUserStats() {
        List<User> users = userRepository.findAll();
        long total = users.size();
        long owners = users.stream().filter(u -> u.getRole() == User.Role.ROLE_OWNER).count();
        long customers = users.stream().filter(u -> u.getRole() == User.Role.ROLE_CUSTOMER).count();
        long admins = users.stream().filter(u -> u.getRole() == User.Role.ROLE_ADMIN).count();
        long suspended = users.stream().filter(u -> u.getStatus() == User.UserStatus.SUSPENDED).count();

        return new AdminUserDto.UserStatsResponse(total, owners, customers, admins, suspended);
    }

    /**
     * 회원 역할 변경
     */
    @Transactional
    public UserDto.Response updateUserRole(Long userId, User.Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다. ID: " + userId));
        user.updateRole(newRole);
        return UserDto.Response.from(user);
    }

    /**
     * 회원 상태 변경 (정지/활성화)
     */
    @Transactional
    public UserDto.Response updateUserStatus(Long userId, User.UserStatus newStatus) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다. ID: " + userId));
        user.updateStatus(newStatus);
        return UserDto.Response.from(user);
    }

    /**
     * 회원 삭제
     */
    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다. ID: " + userId);
        }
        userRepository.deleteById(userId);
    }
}
