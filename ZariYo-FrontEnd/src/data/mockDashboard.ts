import type { DeliveryOrderItem } from '../components/owner/dashboard/DashboardDeliveryPane';
import type { KdsOrderItem } from '../components/owner/dashboard/DashboardKdsPane';
import type { PlacedElement } from '../types/store';

export interface BillItem {
  name: string;
  qty: number;
  price: number;
}

export const INITIAL_STORE_INFO = {
  name: 'ZariYo 프리미엄 라운지 & 다이닝',
  address: '서울특별시 강남구 테헤란로 123'
};

export const INITIAL_TABLE_BILLS: Record<string, { items: BillItem[]; paymentMethod: string }> = {
  '3': {
    paymentMethod: '신용카드 (현대카드 / 일시불)',
    items: [
      { name: '토마호크 스테이크', qty: 1, price: 48000 },
      { name: '트러플 크림 파스타', qty: 1, price: 18000 },
      { name: '시그니처 수제 에이드', qty: 2, price: 14000 },
    ]
  },
  '4': {
    paymentMethod: '카카오페이 (간편결제)',
    items: [{ name: '화덕 마르게리타 피자', qty: 2, price: 36000 }]
  }
};

export const INITIAL_DELIVERY_ORDERS: DeliveryOrderItem[] = [
  {
    id: 'del-1',
    orderNo: 'B-8492',
    platform: 'baemin',
    address: '서울특별시 강남구 테헤란로 123 402호',
    phone: '010-9876-5432',
    note: '문 앞에 두고 벨 눌러주세요. 수저 안 주셔도 돼요!',
    items: [
      { name: '특상 로스카츠 정식', qty: 2, price: 28000 },
      { name: '시그니처 수제 에이드', qty: 2, price: 14000 }
    ],
    totalPrice: 42000,
    status: 'cooking',
    time: '18:42',
    payMethod: '배민페이 선결제'
  },
  {
    id: 'del-2',
    orderNo: 'C-1092',
    platform: 'coupang',
    address: '서울특별시 강남구 역삼로 45길 12 101호',
    phone: '010-1234-5678',
    note: '도착 시 전화 주세요. 소스 많이 부탁드립니다.',
    items: [
      { name: '안심 카츠 정식', qty: 1, price: 14000 },
      { name: '제로 콜라', qty: 1, price: 2500 }
    ],
    totalPrice: 16500,
    status: 'rider-called',
    time: '18:48',
    payMethod: '쿠팡페이 선결제'
  },
  {
    id: 'del-3',
    orderNo: 'P-0041',
    platform: 'takeout',
    address: '[현장 방문 포장]',
    phone: '010-5555-8888',
    note: '15분 후 도착 예정. 가급적 바로 찾아가겠습니다.',
    items: [{ name: '화덕 마르게리타 피자', qty: 1, price: 18000 }],
    totalPrice: 18000,
    status: 'received',
    time: '18:52',
    payMethod: '현장 카드 결제'
  }
];

export const INITIAL_KDS_ORDERS: KdsOrderItem[] = [
  { id: 'k1', tableLabel: 'T-1', menuName: '토마호크 스테이크', quantity: 1, time: '12:35', status: 'cooking', note: '미디엄 웰던으로 요청', price: 48000 },
  { id: 'k2', tableLabel: 'T-1', menuName: '트러플 크림 파스타', quantity: 1, time: '12:35', status: 'cooking', price: 18000 },
  { id: 'k3', tableLabel: 'T-2', menuName: '화덕 마르게리타 피자', quantity: 2, time: '12:40', status: 'cooking', price: 36000 },
  { id: 'k4', tableLabel: 'T-3', menuName: '시그니처 수제 에이드', quantity: 3, time: '12:42', status: 'completed', price: 21000 },
];

export const INITIAL_PLACED_ELEMENTS: PlacedElement[] = [
  { id: '1', type: 'counter', label: '카운터 POS', x: 280, y: 40, width: 160, height: 50, isReservable: false, isTempOccupiedEnabled: false },
  { id: '2', type: 'door', label: '입구', x: 40, y: 380, width: 80, height: 30, isReservable: false, isTempOccupiedEnabled: false },
  { id: '3', type: 'table-4', label: 'T-1', x: 120, y: 160, width: 100, height: 60, isReservable: true, isTempOccupiedEnabled: true },
  { id: '4', type: 'table-2', label: 'T-2', x: 320, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
  { id: '5', type: 'table-2', label: 'T-3', x: 440, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
  { id: '6', type: 'table-bar', label: '바석-A', x: 160, y: 280, width: 140, height: 40, isReservable: true, isTempOccupiedEnabled: false },
];
