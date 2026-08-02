import { X } from 'lucide-react';
import type { PlacedElement } from '../../types/store';

interface KioskSeatChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  placedElements: PlacedElement[];
  assignedSeat: PlacedElement;
  onSelectSeat: (seat: PlacedElement) => void;
}

export function KioskSeatChangeModal({
  isOpen,
  onClose,
  placedElements,
  assignedSeat,
  onSelectSeat,
}: KioskSeatChangeModalProps) {
  if (!isOpen) return null;

  const reservableSeats = placedElements.filter((e) => e.isReservable);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-none p-6 max-w-md w-full text-left space-y-4 shadow-2xl">
        <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-white/10">
          <h3 className="font-black text-base text-neutral-900 dark:text-white">테이블 변경 선택</h3>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {reservableSeats.map((el) => {
            const isSelected = assignedSeat.id === el.id;
            return (
              <button
                key={el.id}
                onClick={() => onSelectSeat(el)}
                className={`py-3 rounded-none border font-black text-xs cursor-pointer transition-all hover:scale-105 ${
                  isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-white/10'
                }`}
              >
                {el.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
