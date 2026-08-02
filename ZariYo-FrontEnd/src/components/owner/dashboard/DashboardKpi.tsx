import { Armchair, Clock, UserCheck, CheckCircle, TrendingUp } from 'lucide-react';

interface DashboardKpiProps {
  usingCount: number;
  tempOccupiedCount: number;
  reservedCount: number;
  emptyCount: number;
  totalTables: number;
  isDarkMode?: boolean;
}

export function DashboardKpi({
  usingCount,
  tempOccupiedCount,
  reservedCount,
  emptyCount,
  totalTables,
  isDarkMode = false,
}: DashboardKpiProps) {
  const occupiedRate = Math.round((usingCount / (totalTables || 1)) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6 select-none font-sans">
      {/* 1. Realtime Occupied */}
      <div className={`relative overflow-hidden p-6 rounded-[24px] transition-all duration-300 border ${
        isDarkMode
          ? 'bg-[#141417] border-white/10 text-white shadow-lg shadow-black/40 hover:border-[#0381fe]/50'
          : 'bg-[#ffffff] border-[#dddddd] text-[#000000] shadow-sm hover:border-[#000000]'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-black uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-[20px]">
            REALTIME OCCUPIED
          </span>
          <div className="w-9 h-9 rounded-full bg-rose-500/10 flex items-center justify-center">
            <Armchair className="w-5 h-5 text-rose-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight font-mono">{usingCount}</span>
          <span className={`text-xs font-bold font-mono ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
            / {totalTables}석 ({occupiedRate}%)
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-rose-500 font-extrabold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>실시간 착석율 계산중</span>
        </div>
      </div>

      {/* 2. 5-Min Temp Held Lock */}
      <div className={`relative overflow-hidden p-6 rounded-[24px] transition-all duration-300 border ${
        isDarkMode
          ? 'bg-[#141417] border-white/10 text-white shadow-lg shadow-black/40 hover:border-amber-500/50'
          : 'bg-[#ffffff] border-[#dddddd] text-[#000000] shadow-sm hover:border-[#000000]'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-[20px]">
            5-MIN TEMP HELD
          </span>
          <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-500 animate-spin" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight font-mono">{tempOccupiedCount}</span>
          <span className={`text-xs font-bold font-mono ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
            건 락 활성
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-500 font-extrabold">
          <span>원자성 300초 선점 차단중</span>
        </div>
      </div>

      {/* 3. Reserved Queue */}
      <div className={`relative overflow-hidden p-6 rounded-[24px] transition-all duration-300 border ${
        isDarkMode
          ? 'bg-[#141417] border-white/10 text-white shadow-lg shadow-black/40 hover:border-[#0381fe]/50'
          : 'bg-[#ffffff] border-[#dddddd] text-[#000000] shadow-sm hover:border-[#000000]'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[11px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-[20px] ${
            isDarkMode ? 'text-[#0381fe] bg-[#0381fe]/10' : 'text-[#000000] bg-[#000000]/10'
          }`}>
            RESERVED QUEUE
          </span>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-[#0381fe]/10 text-[#0381fe]' : 'bg-[#000000]/10 text-[#000000]'
          }`}>
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight font-mono">{reservedCount}</span>
          <span className={`text-xs font-bold font-mono ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
            석 예약 확정
          </span>
        </div>
        <div className={`mt-2 flex items-center gap-1 text-[11px] font-extrabold ${
          isDarkMode ? 'text-[#0381fe]' : 'text-[#000000]'
        }`}>
          <span>입장 대기 명단 수선</span>
        </div>
      </div>

      {/* 4. Available Seats */}
      <div className={`relative overflow-hidden p-6 rounded-[24px] transition-all duration-300 border ${
        isDarkMode
          ? 'bg-[#141417] border-white/10 text-white shadow-lg shadow-black/40 hover:border-emerald-500/50'
          : 'bg-[#ffffff] border-[#dddddd] text-[#000000] shadow-sm hover:border-[#000000]'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-[20px]">
            AVAILABLE SEATS
          </span>
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black tracking-tight font-mono">{emptyCount}</span>
          <span className={`text-xs font-bold font-mono ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
            석 원터치 배정 가능
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-500 font-extrabold">
          <span>즉시 착석 공석 홀</span>
        </div>
      </div>
    </div>
  );
}
