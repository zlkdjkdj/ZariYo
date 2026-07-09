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
      <div className="flex justify-between items-center px-1 text-xs select-none">
        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-bold">
          실시간 매장 도면 관제 현황
        </span>
        <div className="flex gap-3 text-[9px] font-bold font-mono">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500/10 border border-emerald-500" />공석</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#f6384d]/10 border border-[#f6384d]" />점유중</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500/10 border border-amber-500 animate-pulse" />선점대기</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#3182f6]/10 border border-[#3182f6]" />예약됨</span>
        </div>
      </div>

      {/* Live Map Box */}
      <div className="w-full h-[520px] bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/10 rounded-2xl relative overflow-hidden select-none shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        
        {/* Responsive Grid Background Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />

        {placedElements.map((el) => {
          const isTable = el.type.startsWith('table-') || el.type === 'socket';
          const tableState = isTable ? (tableStates[el.id] || 'empty') : 'empty';

          let colorClasses = '';
          if (!isTable) {
            colorClasses = 'bg-neutral-100 dark:bg-[#1c1c1e]/40 border-neutral-200 dark:border-white/5 text-neutral-400 dark:text-neutral-500';
          } else if (tableState === 'empty') {
            colorClasses = 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/60 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.06)]';
          } else if (tableState === 'using') {
            colorClasses = 'bg-[#fee3e6] hover:bg-[#fee3e6]/80 dark:bg-[#f6384d]/10 border-[#ffb1b8] dark:border-[#f6384d]/40 text-[#f6384d] shadow-[0_0_12px_rgba(246,56,77,0.03)]';
          } else if (tableState === 'temp-occupied') {
            colorClasses = 'bg-[#fff1db] hover:bg-[#fff1db]/80 dark:bg-[#f59f00]/15 border-amber-500 text-amber-600 animate-pulse border-2 shadow-[0_0_12px_rgba(245,158,11,0.12)]';
          } else if (tableState === 'reserved') {
            colorClasses = 'bg-[#e8f3ff] hover:bg-[#e8f3ff]/80 dark:bg-[#3182f6]/10 border-[#b3d7ff] dark:border-[#3182f6]/40 text-[#3182f6] shadow-[0_0_12px_rgba(49,130,246,0.03)]';
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
              <span className="text-[10px] font-black tracking-tight truncate max-w-full text-neutral-850 dark:text-white">
                {el.label}
              </span>
              {isTable && (
                <span className="text-[7.5px] opacity-75 mt-0.5 font-bold uppercase tracking-wider">
                  {tableState === 'empty' && '공석'}
                  {tableState === 'using' && '점유중'}
                  {tableState === 'temp-occupied' && '선점대기'}
                  {tableState === 'reserved' && '예약됨'}
                </span>
              )}
            </div>
          );
        })}

        {/* Live Interactive Control Modal */}
        {activeControlId && activeControlElement && (
          <div className="absolute inset-0 bg-black/45 dark:bg-black/60 backdrop-blur-md z-30 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/15 rounded-2xl p-6 max-w-xs w-full shadow-[0_30px_70px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.8)] animate-scaleUp">
              <div className="flex items-center justify-between mb-5 border-b border-neutral-200 dark:border-white/5 pb-3 select-none">
                <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-widest font-mono">
                  [{activeControlElement.label}] 좌석 상태 변경
                </h4>
                <button 
                  onClick={() => setActiveControlId(null)}
                  className="text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white font-extrabold text-xs transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>

              <div className="space-y-2 select-none">
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'empty')}
                  className="w-full py-3 rounded-full border border-neutral-200 dark:border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold cursor-pointer transition-all"
                >
                  빈 좌석으로 비우기
                </button>
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'using')}
                  className="w-full py-3 rounded-full border border-neutral-200 dark:border-white/10 hover:border-[#f6384d] hover:bg-[#f6384d]/10 text-[#f6384d] text-xs font-bold cursor-pointer transition-all"
                >
                  수동 사용 시작 (착석)
                </button>
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'temp-occupied')}
                  className="w-full py-3 rounded-full border border-neutral-200 dark:border-white/10 hover:border-amber-500 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold cursor-pointer transition-all"
                >
                  5분 임시 선점 설정
                </button>
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'reserved')}
                  className="w-full py-3 rounded-full border border-neutral-200 dark:border-white/10 hover:border-[#3182f6] hover:bg-[#3182f6]/10 text-[#3182f6] text-xs font-bold cursor-pointer transition-all"
                >
                  지정 예약석 배정
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


