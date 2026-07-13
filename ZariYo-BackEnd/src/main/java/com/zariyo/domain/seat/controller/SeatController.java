package com.zariyo.domain.seat.controller;

import com.zariyo.domain.seat.dto.SeatReservationDto;
import com.zariyo.domain.seat.service.SeatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * 실시간 좌석 예약(임시 선점), 예약 최종 확정, 그리고 이용 반납을 처리하는 웹 컨트롤러입니다.
 */
@Tag(name = "Seat API", description = "실시간 좌석 예약(임시 선점), 예약 최종 확정, 이용 반납 API")
@RestController
@RequestMapping("/api/v1/seats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SeatController {

    private final SeatService seatService;

    /**
     * 1. 매장의 실시간 좌석 상태 목록 조회 API
     * - GET http://localhost:8080/api/v1/seats?storeId=1
     */
    @Operation(summary = "실시간 좌석 상태 목록 조회", description = "특정 매장(storeId)의 실시간 좌석들의 점유, 선점, 공석 상태 목록을 가져옵니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "실시간 좌석 상태 목록 조회 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 매장 ID 파라미터")
    })
    @GetMapping
    public ResponseEntity<List<SeatReservationDto.SeatStatusResponse>> getSeatStatuses(@RequestParam("storeId") Long storeId) {
        List<SeatReservationDto.SeatStatusResponse> statuses = seatService.getSeatStatuses(storeId);
        return ResponseEntity.ok(statuses);
    }

    /**
     * 2. 좌석 5분 임시 선점 신청 API
     * - POST http://localhost:8080/api/v1/seats/reserve
     */
    @Operation(summary = "좌석 5분 임시 선점 신청", description = "선택한 좌석을 다른 사용자가 점유할 수 없게 5분(300초) 동안 임시 선점(Redis Lock) 상태로 등록합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "임시 선점 결과 반환 (성공/실패 여부는 body 내 success 필드 참고)"),
        @ApiResponse(responseCode = "400", description = "유효하지 않은 파라미터 (좌석 ID 또는 회원 ID 누락)"),
        @ApiResponse(responseCode = "409", description = "이미 다른 요청에 의해 해당 좌석이 선점/점유된 경우")
    })
    @PostMapping("/reserve")
    public ResponseEntity<SeatReservationDto.ReserveResponse> reserveSeatTemporary(@RequestBody SeatReservationDto.ReserveRequest request) {
        SeatReservationDto.ReserveResponse response = seatService.reserveSeatTemporary(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 3. 예약 최종 확정 API
     * - POST http://localhost:8080/api/v1/seats/confirm
     */
    @Operation(summary = "예약 최종 확정", description = "임시 선점한 좌석에 대해 인원 및 세부 예약 정보를 확인하고 최종적으로 DB에 예약을 확정 등록합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "최종 확정 처리 결과 반환 (성공/실패 여부는 body 내 success 필드 참고)"),
        @ApiResponse(responseCode = "400", description = "선점 만료 또는 잘못된 선점 정보에 의한 확정 실패")
    })
    @PostMapping("/confirm")
    public ResponseEntity<SeatReservationDto.ConfirmResponse> confirmReservation(@RequestBody SeatReservationDto.ConfirmRequest request) {
        SeatReservationDto.ConfirmResponse response = seatService.confirmReservation(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 4. 좌석 반납 API
     * - POST http://localhost:8080/api/v1/seats/return
     */
    @Operation(summary = "좌석 반납 (이용 완료)", description = "손님이 좌석 이용을 마쳤거나 노쇼 등의 사유로 수동 취소하여 좌석을 공석 상태로 반납합니다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "반납 및 공석 처리 결과 반환")
    })
    @PostMapping("/return")
    public ResponseEntity<SeatReservationDto.ReturnResponse> returnSeat(@RequestBody SeatReservationDto.ReturnRequest request) {
        SeatReservationDto.ReturnResponse response = seatService.returnSeat(request);
        return ResponseEntity.ok(response);
    }
}
