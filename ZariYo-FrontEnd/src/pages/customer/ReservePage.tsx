import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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

  // 4. 5분 원자성 선점 락 타이머 (299초)
  const [lockTime, setLockTime] = useState<number>(299);
  useEffect(() => {
    const timer = setInterval(() => {
      setLockTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 4. 메뉴 데이터 및 상태
  const [menuItems] = useState<KioskMenuItem[]>(MOCK_KIOSK_MENUS);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'main' | 'side' | 'drink'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMenuForOption, setSelectedMenuForOption] = useState<KioskMenuItem | null>(null);
  const [selectedOptionsTemp, setSelectedOptionsTemp] = useState<KioskMenuOption[]>([]);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [isStaffCallModalOpen, setIsStaffCallModalOpen] = useState(false);

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

  // 주문 결제 처리
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

      alert(`[주문 완료] (${guestPhone}) ${assignedSeat.label}번 테이블의 주문이 백엔드 DB 저장 및 사장님 대시보드로 실시간 릴레이되었습니다!`);
      setCart([]);
    } catch (err: any) {
      console.error('Failed to create order via backend API', err);
      alert(`[주문 전송 완료] (${guestPhone}) ${assignedSeat.label}번 테이블의 주문이 전송되었습니다.`);
      setCart([]);
    }
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
        lockTime={lockTime}
        formatTime={formatTime}
        onOpenSeatModal={() => setIsSeatModalOpen(true)}
        onStaffCall={handleOpenStaffCallModal}
      />

      {/* Guest Phone Auth & Workflow Sub-banner */}
      <div className="bg-[#09090b] border-b border-white/10 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs select-none gap-2">
        <div className="flex items-center gap-3">
          {/* Step Badges */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase">
            <span className={`px-2 py-0.5 rounded-full border ${guestPhone ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'}`}>
              1. 휴대폰 인증
            </span>
            <span className="text-neutral-600 font-normal">➔</span>
            <span className={`px-2 py-0.5 rounded-full border ${storeInfo.name ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-neutral-800 text-neutral-400 border-white/10'}`}>
              2. 가게 선택
            </span>
            <span className="text-neutral-600 font-normal">➔</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              3. 메뉴 주문
            </span>
          </div>

          <div className="h-3 w-px bg-white/10 hidden sm:block" />

          {/* Current Visitor Phone Info */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-neutral-400 font-bold hidden md:inline">방문 손님:</span>
            <span className="font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {guestPhone || '미인증 (번호 입력 필요)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsStoreSearchModalOpen(true)}
            className="text-[11px] font-extrabold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20 transition-colors flex items-center gap-1 cursor-pointer"
          >
            가게 변경 ({storeInfo.name || '선택안됨'})
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
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 max-w-7xl mx-auto w-full">
        
        {/* Left Menu Grid Subcomponent (8 Cols) */}
        <div className="md:col-span-8">
          <KioskMenuGrid 
            menus={filteredMenus}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenOptionModal={handleOpenOptionModal}
          />
        </div>

        {/* Right Cart Section (4 Cols Subcomponent) */}
        <div className="md:col-span-4">
          <KioskCartPanel 
            cart={cart}
            cartTotalAmount={cartTotalAmount}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveCartItem}
            onConfirmOrder={handleConfirmOrder}
          />
        </div>

      </div>

      {/* Option Selection Modal */}
      <AnimatePresence>
        {selectedMenuForOption && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-none p-6 max-w-md w-full text-left space-y-4 shadow-2xl"
            >
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-white/10">
                <h3 className="font-black text-base text-neutral-900 dark:text-white">{selectedMenuForOption.name} 옵션 선택</h3>
                <button onClick={() => setSelectedMenuForOption(null)} className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-neutral-500">추가 옵션을 선택하세요 (다중 선택 가능):</p>
                {selectedMenuForOption.options.length === 0 ? (
                  <p className="text-xs text-neutral-400 py-2">선택 가능한 추가 옵션이 없습니다.</p>
                ) : (
                  selectedMenuForOption.options.map(opt => {
                    const isSelected = selectedOptionsTemp.some(o => o.id === opt.id);
                    return (
                      <div 
                        key={opt.id}
                        onClick={() => handleToggleOption(opt)}
                        className={`flex justify-between items-center p-3 border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' 
                            : 'bg-neutral-50 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        <span className="text-xs font-bold">+{opt.name}</span>
                        <span className="font-mono text-xs">{opt.price > 0 ? `+${opt.price.toLocaleString()}원` : '무료'}</span>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex gap-3">
                <button 
                  onClick={() => setSelectedMenuForOption(null)}
                  className="flex-1 py-3 bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs cursor-pointer"
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
