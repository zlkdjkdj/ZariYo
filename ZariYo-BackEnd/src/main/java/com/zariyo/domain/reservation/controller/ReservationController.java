package com.zariyo.domain.reservation.controller;

import com.zariyo.domain.reservation.dto.ReservationDto;
import com.zariyo.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/stores/{storeId}/reservations")
    public ResponseEntity<ReservationDto.Response> createReservation(
            @PathVariable Long storeId,
            @RequestBody ReservationDto.CreateRequest request) {
        ReservationDto.Response response = reservationService.createReservation(storeId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stores/{storeId}/reservations")
    public ResponseEntity<List<ReservationDto.Response>> getReservations(@PathVariable Long storeId) {
        List<ReservationDto.Response> responses = reservationService.getReservations(storeId);
        return ResponseEntity.ok(responses);
    }

    @PatchMapping("/reservations/{reservationId}/status")
    public ResponseEntity<ReservationDto.Response> updateStatus(
            @PathVariable Long reservationId,
            @RequestParam String status) {
        ReservationDto.Response response = reservationService.updateStatus(reservationId, status);
        return ResponseEntity.ok(response);
    }
}
