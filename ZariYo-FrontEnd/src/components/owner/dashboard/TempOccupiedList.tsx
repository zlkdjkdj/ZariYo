import { Clock, Play, XCircle } from 'lucide-react';
import type { TempOccupiedItem } from '../../../types/store';

interface TempOccupiedListProps {
  tempOccupations: TempOccupiedItem[];
  onConfirm: (elementId: string, label: string) => void;
  onCancel: (elementId: string, label: string) => void;
}

export function TempOccupiedList({
  tempOccupations,
  onConfirm,
  onCancel,
}: TempOccupiedListProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-[#1c1c1e] border border-neutral-200/50 dark:border-neutral-800/80 rounded-3xl p-6 shadow-sm">
      <h3 className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 mb-4 border-b border-neutral-100 dark:border-neutral-900 pb-2">
        <Clock className="w-4 h-4 text-amber-500" />
        5분 임시 선점 목록 ({tempOccupations.length}건)
      </h3>

      <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
        {tempOccupations.map((item) => {
          const isCritical = item.timeLeft <= 60;
          return (
            <div
              key={item.id}
              className={`p-3 rounded-xl border flex items-center justify-between ${
                isCritical 
                  ? 'bg-red-500/5 border-red-500/40 text-red-500 animate-pulse' 
                  : 'bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-black dark:text-white">
                  좌석 {item.label} 선점중
                </span>
                <span className="text-[9px] text-neutral-400 mt-0.5">
                  {isCritical ? '⏰ 만료 1분 전 경고!' : '선점 자동 해제 대기'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold">
                  {formatTime(item.timeLeft)}
                </span>
                <button
                  onClick={() => onConfirm(item.elementId, item.label)}
                  className="p-1 rounded bg-[#3182f6]/10 text-[#3182f6] hover:bg-[#3182f6] hover:text-white transition-colors cursor-pointer"
                  title="강제 확정(착석)"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onCancel(item.elementId, item.label)}
                  className="p-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  title="선점 취소"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {tempOccupations.length === 0 && (
          <p className="text-[10px] text-neutral-400 text-center py-6">
            현재 대기중인 임시 선점 요청이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
