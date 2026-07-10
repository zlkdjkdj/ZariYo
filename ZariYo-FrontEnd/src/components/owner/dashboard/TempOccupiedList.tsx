import { motion } from 'framer-motion';
import { Clock, Play, XCircle } from 'lucide-react';
import type { TempOccupiedItem } from '../../../types/store';

interface TempOccupiedListProps {
  tempOccupations: TempOccupiedItem[];
  onConfirm: (elementId: string, label: string) => void;
  onCancel: (elementId: string, label: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

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
    <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.015)] dark:shadow-lg backdrop-blur-xl select-none font-sans">
      <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white flex items-center gap-2 mb-4 border-b border-neutral-200 dark:border-white/5 pb-2.5 uppercase font-mono tracking-wider">
        <Clock className="w-4 h-4 text-[#3182f6]" />
        Temp Occupancy List ({tempOccupations.length})
      </h3>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-2 max-h-[160px] overflow-y-auto pr-1"
      >
        {tempOccupations.map((item) => {
          const isCritical = item.timeLeft <= 60;
          return (
            <motion.div
              variants={itemVariants}
              key={item.id}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                isCritical 
                  ? 'bg-red-500/10 border-red-500/30 text-[#f6384d] animate-pulse shadow-[0_0_12px_rgba(246,56,77,0.15)]' 
                  : 'bg-neutral-50 dark:bg-black/40 border-neutral-200 dark:border-white/5'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-black text-neutral-900 dark:text-white">
                  좌석 {item.label}
                </span>
                <span className="text-[8px] text-[#4e5968] dark:text-neutral-400 font-extrabold mt-0.5 uppercase tracking-widest font-mono">
                  {isCritical ? '🚨 Time Out soon' : 'Reservation Pending'}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs font-bold text-neutral-800 dark:text-white">
                  {formatTime(item.timeLeft)}
                </span>
                <button
                  onClick={() => onConfirm(item.elementId, item.label)}
                  className="p-1.5 rounded-lg bg-[#3182f6]/10 hover:bg-[#3182f6] dark:bg-[#3182f6]/10 dark:hover:bg-[#3182f6] text-[#3182f6] hover:text-white dark:hover:text-white transition-all cursor-pointer border border-transparent"
                  title="강제 확정(착석)"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
                <button
                  onClick={() => onCancel(item.elementId, item.label)}
                  className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-all cursor-pointer border border-transparent"
                  title="선점 취소"
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}

        {tempOccupations.length === 0 && (
          <p className="text-[10px] text-neutral-500 font-bold text-center py-6">
            현재 대기중인 임시 선점 요청이 없습니다.
          </p>
        )}
      </motion.div>
    </div>
  );
}


