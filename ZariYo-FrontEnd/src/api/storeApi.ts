import { apiClient } from './client';
import type { StoreInfo, PlacedElement } from '../types/store';

export interface StoreCreateRequest extends Partial<StoreInfo> {
  ownerId: number;
  elements: PlacedElement[];
}

export interface SeatStatusResponse {
  elementId: string;
  label: string;
  type: string;
  status: 'available' | 'held' | 'reserved';
  activeUserId: number | null;
  timeLeft: number;
}

export const storeApi = {
  // 매장 정보 및 2D 배치도 일괄 저장
  saveStore: async (data: StoreCreateRequest) => {
    const res = await apiClient.post('/api/v1/stores', data);
    return res.data;
  },

  // 사장님의 소유 매장 목록 조회
  getStoresByOwner: async (ownerId: number) => {
    const res = await apiClient.get(`/api/v1/stores/owner/${ownerId}`);
    return res.data;
  },

  // 매장의 실시간 좌석 상태 목록 조회
  getSeatStatuses: async (storeId: number): Promise<SeatStatusResponse[]> => {
    const res = await apiClient.get<SeatStatusResponse[]>(`/api/v1/seats?storeId=${storeId}`);
    return res.data;
  },

  // 5분 좌석 임시 선점 요청
  reserveTemporary: async (seatId: string, userId: number) => {
    const res = await apiClient.post('/api/v1/seats/reserve', { seatId, userId });
    return res.data;
  },

  // 최종 예약 확정
  confirmReservation: async (seatId: string, userId: number, peopleCount: number) => {
    const res = await apiClient.post('/api/v1/seats/confirm', { seatId, userId, peopleCount });
    return res.data;
  },

  // 좌석 반납
  returnSeat: async (seatId: string) => {
    const res = await apiClient.post('/api/v1/seats/return', { seatId });
    return res.data;
  },
};
