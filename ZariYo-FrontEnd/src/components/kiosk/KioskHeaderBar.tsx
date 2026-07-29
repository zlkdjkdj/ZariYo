import { BellRing, UtensilsCrossed } from 'lucide-react';

import type { PlacedElement } from '../../types/store';

interface KioskHeaderBarProps {
  storeName: string;
  assignedSeat: PlacedElement;
  onOpenSeatModal: () => void;
  onStaffCall: (type: string) => void;
}

export function KioskHeaderBar({
  storeName,
  assignedSeat,
  onOpenSeatModal,
  onStaffCall,
}: KioskHeaderBarProps) {

  return (
    <header className="bg-white dark:bg-[#09090b] border-b-2 border-neutral-200 dark:border-white/15 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 select-none shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-none bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-base shadow-md">
          {assignedSeat.label}
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-black font-mono bg-emerald-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
              LIVE KIOSK
            </span>
            <span className="text-sm font-extrabold text-neutral-600 dark:text-neutral-300">지정 좌석: {assignedSeat.label}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-neutral-950 dark:text-white mt-0.5">{storeName}</h1>
        </div>
      </div>

      {/* Control Tools (Change Seat & Staff Call) */}
      <div className="flex items-center gap-3 flex-wrap">


        {/* Change Seat Button */}
        <button
          onClick={onOpenSeatModal}
          className="px-4 py-2.5 rounded-none bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-neutral-900 dark:text-neutral-100 font-black text-xs md:text-sm cursor-pointer border border-neutral-300 dark:border-white/15 flex items-center gap-2 transition-all hover:scale-105"
        >
          <UtensilsCrossed className="w-4 h-4 text-orange-500" />
          <span>테이블 변경</span>
        </button>

        {/* Call Staff & Convenience Service Button */}
        <button
          onClick={() => onStaffCall('편의 서비스')}
          className="px-4.5 py-2.5 rounded-none bg-black text-white dark:bg-white dark:text-black font-black text-xs md:text-sm cursor-pointer hover:opacity-90 flex items-center gap-2 shadow-md transition-all hover:scale-105"
        >
          <BellRing className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
          <span>직원 호출 & 편의 서비스</span>
        </button>
      </div>

    </header>
  );
}
