import type { PlacedElement } from '../../../types/store';

interface DashboardCanvasProps {
  placedElements: PlacedElement[];
  tableStates: Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>;
  tableMenuSummaries?: Record<string, string>;
  activeControlId: string | null;
  setActiveControlId: (id: string | null) => void;
  onControlState: (elementId: string, label: string, newState: 'empty' | 'using' | 'temp-occupied' | 'reserved') => void;
}

export function DashboardCanvas({
  placedElements,
  tableStates,
  tableMenuSummaries = {},
  activeControlId,
  setActiveControlId,
  onControlState,
}: DashboardCanvasProps) {
  const activeControlElement = placedElements.find((el) => el.id === activeControlId);

  return (
    <div className="lg:col-span-8 flex flex-col gap-3">
      <div className="flex justify-between items-center px-1 text-xs select-none">
        <span className="text-xs text-neutral-800 dark:text-neutral-200 font-bold flex items-center gap-2 font-sans">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0381fe] animate-ping" />
          삼성 SmartThings 실시간 2D 매장 관제 맵
        </span>
        <div className="flex gap-3 text-[11px] font-bold font-mono">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[20px] bg-emerald-500/20 border border-emerald-500" />공석 🟢</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[20px] bg-rose-500/20 border border-rose-500" />점유중 🔴</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[20px] bg-neutral-900/20 dark:bg-white/20 border border-neutral-800 dark:border-white" />예약됨 📋</span>
        </div>
      </div>

      {/* Live Cyber Glassmorphic Map Box - Samsung 20px Rounded Surface */}
      <div className="w-full h-[540px] md:h-[580px] bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 rounded-[20px] relative overflow-hidden select-none shadow-sm backdrop-blur-2xl">
        
        {/* Crisp Visible Grid Background Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />


        {placedElements.map((el) => {
          const isTable = el.type.startsWith('table-') || el.type === 'socket';
          const tableState = isTable ? (tableStates[el.id] || 'empty') : 'empty';

          // 실시간 주문 메뉴명 요약 (테이블 ID 또는 Label 매칭)
          const menuSummary = isTable ? (tableMenuSummaries[el.id] || tableMenuSummaries[el.label] || null) : null;

          let colorClasses = '';
          if (!isTable) {
            colorClasses = 'bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-neutral-400 dark:text-neutral-500 font-extrabold';
          } else if (tableState === 'empty') {
            colorClasses = 'bg-emerald-500/15 hover:bg-emerald-500/25 border-2 border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm font-black';
          } else if (tableState === 'using') {
            colorClasses = 'bg-rose-500/20 hover:bg-rose-500/30 border-2 border-rose-600 text-rose-800 dark:text-rose-200 font-black shadow-md';
          } else if (tableState === 'reserved') {
            colorClasses = 'bg-neutral-900/20 dark:bg-white/20 hover:bg-neutral-900/30 border-2 border-neutral-800 dark:border-white text-black dark:text-white font-black shadow-sm';
          } else {
            colorClasses = 'bg-emerald-500/15 hover:bg-emerald-500/25 border-2 border-emerald-600 text-emerald-800 dark:text-emerald-300 shadow-sm font-black';
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
              className={`rounded-none border flex flex-col items-center justify-center p-1 text-center transition-all overflow-hidden leading-none select-none ${colorClasses} ${
                isTable ? 'cursor-pointer hover:scale-[1.03] active:scale-95' : ''
              }`}
            >
              {/* 테이블 명칭 */}
              <span className="text-xs font-black font-mono tracking-tight truncate max-w-full text-neutral-950 dark:text-white drop-shadow-sm leading-none">
                {el.label}
              </span>
              
              {/* 테이블 상태 배지 */}
              {isTable && (
                <div className="flex flex-col items-center w-full mt-1 space-y-0.5 overflow-hidden">
                  <span className="text-[9px] font-mono font-black uppercase tracking-tight whitespace-nowrap px-1 py-0.5 rounded-[2px] bg-black/10 dark:bg-white/15 border border-black/10 dark:border-white/10 leading-none">
                    {tableState === 'using' ? '🔴점유중' : tableState === 'reserved' ? '📋예약' : '🟢공석'}
                  </span>
                  
                  {/* 실시간 메뉴명 배지 */}
                  {tableState === 'using' && menuSummary && (
                    <div className="w-full px-1 py-0.5 bg-rose-600 dark:bg-rose-500 text-white rounded-[2px] text-[8.5px] font-black font-mono leading-none truncate max-w-[95%] shadow-sm border border-white/20" title={menuSummary}>
                      🍽️ {menuSummary}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Live Interactive Control Modal */}
        {activeControlId && activeControlElement && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-30 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-none p-6 max-w-sm w-full shadow-none text-left">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-200 dark:border-white/5 pb-3 select-none">
                <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-widest font-mono">
                  [{activeControlElement.label}] 테이블 정보 및 상태 변경
                </h4>
                <button 
                  onClick={() => setActiveControlId(null)}
                  className="text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white font-extrabold text-xs transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>

              {/* 실시간 테이블 주문 내역 및 총합 금액 카드 */}
              {(tableMenuSummaries[activeControlElement.id] || tableMenuSummaries[activeControlElement.label]) && (
                <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-[3px] space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-red-600 dark:text-red-400 font-mono border-b border-red-500/20 pb-1.5">
                    <span>🍽️ 주문 메뉴 상세 정보</span>
                    <span>실시간 결제 대기</span>
                  </div>
                  <p className="text-xs font-extrabold text-neutral-900 dark:text-white leading-relaxed">
                    {tableMenuSummaries[activeControlElement.id] || tableMenuSummaries[activeControlElement.label]}
                  </p>
                </div>
              )}

              <div className="space-y-2 select-none">
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'empty')}
                  className="w-full py-3 rounded-full border border-neutral-200 dark:border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold cursor-pointer transition-all"
                >
                  빈 좌석으로 비우기
                </button>

                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'using')}
                  className="w-full py-3 rounded-full border border-neutral-200 dark:border-white/10 hover:border-red-500 hover:bg-red-500/10 text-red-500 text-xs font-bold cursor-pointer transition-all"
                >
                  수동 사용 시작 (착석)
                </button>
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'reserved')}
                  className="w-full py-3 rounded-full border border-neutral-200 dark:border-white/10 hover:border-black dark:hover:border-white text-black dark:text-white text-xs font-bold cursor-pointer transition-all"
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

