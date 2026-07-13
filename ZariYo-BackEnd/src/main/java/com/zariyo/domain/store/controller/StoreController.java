package com.zariyo.domain.store.controller;

import com.zariyo.domain.store.dto.StoreDto;
import com.zariyo.domain.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * 매장 설정 및 2D 캔버스 배치도 레이아웃을 처리하는 웹 컨트롤러입니다.
 */
@Tag(name = "Store API", description = "매장 설정 및 2D 캔버스 배치도 레이아웃 API")
@RestController
@RequestMapping("/api/v1/stores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StoreController {

    private final StoreService storeService;

    /**
     * 매장 정보 및 배치도 레이아웃 일괄 저장 API
     * - POST http://localhost:8080/api/v1/stores
     */
    @Operation(summary = "매장 및 좌석 배치도 저장", description = "새로운 매장을 등록하고, 드래그앤드롭으로 배치한 2D 좌석 레이아웃을 일괄 저장합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "매장 및 배치도 저장 성공"),
        @ApiResponse(responseCode = "400", description = "유효하지 않은 요청 데이터 (필수 필드 누락 등)")
    })
    @PostMapping
    public ResponseEntity<StoreDto.Response> saveStoreWithLayout(@RequestBody StoreDto.SaveRequest request) {
        StoreDto.Response response = storeService.saveStoreWithLayout(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 특정 사장님이 소유한 매장 목록 조회 API
     * - GET http://localhost:8080/api/v1/stores/owner/{ownerId}
     */
    @Operation(summary = "사장님 소유 매장 목록 조회", description = "특정 사장님(ownerId)이 등록한 매장 목록을 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "소유 매장 목록 조회 성공")
    })
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<StoreDto.Response>> getStoresByOwner(@PathVariable("ownerId") Long ownerId) {
        List<StoreDto.Response> response = storeService.getStoresByOwner(ownerId);
        return ResponseEntity.ok(response);
    }

    /**
     * 특정 매장의 2D 배치도 레이아웃 좌석 목록 조회 API
     * - GET http://localhost:8080/api/v1/stores/{storeId}/layout
     */
    @Operation(summary = "매장 2D 배치도 레이아웃 조회", description = "특정 매장(storeId)의 좌석 및 가구 정렬 배치도 데이터를 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "배치도 레이아웃 조회 성공"),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 매장 ID")
    })
    @GetMapping("/{storeId}/layout")
    public ResponseEntity<List<StoreDto.PlacedElementDto>> getStoreLayout(@PathVariable("storeId") Long storeId) {
        List<StoreDto.PlacedElementDto> layout = storeService.getStoreLayout(storeId);
        return ResponseEntity.ok(layout);
    }
}
