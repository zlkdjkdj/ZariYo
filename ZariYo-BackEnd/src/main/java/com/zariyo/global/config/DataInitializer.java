package com.zariyo.global.config;

import com.zariyo.domain.menu.entity.Category;
import com.zariyo.domain.menu.entity.MenuItem;
import com.zariyo.domain.menu.repository.CategoryRepository;
import com.zariyo.domain.menu.repository.MenuItemRepository;
import com.zariyo.domain.store.entity.Store;
import com.zariyo.domain.store.repository.StoreRepository;
import com.zariyo.domain.user.entity.User;
import com.zariyo.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;

    @Override
    @Transactional
    public void run(String... args) {


        log.info("[DataInitializer] Initializing ZariYo default database seeding...");

        // 1. 초기 사용자 데이터 시딩
        if (userRepository.count() == 0) {
            userRepository.save(new User("admin@zariyo.com", "최고 관리자", User.Role.ROLE_ADMIN, User.UserStatus.ACTIVE));
            User owner = userRepository.save(new User("owner@zariyo.com", "김사장 (강남 메인점)", User.Role.ROLE_OWNER, User.UserStatus.ACTIVE));
            userRepository.save(new User("ceo.park@zariyo.com", "박대표 (홍대 아지트)", User.Role.ROLE_OWNER, User.UserStatus.ACTIVE));
            userRepository.save(new User("user1@naver.com", "이민수", User.Role.ROLE_CUSTOMER, User.UserStatus.ACTIVE));
            userRepository.save(new User("user2@kakao.com", "정수진", User.Role.ROLE_CUSTOMER, User.UserStatus.ACTIVE));

            // 2. 대표 매장 데이터 시딩
            if (storeRepository.count() == 0) {
                Store defaultStore = new Store(
                    "ZariYo 프리미엄 라운지 강남점",
                    "서울특별시 강남구 테헤란로 123 2층",
                    "09:00", "23:00",
                    "10:00", "22:00",
                    "15:00", "17:00",
                    "매주 월요일",
                    owner
                );
                Store savedStore = storeRepository.save(defaultStore);

                // 3. 대표 카테고리 시딩
                Category mainCategory = categoryRepository.save(new Category(savedStore, "시그니처 메인", 1));
                Category sideCategory = categoryRepository.save(new Category(savedStore, "사이드 & 안주", 2));
                Category drinkCategory = categoryRepository.save(new Category(savedStore, "음료 & 하이볼", 3));

                // 4. 대표 메뉴 8종 시딩
                menuItemRepository.save(new MenuItem(mainCategory, "한우 등심 트러플 솥밥", 28000, "1++ 한우 등심과 최고급 트러플 오일이 어우러진 솥밥", null, "BEST", true, false));
                menuItemRepository.save(new MenuItem(mainCategory, "제주 흑돼지 수비드 보쌈", 34000, "24시간 저온 수비드로 부드러운 흑돼지 보쌈", null, null, false, false));
                menuItemRepository.save(new MenuItem(mainCategory, "전복 내장 해산물 리조또", 22000, "신선한 완도 전복 내장과 해산물의 조화", null, "NEW", false, false));

                menuItemRepository.save(new MenuItem(sideCategory, "트러플 감자튀김 & 딥소스", 12000, "바삭한 감자튀김에 트러플 파우더 시즈닝", null, null, false, false));
                menuItemRepository.save(new MenuItem(sideCategory, "치즈 폭탄 에그인헬", 16000, "모짜렐라 치즈와 매콤한 토마토 핑거 소스", null, null, false, false));

                menuItemRepository.save(new MenuItem(drinkCategory, "ZariYo 시그니처 얼그레이 하이볼", 8500, "은은한 홍차 향과 청량한 탄산의 프리미엄 하이볼", null, "BEST", true, false));
                menuItemRepository.save(new MenuItem(drinkCategory, "자몽 에이드", 6000, "생 자몽 즙을 그대로 착즙한 프리미엄 에이드", null, null, false, false));
                menuItemRepository.save(new MenuItem(drinkCategory, "콜라 / 사이다", 3000, "시원한 탄산음료", null, null, false, false));
            }
        }
        log.info("[DataInitializer] ZariYo database seeding completed successfully.");
    }
}
