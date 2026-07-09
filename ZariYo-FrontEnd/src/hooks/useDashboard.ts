import { useState, useEffect } from 'react';
import type { PlacedElement, TempOccupiedItem, ReservationItem } from '../types/store';

export function useDashboard(placedElements: PlacedElement[]) {
  // 1. 좌석별 실시간 상태 관리
  const [tableStates, setTableStates] = useState<Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>>(() => {
    const saved = localStorage.getItem('zariyo_table_states');
    return saved ? JSON.parse(saved) : {
      '3': 'using',          // T-1 사용중
      '4': 'temp-occupied',  // T-2 5분 점유중
      '5': 'empty',          // T-3 비어있음
      '6': 'reserved',       // 바석-A 예약됨
    };
  });

  // 2. 5분 임시 점유 목록
  const [tempOccupations, setTempOccupations] = useState<TempOccupiedItem[]>(() => {
    const saved = localStorage.getItem('zariyo_temp_occupations');
    return saved ? JSON.parse(saved) : [
      { id: 'temp-1', label: 'T-2', elementId: '4', timeLeft: 300 },
    ];
  });

  // 3. 당일 예약자 리스트
  const [reservations, setReservations] = useState<ReservationItem[]>(() => {
    const saved = localStorage.getItem('zariyo_reservations');
    return saved ? JSON.parse(saved) : [
      { id: 'res-1', guestName: '김지민', peopleCount: 2, time: '11:30', elementId: '6', label: '바석-A', status: 'pending' },
      { id: 'res-2', guestName: '박준형', peopleCount: 4, time: '13:00', elementId: '3', label: 'T-1', status: 'pending' },
    ];
  });

  // 4. 실시간 이벤트 스트리밍 타임라인 로그
  const [logs, setLogs] = useState<string[]>(() => {
    const saved = localStorage.getItem('zariyo_logs');
    return saved ? JSON.parse(saved) : [
      '배치된 가구 데이터가 로드되었습니다.',
      '실시간 대시보드 모니터링이 시작되었습니다.',
      '[T-2] 5분 임시 점유(선점) 요청이 들어왔습니다.',
      '[T-1] 손님이 착석하여 사용을 시작했습니다.',
    ];
  });

  // 5. 제어 팝업 대상 ID
  const [activeControlId, setActiveControlId] = useState<string | null>(null);

  // 로컬 스토리지에 데이터 영속 저장 및 탭 전파
  const syncToLocalStorage = (
    newStates: Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>,
    newOccs: TempOccupiedItem[],
    newRes: ReservationItem[],
    newLogs: string[]
  ) => {
    localStorage.setItem('zariyo_table_states', JSON.stringify(newStates));
    localStorage.setItem('zariyo_temp_occupations', JSON.stringify(newOccs));
    localStorage.setItem('zariyo_reservations', JSON.stringify(newRes));
    localStorage.setItem('zariyo_logs', JSON.stringify(newLogs));
    window.dispatchEvent(new Event('storage_sync'));
  };



  // 다른 탭(손님 예약 페이지)에서 일어난 데이터 변화 감지
  useEffect(() => {
    const handleStorageSync = () => {
      const savedStates = localStorage.getItem('zariyo_table_states');
      const savedOccs = localStorage.getItem('zariyo_temp_occupations');
      const savedRes = localStorage.getItem('zariyo_reservations');
      const savedLogs = localStorage.getItem('zariyo_logs');
      if (savedStates) setTableStates(JSON.parse(savedStates));
      if (savedOccs) setTempOccupations(JSON.parse(savedOccs));
      if (savedRes) setReservations(JSON.parse(savedRes));
      if (savedLogs) setLogs(JSON.parse(savedLogs));
    };

    window.addEventListener('storage', handleStorageSync);
    window.addEventListener('storage_sync', handleStorageSync);
    return () => {
      window.removeEventListener('storage', handleStorageSync);
      window.removeEventListener('storage_sync', handleStorageSync);
    };
  }, [logs]);

  // 5분 임시 선점 카운트다운 타이머 루프
  useEffect(() => {
    const interval = setInterval(() => {
      setTempOccupations((prev) => {
        let isChanged = false;
        const updated = prev.map((item) => {
          const nextTime = item.timeLeft - 1;
          if (nextTime <= 0) {
            isChanged = true;
            setTableStates((states) => {
              const nextStates = { ...states, [item.elementId]: 'empty' as const };
              localStorage.setItem('zariyo_table_states', JSON.stringify(nextStates));
              return nextStates;
            });
            
            // 실시간 로그 기록
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            setLogs((prevLogs) => {
              const nextLogs = [`[${timeStr}] 🚨 [${item.label}] 5분 선점 시간이 만료되어 자동 취소(비움) 처리되었습니다.`, ...prevLogs];
              localStorage.setItem('zariyo_logs', JSON.stringify(nextLogs));
              return nextLogs;
            });
          } else if (nextTime === 60) {
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            setLogs((prevLogs) => {
              const nextLogs = [`[${timeStr}] ⚠️ [${item.label}] 5분 선점 만료 1분 전입니다.`, ...prevLogs];
              localStorage.setItem('zariyo_logs', JSON.stringify(nextLogs));
              return nextLogs;
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

  // 타이머 해제 시 테이블 상태 동기화 처리
  useEffect(() => {
    setTableStates((prev) => {
      let isChanged = false;
      const nextStates = { ...prev };
      Object.keys(nextStates).forEach((key) => {
        if (nextStates[key] === 'temp-occupied' && !tempOccupations.some((t) => t.elementId === key)) {
          nextStates[key] = 'empty';
          isChanged = true;
        }
      });
      tempOccupations.forEach((t) => {
        if (nextStates[t.elementId] !== 'temp-occupied') {
          nextStates[t.elementId] = 'temp-occupied';
          isChanged = true;
        }
      });
      if (isChanged) {
        localStorage.setItem('zariyo_table_states', JSON.stringify(nextStates));
      }
      return nextStates;
    });
  }, [tempOccupations]);

  // 수동 제어 핸들러
  const handleControlState = (elementId: string, label: string, newState: 'empty' | 'using' | 'temp-occupied' | 'reserved') => {
    const nextStates = { ...tableStates, [elementId]: newState };
    
    let nextOccs = [...tempOccupations];
    if (newState !== 'temp-occupied') {
      nextOccs = tempOccupations.filter((item) => item.elementId !== elementId);
    } else {
      const isExist = tempOccupations.some((item) => item.elementId === elementId);
      if (!isExist) {
        nextOccs.push({ id: `temp-${Date.now()}`, label, elementId, timeLeft: 300 });
      }
    }

    const stateLabels = {
      empty: '빈 좌석(비움)',
      using: '사용중(착석)',
      'temp-occupied': '5분 임시 선점',
      reserved: '예약됨'
    };

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const nextLogs = [`[${timeStr}] [${label}] 상태가 [${stateLabels[newState]}]으로 변경되었습니다.`, ...logs];

    setTableStates(nextStates);
    setTempOccupations(nextOccs);
    setLogs(nextLogs);
    syncToLocalStorage(nextStates, nextOccs, reservations, nextLogs);
    setActiveControlId(null);
  };

  // 예약자 입정 완료 처리
  const handleCompleteReservation = (resId: string, elementId: string, label: string) => {
    const nextRes = reservations.map((r) => (r.id === resId ? { ...r, status: 'completed' as const } : r));
    setReservations(nextRes);
    
    const nextStates = { ...tableStates, [elementId]: 'using' as const };
    const nextOccs = tempOccupations.filter((item) => item.elementId !== elementId);
    
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const nextLogs = [`[${timeStr}] 🎉 예약 손님이 [${label}]에 정상 입정하여 좌석 사용을 확정했습니다.`, ...logs];
    
    setTableStates(nextStates);
    setTempOccupations(nextOccs);
    setLogs(nextLogs);
    
    syncToLocalStorage(nextStates, nextOccs, nextRes, nextLogs);
  };

  // 예약자 노쇼 처리
  const handleNoShowReservation = (resId: string, elementId: string, label: string) => {
    const nextRes = reservations.map((r) => (r.id === resId ? { ...r, status: 'noshow' as const } : r));
    setReservations(nextRes);
    
    const nextStates = { ...tableStates, [elementId]: 'empty' as const };
    const nextOccs = tempOccupations.filter((item) => item.elementId !== elementId);
    
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const nextLogs = [`[${timeStr}] ❌ 예약자 노쇼(No-Show)로 인해 [${label}] 예약건이 취소 및 비움 처리되었습니다.`, ...logs];
    
    setTableStates(nextStates);
    setTempOccupations(nextOccs);
    setLogs(nextLogs);
    
    syncToLocalStorage(nextStates, nextOccs, nextRes, nextLogs);
  };

  // KPI 요약 카운팅 연산
  const totalTables = placedElements.filter((el) => el.type.startsWith('table-') || el.type === 'socket').length;
  const usingCount = Object.values(tableStates).filter((s) => s === 'using').length;
  const tempOccupiedCount = Object.values(tableStates).filter((s) => s === 'temp-occupied').length;
  const reservedCount = Object.values(tableStates).filter((s) => s === 'reserved').length;
  const emptyCount = totalTables - usingCount - tempOccupiedCount - reservedCount;

  return {
    tableStates,
    tempOccupations,
    reservations,
    logs,
    activeControlId,
    setActiveControlId,
    handleControlState,
    handleCompleteReservation,
    handleNoShowReservation,
    kpi: {
      usingCount,
      tempOccupiedCount,
      reservedCount,
      emptyCount,
      totalTables,
    }
  };
}

