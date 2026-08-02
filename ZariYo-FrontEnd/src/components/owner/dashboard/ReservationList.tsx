import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';
import type { ReservationItem } from '../../../types/store';

interface ReservationListProps {
  reservations: ReservationItem[];
  onComplete: (resId: string, elementId: string, label: string) => void;
  onNoShow: (resId: string, elementId: string, label: string) => void;
  isDarkMode?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 }
};

export function ReservationList({
  reservations,
  onComplete,
  onNoShow,
  isDarkMode = false,
}: ReservationListProps) {
  const pendingCount = reservations.filter((r) => r.status === 'pending').length;

  return (
    <div className={`border rounded-[24px] p-5 transition-colors duration-300 select-none font-sans ${
      isDarkMode
        ? 'bg-[#141417] border-white/10 text-white shadow-xl shadow-black/40'
        : 'bg-[#ffffff] border-[#dddddd] text-[#000000] shadow-sm'
    }`}>
      <h3 className="text-xs font-black flex items-center justify-between mb-4 border-b border-neutral-200 dark:border-white/10 pb-3 uppercase font-mono tracking-wider">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#0381fe]" />
          <span>오늘 지정석 예약 명단 관제</span>
        </div>
        <span className="text-[11px] font-black font-mono text-[#0381fe] bg-[#0381fe]/15 px-2.5 py-0.5 rounded-[12px]">
          {pendingCount}건 대기
        </span>
      </h3>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3 max-h-[210px] overflow-y-auto pr-1 scrollbar-none"
      >
        {reservations.map((item) => (
          <motion.div 
            variants={itemVariants}
            key={item.id}
            className={`p-3.5 rounded-[18px] border transition-all ${
              isDarkMode
                ? 'bg-white/5 border-white/10 hover:border-white/20'
                : 'bg-[#f8f9fa] border-[#dddddd] hover:border-black'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight">{item.guestName}</span>
                <span className="text-[11px] text-neutral-400 font-extrabold">({item.peopleCount}명)</span>
              </div>
              <span className="text-xs text-[#0381fe] font-black">{item.time}</span>
            </div>

            <div className="flex items-center justify-between mt-2.5 text-[10px] font-bold font-mono">
              <span className={`px-2.5 py-0.5 rounded-[10px] font-black ${
                isDarkMode ? 'bg-[#0381fe]/15 text-[#0381fe]' : 'bg-[#000000]/10 text-[#000000]'
              }`}>
                지정석: {item.label}
              </span>

              {item.status === 'pending' ? (
                <div className="flex gap-1.5 font-sans">
                  <button
                    onClick={() => onComplete(item.id, item.elementId, item.label)}
                    className={`px-3 py-1 rounded-[12px] font-black text-[10px] cursor-pointer transition-all shadow-xs ${
                      isDarkMode
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                  >
                    입장 승인
                  </button>
                  <button
                    onClick={() => onNoShow(item.id, item.elementId, item.label)}
                    className="px-3 py-1 rounded-[12px] border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white font-black text-[10px] cursor-pointer transition-all shadow-xs"
                  >
                    노쇼 처리
                  </button>
                </div>
              ) : (
                <span className={`font-black font-sans text-[11px] uppercase tracking-wider ${item.status === 'completed' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {item.status === 'completed' && '✓ 입장 완료'}
                  {item.status === 'noshow' && '✗ 노쇼 차단'}
                </span>
              )}
            </div>
          </motion.div>
        ))}

        {reservations.length === 0 && (
          <p className="text-xs text-neutral-400 font-bold text-center py-6">
            오늘 접수된 지정석 예약 명단이 없습니다.
          </p>
        )}
      </motion.div>
    </div>
  );
}
