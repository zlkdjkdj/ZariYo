package com.zariyo.domain.menu.controller;

import com.zariyo.domain.menu.dto.MenuDto;
import com.zariyo.domain.menu.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Menu API", description = "메뉴 카테고리, 메뉴 항목 및 옵션 관리 API")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @Operation(summary = "메뉴 카테고리 등록", description = "특정 매장의 메뉴 카테고리를 신규 등록합니다.")
    @PostMapping("/stores/{storeId}/categories")
    public ResponseEntity<MenuDto.CategoryResponse> createCategory(
            @Parameter(description = "매장 ID", example = "1") @PathVariable("storeId") Long storeId,
            @RequestBody MenuDto.CategoryCreateRequest request) {
        MenuDto.CategoryResponse response = menuService.createCategory(storeId, request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "매장 카테고리 목록 조회", description = "특정 매장에 등록된 모든 카테고리를 순서대로 조회합니다.")
    @GetMapping("/stores/{storeId}/categories")
    public ResponseEntity<List<MenuDto.CategoryResponse>> getCategories(
            @Parameter(description = "매장 ID", example = "1") @PathVariable("storeId") Long storeId) {
        List<MenuDto.CategoryResponse> responses = menuService.getCategoriesByStore(storeId);
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "메뉴 항목 등록", description = "카테고리 하위에 메뉴 항목 및 옵션을 신규 등록합니다.")
    @PostMapping("/menus")
    public ResponseEntity<MenuDto.ItemResponse> createMenuItem(@RequestBody MenuDto.ItemCreateRequest request) {
        MenuDto.ItemResponse response = menuService.createMenuItem(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "매장 전체 메뉴 목록 조회", description = "특정 매장에 등록된 전체 메뉴 목록을 조회합니다.")
    @GetMapping("/stores/{storeId}/menus")
    public ResponseEntity<List<MenuDto.ItemResponse>> getMenuItemsByStore(
            @Parameter(description = "매장 ID", example = "1") @PathVariable("storeId") Long storeId) {
        List<MenuDto.ItemResponse> responses = menuService.getMenuItemsByStore(storeId);
        return ResponseEntity.ok(responses);
    }

    @Operation(summary = "메뉴 품절 상태 변경", description = "특정 메뉴의 품절(Sold Out) 여부를 변경합니다.")
    @PatchMapping("/menus/{menuId}/sold-out")
    public ResponseEntity<MenuDto.ItemResponse> updateSoldOutStatus(
            @Parameter(description = "메뉴 ID", example = "101") @PathVariable("menuId") Long menuId,
            @RequestParam("isSoldOut") boolean isSoldOut) {
        MenuDto.ItemResponse response = menuService.updateSoldOutStatus(menuId, isSoldOut);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "메뉴 삭제", description = "특정 메뉴 항목을 삭제합니다.")
    @DeleteMapping("/menus/{menuId}")
    public ResponseEntity<Void> deleteMenuItem(
            @Parameter(description = "메뉴 ID", example = "101") @PathVariable("menuId") Long menuId) {
        menuService.deleteMenuItem(menuId);
        return ResponseEntity.noContent().build();
    }
}
