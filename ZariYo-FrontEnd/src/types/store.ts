export interface StoreInfo {
  name: string;
  address: string;
  weekdayStart: string;
  weekdayEnd: string;
  weekendStart: string;
  weekendEnd: string;
  breakStart: string;
  breakEnd: string;
  holiday: string;
}

export interface PlacedElement {
  id: string;
  type: 'table-2' | 'table-4' | 'table-bar' | 'socket' | 'door' | 'toilet' | 'counter';
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isReservable: boolean;
  isTempOccupiedEnabled: boolean;
}

export interface TempOccupiedItem {
  id: string;
  label: string;
  elementId: string;
  timeLeft: number; // 초 단위
}

export interface ReservationItem {
  id: string;
  guestName: string;
  peopleCount: number;
  time: string;
  elementId: string;
  label: string;
  status: 'pending' | 'completed' | 'noshow';
}
