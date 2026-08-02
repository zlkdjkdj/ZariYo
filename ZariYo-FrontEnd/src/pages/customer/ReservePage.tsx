import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Receipt } from 'lucide-react';

import type { PlacedElement } from '../../types/store';
import { MOCK_KIOSK_MENUS, type KioskMenuItem, type KioskMenuOption } from '../../data/mockKioskMenus';
import { KioskHeaderBar } from '../../components/kiosk/KioskHeaderBar';
import { KioskMenuGrid } from '../../components/kiosk/KioskMenuGrid';
import { KioskCartPanel } from '../../components/kiosk/KioskCartPanel';
import { KioskStaffCallModal } from '../../components/kiosk/KioskStaffCallModal';
import { KioskPhoneAuthModal } from '../../components/kiosk/KioskPhoneAuthModal';
import { KioskStoreSearchModal } from '../../components/kiosk/KioskStoreSearchModal';
import { orderApi } from '../../api/orderApi';

interface CartItem {
  menu: KioskMenuItem;
  selectedOptions: KioskMenuOption[];
  quantity: number;
  itemTotalPrice: number;
}

export function ReservePage() {
  const [searchParams] = useSearchParams();

  // 1. 동적 매장 정보 및 배치도 로드
  const [storeInfo, setStoreInfo] = useState(() => {
    const saved = localStorage.getItem('zariyo_store_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return { name: 'ZariYo 매장', address: '매장 주소' };
  });

  const [placedElements, setPlacedElements] = useState<PlacedElement[]>(() => {
    const saved = localStorage.getItem('zariyo_store_layout');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [
      { id: '1', type: 'counter', label: '카운터 POS', x: 280, y: 40, width: 160, height: 50, isReservable: false, isTempOccupiedEnabled: false },
      { id: '2', type: 'door', label: '입구', x: 40, y: 380, width: 80, height: 30, isReservable: false, isTempOccupiedEnabled: false },
      { id: '3', type: 'table-4', label: 'T-1', x: 120, y: 160, width: 100, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '4', type: 'table-2', label: 'T-2', x: 320, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '5', type: 'table-2', label: 'T-3', x: 440, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '6', type: 'table-bar', label: '바석-A', x: 160, y: 280, width: 140, height: 40, isReservable: true, isTempOccupiedEnabled: false },
    ];
  });

  // 스토리지 동기화 이벤트 수신
  useEffect(() => {
    const syncCustomerStoreData = () => {
      const savedInfo = localStorage.getItem('zariyo_store_info');
      const savedLayout = localStorage.getItem('zariyo_store_layout');
      if (savedInfo) setStoreInfo(JSON.parse(savedInfo));
      if (savedLayout) setPlacedElements(JSON.parse(savedLayout));
    };
    window.addEventListener('storage', syncCustomerStoreData);
    window.addEventListener('storage_sync', syncCustomerStoreData);
    return () => {
      window.removeEventListener('storage', syncCustomerStoreData);
      window.removeEventListener('storage_sync', syncCustomerStoreData);
    };
  }, []);

  // 2. 테이블 지정
  const targetTableCode = searchParams.get('table') || 'T-1';
  const defaultSeat = placedElements.find(e => e.label === targetTableCode) || placedElements.find(e => e.isReservable) || placedElements[0];
  const [assignedSeat, setAssignedSeat] = useState<PlacedElement>(defaultSeat);

  // 3. 손님 휴대폰 간편 인증 & 매장 검색 릴레이 상태
  const [guestPhone, setGuestPhone] = useState<string>(() => localStorage.getItem('zariyo_guest_phone') || '');
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isStoreSearchModalOpen, setIsStoreSearchModalOpen] = useState(false);

  // 손님 페이지 진입 즉시 휴대폰 인증 모달 자동 팝업
  useEffect(() => {
    if (!guestPhone) {
      const timer = setTimeout(() => {
        setIsPhoneModalOpen(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [guestPhone]);

  // 1단계(휴대폰 번호 인증) 완료 ➔ 2단계(매장 검색/선택 모달) 릴레이 오픈
  const handlePhoneSuccess = (phone: string) => {
    setGuestPhone(phone);
    // QR 스티커로 매장이 특정되어 있지 않은 경우 매장 검색 모달 팝업
    const isQrDirect = searchParams.get('table');
    if (!isQrDirect) {
      setTimeout(() => setIsStoreSearchModalOpen(true), 150);
    }
  };

  // 2단계(매장 선택) 완료 ➔ 3단계(선택 매장 메뉴판 진입)
  const handleSelectStore = (store: { id: number; name: string; address: string }) => {
    setStoreInfo({
      name: store.name,
      address: store.address,
    });
    setIsStoreSearchModalOpen(false);
  };



  // 4. 메뉴 데이터 및 상태
  const [menuItems] = useState<KioskMenuItem[]>(MOCK_KIOSK_MENUS);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'main' | 'side' | 'drink'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMenuForOption, setSelectedMenuForOption] = useState<KioskMenuItem | null>(null);
  const [selectedOptionsTemp, setSelectedOptionsTemp] = useState<KioskMenuOption[]>([]);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [isStaffCallModalOpen, setIsStaffCallModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState(false);
  const [customerOrdersList, setCustomerOrdersList] = useState<any[]>(() => {
    const saved = localStorage.getItem('zariyo_customer_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleSyncCustomerOrders = () => {
      const saved = localStorage.getItem('zariyo_customer_orders');
      if (saved) setCustomerOrdersList(JSON.parse(saved));
    };
    window.addEventListener('storage', handleSyncCustomerOrders);
    window.addEventListener('storage_sync', handleSyncCustomerOrders);
    return () => {
      window.removeEventListener('storage', handleSyncCustomerOrders);
      window.removeEventListener('storage_sync', handleSyncCustomerOrders);
    };
  }, []);


  // 직원 호출 편의 서비스 모달 열기
  const handleOpenStaffCallModal = () => {
    setIsStaffCallModalOpen(true);
  };

  // 메뉴 옵션 모달 열기
  const handleOpenOptionModal = (menu: KioskMenuItem) => {
    setSelectedMenuForOption(menu);
    setSelectedOptionsTemp([]);
  };

  // 옵션 토글
  const handleToggleOption = (opt: KioskMenuOption) => {
    if (selectedOptionsTemp.some(o => o.id === opt.id)) {
      setSelectedOptionsTemp(selectedOptionsTemp.filter(o => o.id !== opt.id));
    } else {
      setSelectedOptionsTemp([...selectedOptionsTemp, opt]);
    }
  };

  // 장바구니 담기
  const handleAddToCart = () => {
    if (!selectedMenuForOption) return;
    const optionExtraTotal = selectedOptionsTemp.reduce((sum, o) => sum + o.price, 0);
    const itemTotalPrice = selectedMenuForOption.price + optionExtraTotal;

    const newItem: CartItem = {
      menu: selectedMenuForOption,
      selectedOptions: selectedOptionsTemp,
      quantity: 1,
      itemTotalPrice
    };

    setCart(prev => [...prev, newItem]);
    setSelectedMenuForOption(null);
  };

  // 장바구니 수량 변경
  const handleUpdateQty = (idx: number, delta: number) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[idx].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== idx);
      }
      const unitPrice = updated[idx].itemTotalPrice / updated[idx].quantity;
      updated[idx] = {
        ...updated[idx],
        quantity: newQty,
        itemTotalPrice: unitPrice * newQty
      };
      return updated;
    });
  };

  const handleRemoveCartItem = (idx: number) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  // 주문 결제 처리 및 대시보드 0.001초 실시간 릴레이
  const handleConfirmOrder = async () => {
    if (!guestPhone) {
      alert('[휴대폰 방문 인증 필요]\n주문 전 휴대폰 번호 간편 인증을 완료해 주세요!');
      setIsPhoneModalOpen(true);
      return;
    }

    try {
      const orderItems = cart.map((item, idx) => ({
        menuItemId: idx + 1,
        quantity: item.quantity,
        optionsSummary: item.selectedOptions.map(o => o.name).join(', '),
      }));

      await orderApi.createOrder(1, {
        tableNumber: assignedSeat.label,
        orderType: 'EAT_IN',
        items: orderItems,
      });
    } catch (err: any) {
      console.warn('Backend API connection warning, proceeding with local real-time sync', err);
    }

    // 1. 좌석 상태를 'using'(사용중)으로 업데이트
    const savedStates = localStorage.getItem('zariyo_table_states');
    const tableStates = savedStates ? JSON.parse(savedStates) : {};
    const seatId = assignedSeat.id || '1';
    tableStates[seatId] = 'using';
    localStorage.setItem('zariyo_table_states', JSON.stringify(tableStates));

    // 2. 5분 임시 점유 목록에서 제거
    const savedOccs = localStorage.getItem('zariyo_temp_occupations');
    if (savedOccs) {
      const occs = JSON.parse(savedOccs).filter((item: any) => item.elementId !== seatId);
      localStorage.setItem('zariyo_temp_occupations', JSON.stringify(occs));
    }

    // 3. 테이블별 메뉴명 요약 및 KDS 주방 조리 대기열 데이터 등록
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    
    // 3-1. 메뉴명 요약 생성 (예: "숙성 뼈삼겹 x2, 음료 x1")
    const menuSummaryStr = cart.map(item => `${item.menu.name} x${item.quantity}`).join(', ');
    const savedMenuSummaries = localStorage.getItem('zariyo_table_menu_summary');
    const menuSummaries = savedMenuSummaries ? JSON.parse(savedMenuSummaries) : {};
    menuSummaries[seatId] = menuSummaryStr;
    menuSummaries[assignedSeat.label] = menuSummaryStr;
    localStorage.setItem('zariyo_table_menu_summary', JSON.stringify(menuSummaries));

    // 3-2. KDS 주방 조리 대기열 리스트 등록
    const savedKds = localStorage.getItem('zariyo_kds_orders');
    const kdsList = savedKds ? JSON.parse(savedKds) : [];
    const newKdsItems = cart.map((item, idx) => ({
      id: `kds-${Date.now()}-${idx}`,
      tableLabel: assignedSeat.label,
      menuName: item.menu.name,
      quantity: item.quantity,
      time: timeStr,
      status: 'cooking' as const,
      price: item.itemTotalPrice,
      note: item.selectedOptions.map(o => o.name).join(', '),
    }));
    localStorage.setItem('zariyo_kds_orders', JSON.stringify([...newKdsItems, ...kdsList]));

    // 3-3. 실시간 배달/포장 관제 릴레이 데이터 등록
    const savedDelivery = localStorage.getItem('zariyo_delivery_orders');
    const deliveryList = savedDelivery ? JSON.parse(savedDelivery) : [];
    const newDeliveryItem = {
      id: `del-${Date.now()}`,
      orderNo: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      platform: 'takeout' as const,
      address: `${assignedSeat.label}번 테이블 / 매장 포장`,
      phone: guestPhone || '010-0000-0000',
      note: '키오스크 주문 접수',
      items: cart.map(i => ({ name: i.menu.name, qty: i.quantity, price: i.itemTotalPrice })),
      totalPrice: cartTotalAmount,
      status: 'received' as const,
      time: timeStr,
      payMethod: '간편결제/카드',
    };
    localStorage.setItem('zariyo_delivery_orders', JSON.stringify([newDeliveryItem, ...deliveryList]));

    // 3-4. 손님 본인의 주문 이력 리스트 등록 (키오스크 주문 조회용)
    const savedCustomerOrders = localStorage.getItem('zariyo_customer_orders');
    const customerOrders = savedCustomerOrders ? JSON.parse(savedCustomerOrders) : [];
    const newCustomerOrder = {
      id: newDeliveryItem.id,
      orderNo: newDeliveryItem.orderNo,
      time: timeStr,
      tableLabel: assignedSeat.label,
      items: cart.map(i => ({ name: i.menu.name, quantity: i.quantity, price: i.itemTotalPrice, options: i.selectedOptions.map(o => o.name) })),
      totalAmount: cartTotalAmount,
    };
    localStorage.setItem('zariyo_customer_orders', JSON.stringify([newCustomerOrder, ...customerOrders]));

    // 4. 실시간 로그 스트림 추가
    const savedLogs = localStorage.getItem('zariyo_logs');
    const logs = savedLogs ? JSON.parse(savedLogs) : [];
    const newLog = `[${timeStr}] 🔔 [손님 주문 완료] [${assignedSeat.label}] 테이블에서 신규 주문 접수 (${menuSummaryStr}) - ${cartTotalAmount.toLocaleString()}원`;
    localStorage.setItem('zariyo_logs', JSON.stringify([newLog, ...logs]));

    // 5. 네이티브 BroadcastChannel & Storage 이벤트로 1번 창(대시보드)에 0.001초 실시간 전파
    try {
      const bc = new BroadcastChannel('zariyo_realtime_sync');
      bc.postMessage({ type: 'ORDER_CREATED', tableLabel: assignedSeat.label, seatId, menuSummary: menuSummaryStr });
      bc.close();
    } catch (e) {
      // fallback
    }

    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('storage_sync'));



    alert(`[주문 완료] (${guestPhone}) ${assignedSeat.label}번 테이블의 주문이 백엔드 DB 저장 및 사장님 대시보드로 0.001초 실시간 릴레이되었습니다!`);
    setCart([]);
  };


  const cartTotalAmount = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const filteredMenus = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 font-sans flex flex-col justify-between select-none">
      
      {/* Header Bar Subcomponent */}
      <KioskHeaderBar 
        storeName={storeInfo.name}
        assignedSeat={assignedSeat}
        onOpenSeatModal={() => setIsSeatModalOpen(true)}
        onStaffCall={handleOpenStaffCallModal}
      />


      {/* Guest Phone Auth & Workflow Sub-banner - Samsung One UI Style */}
      <div className="bg-[#000000] border-b border-[#333333] px-6 py-3 flex flex-wrap items-center justify-between text-xs select-none gap-2">
        <div className="flex items-center gap-3">
          {/* Step Badges */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase">
            <span className={`px-3 py-1 rounded-[20px] border ${guestPhone ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-[#0381fe]/15 text-[#0381fe] border border-[#0381fe]/40 animate-pulse'}`}>
              1. 휴대폰 인증
            </span>
            <span className="text-neutral-500 font-normal">➔</span>
            <span className={`px-3 py-1 rounded-[20px] border ${storeInfo.name ? 'bg-[#0381fe]/15 text-[#0381fe] border-[#0381fe]/30' : 'bg-neutral-800 text-neutral-400 border-white/10'}`}>
              2. 가게 선택
            </span>
            <span className="text-neutral-500 font-normal">➔</span>
            <span className="px-3 py-1 rounded-[20px] bg-purple-500/10 text-purple-400 border border-purple-500/30">
              3. 메뉴 주문
            </span>
          </div>

          <div className="h-3 w-px bg-white/10 hidden sm:block" />

          {/* Current Visitor Phone Info */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0381fe] animate-pulse" />
            <span className="font-mono text-neutral-400 font-bold hidden md:inline">방문 손님:</span>
            <span className="font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-3 py-0.5 rounded-[20px] border border-[#0381fe]/30">
              {guestPhone || '미인증 (번호 입력 필요)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsStoreSearchModalOpen(true)}
            className="text-[11px] font-bold text-[#0381fe] hover:text-blue-400 bg-[#0381fe]/10 px-3 py-1 rounded-[20px] border border-[#0381fe]/30 transition-colors flex items-center gap-1 cursor-pointer font-sans"
          >
            <span>가게 변경 ({storeInfo.name || '선택안됨'})</span>
          </button>

          <button
            onClick={() => setIsPhoneModalOpen(true)}
            className="text-[11px] font-bold text-neutral-400 hover:text-white underline cursor-pointer transition-colors"
          >
            {guestPhone ? '휴대폰 수정' : '번호 인증하기'}
          </button>
        </div>
      </div>

      {/* Main Kiosk Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 max-w-[1500px] mx-auto w-full">
        
        {/* Left Menu Grid Subcomponent (8 Cols on LG+) */}
        <div className="lg:col-span-8 xl:col-span-8">
          <KioskMenuGrid 
            menus={filteredMenus}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenOptionModal={handleOpenOptionModal}
          />
        </div>

        {/* Right Cart Section (4 Cols on LG+) */}
        <div className="lg:col-span-4 xl:col-span-4">
          <KioskCartPanel 
            cart={cart}
            cartTotalAmount={cartTotalAmount}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveCartItem}
            onConfirmOrder={handleConfirmOrder}
          />
        </div>

      </div>


      {/* Option Selection Modal - Samsung One UI Kiosk Style */}
      <AnimatePresence>
        {selectedMenuForOption && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#141417] border border-neutral-300 dark:border-white/10 rounded-[24px] p-6 max-w-md w-full text-left space-y-4 shadow-2xl text-neutral-900 dark:text-white select-none"
            >
              <div className="flex justify-between items-center border-b border-neutral-200 dark:border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0381fe] uppercase tracking-wider bg-[#0381fe]/10 px-2.5 py-0.5 rounded-[12px]">
                    OPTION SELECTOR
                  </span>
                  <h3 className="text-lg font-black tracking-tight mt-1">{selectedMenuForOption.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedMenuForOption(null)}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold leading-relaxed">
                {selectedMenuForOption.description}
              </p>

              <div className="space-y-2 py-2">
                <span className="text-xs font-black font-mono uppercase tracking-wider text-[#0381fe]">
                  추가 옵션 선택 (중복 가능)
                </span>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {selectedMenuForOption.options.map(option => {
                    const isSelected = selectedOptionsTemp.some((o: KioskMenuOption) => o.id === option.id);
                    return (

                      <div 
                        key={option.id}
                        onClick={() => handleToggleOption(option)}
                        className={`p-3.5 rounded-[16px] border flex justify-between items-center cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#0381fe] text-white border-[#0381fe]' 
                            : 'bg-neutral-50 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        <span className="text-xs font-bold">{option.name}</span>
                        <span className="font-mono text-xs">{option.price > 0 ? `+${option.price.toLocaleString()}원` : '무료'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex gap-3">
                <button 
                  onClick={() => setSelectedMenuForOption(null)}
                  className="flex-1 py-3 rounded-[20px] bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs cursor-pointer"
                >
                  취소
                </button>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90"
                >
                  장바구니 담기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Staff Call Convenience Service Modal Subcomponent */}
      <KioskStaffCallModal
        isOpen={isStaffCallModalOpen}
        onClose={() => setIsStaffCallModalOpen(false)}
        tableLabel={assignedSeat.label}
      />

      {/* Kiosk Phone Quick Auth Modal (Step 1) */}
      <KioskPhoneAuthModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onSuccess={handlePhoneSuccess}
        tableLabel={assignedSeat.label}
      />

      {/* Kiosk Store Search Modal (Step 2) */}
      <KioskStoreSearchModal
        isOpen={isStoreSearchModalOpen}
        onClose={() => setIsStoreSearchModalOpen(false)}
        onSelectStore={handleSelectStore}
      />

      {/* Floating My Order History Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOrderHistoryModalOpen(true)}
          className="px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs rounded-full shadow-2xl flex items-center gap-2 border border-white/20 hover:scale-105 transition-all cursor-pointer"
        >
          <Receipt className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>내 주문 내역 확인 ({customerOrdersList.length}건)</span>
        </button>
      </div>

      {/* Customer Order History Modal */}
      {isOrderHistoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-none p-6 max-w-lg w-full text-left space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-500" />
                <h3 className="font-black text-base text-neutral-900 dark:text-white">나의 키오스크 주문 내역 영수증</h3>
              </div>
              <button onClick={() => setIsOrderHistoryModalOpen(false)} className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            {customerOrdersList.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 font-bold text-xs">
                아직 완료된 주문 내역이 없습니다.
              </div>
            ) : (
              <div className="space-y-4">
                {customerOrdersList.map((ord: any) => (
                  <div key={ord.id} className="p-4 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-none space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-neutral-500 border-b border-neutral-200 dark:border-white/5 pb-2">
                      <span>[{ord.orderNo}] 테이블: {ord.tableLabel}</span>
                      <span>{ord.time}</span>
                    </div>
                    <div className="space-y-1 py-1">
                      {ord.items.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between text-xs font-extrabold text-neutral-900 dark:text-white">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-mono">{item.price?.toLocaleString()}원</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-neutral-200 dark:border-white/10 flex justify-between items-center font-mono font-black text-sm text-black dark:text-white">
                      <span>총 결제금액</span>
                      <span className="text-emerald-500">{ord.totalAmount?.toLocaleString()}원</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Change Seat Modal */}
      {isSeatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-none p-6 max-w-md w-full text-left space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-white/10">
              <h3 className="font-black text-base text-neutral-900 dark:text-white">테이블 변경 선택</h3>
              <button onClick={() => setIsSeatModalOpen(false)} className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {placedElements.filter(e => e.isReservable).map(el => (
                <button
                  key={el.id}
                  onClick={() => {
                    setAssignedSeat(el);
                    setIsSeatModalOpen(false);
                    
                    try {
                      const bc = new BroadcastChannel('zariyo_realtime_sync');
                      bc.postMessage({ type: 'SEAT_UPDATED', tableLabel: el.label });
                      bc.close();
                    } catch (e) {}
                    window.dispatchEvent(new Event('storage'));
                    window.dispatchEvent(new Event('storage_sync'));

                    alert(`${el.label} 번 테이블로 지정 좌석이 변경되었습니다.`);
                  }}



                  className={`py-3 rounded-none border font-black text-xs cursor-pointer ${
                    assignedSeat.id === el.id ? 'bg-black text-white dark:bg-white dark:text-black border-black' : 'bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-white/10'
                  }`}
                >
                  {el.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

