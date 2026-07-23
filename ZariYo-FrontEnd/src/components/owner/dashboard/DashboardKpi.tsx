import { Armchair, Clock, UserCheck, CheckCircle } from 'lucide-react';

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
      <div className="relative overflow-hidden bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-none p-5 shadow-none backdrop-blur-2xl group hover:border-red-500/40 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-red-500">REALTIME OCCUPIED</span>
          <Armchair className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">{usingCount}</span>
          <span className="text-xs text-neutral-400 font-extrabold font-mono">/ {totalTables}석 ({occupiedRate}%)</span>
        </div>
      </div>

      {/* Temp Occupations */}
      <div className="relative overflow-hidden bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-none p-5 shadow-none backdrop-blur-2xl group hover:border-orange-500/40 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-orange-500">5-MIN TEMP HELD</span>
          <Clock className="w-5 h-5 text-orange-500 animate-spin" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">{tempOccupiedCount}</span>
          <span className="text-xs text-neutral-400 font-extrabold font-mono">건 활성 락</span>
        </div>
      </div>

      {/* Reservations */}
      <div className="relative overflow-hidden bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-none p-5 shadow-none backdrop-blur-2xl group hover:border-[#000000]/40 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#000000]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#000000]">RESERVED QUEUE</span>
          <UserCheck className="w-5 h-5 text-[#000000]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">{reservedCount}</span>
          <span className="text-xs text-neutral-400 font-extrabold font-mono">석 예약 완료</span>
        </div>
      </div>

      {/* Empty seats */}
      <div className="relative overflow-hidden bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-none p-5 shadow-none backdrop-blur-2xl group hover:border-emerald-500/40 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-2">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-500">AVAILABLE SEATS</span>
          <CheckCircle className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">{emptyCount}</span>
          <span className="text-xs text-neutral-400 font-extrabold font-mono">석 착석 가능</span>
        </div>
      </div>
    </div>
  );
}
