import { Clock, BellRing, UtensilsCrossed } from 'lucide-react';
import type { PlacedElement } from '../../types/store';

interface KioskHeaderBarProps {
  storeName: string;
  assignedSeat: PlacedElement;
  lockTime: number;
  formatTime: (seconds: number) => string;
  onOpenSeatModal: () => void;
  onStaffCall: (type: string) => void;
}

export function KioskHeaderBar({
  storeName,
  assignedSeat,
  lockTime,
  formatTime,
  onOpenSeatModal,
  onStaffCall,
}: KioskHeaderBarProps) {
  return (
    <header className="bg-white dark:bg-[#09090b] border-b border-neutral-200 dark:border-white/10 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 select-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-none bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-sm">
          {assignedSeat.label}
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-[9.5px] font-black font-mono bg-emerald-500 text-white px-2 py-0.5 rounded-full">
              LIVE TABLE KIOSK
            </span>
            <span className="text-xs font-bold text-neutral-500">지정 좌석: {assignedSeat.label}</span>
          </div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white mt-0.5">{storeName}</h1>
        </div>
      </div>

      {/* Control Tools (5-min Lock Timer & Staff Call) */}
      <div className="flex items-center gap-3 flex-wrap">
        
        {/* 5-min Lock Timeout Badge */}
        <div className="px-3.5 py-1.5 rounded-none bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-center gap-2">
          <Clock className="w-4 h-4 animate-pulse" />
          <div className="text-left">
            <span className="text-[9px] font-mono font-bold block leading-none">SEAT LOCK TIMEOUT</span>
            <span className="text-xs font-mono font-black">{formatTime(lockTime)}</span>
          </div>
        </div>

        {/* Change Seat Button */}
        <button
          onClick={onOpenSeatModal}
          className="px-3 py-2 rounded-none bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 font-extrabold text-xs cursor-pointer border border-neutral-200 dark:border-white/10 flex items-center gap-1.5"
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>테이블 변경</span>
        </button>

        {/* Call Staff & Convenience Service Button */}
        <button
          onClick={() => onStaffCall('편의 서비스')}
          className="px-3.5 py-2 rounded-none bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90 flex items-center gap-1.5 shadow-none"
        >
          <BellRing className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>직원 호출 & 편의 서비스</span>
        </button>

      </div>
    </header>
  );
}
