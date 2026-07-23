import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, UtensilsCrossed, Plus, Minus, ShoppingBag, 
  Check, X, MapPin, ChevronRight, BellRing, Droplet, Utensils, Shield, Sparkles 
} from 'lucide-react';
import type { PlacedElement, TempOccupiedItem } from '../../types/store';


interface MenuOption {
  id: string;
  name: string;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  category: 'main' | 'side' | 'drink';
  price: number;
  image: string;
  badge?: string;
  description: string;
  options: MenuOption[];
}

interface CartItem {
  menu: MenuItem;
  selectedOptions: MenuOption[];
  quantity: number;
  itemTotalPrice: number;
}

export function ReservePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 1. 매장 정보
  const [storeInfo] = useState(() => {
    const saved = localStorage.getItem('zariyo_store_info');
    return saved ? JSON.parse(saved) : { name: 'ZariYo 프리미엄 다이닝 & 라운지', address: '서울특별시 강남구 테헤란로 123' };
  });

  const [placedElements] = useState<PlacedElement[]>(() => {
    const saved = localStorage.getItem('zariyo_store_layout');
    return saved ? JSON.parse(saved) : [
      { id: '1', type: 'counter', label: '카운터 POS', x: 280, y: 40, width: 160, height: 50, isReservable: false, isTempOccupiedEnabled: false },
      { id: '2', type: 'door', label: '입구', x: 40, y: 380, width: 80, height: 30, isReservable: false, isTempOccupiedEnabled: false },
      { id: '3', type: 'table-4', label: 'T-1', x: 120, y: 160, width: 100, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '4', type: 'table-2', label: 'T-2', x: 320, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '5', type: 'table-2', label: 'T-3', x: 440, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '6', type: 'table-bar', label: '바석-A', x: 160, y: 280, width: 140, height: 40, isReservable: true, isTempOccupiedEnabled: false },
    ];
  });

  // 2. 테이블 지정
  const targetTableCode = searchParams.get('table') || 'T-1';
  const defaultSeat = placedElements.find(e => e.label === targetTableCode) || placedElements[2];
  const [assignedSeat, setAssignedSeat] = useState<PlacedElement>(defaultSeat);

  const [tableStates, setTableStates] = useState<Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>>(() => {
    const saved = localStorage.getItem('zariyo_table_states');
    return saved ? JSON.parse(saved) : {
      '3': 'temp-occupied',
      '4': 'using',
      '5': 'empty',
      '6': 'reserved',
    };
  });

  const [tempOccupations, setTempOccupations] = useState<TempOccupiedItem[]>(() => {
    const saved = localStorage.getItem('zariyo_temp_occupations');
    return saved ? JSON.parse(saved) : [
      { id: 'temp-1', label: assignedSeat.label, elementId: assignedSeat.id, timeLeft: 300 },
    ];
  });

  const [myHeldIds, setMyHeldIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zariyo_my_held_ids');
    return saved ? JSON.parse(saved) : [assignedSeat.id];
  });

  // 모달 팝업 상태들
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isServiceCallModalOpen, setIsServiceCallModalOpen] = useState(false);

  // 3. 다채로운 음료 포함 메뉴 8종 대폭 확충
  const menuList: MenuItem[] = [
    { 
      id: 'm1', 
      name: '토마호크 스테이크', 
      category: 'main', 
      price: 48000, 
      image: '/images/menu/steak.png', 
      badge: 'CHEF 시그니처', 
      description: '참나무 장작으로 구워낸 고소하고 부드러운 최고급 토마호크 스테이크',
      options: [
        { id: 'o1-1', name: '고기 100g 사이즈업', price: 12000 },
        { id: 'o1-2', name: '수제 가니쉬 버섯 추가', price: 3000 },
        { id: 'o1-3', name: '트러플 버터 토핑', price: 2500 }
      ]
    },
    { 
      id: 'm2', 
      name: '트러플 크림 파스타', 
      category: 'main', 
      price: 18000, 
      image: '/images/menu/pasta.png', 
      badge: 'BEST 인기', 
      description: '생 트러플 풍미가 그윽한 페투치네 농축 특선 파스타',
      options: [
        { id: 'o2-1', name: '곱빼기 (면 양 추가)', price: 3000 },
        { id: 'o2-2', name: '트러플 오일 샷 추가', price: 2000 },
        { id: 'o2-3', name: '매운맛으로 변경', price: 0 },
      ]
    },
    { 
      id: 'm3', 
      name: '살치살 찹스테이크', 
      category: 'main', 
      price: 32000, 
      image: '/images/menu/chopsteak.png', 
      badge: 'NEW 신메뉴', 
      description: '육즙이 살아있는 부드러운 살치살과 구운 야채의 환상 조합',
      options: [
        { id: 'o3-1', name: '공기밥 추가', price: 1500 },
        { id: 'o3-2', name: '치즈 토핑 듬뿍', price: 2000 }
      ]
    },
    { 
      id: 'm4', 
      name: '감바스 알 아히요', 
      category: 'side', 
      price: 19000, 
      image: '/images/menu/gambas.png', 
      badge: 'POPULAR', 
      description: '올리브 오일과 마늘 향이 풍부한 최고급 바게트 올리브 새우 요리',
      options: [
        { id: 'o4-1', name: '바게트 빵 4조각 추가', price: 3000 },
        { id: 'o4-2', name: '파스타 면 추가', price: 4000 }
      ]
    },
    { 
      id: 'm5', 
      name: '시그니처 수제 자몽 에이드', 
      category: 'drink', 
      price: 7000, 
      image: '/images/menu/drink.png', 
      badge: '대표 음료', 
      description: '자몽과 샬롯 과육이 살아있는 시원한 탄산 수제 에이드',
      options: [
        { id: 'o5-1', name: '탄산수 샷 리필', price: 1000 },
        { id: 'o5-2', name: '얼음 많이 선택', price: 0 }
      ]
    },
    { 
      id: 'm6', 
      name: '프리미엄 하우스 레드와인 (글라스)', 
      category: 'drink', 
      price: 9000, 
      image: '/images/menu/drink.png', 
      badge: '와인', 
      description: '스테이크와 최고의 마리아주를 자랑하는 프랑스산 보르도 레드와인',
      options: [
        { id: 'o6-1', name: '디캔팅 서비스 요청', price: 0 }
      ]
    },
    { 
      id: 'm7', 
      name: '크래프트 수제 생맥주 (500ml)', 
      category: 'drink', 
      price: 6000, 
      image: '/images/menu/drink.png', 
      badge: '시원함', 
      description: '깊은 풍미의 홉 향이 톡 쏘는 청량하고 시원한 수제 라거 생맥주',
      options: [
        { id: 'o7-1', name: '차가운 얼음잔 잔 교체', price: 0 }
      ]
    },
    { 
      id: 'm8', 
      name: '스파클링 제로 콜라 (355ml)', 
      category: 'drink', 
      price: 3000, 
      image: '/images/menu/drink.png', 
      description: '칼로리 부담 없는 시원하고 탄산이 살아있는 제로 콜라',
      options: [
        { id: 'o8-1', name: '레몬 슬라이스 컵 추가', price: 500 }
      ]
    },
  ];

  const [activeCategory, setActiveCategory] = useState<'all' | 'main' | 'side' | 'drink'>('all');

  // 옵션 선택 모달 상태
  const [activeMenuForOption, setActiveMenuForOption] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<MenuOption[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 동기화
  const syncToLocalStorage = (
    newStates: Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>,
    newOccs: TempOccupiedItem[],
    newMyHeld?: string[]
  ) => {
    localStorage.setItem('zariyo_table_states', JSON.stringify(newStates));
    localStorage.setItem('zariyo_temp_occupations', JSON.stringify(newOccs));
    if (newMyHeld) localStorage.setItem('zariyo_my_held_ids', JSON.stringify(newMyHeld));
    window.dispatchEvent(new Event('storage_sync'));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTempOccupations((prev) => {
        let isChanged = false;
        const updated = prev.map((item) => {
          const nextTime = item.timeLeft - 1;
          if (nextTime <= 0) isChanged = true;
          return { ...item, timeLeft: Math.max(0, nextTime) };
        });

        const activeOnly = updated.filter((item) => item.timeLeft > 0);
        const expiredItems = updated.filter((item) => item.timeLeft <= 0);

        if (isChanged && expiredItems.length > 0) {
          setTableStates((prevStates) => {
            const nextStates = { ...prevStates };
            expiredItems.forEach((exp) => {
              nextStates[exp.elementId] = 'empty';
            });
            localStorage.setItem('zariyo_table_states', JSON.stringify(nextStates));
            return nextStates;
          });

          setMyHeldIds((prevHeld) => {
            const nextHeld = prevHeld.filter(
              (id) => !expiredItems.some((exp) => exp.elementId === id)
            );
            localStorage.setItem('zariyo_my_held_ids', JSON.stringify(nextHeld));
            return nextHeld;
          });

          localStorage.setItem('zariyo_temp_occupations', JSON.stringify(activeOnly));
          window.dispatchEvent(new Event('storage_sync'));
        }

        return activeOnly;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 서비스 스마트 팝업 모달 호출 처리
  const handleServiceCallRequest = (requestType: string) => {
    setIsServiceCallModalOpen(false);
    alert(`[${assignedSeat.label}] 테이블에서 [${requestType}] 요청이 완료되었습니다. 카운터 관제 POS 및 주방으로 수신 전달되었습니다.`);
  };

  // 테이블 수동 변경
  const handleChangeTable = (seat: PlacedElement) => {
    setAssignedSeat(seat);
    setIsTableModalOpen(false);
    alert(`이용 자리가 [${seat.label}] (으)로 변경되었습니다.`);
  };

  const handleOpenOptionModal = (menu: MenuItem) => {
    setActiveMenuForOption(menu);
    setSelectedOptions([]);
  };

  const toggleOption = (option: MenuOption) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((o) => o.id === option.id);
      if (exists) return prev.filter((o) => o.id !== option.id);
      return [...prev, option];
    });
  };

  const handleAddToCartWithOptions = () => {
    if (!activeMenuForOption) return;

    const basePrice = activeMenuForOption.price;
    const optionExtraTotal = selectedOptions.reduce((sum, o) => sum + o.price, 0);
    const itemUnitPrice = basePrice + optionExtraTotal;

    const newItem: CartItem = {
      menu: activeMenuForOption,
      selectedOptions: [...selectedOptions],
      quantity: 1,
      itemTotalPrice: itemUnitPrice,
    };

    setCartItems((prev) => [...prev, newItem]);
    setActiveMenuForOption(null);
    setSelectedOptions([]);
  };

  const updateCartQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const nextQty = updated[index].quantity + delta;
      if (nextQty <= 0) {
        return updated.filter((_, idx) => idx !== index);
      }
      updated[index].quantity = nextQty;
      const unit = updated[index].menu.price + updated[index].selectedOptions.reduce((s, o) => s + o.price, 0);
      updated[index].itemTotalPrice = unit * nextQty;
      return updated;
    });
  };

  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.itemTotalPrice, 0);

  const handleHoldAndOrder = () => {
    if (cartItems.length === 0) {
      alert('장바구니에 담긴 메뉴가 없습니다. 드시고 싶은 요리를 먼저 선택해 주세요!');
      return;
    }

    const elementId = assignedSeat.id;
    const newStates = { ...tableStates, [elementId]: 'temp-occupied' as const };
    const newOccs = [
      ...tempOccupations.filter((o) => o.elementId !== elementId),
      { id: `temp-${Date.now()}`, label: assignedSeat.label, elementId, timeLeft: 300 }
    ];
    const newMyHeld = Array.from(new Set([...myHeldIds, elementId]));

    setTableStates(newStates);
    setTempOccupations(newOccs);
    setMyHeldIds(newMyHeld);
    syncToLocalStorage(newStates, newOccs, newMyHeld);

    alert(`[${assignedSeat.label}] 테이블로 ₩${totalCartPrice.toLocaleString()} 주문 및 5분 타임아웃 선점 락이 활성화되었습니다! 주방 KDS와 관제판으로 전달됩니다.`);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#030303] text-neutral-900 dark:text-[#f5f5f7] font-sans min-h-screen flex flex-col justify-between select-none overflow-x-hidden relative transition-colors duration-300">
      
      {/* 1. TOP TABLET KIOSK HEADER */}
      <header className="w-full bg-white dark:bg-[#09090b] border-b border-neutral-200 dark:border-white/5 px-6 py-4 flex items-center justify-between shadow-lg relative z-20">
        
        {/* Left Branding & Table Switcher Badge */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3182f6] to-[#4894fe] flex items-center justify-center shadow-md">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-black text-neutral-900 dark:text-white">{storeInfo.name}</h1>
              
              <button
                onClick={() => setIsTableModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#3182f6] to-[#4894fe] text-white text-xs font-black shadow-md cursor-pointer hover:scale-[1.03] transition-all"
                title="테이블 변경하기"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>[{assignedSeat.label}] 테이블 (자동 지정 - 변경)</span>
              </button>
            </div>
            <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 font-semibold mt-0.5">
              테이블이 지정되었습니다. 자리를 바꾸려면 뱃지를 탭하세요.
            </p>
          </div>
        </div>

        {/* Center One-Touch Service Request Modal Button (헤더 복잡함 제거 -> 단일 팝업 버튼) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsServiceCallModalOpen(true)}
            className="px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-black cursor-pointer transition-all flex items-center gap-2 shadow-sm animate-pulse"
          >
            <BellRing className="w-4 h-4" />
            <span>직원 / 편의 서비스 요청</span>
          </button>

          <div className="bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-orange-500 font-mono text-xs font-black">
            <Clock className="w-4 h-4 animate-spin" />
            <span>선점 락: 05:00</span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 transition-colors"
          >
            메인으로
          </button>
        </div>
      </header>

      {/* 2. MENU-FIRST FULL TABLET MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left 8 cols: Large Interactive Digital Menu Cards Gallery (Expanded Drinks & Foods) */}
        <div className="lg:col-span-8 space-y-6 text-left">
          
          {/* Top Category Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-3xl p-6 shadow-xl">
            <div>
              <span className="text-[10px] font-black text-[#3182f6] uppercase font-mono bg-[#3182f6]/10 px-2.5 py-1 rounded-full border border-[#3182f6]/20">
                SMART TABLET DINING GALLERY
              </span>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-2">쉐프 특선 요리 & 인기 음료 라인업</h2>
            </div>

            {/* Dynamic Category Tabs */}
            <div className="flex gap-1.5 bg-neutral-100 dark:bg-white/5 p-1.5 rounded-full border border-neutral-200 dark:border-white/10 text-xs font-black">
              <button 
                onClick={() => setActiveCategory('all')} 
                className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${activeCategory === 'all' ? 'bg-[#3182f6] text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                전체 메뉴
              </button>
              <button 
                onClick={() => setActiveCategory('main')} 
                className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${activeCategory === 'main' ? 'bg-[#3182f6] text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                메인 요리
              </button>
              <button 
                onClick={() => setActiveCategory('side')} 
                className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${activeCategory === 'side' ? 'bg-[#3182f6] text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                사이드
              </button>
              <button 
                onClick={() => setActiveCategory('drink')} 
                className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${activeCategory === 'drink' ? 'bg-[#3182f6] text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                음료 / 주류 (5종)
              </button>
            </div>
          </div>

          {/* Dynamic Menu Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {menuList
                .filter(m => activeCategory === 'all' || m.category === activeCategory)
                .map((menu) => (
                  <motion.div
                    key={menu.id}
                    layout
                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleOpenOptionModal(menu)}
                    className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 hover:border-[#3182f6]/50 rounded-3xl p-5 shadow-xl hover:shadow-[0_15px_30px_rgba(49,130,246,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image */}
                      <div className="h-44 w-full rounded-2xl overflow-hidden relative mb-4">
                        <img 
                          src={menu.image} 
                          alt={menu.name} 
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" 
                        />
                        {menu.badge && (
                          <span className="absolute top-3 left-3 text-[9.5px] font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 rounded-full shadow-lg font-mono">
                            {menu.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-black text-neutral-900 dark:text-white group-hover:text-[#3182f6] transition-colors flex items-center justify-between">
                        <span>{menu.name}</span>
                        <span className="text-sm font-black text-[#3182f6]">₩ {menu.price.toLocaleString()}</span>
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-1.5 leading-relaxed line-clamp-2">
                        {menu.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 font-bold">옵션 선택 가능 ({menu.options.length}개)</span>
                      <div className="px-3.5 py-1.5 rounded-full bg-[#3182f6]/10 text-[#3182f6] group-hover:bg-[#3182f6] group-hover:text-white text-xs font-extrabold transition-all flex items-center gap-1">
                        <span>선택 및 담기</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Right 4 cols: Side-by-Side Floating Receipt Panel */}
        <div className="lg:col-span-4 space-y-6 text-left select-none sticky top-24">
          
          <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-3xl p-6 shadow-2xl">
            
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-200 dark:border-white/5">
              <span className="text-xs font-black text-[#3182f6] uppercase font-mono flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" /> 테이블 주문 수선서
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                [{assignedSeat.label}] 연결됨
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-[280px] overflow-y-auto scrollbar-hide mb-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-neutral-400 py-8 text-xs font-bold">
                  원하시는 메뉴를 터치하여 장바구니에 담아보세요.
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <h5 className="font-black text-neutral-900 dark:text-white">{item.menu.name}</h5>
                      {item.selectedOptions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.selectedOptions.map((opt, oIdx) => (
                            <span key={oIdx} className="text-[9px] text-[#3182f6] bg-[#3182f6]/10 px-1.5 py-0.5 rounded font-bold">
                              +{opt.name} ({opt.price > 0 ? `+₩${opt.price}` : '무료'})
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-[10.5px] text-[#3182f6] font-mono mt-1 block font-bold">
                        ₩ {item.itemTotalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-neutral-200/60 dark:bg-white/5 rounded-full p-1 border border-neutral-300/30 dark:border-white/10">
                      <button onClick={() => updateCartQuantity(idx, -1)} className="p-1 hover:bg-neutral-300 dark:hover:bg-white/10 rounded-full cursor-pointer">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(idx, 1)} className="p-1 hover:bg-neutral-300 dark:hover:bg-white/10 rounded-full cursor-pointer">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center my-4 pt-3 border-t border-neutral-200 dark:border-white/5">
              <span className="text-xs font-bold text-neutral-500">총 결제 예정 금액</span>
              <span className="text-xl font-black text-[#3182f6]">₩ {totalCartPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={handleHoldAndOrder}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#3182f6] to-[#4894fe] hover:opacity-95 text-white text-xs font-extrabold cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>5분 선점 및 옵션 주문 실시간 발송</span>
            </button>
          </div>

        </div>

      </main>

      {/* 3. OPTION SELECTOR MODAL */}
      <AnimatePresence>
        {activeMenuForOption && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setActiveMenuForOption(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 text-neutral-600 dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-4 items-center mb-6">
                <img src={activeMenuForOption.image} alt={activeMenuForOption.name} className="w-20 h-20 rounded-2xl object-cover border border-neutral-200 dark:border-white/10 shrink-0" />
                <div>
                  <span className="text-[10px] font-black text-[#3182f6] bg-[#3182f6]/10 px-2.5 py-0.5 rounded-full font-mono uppercase">
                    OPTION SELECTOR
                  </span>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white mt-1">{activeMenuForOption.name}</h3>
                  <span className="text-sm font-black text-[#3182f6]">₩ {activeMenuForOption.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 border-y border-neutral-200 dark:border-white/5 py-4">
                <span className="text-xs font-black text-neutral-500 dark:text-neutral-400 block mb-2">원하시는 곱빼기/토핑 옵션을 체크해 주세요:</span>
                
                {activeMenuForOption.options.map((opt) => {
                  const isChecked = selectedOptions.some((o) => o.id === opt.id);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => toggleOption(opt)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-[#3182f6]/15 border-[#3182f6] text-neutral-900 dark:text-white shadow-md' 
                          : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/5 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                          isChecked ? 'bg-[#3182f6] border-[#3182f6] text-white' : 'border-neutral-300 dark:border-white/20'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs font-extrabold">{opt.name}</span>
                      </div>

                      <span className="text-xs font-black text-[#3182f6]">
                        {opt.price > 0 ? `+ ₩ ${opt.price.toLocaleString()}` : '무료'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-neutral-500">옵션 포함 1개 총액:</span>
                <span className="text-lg font-black text-neutral-900 dark:text-white">
                  ₩ {(activeMenuForOption.price + selectedOptions.reduce((s, o) => s + o.price, 0)).toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleAddToCartWithOptions}
                className="w-full py-3.5 rounded-full bg-[#3182f6] hover:bg-[#286fd7] text-white text-xs font-extrabold cursor-pointer shadow-lg transition-all"
              >
                옵션 포함 장바구니 담기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. SMART SERVICE REQUEST POPUP MODAL (스마트 서비스 요청 모달 팝업) */}
      <AnimatePresence>
        {isServiceCallModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setIsServiceCallModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 text-neutral-600 dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
                  <BellRing className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white">
                    원터치 편의 서비스 요청
                  </h3>
                  <span className="text-[10.5px] text-neutral-400 font-mono font-bold">
                    테이블 [{assignedSeat.label}] 편의 서비스
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold mb-6">
                필요하신 항목을 선택하시면 카운터 관제 POS 및 주방으로 즉시 신호가 전달됩니다.
              </p>

              {/* Service Grid Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => handleServiceCallRequest('시원한 물 요청 🧊')}
                  className="p-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-[1.03]"
                >
                  <Droplet className="w-6 h-6" />
                  <span className="text-xs font-black">물 요청</span>
                </button>

                <button
                  onClick={() => handleServiceCallRequest('수저 & 휴지 요청 🥢')}
                  className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-[1.03]"
                >
                  <Utensils className="w-6 h-6" />
                  <span className="text-xs font-black">수저 / 휴지</span>
                </button>

                <button
                  onClick={() => handleServiceCallRequest('일회용 앞치마 요청 🎽')}
                  className="p-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-[1.03]"
                >
                  <Shield className="w-6 h-6" />
                  <span className="text-xs font-black">앞치마 요청</span>
                </button>

                <button
                  onClick={() => handleServiceCallRequest('물티슈 추가 요청 🧻')}
                  className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-[1.03]"
                >
                  <Sparkles className="w-6 h-6" />
                  <span className="text-xs font-black">물티슈 요청</span>
                </button>

                <button
                  onClick={() => handleServiceCallRequest('직원 직접 방문 요청 🔔')}
                  className="p-4 col-span-2 sm:col-span-2 rounded-2xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-500 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.03]"
                >
                  <BellRing className="w-6 h-6 animate-pulse" />
                  <span className="text-xs font-black">직원 직접 호출</span>
                </button>
              </div>

              <button
                onClick={() => setIsServiceCallModalOpen(false)}
                className="w-full py-3 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 text-neutral-700 dark:text-white text-xs font-bold cursor-pointer transition-all"
              >
                취소 / 닫기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. TABLE SWITCHER MODAL */}
      <AnimatePresence>
        {isTableModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setIsTableModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 text-neutral-600 dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#3182f6]" /> 테이블 수동 변경 선택
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold mb-6">
                현재 앉으신 테이블 자리를 터치해 선택하세요.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {placedElements.filter(e => e.isReservable).map((seat) => {
                  const isCurrent = assignedSeat.id === seat.id;
                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleChangeTable(seat)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                        isCurrent 
                          ? 'bg-[#3182f6] border-[#3182f6] text-white font-black shadow-lg scale-[1.02]' 
                          : 'bg-neutral-50 dark:bg-white/5 border-neutral-200 dark:border-white/10 hover:border-[#3182f6] text-neutral-700 dark:text-neutral-300 font-bold'
                      }`}
                    >
                      <span className="text-base font-black">{seat.label}</span>
                      <span className="text-[10px] opacity-80 mt-1">
                        {isCurrent ? '현재 지정중' : '선택 변경'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setIsTableModalOpen(false)}
                className="w-full py-3 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 text-neutral-700 dark:text-white text-xs font-bold cursor-pointer transition-all"
              >
                닫기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="w-full bg-white dark:bg-[#09090b] border-t border-neutral-200 dark:border-white/5 py-3 px-6 text-center select-none z-20">
        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono font-bold">
          © 2026 ZariYo Smart Tablet Kiosk & Service Modal Engine. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
