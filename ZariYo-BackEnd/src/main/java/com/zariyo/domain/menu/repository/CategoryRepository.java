package com.zariyo.domain.menu.repository;

import com.zariyo.domain.menu.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByStoreIdOrderByDisplayOrderAsc(Long storeId);
}
