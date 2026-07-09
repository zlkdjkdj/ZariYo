import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Armchair, Clock, CheckCircle2, ArrowLeft,
  MapPin, HelpCircle
} from 'lucide-react';
import { Header } from '../../components/landing/Header';
import { Footer } from '../../components/landing/Footer';
import type { PlacedElement, TempOccupiedItem } from '../../types/store';

export function ReservePage() {
  const navigate = useNavigate();

  // 1. 매장 및 레이아웃 데이터 로드
  const [storeInfo] = useState(() => {
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

  // 2. 좌석 상태 로드
  const [tableStates, setTableStates] = useState<Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>>(() => {
    const saved = localStorage.getItem('zariyo_table_states');
    return saved ? JSON.parse(saved) : {
      '3': 'using',
      '4': 'temp-occupied',
      '5': 'empty',
      '6': 'reserved',
    };
  });

  const [tempOccupations, setTempOccupations] = useState<TempOccupiedItem[]>(() => {
    const saved = localStorage.getItem('zariyo_temp_occupations');
    return saved ? JSON.parse(saved) : [
      { id: 'temp-1', label: 'T-2', elementId: '4', timeLeft: 300 },
    ];
  });

  // 본인이 선점한 좌석 리스트 추적
  const [myHeldIds, setMyHeldIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zariyo_my_held_ids');
    return saved ? JSON.parse(saved) : ['4']; // 기본 T-2는 내 선점으로 시작
  });

  const [selectedSeat, setSelectedSeat] = useState<PlacedElement | null>(null);

  // 로컬 스토리지에 데이터 영속 저장
  const syncToLocalStorage = (
    newStates: Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>,
    newOccs: TempOccupiedItem[],
    newMyHeld?: string[]
  ) => {
    localStorage.setItem('zariyo_table_states', JSON.stringify(newStates));
    localStorage.setItem('zariyo_temp_occupations', JSON.stringify(newOccs));
    if (newMyHeld) {
      localStorage.setItem('zariyo_my_held_ids', JSON.stringify(newMyHeld));
    }
    // StorageEvent는 동일 탭에서는 발화하지 않으므로 커스텀 이벤트를 쏴서 동기화
    window.dispatchEvent(new Event('storage_sync'));
  };

  // 다른 탭에서 일어난 데이터 변화 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const savedStates = localStorage.getItem('zariyo_table_states');
      const savedOccs = localStorage.getItem('zariyo_temp_occupations');
      const savedMyHeld = localStorage.getItem('zariyo_my_held_ids');
      if (savedStates) setTableStates(JSON.parse(savedStates));
      if (savedOccs) setTempOccupations(JSON.parse(savedOccs));
      if (savedMyHeld) setMyHeldIds(JSON.parse(savedMyHeld));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage_sync', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage_sync', handleStorageChange);
    };
  }, []);

  // 1초 단위 타이머 개시
  useEffect(() => {
    const interval = setInterval(() => {
      setTempOccupations((prev) => {
        let isChanged = false;
        const updated = prev.map((item) => {
          const nextTime = item.timeLeft - 1;
          if (nextTime <= 0) {
            isChanged = true;
            // 만료 시 해당 테이블 비움 상태로 전환
            setTableStates((states) => {
              const nextStates = { ...states, [item.elementId]: 'empty' as const };
              localStorage.setItem('zariyo_table_states', JSON.stringify(nextStates));
              return nextStates;
            });
            // 내 보유 목록에서도 삭제
            setMyHeldIds((myHeld) => {
              const nextMyHeld = myHeld.filter((id) => id !== item.elementId);
              localStorage.setItem('zariyo_my_held_ids', JSON.stringify(nextMyHeld));
              return nextMyHeld;
            });
          }
          return { ...item, timeLeft: nextTime };
        });

        const filtered = updated.filter((item) => item.timeLeft > 0);
        if (isChanged || prev.length !== filtered.length || updated.some((u, i) => u.timeLeft !== prev[i]?.timeLeft)) {
          localStorage.setItem('zariyo_temp_occupations', JSON.stringify(filtered));
          window.dispatchEvent(new Event('storage_sync'));
        }
        return filtered;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 좌석 클릭 핸들러
  const handleSeatClick = (element: PlacedElement) => {
    if (!element.isReservable) return;
    setSelectedSeat(element);
  };

  // 5분 임시 선점 신청
  const handleHoldSeat = (element: PlacedElement) => {
    const nextStates = { ...tableStates, [element.id]: 'temp-occupied' as const };
    const nextOccs = [
      ...tempOccupations.filter(o => o.elementId !== element.id),
      { id: `temp-${Date.now()}`, label: element.label, elementId: element.id, timeLeft: 300 }
    ];
    const nextMyHeld = [...myHeldIds, element.id];

    setTableStates(nextStates);
    setTempOccupations(nextOccs);
    setMyHeldIds(nextMyHeld);
    syncToLocalStorage(nextStates, nextOccs, nextMyHeld);
    alert(`[${element.label}] 좌석을 5분간 임시 선점했습니다. 시간 내 예약을 완료해주세요!`);
  };

  // 선점 취소
  const handleCancelHold = (element: PlacedElement) => {
    const nextStates = { ...tableStates, [element.id]: 'empty' as const };
    const nextOccs = tempOccupations.filter(o => o.elementId !== element.id);
    const nextMyHeld = myHeldIds.filter(id => id !== element.id);

    setTableStates(nextStates);
    setTempOccupations(nextOccs);
    setMyHeldIds(nextMyHeld);
    syncToLocalStorage(nextStates, nextOccs, nextMyHeld);
    alert(`[${element.label}] 좌석 선점이 취소되었습니다.`);
  };

  // 최종 예약 확정
  const handleConfirmReservation = (element: PlacedElement) => {
    const nextStates = { ...tableStates, [element.id]: 'reserved' as const };
    const nextOccs = tempOccupations.filter(o => o.elementId !== element.id);
    const nextMyHeld = myHeldIds.filter(id => id !== element.id);

    // 당일 예약자 리스트에 새 예약 추가
    const savedReservations = localStorage.getItem('zariyo_reservations');
    const prevRes = savedReservations ? JSON.parse(savedReservations) : [
      { id: 'res-1', guestName: '김지민', peopleCount: 2, time: '11:30', elementId: '6', label: '바석-A', status: 'pending' },
      { id: 'res-2', guestName: '박준형', peopleCount: 4, time: '13:00', elementId: '3', label: 'T-1', status: 'pending' },
    ];
    const newRes = {
      id: `res-${Date.now()}`,
      guestName: '손님 (본인)',
      peopleCount: element.type === 'table-4' ? 4 : element.type === 'table-2' ? 2 : 1,
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      elementId: element.id,
      label: element.label,
      status: 'pending',
    };
    localStorage.setItem('zariyo_reservations', JSON.stringify([...prevRes, newRes]));

    // 실시간 로그 스트리밍 업데이트
    const savedLogs = localStorage.getItem('zariyo_logs');
    const logs = savedLogs ? JSON.parse(savedLogs) : [];
    const timeStr = new Date().toTimeString().split(' ')[0];
    localStorage.setItem('zariyo_logs', JSON.stringify([
      `[${timeStr}] 🎟️ [${element.label}] 좌석에 대한 고객 예약 신청이 확정되었습니다.`,
      ...logs
    ]));

    setTableStates(nextStates);
    setTempOccupations(nextOccs);
    setMyHeldIds(nextMyHeld);
    syncToLocalStorage(nextStates, nextOccs, nextMyHeld);
    alert(`[${element.label}] 좌석 예약이 최종 확정되었습니다!`);
    setSelectedSeat(null);
  };

  const getSeatColorClass = (el: PlacedElement) => {
    if (!el.isReservable) {
      if (el.type === 'counter') return 'bg-neutral-100 dark:bg-neutral-850 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-400';
      if (el.type === 'door') return 'bg-amber-100/40 dark:bg-amber-500/10 border-amber-300/30 dark:border-amber-500/20 text-amber-600 dark:text-amber-400';
      return 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-850 text-neutral-400 dark:text-neutral-600';
    }

    const state = tableStates[el.id] || 'empty';

    switch (state) {
      case 'using':
        return 'bg-[#fee3e6] dark:bg-[#f6384d]/10 border-[#ffb1b8] dark:border-[#f6384d]/40 text-[#f6384d] shadow-[0_0_12px_rgba(246,56,77,0.03)]';
      case 'temp-occupied':
        const isMyHold = myHeldIds.includes(el.id);
        return isMyHold
          ? 'bg-[#fff1db] dark:bg-[#f59f00]/15 border-amber-500 text-amber-600 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.12)]'
          : 'bg-[#fff1db]/70 dark:bg-[#f59f00]/8 border-amber-300/40 dark:border-amber-700/40 text-amber-500/80';
      case 'reserved':
        return 'bg-[#e8f3ff] dark:bg-[#3182f6]/10 border-[#b3d7ff] dark:border-[#3182f6]/40 text-[#3182f6] shadow-[0_0_12px_rgba(49,130,246,0.03)]';
      default:
        return 'bg-white hover:bg-neutral-50 dark:bg-[#0d0d10] dark:hover:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-[#4e5968] dark:text-neutral-300 hover:border-neutral-350 dark:hover:border-neutral-700';
    }
  };

  const getSeatStatusText = (elId: string, isReservable: boolean) => {
    if (!isReservable) return '';
    const state = tableStates[elId] || 'empty';
    switch (state) {
      case 'using': return '사용중';
      case 'temp-occupied':
        return myHeldIds.includes(elId) ? '내 선점' : '선점중';
      case 'reserved': return '예약됨';
      default: return '예약가능';
    }
  };

  return (
    <div className="bg-[#f9fafb] dark:bg-[#101012] text-[#191f28] dark:text-[#f9fafb] font-sans selection:bg-[#3182f6]/20 min-h-screen flex flex-col justify-between relative overflow-x-hidden transition-colors duration-300">
      
      {/* Toss Light Blue Glow spill */}
      <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[50%] rounded-full bg-[#3182f6]/3 dark:bg-[#3182f6]/6 blur-[120px] pointer-events-none" />
      
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full z-10">
        
        {/* Navigation back and store details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#f2f4f6] dark:border-white/5 select-none">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 hover:bg-[#3182f6]/10 text-neutral-500 hover:text-[#191f28] dark:hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#3182f6]" />
            </button>
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold uppercase tracking-wide border border-emerald-500/20">
                Live Reservation
              </span>
              <h1 className="text-xl md:text-2xl font-black text-[#191f28] dark:text-white mt-1">
                {storeInfo.name} 예약 신청
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#4e5968] dark:text-neutral-400 font-bold">
            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#3182f6]" /> {storeInfo.address}</div>
          </div>
        </div>

        {/* Informational guide bar */}
        <div className="bg-white dark:bg-neutral-900/40 border border-[#f2f4f6] dark:border-white/5 rounded-2xl p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#3182f6]/10 text-[#3182f6] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-[#191f28] dark:text-white">5분 임시 선점 시스템 작동 중</h3>
              <p className="text-[11px] text-[#4e5968] dark:text-neutral-400 leading-relaxed mt-1 font-bold">
                비어있는 좌석을 클릭하면 5분 동안 예약 권한이 독점(선점)됩니다. 시간 경과 전까지 자유롭게 예약을 확정해보세요.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3.5 text-[10px] font-bold shrink-0 text-[#4e5968] dark:text-neutral-300">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-white dark:bg-[#0d0d10] border border-neutral-300 dark:border-neutral-800" /> 예약가능</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400" /> 선점중</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#f6384d]" /> 사용중</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#3182f6]" /> 예약됨</span>
          </div>
        </div>

        {/* 2D Grid Map and Interactive control panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* Map canvas frame */}
          <div className="lg:col-span-8 bg-white dark:bg-neutral-900/30 border border-[#f2f4f6] dark:border-white/5 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
            <div className="absolute top-4 left-4 select-none pointer-events-none">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-extrabold font-mono">2D Live Layout Map</span>
            </div>
            
            {/* Grid container */}
            <div className="w-full overflow-auto pt-6 flex justify-center">
              <div 
                className="relative bg-[#f9fafb] dark:bg-black/40 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 transition-colors duration-300"
                style={{ width: '600px', height: '450px' }}
              >
                {placedElements.map((el) => {
                  const isReservable = el.isReservable;
                  const state = tableStates[el.id] || 'empty';
                  const heldTimer = tempOccupations.find(o => o.elementId === el.id);
                  const isMyHold = myHeldIds.includes(el.id);

                  return (
                    <div
                      key={el.id}
                      onClick={() => handleSeatClick(el)}
                      style={{
                        position: 'absolute',
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        width: `${el.width}px`,
                        height: `${el.height}px`,
                      }}
                      className={`border rounded-xl flex flex-col items-center justify-center select-none transition-all duration-300 ${
                        isReservable ? 'cursor-pointer hover:scale-[1.04]' : 'cursor-default'
                      } ${getSeatColorClass(el)}`}
                    >
                      <span className="text-[11px] font-black">{el.label}</span>
                      
                      {isReservable && (
                        <span className="text-[7px] mt-0.5 font-bold uppercase tracking-wide opacity-80">
                          {getSeatStatusText(el.id, el.isReservable)}
                        </span>
                      )}

                      {/* Display remaining time on seat */}
                      {isReservable && state === 'temp-occupied' && heldTimer && (
                        <span className={`text-[8px] font-mono mt-0.5 px-1 py-0.2 rounded font-extrabold flex items-center gap-0.5 ${
                          isMyHold 
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                        }`}>
                          <Clock className="w-2 h-2 shrink-0" />
                          {Math.floor(heldTimer.timeLeft / 60)}:
                          {String(heldTimer.timeLeft % 60).padStart(2, '0')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Seat details / Action controller side panel */}
          <div className="lg:col-span-4 bg-white dark:bg-neutral-900/40 border border-[#f2f4f6] dark:border-white/5 rounded-3xl p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.015)] min-h-[300px] flex flex-col justify-between">
            {selectedSeat ? (
              <div className="space-y-6 w-full">
                <div className="select-none border-b border-neutral-200 dark:border-white/5 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#3182f6]/10 text-[#3182f6] flex items-center justify-center shadow-sm">
                      <Armchair className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#191f28] dark:text-white">좌석 상세 제어</h3>
                      <p className="text-[10px] text-[#4e5968] dark:text-neutral-400 font-bold">{selectedSeat.label} 정보</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs font-bold text-[#4e5968] dark:text-neutral-400">
                  <div className="flex justify-between">
                    <span>좌석 유형:</span>
                    <span className="text-[#191f28] dark:text-white">
                      {selectedSeat.type === 'table-4' ? '4인 테이블' : selectedSeat.type === 'table-2' ? '2인 테이블' : selectedSeat.type === 'table-bar' ? '바 테이블' : '콘센트석'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>현재 상태:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      tableStates[selectedSeat.id] === 'using' 
                        ? 'bg-rose-100 dark:bg-rose-500/10 text-[#f6384d]'
                        : tableStates[selectedSeat.id] === 'temp-occupied'
                        ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-500'
                        : tableStates[selectedSeat.id] === 'reserved'
                        ? 'bg-blue-100 dark:bg-blue-500/10 text-[#3182f6]'
                        : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600'
                    }`}>
                      {getSeatStatusText(selectedSeat.id, selectedSeat.isReservable)}
                    </span>
                  </div>

                  {/* My holding item detail info */}
                  {tableStates[selectedSeat.id] === 'temp-occupied' && myHeldIds.includes(selectedSeat.id) && (
                    <div className="p-3.5 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-400/30 rounded-xl mt-4 select-none">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 text-[11px] mb-1 font-extrabold">
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        임시 선점 확보 완료
                      </div>
                      <p className="text-[10px] leading-relaxed text-[#4e5968] dark:text-neutral-400">
                        남은 선점 시간 동안 아래 '예약 최종 확정' 버튼을 탭하면 최종 입정 예약이 완결됩니다.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions depending on state */}
                <div className="pt-6 border-t border-neutral-200 dark:border-white/5 space-y-3">
                  {tableStates[selectedSeat.id] === 'empty' || !tableStates[selectedSeat.id] ? (
                    <button
                      onClick={() => handleHoldSeat(selectedSeat)}
                      className="w-full py-3.5 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-[#3182f6] to-[#4894fe] hover:opacity-95 shadow-[0_4px_15px_rgba(49,130,246,0.2)] cursor-pointer flex items-center justify-center gap-1.5 border-0 hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                      <Clock className="w-4 h-4" />
                      5분 임시 선점 신청
                    </button>
                  ) : tableStates[selectedSeat.id] === 'temp-occupied' && myHeldIds.includes(selectedSeat.id) ? (
                    <>
                      <button
                        onClick={() => handleConfirmReservation(selectedSeat)}
                        className="w-full py-3.5 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 shadow-[0_4px_15px_rgba(16,185,129,0.2)] cursor-pointer flex items-center justify-center gap-1.5 border-0 hover:scale-[1.01] active:scale-[0.99] transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        예약 최종 확정
                      </button>
                      <button
                        onClick={() => handleCancelHold(selectedSeat)}
                        className="w-full py-3.5 rounded-xl font-bold text-xs text-[#4e5968] dark:text-neutral-450 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                      >
                        선점 취소
                      </button>
                    </>
                  ) : (
                    <p className="text-[11px] font-bold text-neutral-400 text-center py-4">
                      이 좌석은 현재 다른 사람에 의해 사용 또는 점유 중이므로 선택할 수 없습니다.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 py-12 text-center select-none">
                <HelpCircle className="w-10 h-10 text-neutral-300 dark:text-neutral-700 mb-4" />
                <h4 className="text-xs font-extrabold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">좌석 미선택</h4>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-600 mt-2 font-bold max-w-[200px]">
                  왼쪽 2D 도면에서 예약을 원하는 좌석(예약가능 상태)을 선택하세요.
                </p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
