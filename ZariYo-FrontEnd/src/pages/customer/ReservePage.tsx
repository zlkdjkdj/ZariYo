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

interface CartItem {
  menu: KioskMenuItem;
  selectedOptions: KioskMenuOption[];
  quantity: number;
  itemTotalPrice: number;
}

export function ReservePage() {
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

  // 3. 5분 원자성 선점 락 타이머 (299초)
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
  const handleConfirmOrder = () => {
    alert(`[주문 완료] ${assignedSeat.label}번 테이블의 주문이 주방 KDS 및 관제 POS로 실시간 발송되었습니다!`);
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
        lockTime={lockTime}
        formatTime={formatTime}
        onOpenSeatModal={() => setIsSeatModalOpen(true)}
        onStaffCall={handleOpenStaffCallModal}
      />

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
        tableLabel={assignedSeat.label}
        onClose={() => setIsStaffCallModalOpen(false)}
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
