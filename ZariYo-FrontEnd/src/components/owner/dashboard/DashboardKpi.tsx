import { Armchair, Clock, UserCheck } from 'lucide-react';

interface DashboardKpiProps {
  usingCount: number;
  tempOccupiedCount: number;
  reservedCount: number;
  emptyCount: number;
  totalTables: number;
}

export function DashboardKpi({
  usingCount,
  tempOccupiedCount,
  reservedCount,
  emptyCount,
  totalTables,
}: DashboardKpiProps) {
  const occupiedRate = Math.round((usingCount / (totalTables || 1)) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6 select-none font-sans">
      {/* Active seats */}
      <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.015)] dark:shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between text-[#4e5968] dark:text-neutral-400 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider">실시간 점유율</span>
          <Armchair className="w-4.5 h-4.5 text-[#f6384d]" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-[#f6384d] tracking-tight">{usingCount}</span>
          <span className="text-[10px] text-neutral-550 dark:text-neutral-400 font-extrabold">/ {totalTables}석 ({occupiedRate}%)</span>
        </div>
      </div>

      {/* Temp Occupations */}
      <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.015)] dark:shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between text-[#4e5968] dark:text-neutral-400 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider">5분 선점대기</span>
          <Clock className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-amber-500 tracking-tight">{tempOccupiedCount}</span>
          <span className="text-[10px] text-neutral-555 dark:text-neutral-400 font-extrabold">건 활성</span>
        </div>
      </div>

      {/* Reservations */}
      <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.015)] dark:shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between text-[#4e5968] dark:text-neutral-400 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider">당일 예약대기</span>
          <UserCheck className="w-4.5 h-4.5 text-[#3182f6]" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-[#3182f6] tracking-tight">{reservedCount}</span>
          <span className="text-[10px] text-neutral-555 dark:text-neutral-400 font-extrabold">석 대기</span>
        </div>
      </div>

      {/* Empty seats */}
      <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.015)] dark:shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between text-[#4e5968] dark:text-neutral-400 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider">잔여 공석</span>
          <Armchair className="w-4.5 h-4.5 text-emerald-500" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">{emptyCount}</span>
          <span className="text-[10px] text-neutral-555 dark:text-neutral-400 font-extrabold">석 즉시입정</span>
        </div>
      </div>
    </div>
  );
}


