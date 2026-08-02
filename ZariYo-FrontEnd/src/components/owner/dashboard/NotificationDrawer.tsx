import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'order' | 'call' | 'reservation' | 'alert';
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

  // 알림 타입별 텍스트 배지 렌더링 (아이콘 소거)
  const renderBadge = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            주문
          </span>
        );
      case 'call':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            호출
          </span>
        );
      case 'reservation':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#0381fe]/10 text-[#0381fe] border border-[#0381fe]/20">
            예약
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            알림
          </span>
        );
    }
  };

  // 메시지 텍스트 가독성 클리닝 (깨진 특수문자 및 중복 수식어 완전 필터링)
  const cleanMessage = (rawMessage: string) => {
    if (!rawMessage) return '';
    return rawMessage
      .replace(/[\uFFFD\uFEFF\u200B\u25C6\u25C7\u25A0\u25A1🔔🙋‍♂️⚡🚨⚠️▸◆◇■□]/g, '')
      .replace(/^\[\d{2}:\d{2}:\d{2}\]\s*/, '')
      .replace(/^\[손님 주문 완료\]\s*/, '')
      .replace(/^\[STOMP[^\]]+\]\s*/, '')
      .replace(/^\s*-\s*/, '')
      .trim();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end font-sans select-none">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className={`w-full max-w-md h-full border-l p-6 flex flex-col justify-between shadow-2xl transition-colors duration-300 ${
              isDarkMode ? 'bg-[#101013] border-white/10 text-white' : 'bg-white border-neutral-200 text-neutral-900'
            }`}
          >
            <div className="flex flex-col h-[calc(100%-60px)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-bold">
                      {unreadCount}
                    </span>
                  )}
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                      매장 알림 센터
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                      {unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : '모든 알림을 확인했습니다'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors cursor-pointer"
                  title="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-white/5 text-xs shrink-0">
                <button
                  onClick={onMarkAllAsRead}
                  disabled={unreadCount === 0}
                  className={`font-medium transition-colors ${
                    unreadCount > 0
                      ? 'text-[#0381fe] hover:underline cursor-pointer'
                      : 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
                  }`}
                >
                  모두 읽음으로 표시
                </button>

                <button
                  onClick={onClearAll}
                  disabled={notifications.length === 0}
                  className={`font-medium transition-colors ${
                    notifications.length > 0
                      ? 'text-neutral-400 hover:text-rose-500 cursor-pointer'
                      : 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
                  }`}
                >
                  전체 삭제
                </button>
              </div>

              {/* Notification List Container */}
              <div className="mt-4 space-y-3 overflow-y-auto flex-1 pr-1.5 scrollbar-thin">
                {notifications.map((n) => {
                  const cleanedMsg = cleanMessage(n.message);

                  return (
                    <div
                      key={n.id}
                      className={`p-4 rounded-2xl border transition-all relative ${
                        !n.isRead
                          ? isDarkMode
                            ? 'bg-[#18181c] border-l-4 border-l-[#0381fe] border-y-white/10 border-r-white/10 text-white shadow-md'
                            : 'bg-[#f8fafd] border-l-4 border-l-[#0381fe] border-y-neutral-200 border-r-neutral-200 text-neutral-900 shadow-sm'
                          : isDarkMode
                            ? 'bg-white/[0.02] border-white/5 text-neutral-400'
                            : 'bg-neutral-50/80 border-neutral-200/60 text-neutral-500'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {renderBadge(n.type)}
                          <span className={`text-xs font-bold ${!n.isRead ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}>
                            {n.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-400 font-mono shrink-0">
                          {n.time}
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed font-normal ${!n.isRead ? 'text-neutral-800 dark:text-neutral-200 font-medium' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        {cleanedMsg}
                      </p>
                    </div>
                  );
                })}

                {notifications.length === 0 && (
                  <div className="py-20 text-center text-neutral-400 font-medium text-xs">
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">도착한 매장 알림이 없습니다.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="pt-3 border-t border-neutral-200 dark:border-white/10 shrink-0">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs tracking-wide cursor-pointer hover:opacity-90 transition-all shadow-sm"
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
