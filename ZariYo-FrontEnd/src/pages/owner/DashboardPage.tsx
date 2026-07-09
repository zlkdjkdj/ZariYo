import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, RefreshCw } from 'lucide-react';
import { StartLayout } from '../../components/start/StartLayout';
import { useDashboard } from '../../hooks/useDashboard';
import { DashboardKpi } from '../../components/owner/dashboard/DashboardKpi';
import { DashboardCanvas } from '../../components/owner/dashboard/DashboardCanvas';
import { TempOccupiedList } from '../../components/owner/dashboard/TempOccupiedList';
import { ReservationList } from '../../components/owner/dashboard/ReservationList';
import { TimelineLogs } from '../../components/owner/dashboard/TimelineLogs';
import type { PlacedElement } from '../../types/store';

export function DashboardPage() {
  const navigate = useNavigate();

  // 1. 매장 및 레이아웃 데이터 로드
  const [storeInfo, setStoreInfo] = useState<{ name: string; address: string }>(() => {
    const saved = localStorage.getItem('zariyo_store_info');
    return saved ? JSON.parse(saved) : { name: 'ZariYo 프리미엄 라운지', address: '서울특별시 강남구 테헤란로 123' };
  });

  const [placedElements] = useState<PlacedElement[]>(() => {
    const saved = localStorage.getItem('zariyo_store_layout');
    return saved ? JSON.parse(saved) : [
      { id: '1', type: 'counter', label: '카운터', x: 280, y: 40, width: 160, height: 50, isReservable: false, isTempOccupiedEnabled: false },
      { id: '2', type: 'door', label: '입구', x: 40, y: 380, width: 80, height: 30, isReservable: false, isTempOccupiedEnabled: false },
      { id: '3', type: 'table-4', label: 'T-1', x: 120, y: 160, width: 100, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '4', type: 'table-2', label: 'T-2', x: 320, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '5', type: 'table-2', label: 'T-3', x: 440, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '6', type: 'table-bar', label: '바석-A', x: 160, y: 280, width: 140, height: 40, isReservable: true, isTempOccupiedEnabled: false },
    ];
  });

  // 2. 비즈니스 상태 및 타이머 통제 훅 연동
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

  return (
    <StartLayout>
      <div className="w-full max-w-7xl flex flex-col items-center animate-fadeIn px-2">
        
        {/* Dashboard Title Header */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200 dark:border-white/5">
          <div className="select-none">
            <h1 className="text-xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
              <LayoutDashboard className="w-5.5 h-5.5 text-[#3182f6]" />
              {storeInfo.name} 대시보드
            </h1>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-bold">
              운영 지점: {storeInfo.address}
            </p>
          </div>

          <div className="flex items-center gap-3.5 select-none font-bold">
            <button
              onClick={() => navigate('/owner/store/new')}
              className="flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-neutral-200 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-450 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer transition-all hover:scale-[1.02]"
            >
              배치 수정하기
            </button>
            <button
              onClick={() => {
                setStoreInfo({ name: 'ZariYo 프리미엄 라운지', address: '서울특별시 강남구 테헤란로 123' });
                localStorage.removeItem('zariyo_store_layout');
                localStorage.removeItem('zariyo_table_states');
                localStorage.removeItem('zariyo_temp_occupations');
                localStorage.removeItem('zariyo_reservations');
                localStorage.removeItem('zariyo_logs');
                window.location.reload();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-neutral-200 dark:border-white/10 text-xs text-neutral-600 dark:text-neutral-450 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer transition-all"
              title="대시보드 공장 초기화"
            >
              <RefreshCw className="w-4.5 h-4.5 text-[#3182f6]" />
            </button>
          </div>
        </div>

        {/* 1. KPI 요약 카드 */}
        <DashboardKpi
          usingCount={kpi.usingCount}
          tempOccupiedCount={kpi.tempOccupiedCount}
          reservedCount={kpi.reservedCount}
          emptyCount={kpi.emptyCount}
          totalTables={kpi.totalTables}
        />

        {/* 2. 메인 대시보드 구조 분할 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
          <DashboardCanvas
            placedElements={placedElements}
            tableStates={tableStates}
            activeControlId={activeControlId}
            setActiveControlId={setActiveControlId}
            onControlState={handleControlState}
          />
          
          <div className="lg:col-span-4 space-y-6">
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
            <TimelineLogs logs={logs} />
          </div>
        </div>

      </div>
    </StartLayout>
  );
}
