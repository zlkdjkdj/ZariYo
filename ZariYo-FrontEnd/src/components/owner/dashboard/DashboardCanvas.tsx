import type { PlacedElement } from '../../../types/store';

interface DashboardCanvasProps {
  placedElements: PlacedElement[];
  tableStates: Record<string, 'empty' | 'using' | 'temp-occupied' | 'reserved'>;
  tableMenuSummaries?: Record<string, string>;
  activeControlId: string | null;
  setActiveControlId: (id: string | null) => void;
  onControlState: (elementId: string, label: string, newState: 'empty' | 'using' | 'temp-occupied' | 'reserved') => void;
  isDarkMode?: boolean;
}

export function DashboardCanvas({
  placedElements,
  tableStates,
  tableMenuSummaries = {},
  activeControlId,
  setActiveControlId,
  onControlState,
  isDarkMode = false,
}: DashboardCanvasProps) {
  const activeControlElement = placedElements.find((el) => el.id === activeControlId);

  return (
    <div className="lg:col-span-8 flex flex-col gap-3 font-sans">
      <div className="flex justify-between items-center px-1 text-xs select-none">
        <span className={`text-xs font-black flex items-center gap-2 font-sans ${
          isDarkMode ? 'text-white' : 'text-[#000000]'
        }`}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#0381fe] animate-ping" />
          SmartThings 2D 매장 실시간 관제 도면 캔버스
        </span>
        <div className="flex gap-3 text-[11px] font-bold font-mono">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500" />공석 🟢</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500" />점유중 🔴</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0381fe]/20 border border-[#0381fe]" />예약 📋</span>
        </div>
      </div>

      {/* Live Cyber Map Canvas Box - Samsung 24px Rounded Surface */}
      <div className={`w-full h-[540px] md:h-[580px] border rounded-[24px] relative overflow-hidden select-none transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#141417] border-white/10 shadow-2xl shadow-black/40'
          : 'bg-[#ffffff] border-[#dddddd] shadow-sm'
      }`}>
        
        {/* Crisp Visible Grid Lines */}
        <div className={`absolute inset-0 bg-[size:30px_30px] pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]'
        }`} />

        {placedElements.map((el) => {
          const isTable = el.type.startsWith('table-') || el.type === 'socket';
          const tableState = isTable ? (tableStates[el.id] || 'empty') : 'empty';

          // 실시간 주문 메뉴명 요약 (테이블 ID 또는 Label 매칭)
          const menuSummary = isTable ? (tableMenuSummaries[el.id] || tableMenuSummaries[el.label] || null) : null;

          let colorClasses = '';
          if (!isTable) {
            colorClasses = isDarkMode
              ? 'bg-white/5 border-white/10 text-neutral-400 font-extrabold'
              : 'bg-neutral-100 border-[#dddddd] text-[#707070] font-extrabold';
          } else if (tableState === 'empty') {
            colorClasses = 'bg-emerald-500/15 hover:bg-emerald-500/25 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-black shadow-sm';
          } else if (tableState === 'using') {
            colorClasses = 'bg-rose-500/20 hover:bg-rose-500/30 border-2 border-rose-500 text-rose-600 dark:text-rose-400 font-black shadow-md';
          } else if (tableState === 'reserved') {
            colorClasses = isDarkMode
              ? 'bg-[#0381fe]/20 hover:bg-[#0381fe]/30 border-2 border-[#0381fe] text-[#0381fe] font-black'
              : 'bg-black/10 hover:bg-black/20 border-2 border-[#000000] text-[#000000] font-black';
          } else {
            colorClasses = 'bg-emerald-500/15 hover:bg-emerald-500/25 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-black shadow-sm';
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
              className={`rounded-[16px] border flex flex-col items-center justify-center p-1.5 text-center transition-all overflow-hidden leading-tight select-none box-border ${colorClasses} ${
                isTable ? 'cursor-pointer hover:scale-[1.03] active:scale-95' : ''
              }`}
            >
              {/* 테이블 명칭 */}
              <span className={`text-[11px] font-black font-mono tracking-tight truncate max-w-full leading-none mb-0.5 ${
                isDarkMode ? 'text-white' : 'text-[#000000]'
              }`}>
                {el.label}
              </span>
              
              {/* 테이블 상태 배지 - 스마트 한 줄 / 콤팩트 렌더링으로 오버플로우 원천 차단 */}
              {isTable && (
                <div className="flex flex-col items-center w-full overflow-hidden shrink-0">
                  {tableState === 'using' && menuSummary ? (
                    <div className="w-full px-1 py-0.5 bg-rose-600 text-white rounded-[6px] text-[7.5px] font-black font-mono leading-none truncate max-w-[98%] shadow-xs" title={`🔴점유중 | ${menuSummary}`}>
                      ★ {menuSummary}
                    </div>
                  ) : (
                    <span className="text-[8.5px] font-mono font-black uppercase tracking-tight whitespace-nowrap px-1.5 py-0.5 rounded-[8px] bg-black/10 dark:bg-white/15 leading-none">
                      {tableState === 'using' ? '🔴점유중' : tableState === 'reserved' ? '📋예약' : '🟢공석'}
                    </span>
                  )}
                </div>
              )}
            </div>
          );

        })}

        {/* Live Interactive Side-by-Side Receipt Modal */}
        {activeControlId && activeControlElement && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-30 flex items-center justify-center p-4">
            <div className={`border rounded-[24px] p-6 max-w-sm w-full text-left shadow-2xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#09090b] border-white/10 text-white' : 'bg-[#ffffff] border-[#dddddd] text-[#000000]'
            }`}>
              <div className="flex items-center justify-between mb-4 border-b border-neutral-200 dark:border-white/10 pb-3 select-none">
                <h4 className="text-xs font-black uppercase tracking-wider font-mono">
                  [{activeControlElement.label}] 수선서 & 상태 제어
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
                <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-[16px] space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-rose-500 font-mono border-b border-rose-500/20 pb-1.5">
                    <span>🍽️ 주문 메뉴 수선서 상세</span>
                    <span>실시간 결제 대기</span>
                  </div>
                  <p className="text-xs font-extrabold leading-relaxed">
                    {tableMenuSummaries[activeControlElement.id] || tableMenuSummaries[activeControlElement.label]}
                  </p>
                </div>
              )}

              <div className="space-y-2 select-none">
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'empty')}
                  className="w-full py-3 rounded-[20px] border border-emerald-500/30 hover:border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold cursor-pointer transition-all"
                >
                  빈 좌석으로 비우기
                </button>

                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'using')}
                  className="w-full py-3 rounded-[20px] border border-rose-500/30 hover:border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-extrabold cursor-pointer transition-all"
                >
                  수동 착석 처리
                </button>
                <button
                  onClick={() => onControlState(activeControlElement.id, activeControlElement.label, 'reserved')}
                  className={`w-full py-3 rounded-[20px] border text-xs font-extrabold cursor-pointer transition-all ${
                    isDarkMode
                      ? 'border-[#0381fe]/30 hover:border-[#0381fe] bg-[#0381fe]/10 text-[#0381fe]'
                      : 'border-[#000000]/30 hover:border-[#000000] bg-[#000000]/10 text-[#000000]'
                  }`}
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
