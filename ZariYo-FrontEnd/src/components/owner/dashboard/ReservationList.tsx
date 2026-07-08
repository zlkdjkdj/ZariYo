import { UserCheck } from 'lucide-react';
import type { ReservationItem } from '../../../types/store';

interface ReservationListProps {
  reservations: ReservationItem[];
  onComplete: (resId: string, elementId: string, label: string) => void;
  onNoShow: (resId: string, elementId: string, label: string) => void;
}

export function ReservationList({
  reservations,
  onComplete,
  onNoShow,
}: ReservationListProps) {
  const pendingCount = reservations.filter((r) => r.status === 'pending').length;

  return (
    <div className="bg-white dark:bg-[#1c1c1e] border border-neutral-200/50 dark:border-neutral-800/80 rounded-3xl p-6 shadow-sm">
      <h3 className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 mb-4 border-b border-neutral-100 dark:border-neutral-900 pb-2">
        <UserCheck className="w-4 h-4 text-[#3182f6]" />
        당일 예약 리스트 ({pendingCount}건 대기)
      </h3>

      <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
        {reservations.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-black dark:text-white">{item.guestName}</span>
                <span className="text-[10px] text-neutral-400 ml-1.5">({item.peopleCount}명)</span>
              </div>
              <span className="font-mono text-neutral-500 dark:text-[#a1a1a6]">{item.time}</span>
            </div>

            <div className="flex items-center justify-between mt-1 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-[#3182f6]/10 text-[#3182f6] font-bold">
                지정석: {item.label}
              </span>

              {item.status === 'pending' ? (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onComplete(item.id, item.elementId, item.label)}
                    className="px-2.5 py-1 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold cursor-pointer transition-colors"
                  >
                    입정 완료
                  </button>
                  <button
                    onClick={() => onNoShow(item.id, item.elementId, item.label)}
                    className="px-2.5 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer transition-colors"
                  >
                    노쇼 처리
                  </button>
                </div>
              ) : (
                <span className={`font-semibold ${item.status === 'completed' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {item.status === 'completed' && '✓ 입정 완료됨'}
                  {item.status === 'noshow' && '✗ 노쇼 취소됨'}
                </span>
              )}
            </div>
          </div>
        ))}

        {reservations.length === 0 && (
          <p className="text-[10px] text-neutral-400 text-center py-6">
            오늘 접수된 예약이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
