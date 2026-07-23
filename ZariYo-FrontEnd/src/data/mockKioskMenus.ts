export interface KioskMenuOption {
  id: string;
  name: string;
  price: number;
}

export interface KioskMenuItem {
  id: string;
  name: string;
  category: 'main' | 'side' | 'drink';
  price: number;
  image: string;
  badge?: string;
  description: string;
  options: KioskMenuOption[];
  isSoldOut?: boolean;
}

export const MOCK_KIOSK_MENUS: KioskMenuItem[] = [
  {
    id: 'km-1',
    name: '토마호크 립아이 스테이크',
    category: 'main',
    price: 48000,
    image: '/images/menu/steak.png',
    badge: '대표 추천',
    description: '참나무 장작으로 구워낸 부드러운 프리미엄 토마호크 스테이크 (500g)',
    options: [
      { id: 'opt-1', name: '미디엄 웰던 굽기', price: 0 },
      { id: 'opt-2', name: '미디엄 레어 굽기', price: 0 },
      { id: 'opt-3', name: '트러플 버터 추가 (+50g)', price: 3500 },
      { id: 'opt-4', name: '가니쉬 구운 야채 추가', price: 4000 },
    ]
  },
  {
    id: 'km-2',
    name: '생 트러플 크림 파스타',
    category: 'main',
    price: 18000,
    image: '/images/menu/pasta.png',
    badge: 'BEST',
    description: '이탈리아산 생 트러플 풍미가 그윽한 농축 크림 페투치네 파스타',
    options: [
      { id: 'opt-5', name: '곱빼기 (면 추가)', price: 3000 },
      { id: 'opt-6', name: '엑스트라 트러플 오일 추가', price: 2000 },
      { id: 'opt-7', name: '매콤한 맛으로 변경', price: 0 },
    ]
  },
  {
    id: 'km-3',
    name: '화덕 참나무 마르게리타 피자',
    category: 'main',
    price: 18000,
    image: '/images/menu/pizza.png',
    badge: '화덕 피자',
    description: '이탈리아산 생 모짜렐라 치즈와 생 바질 향이 일품인 참나무 화덕 피자',
    options: [
      { id: 'opt-8', name: '치즈 크러스트 추가', price: 3000 },
      { id: 'opt-9', name: '페퍼로니 토핑 추가', price: 2500 },
    ]
  },
  {
    id: 'km-4',
    name: '한우 라구 오븐 라자냐',
    category: 'main',
    price: 22000,
    image: '/images/menu/pasta.png',
    badge: 'CHEF PICK',
    description: '1++등급 한우를 6시간 이상 끓여낸 정통 오븐 볼로네제 라자냐',
    options: [
      { id: 'opt-10', name: '모짜렐라 치즈 추가 듬뿍', price: 3000 }
    ]
  },
  {
    id: 'km-5',
    name: '스페인식 해산물 먹물 빠에야',
    category: 'main',
    price: 26000,
    image: '/images/menu/steak.png',
    description: '통오징어와 왕새우, 해산물 육수로 깊은 맛을 낸 정통 먹물 빠에야',
    options: [
      { id: 'opt-11', name: '왕새우 2미 추가', price: 5000 }
    ]
  },
  {
    id: 'km-6',
    name: '감바스 알 아히요 & 올리브 바게트',
    category: 'side',
    price: 16000,
    image: '/images/menu/pasta.png',
    badge: 'SIDE POPULAR',
    description: '엑스트라 버진 올리브 오일에 통마늘과 통새우를 끓여낸 핑거 푸드',
    options: [
      { id: 'opt-12', name: '바게트 빵 4조각 추가', price: 2500 }
    ]
  },
  {
    id: 'km-7',
    name: '트러플 시즈닝 프렌치 프라이',
    category: 'side',
    price: 9000,
    image: '/images/menu/pizza.png',
    description: '생 트러플 소금과 파마산 치즈 가루를 아낌없이 올린 바삭 감자튀김',
    options: [
      { id: 'opt-13', name: '수제 딥핑 갈릭 소스', price: 1000 }
    ]
  },
  {
    id: 'km-8',
    name: '생 리코타 치즈 청포도 샐러드',
    category: 'side',
    price: 12000,
    image: '/images/menu/salad.png',
    badge: 'FRESH',
    description: '매일 아침 수제로 내린 고소한 리코타 치즈와 상큼한 발사믹 샐러드',
    options: []
  },
  {
    id: 'km-9',
    name: '시그니처 자몽 모히또 에이드',
    category: 'drink',
    price: 7000,
    image: '/images/menu/ade.png',
    badge: '인기 음료',
    description: '생 자몽 과육과 민트 잎이 탄산수와 어우러진 수제 청량 에이드',
    options: [
      { id: 'opt-14', name: '탄산수 엑스트라 추가', price: 500 },
      { id: 'opt-15', name: '제로 사이다 변경', price: 0 }
    ]
  },
  {
    id: 'km-10',
    name: '스페인 수제 샹그리아 와인 (Glass)',
    category: 'drink',
    price: 8500,
    image: '/images/menu/ade.png',
    description: '레드 와인에 와일드 베리와 과일을 시나몬과 함께 숙성한 클래식 샹그리아',
    options: []
  },
  {
    id: 'km-11',
    name: '이탈리안 클래식 수제 티라미수',
    category: 'drink',
    price: 8000,
    image: '/images/menu/pasta.png',
    badge: 'DESSERT',
    description: '에스프레소를 촉촉히 적신 레이디핑거와 마스카포네 치즈 디저트',
    options: []
  }
];
