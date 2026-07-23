import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GripVertical, Layers } from 'lucide-react';
import { ConsoleSidebar } from '../../components/owner/ConsoleSidebar';
import { useDashboard } from '../../hooks/useDashboard';
import { DashboardKpi } from '../../components/owner/dashboard/DashboardKpi';
import { DashboardCanvas } from '../../components/owner/dashboard/DashboardCanvas';
import { TempOccupiedList } from '../../components/owner/dashboard/TempOccupiedList';
import { ReservationList } from '../../components/owner/dashboard/ReservationList';
import { TimelineLogs } from '../../components/owner/dashboard/TimelineLogs';

// Refactored Subcomponents
import { DashboardHeader } from '../../components/owner/dashboard/DashboardHeader';
import { DashboardBgmPlayer } from '../../components/owner/dashboard/DashboardBgmPlayer';
import { DashboardDeliveryPane, type DeliveryOrderItem } from '../../components/owner/dashboard/DashboardDeliveryPane';
import { DashboardKdsPane, type KdsOrderItem } from '../../components/owner/dashboard/DashboardKdsPane';
import { DashboardReceiptPane } from '../../components/owner/dashboard/DashboardReceiptPane';
import { AddMenuModal } from '../../components/owner/dashboard/AddMenuModal';

// External Mock Data Imports
import { 
  INITIAL_STORE_INFO, 
  INITIAL_TABLE_BILLS, 
  INITIAL_DELIVERY_ORDERS, 
  INITIAL_KDS_ORDERS, 
  INITIAL_PLACED_ELEMENTS,
  type BillItem 
} from '../../data/mockDashboard';

import type { PlacedElement } from '../../types/store';

type WidgetId = 'canvas' | 'receipt' | 'delivery_summary' | 'bgm' | 'temp_occupied' | 'reservations' | 'timeline';

const DEFAULT_WIDGET_ORDER: WidgetId[] = [
  'canvas', 'receipt', 'delivery_summary', 'bgm', 'temp_occupied', 'reservations', 'timeline'
];

