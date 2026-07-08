import type { PlacedElement } from '../../../types/store';

interface DashboardCanvasProps {
  placedElements: PlacedElement[];
  tableStates: Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>;
  activeControlId: string | null;
  setActiveControlId: (id: string | null) => void;
  onControlState: (elementId: string, label: string, newState: 'empty' | 'using' | 'temp-occupied' | 'reserved') => void;
}

export function DashboardCanvas({
  placedElements,
  tableStates,
  activeControlId,
  setActiveControlId,
  onControlState,
}: DashboardCanvasProps) {
  const activeControlElement = placedElements.find((el) => el.id === activeControlId);

  return (
    <div className="lg:col-span-8 flex flex-col gap-3">
      <div className="flex justify-between items-center px-1 text-xs">
        <span className="font-semibold text-neutral-600 dark:text-[#a1a1a6]">
          매장 실시간 레이아웃 맵
        </span>
        <div className="flex gap-3 text-[10px] select-none">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500" />빈 좌석</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500" />사용중</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 animate-pulse" />5분선점</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#3182f6]" />예약됨</span>
        </div>
      </div>

      {/* Live Map Box */}
      <div className="w-full h-[520px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-3xl relative overflow-hidden select-none shadow-inner">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:20px_20px]" />

        {placedElements.map((el) => {
          const isTable = el.type.startsWith('table-') || el.type === 'socket';
          const tableState = isTable ? (tableStates[el.id] || 'empty') : 'empty';

          let colorClasses = '';
          if (!isTable) {
            colorClasses = 'bg-stone-100 dark:bg-neutral-800/80 border-stone-300 dark:border-neutral-700 text-stone-500';
          } else if (tableState === 'empty') {
            colorClasses = 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400';
          } else if (tableState === 'using') {
            colorClasses = 'bg-red-500/10 hover:bg-red-500/20 border-red-500 text-red-600 dark:text-red-400';
          } else if (tableState === 'temp-occupied') {
            colorClasses = 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400 animate-pulse border-2';
          } else if (tableState === 'reserved') {
            colorClasses = 'bg-[#3182f6]/10 hover:bg-[#3182f6]/20 border-[#3182f6] text-[#3182f6]';
          }

          return (
            <div
              key={el.id}
              onClick={() => isTable && setActiveControlId(el.id)}
              style={{
                position: 'absolute',
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
              }}
              className={`rounded-xl border flex flex-col items-center justify-center p-2 text-center transition-all ${colorClasses} ${
                isTable ? 'cursor-pointer hover:scale-[1.02] shadow-sm' : ''
              }`}
            >
              <span className="text-[10px] font-bold truncate max-w-full">
                {el.label}
              </span>
              {isTable && (
                <span className="text-[8px] opacity-75 mt-0.5">
                  {tableState === 'empty' && '비어있음'}
                  {tableState === 'using' && '사용중'}
                  {tableState === 'temp-occupied' && '5분점유'}
                  {tableState === 'reserved' && '예약됨'}
                </span>
              )}
            </div>
          );
        })}

        {/* Live Interactive Control Modal (Inline Popup) */}
        {activeControlId && activeControlElement && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1c1c1e] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-xs w-full shadow-2xl animate-scaleUp">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-100 dark:border-neutral-900 pb-2">
                <h4 className="text-xs font-bold text-black dark:text-white">
                  [{activeControlElement.label}] 좌석 상태 수동 제어
                </h4>
                <button 
                  onClick={() => setActiveControlId(null)}
                  className="text-neutral-400 hover:text-black dark:hover:text-white font-bold text-xs"
                >
                  닫기
                </button>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'empty')}
                  className="w-full py-2.5 rounded-xl border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/5 text-xs font-semibold cursor-pointer transition-all"
                >
                  빈 좌석으로 비우기
                </button>
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'using')}
                  className="w-full py-2.5 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/5 text-xs font-semibold cursor-pointer transition-all"
                >
                  수동 사용 시작 (착석)
                </button>
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'temp-occupied')}
                  className="w-full py-2.5 rounded-xl border border-amber-500/20 text-amber-500 hover:bg-amber-500/5 text-xs font-semibold cursor-pointer transition-all"
                >
                  5분 임시 선점 적용하기
                </button>
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'reserved')}
                  className="w-full py-2.5 rounded-xl border border-[#3182f6]/20 text-[#3182f6] hover:bg-[#3182f6]/5 text-xs font-semibold cursor-pointer transition-all"
                >
                  예약 좌석으로 설정
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
