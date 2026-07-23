import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  LayoutDashboard, ChefHat, Receipt, 
  CheckCircle2, DollarSign, PlusCircle, CreditCard, X, Move, Printer, Percent 
} from 'lucide-react';
import { ConsoleSidebar } from '../../components/owner/ConsoleSidebar';
import { useDashboard } from '../../hooks/useDashboard';
import { DashboardKpi } from '../../components/owner/dashboard/DashboardKpi';
import { DashboardCanvas } from '../../components/owner/dashboard/DashboardCanvas';
import { TempOccupiedList } from '../../components/owner/dashboard/TempOccupiedList';
import { ReservationList } from '../../components/owner/dashboard/ReservationList';
import { TimelineLogs } from '../../components/owner/dashboard/TimelineLogs';
import type { PlacedElement } from '../../types/store';

interface BillItem {
  name: string;
  qty: number;
  price: number;
}

interface KdsOrderItem {
  id: string;
  tableLabel: string;
  menuName: string;
  quantity: number;
  time: string;
  status: 'cooking' | 'completed';
  note?: string;
  price: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'live' | 'kds') || 'live';
  const [activeTab, setActiveTab] = useState<'live' | 'kds'>(initialTab);

  // 계산서 선택 테이블 상태
  const [selectedBillTable, setSelectedBillTable] = useState<{ id: string; label: string } | null>({ id: '3', label: 'T-1' });

  // 할인 상태
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // 각 테이블별 실시간 주문 수선서 상태
  const [tableBills, setTableBills] = useState<Record<string, { items: BillItem[]; paymentMethod: string }>>({
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
      items: [
        { name: '화덕 마르게리타 피자', qty: 2, price: 36000 }
      ]
    }
  });

  // 현장 메뉴 직접 추가 모달 상태
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);

  // KDS 데이터
  const [kdsOrders, setKdsOrders] = useState<KdsOrderItem[]>([
    { id: 'k1', tableLabel: 'T-1', menuName: '토마호크 스테이크', quantity: 1, time: '12:35', status: 'cooking', note: '미디엄 웰던으로 요청', price: 48000 },
    { id: 'k2', tableLabel: 'T-1', menuName: '트러플 크림 파스타', quantity: 1, time: '12:35', status: 'cooking', price: 18000 },
    { id: 'k3', tableLabel: 'T-2', menuName: '화덕 마르게리타 피자', quantity: 2, time: '12:40', status: 'cooking', price: 36000 },
    { id: 'k4', tableLabel: 'T-3', menuName: '시그니처 수제 에이드', quantity: 3, time: '12:42', status: 'completed', price: 21000 },
  ]);

  const [storeInfo] = useState(() => {
    const saved = localStorage.getItem('zariyo_store_info');
    return saved ? JSON.parse(saved) : { name: 'ZariYo 프리미엄 라운지 & 다이닝', address: '서울특별시 강남구 테헤란로 123' };
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

  const {
    tableStates,
    tempOccupations,
    reservations,
    logs,
    activeControlId,
    setActiveControlId,
    handleControlState,
    handleCompleteReservation,
    handleNoShowReservation,
    kpi,
  } = useDashboard(placedElements);

  // 현장 POS 메뉴 추가 핸들러
  const handleAddOrderToTable = (menuName: string, price: number) => {
    if (!selectedBillTable) return;
    const tableId = selectedBillTable.id;

    setTableBills(prev => {
      const currentBill = prev[tableId] || { paymentMethod: '신용카드 (현대카드 / 일시불)', items: [] };
      const existingIdx = currentBill.items.findIndex(i => i.name === menuName);
      
      let updatedItems = [...currentBill.items];
      if (existingIdx >= 0) {
        updatedItems[existingIdx].qty += 1;
      } else {
        updatedItems.push({ name: menuName, qty: 1, price });
      }

      return {
        ...prev,
        [tableId]: { ...currentBill, items: updatedItems }
      };
    });

    setIsAddMenuModalOpen(false);
    alert(`테이블 [${selectedBillTable.label}]에 [${menuName}]이(가) 현장 주문 추가되었습니다.`);
  };

  const markAsCompleted = (orderId: string) => {
    setKdsOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'completed' } : o));
  };

  const currentTableBill = selectedBillTable ? tableBills[selectedBillTable.id] || { paymentMethod: '신용카드 (현대카드 / 일시불)', items: [] } : null;
  const subTotalAmount = currentTableBill ? currentTableBill.items.reduce((sum, i) => sum + i.price * i.qty, 0) : 0;
  const finalTotalAmount = Math.max(0, subTotalAmount - discountAmount);

  return (
    <div className="flex bg-slate-50 dark:bg-[#030303] text-neutral-900 dark:text-[#f5f5f7] font-sans min-h-screen transition-colors duration-300">
      
      {/* Universal Sidebar with Theme Toggle */}
      <ConsoleSidebar />

      {/* Main Console */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200 dark:border-white/5 select-none">
          <div className="text-left">
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-2.5">
              <LayoutDashboard className="w-6 h-6 text-[#3182f6]" />
              {storeInfo.name} 실시간 관제 POS
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-bold">
              운영 지점: {storeInfo.address}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-neutral-200/60 dark:bg-white/5 p-1 rounded-full border border-neutral-300/30 dark:border-white/10 flex gap-1 select-none font-bold text-xs">
              <button
                onClick={() => setActiveTab('live')}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'live' ? 'bg-[#3182f6] text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> 관제 & POS
              </button>
              <button
                onClick={() => setActiveTab('kds')}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'kds' ? 'bg-[#3182f6] text-white shadow-md' : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" /> 주방 KDS
              </button>
            </div>

            <button
              onClick={() => navigate('/owner/store/new')}
              className="px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 text-xs font-extrabold text-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer transition-all"
            >
              도면 수정
            </button>
          </div>
        </div>

        {/* Live Control View */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            
            <DashboardKpi
              usingCount={kpi.usingCount}
              tempOccupiedCount={kpi.tempOccupiedCount}
              reservedCount={kpi.reservedCount}
              emptyCount={kpi.emptyCount}
              totalTables={kpi.totalTables}
            />

            {/* Side-by-Side Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left 8 cols: 2D Interactive Table Canvas */}
              <div className="lg:col-span-8 space-y-6">
                <DashboardCanvas
                  placedElements={placedElements}
                  tableStates={tableStates}
                  activeControlId={activeControlId}
                  setActiveControlId={(id) => {
                    setActiveControlId(id);
                    const clickedEl = placedElements.find(e => e.id === id);
                    if (clickedEl && clickedEl.isReservable) {
                      setSelectedBillTable({ id: clickedEl.id, label: clickedEl.label });
                      setDiscountAmount(0);
                    }
                  }}
                  onControlState={handleControlState}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TempOccupiedList
                    tempOccupations={tempOccupations}
                    onConfirm={(elId, lbl) => handleControlState(elId, lbl, 'using')}
                    onCancel={(elId, lbl) => handleControlState(elId, lbl, 'empty')}
                  />
                  <ReservationList
                    reservations={reservations}
                    onComplete={handleCompleteReservation}
                    onNoShow={handleNoShowReservation}
                  />
                </div>
              </div>

              {/* Right 4 cols: Side-by-Side Bill & POS Action Bar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-3xl p-6 shadow-xl text-left select-none">
                  <div className="flex items-center justify-between mb-4 border-b border-neutral-200 dark:border-white/5 pb-3">
                    <span className="text-xs font-black text-[#3182f6] uppercase font-mono flex items-center gap-1.5">
                      <Receipt className="w-4 h-4" /> REALTIME TABLE RECEIPT
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">SIDE-BY-SIDE POS</span>
                  </div>

                  {selectedBillTable ? (
                    <div>
                      <div className="mb-3 flex justify-between items-start">
                        <div>
                          <span className="text-xl font-black text-neutral-900 dark:text-white">
                            테이블 {selectedBillTable.label}
                          </span>
                          <p className="text-[10px] text-neutral-400 font-mono">
                            STATUS: {tableStates[selectedBillTable.id] === 'using' ? '착석 사용 중' : tableStates[selectedBillTable.id] === 'temp-occupied' ? '5분 선점 중' : '공석'}
                          </p>
                        </div>
                      </div>

                      {/* POS Real Action Bar (테이블 이동, 인쇄, 할인, 메뉴추가) */}
                      <div className="grid grid-cols-2 gap-1.5 mb-4">
                        <button
                          onClick={() => setIsAddMenuModalOpen(true)}
                          className="px-3 py-2 rounded-xl bg-[#3182f6]/10 text-[#3182f6] hover:bg-[#3182f6] hover:text-white border border-[#3182f6]/20 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <PlusCircle className="w-3.5 h-3.5" /> + 메뉴 추가
                        </button>
                        <button
                          onClick={() => {
                            if (discountAmount > 0) {
                              setDiscountAmount(0);
                              alert('할인이 취소되었습니다.');
                            } else {
                              setDiscountAmount(Math.round(subTotalAmount * 0.1));
                              alert(`10% 특별 할인 (₩${Math.round(subTotalAmount * 0.1).toLocaleString()}) 이 적용되었습니다.`);
                            }
                          }}
                          className={`px-3 py-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            discountAmount > 0 
                              ? 'bg-purple-500 text-white border-purple-500' 
                              : 'bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500 hover:text-white'
                          }`}
                        >
                          <Percent className="w-3.5 h-3.5" /> {discountAmount > 0 ? '할인 적용됨' : '10% 할인'}
                        </button>
                        <button
                          onClick={() => alert(`[${selectedBillTable.label}] 테이블 수선서 영수증이 매장 프린터로 출력되었습니다.`)}
                          className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" /> 영수증 인쇄
                        </button>
                        <button
                          onClick={() => alert(`[${selectedBillTable.label}] 테이블 합석 및 자리 이동 모달이 준비되었습니다.`)}
                          className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Move className="w-3.5 h-3.5" /> 자리 이동
                        </button>
                      </div>

                      {/* Payment Method Badge */}
                      {currentTableBill && (
                        <div className="text-[10.5px] text-neutral-600 dark:text-neutral-400 font-bold bg-neutral-100 dark:bg-white/5 p-2 rounded-xl mb-3 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-[#3182f6]" />
                          <span>{currentTableBill.paymentMethod}</span>
                        </div>
                      )}

                      {/* Receipt items list */}
                      <div className="space-y-2 border-y border-neutral-200 dark:border-white/5 py-4 text-xs font-bold">
                        {!currentTableBill || currentTableBill.items.length === 0 ? (
                          <div className="text-center text-neutral-400 py-4 text-[11px]">
                            주문 내역이 없습니다. (+ 메뉴 추가 주문 가능)
                          </div>
                        ) : (
                          currentTableBill.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-neutral-800 dark:text-white">
                              <span>{item.name} (x{item.qty})</span>
                              <span>₩ {(item.price * item.qty).toLocaleString()}</span>
                            </div>
                          ))
                        )}
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between items-center text-xs font-bold text-purple-500 py-2 border-b border-neutral-200 dark:border-white/5">
                          <span>10% 이벤트 특별 할인 적용</span>
                          <span>- ₩ {discountAmount.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center my-4">
                        <span className="text-xs font-bold text-neutral-500">최종 결제 수선액</span>
                        <span className="text-xl font-black text-[#3182f6]">₩ {finalTotalAmount.toLocaleString()}</span>
                      </div>

                      <button
                        onClick={() => {
                          handleControlState(selectedBillTable.id, selectedBillTable.label, 'empty');
                          setDiscountAmount(0);
                          alert(`테이블 ${selectedBillTable.label} 결제가 완료되어 공석 원복되었습니다.`);
                        }}
                        className="w-full py-3 rounded-full bg-[#3182f6] hover:bg-[#286fd7] text-white text-xs font-extrabold cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <DollarSign className="w-4 h-4" />
                        결제 승인 및 퇴석 처리
                      </button>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-neutral-400 text-xs font-bold">
                      왼쪽 도면에서 수선서를 확인할 테이블을 탭하세요.
                    </div>
                  )}
                </div>

                <TimelineLogs logs={logs} />
              </div>

            </div>
          </div>
        )}

        {/* Kitchen KDS View */}
        {activeTab === 'kds' && (
          <div className="space-y-6 select-none text-left">
            <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-md">
              <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
                <ChefHat className="w-5.5 h-5.5 text-orange-500" /> 주방 KDS 조리 대기열
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kdsOrders.filter(o => o.status === 'cooking').map((order) => (
                  <div key={order.id} className="bg-neutral-50 dark:bg-white/[0.02] border-2 border-orange-500/30 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-black text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded">
                        테이블 {order.tableLabel}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">{order.time} 접수</span>
                    </div>

                    <h4 className="text-base font-black text-neutral-900 dark:text-white my-2">
                      {order.menuName} <span className="text-[#3182f6]">x{order.quantity}</span>
                    </h4>

                    <button
                      onClick={() => markAsCompleted(order.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black cursor-pointer shadow-md flex items-center justify-center gap-1.5 transition-all mt-4"
                    >
                      <CheckCircle2 className="w-4 h-4" /> 조리 완료
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* POS Quick Menu Add Modal */}
      {isAddMenuModalOpen && selectedBillTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative text-left">
            
            <button 
              onClick={() => setIsAddMenuModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-neutral-900 dark:text-white mb-1">
              테이블 [{selectedBillTable.label}] 메뉴 직접 추가
            </h3>
            <p className="text-xs text-neutral-400 font-bold mb-6">
              현장 주문 건을 해당 테이블 영수증 수선에 추가합니다.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleAddOrderToTable('토마호크 스테이크', 48000)}
                className="w-full p-3 rounded-2xl bg-neutral-50 dark:bg-white/5 hover:bg-[#3182f6]/10 border border-neutral-200 dark:border-white/10 flex justify-between items-center text-xs font-black cursor-pointer transition-all text-neutral-900 dark:text-white"
              >
                <span>토마호크 스테이크</span>
                <span className="text-[#3182f6]">+ ₩48,000</span>
              </button>

              <button
                onClick={() => handleAddOrderToTable('트러플 크림 파스타', 18000)}
                className="w-full p-3 rounded-2xl bg-neutral-50 dark:bg-white/5 hover:bg-[#3182f6]/10 border border-neutral-200 dark:border-white/10 flex justify-between items-center text-xs font-black cursor-pointer transition-all text-neutral-900 dark:text-white"
              >
                <span>트러플 크림 파스타</span>
                <span className="text-[#3182f6]">+ ₩18,000</span>
              </button>

              <button
                onClick={() => handleAddOrderToTable('살치살 찹스테이크', 32000)}
                className="w-full p-3 rounded-2xl bg-neutral-50 dark:bg-white/5 hover:bg-[#3182f6]/10 border border-neutral-200 dark:border-white/10 flex justify-between items-center text-xs font-black cursor-pointer transition-all text-neutral-900 dark:text-white"
              >
                <span>살치살 찹스테이크</span>
                <span className="text-[#3182f6]">+ ₩32,000</span>
              </button>

              <button
                onClick={() => handleAddOrderToTable('시그니처 수제 자몽 에이드', 7000)}
                className="w-full p-3 rounded-2xl bg-neutral-50 dark:bg-white/5 hover:bg-[#3182f6]/10 border border-neutral-200 dark:border-white/10 flex justify-between items-center text-xs font-black cursor-pointer transition-all text-neutral-900 dark:text-white"
              >
                <span>수제 자몽 에이드</span>
                <span className="text-[#3182f6]">+ ₩7,000</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
