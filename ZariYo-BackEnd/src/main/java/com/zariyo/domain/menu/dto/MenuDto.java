package com.zariyo.domain.menu.dto;

import com.zariyo.domain.menu.entity.Category;
import com.zariyo.domain.menu.entity.MenuItem;
import com.zariyo.domain.menu.entity.MenuOption;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

public class MenuDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "카테고리 생성 요청 DTO")
    public static class CategoryCreateRequest {
        @Schema(description = "카테고리명", example = "메인 요리")
        private String name;

        @Schema(description = "표시 순서", example = "1")
        private int displayOrder;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "카테고리 응답 DTO")
    public static class CategoryResponse {
        @Schema(description = "카테고리 ID", example = "1")
        private Long id;

        @Schema(description = "카테고리명", example = "메인 요리")
        private String name;

        @Schema(description = "표시 순서", example = "1")
        private int displayOrder;

        public static CategoryResponse from(Category category) {
            return CategoryResponse.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .displayOrder(category.getDisplayOrder())
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "메뉴 옵션 요청 DTO")
    public static class OptionRequest {
        @Schema(description = "옵션명", example = "치즈 추가")
        private String name;

        @Schema(description = "추가 가격", example = "1500")
        private int price;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "메뉴 옵션 응답 DTO")
    public static class OptionResponse {
        @Schema(description = "옵션 ID", example = "10")
        private Long id;

        @Schema(description = "옵션명", example = "치즈 추가")
        private String name;

        @Schema(description = "추가 가격", example = "1500")
        private int price;

        public static OptionResponse from(MenuOption option) {
            return OptionResponse.builder()
                    .id(option.getId())
                    .name(option.getName())
                    .price(option.getPrice())
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "메뉴 아이템 생성/수정 요청 DTO")
    public static class ItemCreateRequest {
        @Schema(description = "카테고리 ID", example = "1")
        private Long categoryId;

        @Schema(description = "메뉴명", example = "시그니처 토마호크 스테이크")
        private String name;

        @Schema(description = "가격", example = "48000")
        private int price;

        @Schema(description = "메뉴 설명", example = "참나무 숯불에서 최상의 온도감으로 구워낸 프리미엄 스테이크")
        private String description;

        @Schema(description = "이미지 URL", example = "/images/menu/steak.png")
        private String imageUrl;

        @Schema(description = "배지 (BEST, NEW 등)", example = "BEST")
        private String badge;

        @Schema(description = "인기 여부", example = "true")
        private boolean isPopular;

        @Schema(description = "품절 여부", example = "false")
        private boolean isSoldOut;

        @Schema(description = "커스텀 옵션 목록")
        private List<OptionRequest> options;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "메뉴 아이템 응답 DTO")
    public static class ItemResponse {
        @Schema(description = "메뉴 ID", example = "101")
        private Long id;

        @Schema(description = "카테고리 ID", example = "1")
        private Long categoryId;

        @Schema(description = "카테고리명", example = "메인 요리")
        private String name;

        @Schema(description = "가격", example = "48000")
        private int price;

        @Schema(description = "메뉴 설명", example = "참나무 숯불에서 최상의 온도감으로 구워낸 프리미엄 스테이크")
        private String description;

        @Schema(description = "이미지 URL", example = "/images/menu/steak.png")
        private String imageUrl;

        @Schema(description = "배지", example = "BEST")
        private String badge;

        @Schema(description = "인기 여부", example = "true")
        private boolean isPopular;

        @Schema(description = "품절 여부", example = "false")
        private boolean isSoldOut;

        @Schema(description = "옵션 목록")
        private List<OptionResponse> options;

        public static ItemResponse from(MenuItem item) {
            List<OptionResponse> optionResponses = item.getOptions().stream()
                    .map(OptionResponse::from)
                    .collect(Collectors.toList());

            return ItemResponse.builder()
                    .id(item.getId())
                    .categoryId(item.getCategory().getId())
                    .name(item.getName())
                    .price(item.getPrice())
                    .description(item.getDescription())
                    .imageUrl(item.getImageUrl())
                    .badge(item.getBadge())
                    .isPopular(item.isPopular())
                    .isSoldOut(item.isSoldOut())
                    .options(optionResponses)
                    .build();
        }
    }
}
