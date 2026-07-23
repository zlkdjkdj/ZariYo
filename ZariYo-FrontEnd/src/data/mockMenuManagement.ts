import type { MenuManagementItem } from '../components/owner/menu/MenuCardItem';

export const INITIAL_MENU_ITEMS: MenuManagementItem[] = [
  { 
    id: 'm1', 
    name: '토마호크 스테이크', 
    category: '메인 요리', 
    price: 48000, 
    image: '/images/menu/steak.png', 
    isSoldOut: false, 
    description: '참나무 장작으로 구워낸 고소하고 부드러운 고급 토마호크 스테이크',
    options: [
      { name: '굽기 선택 (미디엄/웰던)', extraPrice: 0 },
      { name: '고기 사이즈 업그레이드 (+100g)', extraPrice: 12000 }
    ]
  },
  { 
    id: 'm2', 
    name: '트러플 크림 파스타', 
    category: '메인 요리', 
    price: 18000, 
    image: '/images/menu/pasta.png', 
    isSoldOut: false, 
    description: '생 트러플 풍미가 그윽한 페투치네 농축 파스타',
    options: [
      { name: '곱빼기 (면 추가)', extraPrice: 3000 },
      { name: '트러플 오일 추가', extraPrice: 2000 }
    ]
  },
  { 
    id: 'm3', 
    name: '화덕 마르게리타 피자', 
    category: '메인 요리', 
    price: 18000, 
    image: '/images/menu/pizza.png', 
    isSoldOut: true, 
    description: '이탈리아산 생 모짜렐라와 바질 향이 일품인 참나무 화덕 피자',
    options: [
      { name: '치즈 크러스트 변경', extraPrice: 2500 }
    ]
  },
  { 
    id: 'm4', 
    name: '시그니처 수제 에이드', 
    category: '음료/주류', 
    price: 7000, 
    image: '/images/menu/ade.png', 
    isSoldOut: false, 
    description: '자몽과 청포도 과육이 과즙째 씹히는 수제 모히또 에이드',
    options: [
      { name: '탄산수 추가', extraPrice: 500 }
    ]
  },
];
