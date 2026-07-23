import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';
import type { ReservationItem } from '../../../types/store';

interface ReservationListProps {
  reservations: ReservationItem[];
  onComplete: (resId: string, elementId: string, label: string) => void;
  onNoShow: (resId: string, elementId: string, label: string) => void;
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

export function ReservationList({
  reservations,
  onComplete,
  onNoShow,
}: ReservationListProps) {
  const pendingCount = reservations.filter((r) => r.status === 'pending').length;

  return (
    <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-none p-5 shadow-none dark:shadow-none backdrop-blur-xl select-none font-sans">
      <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white flex items-center gap-2 mb-4 border-b border-neutral-200 dark:border-white/5 pb-2.5 uppercase font-mono tracking-wider">
        <UserCheck className="w-4 h-4 text-[#000000]" />
        Reservations ({pendingCount} pending)
      </h3>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3 max-h-[190px] overflow-y-auto pr-1"
      >
        {reservations.map((item) => (
          <motion.div 
            variants={itemVariants}
            key={item.id}
            className="p-3.5 rounded-none border border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-black/45 flex flex-col gap-2.5 transition-all hover:border-neutral-300 dark:hover:border-white/10"
          >
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-neutral-900 dark:text-white">{item.guestName}</span>
                <span className="text-[9.5px] text-[#4e5968] dark:text-neutral-400 font-extrabold ml-1.5 font-mono">({item.peopleCount}명)</span>
              </div>
              <span className="font-mono text-[10.5px] text-[#000000] font-bold">{item.time}</span>
            </div>

            <div className="flex items-center justify-between mt-1 text-[9.5px] font-extrabold font-mono">
              <span className="px-2 py-0.5 rounded bg-[#000000]/10 text-[#000000] border border-[#000000]/20">
                지정석: {item.label}
              </span>

              {item.status === 'pending' ? (
                <div className="flex gap-1.5 font-sans">
                  <button
                    onClick={() => onComplete(item.id, item.elementId, item.label)}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-[#000000] to-[#000000] text-white font-extrabold cursor-pointer transition-opacity hover:opacity-90 shadow-none"
                  >
                    입정
                  </button>
                  <button
                    onClick={() => onNoShow(item.id, item.elementId, item.label)}
                    className="px-3 py-1 rounded-full border border-neutral-250 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-550 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white font-extrabold cursor-pointer transition-all"
                  >
                    노쇼
                  </button>
                </div>
              ) : (
                <span className={`font-bold font-sans text-[10px] uppercase tracking-wider ${item.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#f6384d]'}`}>
                  {item.status === 'completed' && '✓ Completed'}
                  {item.status === 'noshow' && '✗ No-Show'}
                </span>
              )}
            </div>
          </motion.div>
        ))}

        {reservations.length === 0 && (
          <p className="text-[10px] text-neutral-500 font-bold text-center py-6">
            오늘 접수된 예약 명단이 없습니다.
          </p>
        )}
      </motion.div>
    </div>
  );
}