export function DashboardPage() {
  const [searchParams] = useSearchParams();
  const tabParam = (searchParams.get('tab') as 'live' | 'kds' | 'delivery') || 'live';
  const [activeTab, setActiveTab] = useState<'live' | 'kds' | 'delivery'>(tabParam);

  // Drag & Drop 위젯 순서 및 편집 모드
  const [isEditMode, setIsEditMode] = useState(false);
  const [widgetOrder, setWidgetOrder] = useState<WidgetId[]>(() => {
    const saved = localStorage.getItem('zariyo_dashboard_widget_order');
    return saved ? JSON.parse(saved) : DEFAULT_WIDGET_ORDER;
  });
  const [draggedWidgetId, setDraggedWidgetId] = useState<WidgetId | null>(null);
  const [dragOverWidgetId, setDragOverWidgetId] = useState<WidgetId | null>(null);

  // Sync activeTab with URL search params
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // 선택 상태
  const [selectedBillTable, setSelectedBillTable] = useState<{ id: string; label: string } | null>({ id: '3', label: 'T-1' });
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>('del-1');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string>('jfKfPfyJRdk');

  // 외부 목업 데이터 모듈 연동
  const [tableBills, setTableBills] = useState<Record<string, { items: BillItem[]; paymentMethod: string }>>(INITIAL_TABLE_BILLS);
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrderItem[]>(INITIAL_DELIVERY_ORDERS);
  const [kdsOrders, setKdsOrders] = useState<KdsOrderItem[]>(INITIAL_KDS_ORDERS);

  // 모달 상태
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);

  const [storeInfo] = useState(() => {
    const saved = localStorage.getItem('zariyo_store_info');
    return saved ? JSON.parse(saved) : INITIAL_STORE_INFO;
  });

  const [placedElements] = useState<PlacedElement[]>(() => {
    const saved = localStorage.getItem('zariyo_store_layout');
    return saved ? JSON.parse(saved) : INITIAL_PLACED_ELEMENTS;
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
    kpi
  } = useDashboard(placedElements);

  // 드래그 앤 드롭 핸들러
  const handleDragStart = (id: WidgetId) => setDraggedWidgetId(id);
  const handleDragOver = (e: React.DragEvent, id: WidgetId) => {
    e.preventDefault();
    if (draggedWidgetId !== id) setDragOverWidgetId(id);
  };
  const handleDrop = (targetId: WidgetId) => {
    if (!draggedWidgetId || draggedWidgetId === targetId) return;
    const newOrder = [...widgetOrder];
    const fromIndex = newOrder.indexOf(draggedWidgetId);
    const toIndex = newOrder.indexOf(targetId);

    if (fromIndex >= 0 && toIndex >= 0) {
      newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, draggedWidgetId);
      setWidgetOrder(newOrder);
      localStorage.setItem('zariyo_dashboard_widget_order', JSON.stringify(newOrder));
    }
    setDraggedWidgetId(null);
    setDragOverWidgetId(null);
  };

  const handleResetWidgetOrder = () => {
    setWidgetOrder(DEFAULT_WIDGET_ORDER);
    localStorage.setItem('zariyo_dashboard_widget_order', JSON.stringify(DEFAULT_WIDGET_ORDER));
  };

  // 계산서 금액 계산
  const currentBill = selectedBillTable ? tableBills[selectedBillTable.id] : null;
  const subtotal = currentBill ? currentBill.items.reduce((sum, item) => sum + item.price * item.qty, 0) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // 선택 배달 데이터
  const selectedDelivery = deliveryOrders.find(d => d.id === selectedDeliveryId) || deliveryOrders[0];

  const handleUpdateDeliveryStatus = (id: string, nextStatus: DeliveryOrderItem['status']) => {
    setDeliveryOrders(prev => prev.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  };

  const handleAddMenuItem = (menuName: string, price: number) => {
    if (!selectedBillTable) return;
    setTableBills(prev => {
      const tableData = prev[selectedBillTable.id] || { items: [], paymentMethod: '현장 현금 / 카드' };
      const existingIdx = tableData.items.findIndex(item => item.name === menuName);
      let updatedItems = [...tableData.items];
      if (existingIdx >= 0) {
        updatedItems[existingIdx] = { ...updatedItems[existingIdx], qty: updatedItems[existingIdx].qty + 1 };
      } else {
        updatedItems.push({ name: menuName, qty: 1, price });
      }
      return { ...prev, [selectedBillTable.id]: { ...tableData, items: updatedItems } };
    });
    setIsAddMenuModalOpen(false);
  };

  const handleToggleKdsStatus = (id: string) => {
    setKdsOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: order.status === 'cooking' ? 'completed' : 'cooking' } : order
    ));
  };

  // 위젯 콘텐츠 디스패처
  const renderWidgetContent = (id: WidgetId) => {
    switch (id) {
      case 'canvas':
        if (activeTab === 'live') {
          return (
            <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-neutral-800 rounded-[3px] p-6 h-full text-left">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200 dark:border-white/10">
                <div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                    2D REALTIME STORE CANVAS MAP
                  </span>
                  <h3 className="text-base font-black text-black dark:text-white">실시간 좌석 관제판</h3>
                </div>
                <span className="text-[10.5px] font-bold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 rounded-[3px] border border-neutral-300 dark:border-white/10">
                  테이블 탭 시 영수증 연동
                </span>
              </div>
              <DashboardCanvas 
                placedElements={placedElements}
                tableStates={tableStates}
                activeControlId={activeControlId}
                setActiveControlId={setActiveControlId}
                onControlState={(elId, label, newState) => {
                  handleControlState(elId, label, newState);
                  const selectedEl = placedElements.find(e => e.id === elId);
                  if (selectedEl) {
                    setSelectedBillTable({ id: selectedEl.id, label: selectedEl.label });
                  }
                }}
              />
            </div>
          );
        }
        if (activeTab === 'kds') {
          return (
            <DashboardKdsPane 
              kdsOrders={kdsOrders}
              deliveryOrders={deliveryOrders}
              onToggleKdsStatus={handleToggleKdsStatus}
              onUpdateDeliveryStatus={handleUpdateDeliveryStatus}
            />
          );
        }
        return (
          <DashboardDeliveryPane 
            deliveryOrders={deliveryOrders}
            selectedDeliveryId={selectedDeliveryId}
            setSelectedDeliveryId={setSelectedDeliveryId}
            onUpdateDeliveryStatus={handleUpdateDeliveryStatus}
          />
        );

      case 'receipt':
        return (
          <DashboardReceiptPane 
            activeTab={activeTab}
            selectedBillTable={selectedBillTable}
            selectedDelivery={selectedDelivery}
            currentBill={currentBill}
            discountAmount={discountAmount}
            setDiscountAmount={setDiscountAmount}
            subtotal={subtotal}
            finalTotal={finalTotal}
            onOpenAddMenuModal={() => setIsAddMenuModalOpen(true)}
            onControlState={handleControlState}
            onUpdateDeliveryStatus={handleUpdateDeliveryStatus}
          />
        );

      case 'delivery_summary':
        return (
          <DashboardDeliveryPane 
            deliveryOrders={deliveryOrders}
            selectedDeliveryId={selectedDeliveryId}
            setSelectedDeliveryId={setSelectedDeliveryId}
            onUpdateDeliveryStatus={handleUpdateDeliveryStatus}
          />
        );

      case 'bgm':
        return (
          <DashboardBgmPlayer 
            youtubeVideoId={youtubeVideoId}
            setYoutubeVideoId={setYoutubeVideoId}
          />
        );

      case 'temp_occupied':
        return (
          <TempOccupiedList 
            tempOccupations={tempOccupations}
            onConfirm={(elId, label) => handleControlState(elId, label, 'using')}
            onCancel={(elId, label) => handleControlState(elId, label, 'empty')}
          />
        );

      case 'reservations':
        return (
          <ReservationList 
            reservations={reservations}
            onComplete={handleCompleteReservation}
            onNoShow={handleNoShowReservation}
          />
        );

      case 'timeline':
        return <TimelineLogs logs={logs} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden font-sans select-none transition-colors duration-300">
      
      {/* Console Sidebar */}
      <ConsoleSidebar />

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[var(--bg-main)]">
        
        <DashboardHeader 
          storeName={storeInfo.name}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          deliveryCount={deliveryOrders.length}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          onResetWidgetOrder={handleResetWidgetOrder}
        />

        {/* Dashboard Content Container */}
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
          
          <DashboardKpi {...kpi} />

          {isEditMode && (
            <div className="p-3.5 rounded-[3px] bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>위젯 배치 편집 모드가 활성화되었습니다. 블록 상단의 드래그 핸들을 잡고 원하는 위치로 이동해보세요!</span>
              </div>
              <span className="text-[10px] font-mono font-black uppercase bg-amber-500/20 px-2 py-0.5 rounded-[3px]">
                DRAG & DROP ACTIVE
              </span>
            </div>
          )}

          {/* Main Drag & Drop Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8 Cols */}
            <div className="lg:col-span-8 space-y-6 text-left">
              {widgetOrder.filter(id => id === 'canvas' || id === 'temp_occupied' || id === 'reservations' || id === 'timeline').map((id) => {
                const isDragging = draggedWidgetId === id;
                const isOver = dragOverWidgetId === id;

                return (
                  <div
                    key={id}
                    draggable={isEditMode}
                    onDragStart={() => handleDragStart(id)}
                    onDragOver={(e) => handleDragOver(e, id)}
                    onDrop={() => handleDrop(id)}
                    className={`transition-all duration-200 relative ${
                      isEditMode ? 'cursor-grab active:cursor-grabbing border-2 border-dashed border-neutral-400 p-1.5 rounded-[3px]' : ''
                    } ${
                      isDragging ? 'opacity-40 scale-[0.98]' : ''
                    } ${
                      isOver ? 'border-amber-500 scale-[1.01] bg-amber-500/5' : ''
                    }`}
                  >
                    {isEditMode && (
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black rounded-[3px] text-[10px] font-mono font-black shadow-md">
                        <GripVertical className="w-3.5 h-3.5" />
                        <span>드래그하여 이동</span>
                      </div>
                    )}
                    {renderWidgetContent(id)}
                  </div>
                );
              })}
            </div>

            {/* Right 4 Cols */}
            <div className="lg:col-span-4 space-y-6 text-left select-none">
              {widgetOrder.filter(id => id === 'receipt' || id === 'delivery_summary' || id === 'bgm').map((id) => {
                const isDragging = draggedWidgetId === id;
                const isOver = dragOverWidgetId === id;

                return (
                  <div
                    key={id}
                    draggable={isEditMode}
                    onDragStart={() => handleDragStart(id)}
                    onDragOver={(e) => handleDragOver(e, id)}
                    onDrop={() => handleDrop(id)}
                    className={`transition-all duration-200 relative ${
                      isEditMode ? 'cursor-grab active:cursor-grabbing border-2 border-dashed border-neutral-400 p-1.5 rounded-[3px]' : ''
                    } ${
                      isDragging ? 'opacity-40 scale-[0.98]' : ''
                    } ${
                      isOver ? 'border-amber-500 scale-[1.01] bg-amber-500/5' : ''
                    }`}
                  >
                    {isEditMode && (
                      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black rounded-[3px] text-[10px] font-mono font-black shadow-md">
                        <GripVertical className="w-3.5 h-3.5" />
                        <span>드래그하여 이동</span>
                      </div>
                    )}
                    {renderWidgetContent(id)}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </main>

      {/* Add Menu Modal Component */}
      <AddMenuModal 
        isOpen={isAddMenuModalOpen}
        onClose={() => setIsAddMenuModalOpen(false)}
        selectedTableLabel={selectedBillTable?.label}
        onAddMenuItem={handleAddMenuItem}
      />

    </div>
  );
}
