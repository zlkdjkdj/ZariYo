import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Receipt } from 'lucide-react';

import type { PlacedElement } from '../../types/store';
import { MOCK_KIOSK_MENUS, type KioskMenuItem, type KioskMenuOption } from '../../data/mockKioskMenus';
import { KioskHeaderBar } from '../../components/kiosk/KioskHeaderBar';
import { KioskMenuGrid } from '../../components/kiosk/KioskMenuGrid';
import { KioskCartPanel } from '../../components/kiosk/KioskCartPanel';
import { KioskStaffCallModal } from '../../components/kiosk/KioskStaffCallModal';
import { KioskPhoneAuthModal } from '../../components/kiosk/KioskPhoneAuthModal';
import { KioskStoreSearchModal } from '../../components/kiosk/KioskStoreSearchModal';

// Newly Separated Subcomponents & Hooks
import { KioskWorkflowBanner } from '../../components/kiosk/KioskWorkflowBanner';
import { KioskMenuOptionModal } from '../../components/kiosk/KioskMenuOptionModal';
import { KioskOrderHistoryModal } from '../../components/kiosk/KioskOrderHistoryModal';
import { KioskSeatChangeModal } from '../../components/kiosk/KioskSeatChangeModal';
import { useKioskOrder } from '../../hooks/useKioskOrder';

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

  // 4. 모달 상태 제어
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [isStaffCallModalOpen, setIsStaffCallModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState(false);
  const [selectedMenuForOption, setSelectedMenuForOption] = useState<KioskMenuItem | null>(null);
  const [selectedOptionsTemp, setSelectedOptionsTemp] = useState<KioskMenuOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'main' | 'side' | 'drink'>('all');

  // 5. 키오스크 주문 비즈니스 커스텀 훅
  const {
    cart,
    cartTotalAmount,
    customerOrdersList,
    handleAddToCart: handleAddToCartHook,
    handleUpdateQty,
    handleRemoveCartItem,
    handleConfirmOrder,
  } = useKioskOrder(assignedSeat, guestPhone);

  // 손님 페이지 진입 즉시 휴대폰 인증 모달 자동 팝업
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPhoneModalOpen(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // 1단계(휴대폰 번호 인증) 완료 ➔ 2단계(매장 검색/선택 모달) 릴레이 항상 오픈
  const handlePhoneSuccess = (phone: string) => {
    setGuestPhone(phone);
    setTimeout(() => setIsStoreSearchModalOpen(true), 150);
  };

  // 2단계(매장 선택) 완료 ➔ 3단계(선택 매장 메뉴판 진입)
  const handleSelectStore = (store: { id: number; name: string; address: string }) => {
    setStoreInfo({
      name: store.name,
      address: store.address,
    });
    setIsStoreSearchModalOpen(false);
  };

  // 옵션 선택 모달 관련
  const handleOpenOptionModal = (menu: KioskMenuItem) => {
    setSelectedMenuForOption(menu);
    setSelectedOptionsTemp([]);
  };

  const handleToggleOption = (option: KioskMenuOption) => {
    if (selectedOptionsTemp.some(o => o.id === option.id)) {
      setSelectedOptionsTemp(prev => prev.filter(o => o.id !== option.id));
    } else {
      setSelectedOptionsTemp(prev => [...prev, option]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedMenuForOption) return;
    handleAddToCartHook(selectedMenuForOption, selectedOptionsTemp);
    setSelectedMenuForOption(null);
  };

  // 테이블 변경 선택 처리
  const handleSelectSeat = (el: PlacedElement) => {
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
  };

  const menuItems = MOCK_KIOSK_MENUS;
  const filteredMenus = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 font-sans flex flex-col justify-between select-none">
      
      {/* Header Bar */}
      <KioskHeaderBar 
        storeName={storeInfo.name}
        assignedSeat={assignedSeat}
        onOpenSeatModal={() => setIsSeatModalOpen(true)}
        onStaffCall={() => setIsStaffCallModalOpen(true)}
      />

      {/* Guest Phone Auth & Workflow Status Sub-banner */}
      <KioskWorkflowBanner 
        guestPhone={guestPhone}
        storeName={storeInfo.name}
        onOpenStoreSearch={() => setIsStoreSearchModalOpen(true)}
        onOpenPhoneModal={() => setIsPhoneModalOpen(true)}
      />

      {/* Main Kiosk Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 max-w-[1500px] mx-auto w-full">
        {/* Left Menu Grid */}
        <div className="lg:col-span-8 xl:col-span-8">
          <KioskMenuGrid 
            menus={filteredMenus}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenOptionModal={handleOpenOptionModal}
          />
        </div>

        {/* Right Cart Section */}
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

      {/* Option Selection Modal */}
      <KioskMenuOptionModal 
        selectedMenu={selectedMenuForOption}
        selectedOptionsTemp={selectedOptionsTemp}
        onClose={() => setSelectedMenuForOption(null)}
        onToggleOption={handleToggleOption}
        onAddToCart={handleAddToCart}
      />

      {/* Staff Call Convenience Service Modal */}
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
        defaultPhone={guestPhone}
      />

      {/* Kiosk Store Search Modal (Step 2) */}
      <KioskStoreSearchModal
        isOpen={isStoreSearchModalOpen}
        onClose={() => setIsStoreSearchModalOpen(false)}
        onSelectStore={handleSelectStore}
      />

      {/* Customer Order History Modal */}
      <KioskOrderHistoryModal 
        isOpen={isOrderHistoryModalOpen}
        onClose={() => setIsOrderHistoryModalOpen(false)}
        ordersList={customerOrdersList}
      />

      {/* Change Seat Modal */}
      <KioskSeatChangeModal 
        isOpen={isSeatModalOpen}
        onClose={() => setIsSeatModalOpen(false)}
        placedElements={placedElements}
        assignedSeat={assignedSeat}
        onSelectSeat={handleSelectSeat}
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

    </div>
  );
}
