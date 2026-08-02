package com.zariyo.domain.menu.service;

import com.zariyo.domain.menu.dto.MenuDto;
import com.zariyo.domain.menu.entity.Category;
import com.zariyo.domain.menu.entity.MenuItem;
import com.zariyo.domain.menu.entity.MenuOption;
import com.zariyo.domain.menu.repository.CategoryRepository;
import com.zariyo.domain.menu.repository.MenuItemRepository;
import com.zariyo.domain.store.entity.Store;
import com.zariyo.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@SuppressWarnings("null")
public class MenuService {

    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;

    @Transactional
    public MenuDto.CategoryResponse createCategory(Long storeId, MenuDto.CategoryCreateRequest request) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 매장입니다. ID: " + storeId));

        Category category = new Category(store, request.getName(), request.getDisplayOrder());
        Category savedCategory = categoryRepository.save(category);
        return MenuDto.CategoryResponse.from(savedCategory);
    }

    public List<MenuDto.CategoryResponse> getCategoriesByStore(Long storeId) {
        return categoryRepository.findByStoreIdOrderByDisplayOrderAsc(storeId).stream()
                .map(MenuDto.CategoryResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public MenuDto.ItemResponse createMenuItem(MenuDto.ItemCreateRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다. ID: " + request.getCategoryId()));

        MenuItem menuItem = new MenuItem(
                category,
                request.getName(),
                request.getPrice(),
                request.getDescription(),
                request.getImageUrl(),
                request.getBadge(),
                request.isPopular(),
                request.isSoldOut()
        );

        if (request.getOptions() != null && !request.getOptions().isEmpty()) {
            for (MenuDto.OptionRequest optReq : request.getOptions()) {
                MenuOption option = new MenuOption(menuItem, optReq.getName(), optReq.getPrice());
                menuItem.addOption(option);
            }
        }

        MenuItem savedItem = menuItemRepository.save(menuItem);
        return MenuDto.ItemResponse.from(savedItem);
    }

    public List<MenuDto.ItemResponse> getMenuItemsByStore(Long storeId) {
        return menuItemRepository.findByCategoryStoreId(storeId).stream()
                .map(MenuDto.ItemResponse::from)
                .collect(Collectors.toList());
    }

    public List<MenuDto.ItemResponse> getMenuItemsByCategory(Long categoryId) {
        return menuItemRepository.findByCategoryId(categoryId).stream()
                .map(MenuDto.ItemResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public MenuDto.ItemResponse updateSoldOutStatus(Long menuItemId, boolean isSoldOut) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 메뉴입니다. ID: " + menuItemId));

        menuItem.toggleSoldOut(isSoldOut);
        return MenuDto.ItemResponse.from(menuItem);
    }

    /**
     * 사장님 원터치 품절 상태 토글 스위치 (true <-> false)
     */
    @Transactional
    public MenuDto.ItemResponse toggleSoldOutAuto(Long menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 메뉴입니다. ID: " + menuItemId));

        menuItem.toggleSoldOut(!menuItem.isSoldOut());
        return MenuDto.ItemResponse.from(menuItem);
    }

    @Transactional
    public void deleteMenuItem(Long menuItemId) {

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 메뉴입니다. ID: " + menuItemId));
        menuItemRepository.delete(menuItem);
    }
}
