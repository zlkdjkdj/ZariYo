import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Clock, AlertTriangle, Armchair, Receipt } from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'order' | 'lock' | 'reservation' | 'alert';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  isDarkMode?: boolean;
}

export function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll,
  isDarkMode = false,
}: NotificationDrawerProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <Receipt className="w-4 h-4 text-emerald-500" />;
      case 'lock':
        return <Clock className="w-4 h-4 text-amber-500 animate-spin" />;
      case 'reservation':
        return <Armchair className="w-4 h-4 text-[#0381fe]" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end font-sans select-none">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`w-full max-w-md h-full border-l p-6 flex flex-col justify-between shadow-2xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#09090b] border-white/10 text-white' : 'bg-white border-[#dddddd] text-[#000000]'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="relative p-2 rounded-[14px] bg-[#0381fe]/10 text-[#0381fe]">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-mono font-black flex items-center justify-center animate-bounce">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight">매장 실시간 알림 센터</h3>
                    <p className="text-[10.5px] font-mono text-neutral-400 font-bold">
                      {unreadCount}개의 안 읽은 수선 및 이벤트
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400 hover:text-white" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-white/5 text-xs font-mono">
                <button
                  onClick={onMarkAllAsRead}
                  className="text-[#0381fe] hover:underline font-extrabold flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>모두 읽음 처리</span>
                </button>

                <button
                  onClick={onClearAll}
                  className="text-neutral-400 hover:text-rose-500 font-bold transition-colors cursor-pointer"
                >
                  전체 지우기
                </button>
              </div>

              {/* Notification List */}
              <div className="mt-4 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-[20px] border transition-all ${
                      !n.isRead
                        ? isDarkMode
                          ? 'bg-[#141417] border-[#0381fe]/40 text-white shadow-lg'
                          : 'bg-[#f7f7f7] border-[#0381fe]/40 text-black shadow-sm'
                        : isDarkMode
                          ? 'bg-black/30 border-white/5 text-neutral-400'
                          : 'bg-white border-[#dddddd] text-neutral-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getIcon(n.type)}
                        <span className="text-xs font-black font-mono">{n.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 font-bold">{n.time}</span>
                    </div>
                    <p className="text-xs mt-2 leading-relaxed font-medium pl-6">
                      {n.message}
                    </p>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <div className="py-16 text-center text-neutral-400 font-bold text-xs space-y-2">
                    <Bell className="w-8 h-8 mx-auto opacity-30" />
                    <p>도착한 매장 실시간 알림이 없습니다.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-[20px] bg-[#000000] dark:bg-white text-white dark:text-black font-black text-xs tracking-wider cursor-pointer hover:opacity-90 transition-all shadow-md"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
