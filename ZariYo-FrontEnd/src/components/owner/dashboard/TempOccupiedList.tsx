import { motion } from 'framer-motion';
import { Clock, Play, XCircle } from 'lucide-react';
import type { TempOccupiedItem } from '../../../types/store';

interface TempOccupiedListProps {
  tempOccupations: TempOccupiedItem[];
  onConfirm: (elementId: string, label: string) => void;
  onCancel: (elementId: string, label: string) => void;
  isDarkMode?: boolean;
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
  isDarkMode = false,
}: TempOccupiedListProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`border rounded-[24px] p-5 transition-colors duration-300 select-none font-sans ${
      isDarkMode
        ? 'bg-[#141417] border-white/10 text-white shadow-lg shadow-black/40'
        : 'bg-[#ffffff] border-[#dddddd] text-[#000000] shadow-sm'
    }`}>
      <h3 className="text-xs font-black flex items-center justify-between mb-4 border-b border-neutral-200 dark:border-white/10 pb-3 uppercase font-mono tracking-wider">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500 animate-spin" />
          <span>5분 임시 선점 락 관제</span>
        </div>
        <span className="text-[10.5px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-[12px]">
          {tempOccupations.length}건 대기
        </span>
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
              className={`p-3.5 rounded-[18px] border flex items-center justify-between transition-all ${
                isCritical 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 animate-pulse' 
                  : isDarkMode
                    ? 'bg-black/30 border-white/5'
                    : 'bg-[#f7f7f7] border-[#dddddd]'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-black font-mono">
                  좌석 {item.label}
                </span>
                <span className="text-[9px] font-bold mt-0.5 uppercase tracking-widest font-mono text-amber-500">
                  {isCritical ? '🚨 선점 만료 임박' : '300초 락 카운트다운'}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs font-black text-rose-500">
                  {formatTime(item.timeLeft)}
                </span>
                <button
                  onClick={() => onConfirm(item.elementId, item.label)}
                  className={`p-2 rounded-full transition-all cursor-pointer border ${
                    isDarkMode
                      ? 'bg-[#0381fe] border-[#0381fe] text-white hover:bg-[#0381fe]/80'
                      : 'bg-[#000000] border-[#000000] text-white hover:bg-neutral-800'
                  }`}
                  title="착석 강제 승인"
                >
                  <Play className="w-3 h-3 fill-current" />
                </button>
                <button
                  onClick={() => onCancel(item.elementId, item.label)}
                  className="p-2 rounded-full bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-all cursor-pointer border border-rose-500/20"
                  title="선점 락 강제 해제"
                >
                  <XCircle className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          );
        })}

        {tempOccupations.length === 0 && (
          <p className="text-[11px] text-neutral-400 font-bold text-center py-6">
            현재 대기중인 5분 임시 선점 요청이 없습니다.
          </p>
        )}
      </motion.div>
    </div>
  );
}
