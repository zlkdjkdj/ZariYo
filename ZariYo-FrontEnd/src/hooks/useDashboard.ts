import { useState, useEffect } from 'react';
import type { PlacedElement, TempOccupiedItem, ReservationItem } from '../types/store';

export function useDashboard(placedElements: PlacedElement[]) {
  // 1. 좌석별 실시간 상태 관리 ('empty' | 'using' | 'temp-occupied' | 'reserved')
  const [tableStates, setTableStates] = useState<Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>>({
    '3': 'using',          // T-1 사용중
    '4': 'temp-occupied',  // T-2 5분 점유중
    '5': 'empty',          // T-3 비어있음
    '6': 'reserved',       // 바석-A 예약됨
  });

  // 2. 5분 임시 점유 목록 (타이머 상태)
  const [tempOccupations, setTempOccupations] = useState<TempOccupiedItem[]>([
    { id: 'temp-1', label: 'T-2', elementId: '4', timeLeft: 300 }, // 300초 = 5분
  ]);

  // 3. 당일 예약자 리스트
  const [reservations, setReservations] = useState<ReservationItem[]>([
    { id: 'res-1', guestName: '김지민', peopleCount: 2, time: '11:30', elementId: '6', label: '바석-A', status: 'pending' },
    { id: 'res-2', guestName: '박준형', peopleCount: 4, time: '13:00', elementId: '3', label: 'T-1', status: 'pending' },
  ]);

  // 4. 실시간 이벤트 스트리밍 타임라인 로그
  const [logs, setLogs] = useState<string[]>([
    '배치된 가구 데이터가 로드되었습니다.',
    '실시간 대시보드 모니터링이 시작되었습니다.',
    '[T-2] 5분 임시 점유(선점) 요청이 들어왔습니다.',
    '[T-1] 손님이 착석하여 사용을 시작했습니다.',
  ]);

  // 5. 제어 팝업 대상 ID
  const [activeControlId, setActiveControlId] = useState<string | null>(null);

  // 실시간 로그 추가 메소드
  const addLog = (message: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs((prev) => [`[${timeStr}] ${message}`, ...prev]);
  };

  // 5분 임시 선점 카운트다운 타이머 루프
  useEffect(() => {
    const interval = setInterval(() => {
      setTempOccupations((prev) => {
        const updated = prev.map((item) => {
          const nextTime = item.timeLeft - 1;
          if (nextTime <= 0) {
            setTableStates((states) => ({ ...states, [item.elementId]: 'empty' }));
            addLog(`🚨 [${item.label}] 5분 선점 시간이 만료되어 자동 취소(비움) 처리되었습니다.`);
          } else if (nextTime === 60) {
            addLog(`⚠️ [${item.label}] 5분 선점 만료 1분 전입니다.`);
          }
          return { ...item, timeLeft: nextTime };
        });
        return updated.filter((item) => item.timeLeft > 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 타이머 해제 시 테이블 상태 동기화 처리
  useEffect(() => {
    setTableStates((prev) => {
      const nextStates = { ...prev };
      Object.keys(nextStates).forEach((key) => {
        if (nextStates[key] === 'temp-occupied' && !tempOccupations.some((t) => t.elementId === key)) {
          nextStates[key] = 'empty';
        }
      });
      tempOccupations.forEach((t) => {
        nextStates[t.elementId] = 'temp-occupied';
      });
      return nextStates;
    });
  }, [tempOccupations]);

  // 수동 제어 핸들러
  const handleControlState = (elementId: string, label: string, newState: 'empty' | 'using' | 'temp-occupied' | 'reserved') => {
    setTableStates((prev) => ({ ...prev, [elementId]: newState }));

    if (newState !== 'temp-occupied') {
      setTempOccupations((prev) => prev.filter((item) => item.elementId !== elementId));
    }

    if (newState === 'temp-occupied') {
      const isExist = tempOccupations.some((item) => item.elementId === elementId);
      if (!isExist) {
        setTempOccupations((prev) => [
          ...prev,
          { id: `temp-${Date.now()}`, label, elementId, timeLeft: 300 }
        ]);
      }
    }

    const stateLabels = {
      empty: '빈 좌석(비움)',
      using: '사용중(착석)',
      'temp-occupied': '5분 임시 선점',
      reserved: '예약됨'
    };
    addLog(`[${label}] 상태가 [${stateLabels[newState]}]으로 변경되었습니다.`);
    setActiveControlId(null);
  };

  // 예약자 입정 완료 처리
  const handleCompleteReservation = (resId: string, elementId: string, label: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: 'completed' } : r))
    );
    handleControlState(elementId, label, 'using');
    addLog(`🎉 예약 손님이 [${label}]에 정상 입정하여 좌석 사용을 확정했습니다.`);
  };

  // 예약자 노쇼 처리
  const handleNoShowReservation = (resId: string, elementId: string, label: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: 'noshow' } : r))
    );
    handleControlState(elementId, label, 'empty');
    addLog(`❌ 예약자 노쇼(No-Show)로 인해 [${label}] 예약건이 취소 및 비움 처리되었습니다.`);
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
