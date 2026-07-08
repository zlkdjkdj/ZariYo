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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6 select-none">
      {/* Active seats */}
      <div className="bg-white dark:bg-[#1c1c1e] border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-neutral-500 mb-2">
          <span className="text-xs font-semibold">총 좌석 점유율</span>
          <Armchair className="w-4 h-4 text-neutral-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-red-500">{usingCount}</span>
          <span className="text-xs text-neutral-400">/ {totalTables}석 ({occupiedRate}%)</span>
        </div>
      </div>

      {/* Temp Occupations */}
      <div className="bg-white dark:bg-[#1c1c1e] border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-neutral-500 mb-2">
          <span className="text-xs font-semibold">5분 임시 선점</span>
          <Clock className="w-4 h-4 text-amber-500" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-amber-500">{tempOccupiedCount}</span>
          <span className="text-xs text-neutral-400">건 대기중</span>
        </div>
      </div>

      {/* Reservations */}
      <div className="bg-white dark:bg-[#1c1c1e] border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-neutral-500 mb-2">
          <span className="text-xs font-semibold">당일 예약 확정</span>
          <UserCheck className="w-4 h-4 text-blue-500" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-[#3182f6]">{reservedCount}</span>
          <span className="text-xs text-neutral-400">석 예약됨</span>
        </div>
      </div>

      {/* Empty seats */}
      <div className="bg-white dark:bg-[#1c1c1e] border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between text-neutral-500 mb-2">
          <span className="text-xs font-semibold">여유 빈 좌석</span>
          <Armchair className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-emerald-500">{emptyCount}</span>
          <span className="text-xs text-neutral-400">석 가능</span>
        </div>
      </div>
    </div>
  );
}
