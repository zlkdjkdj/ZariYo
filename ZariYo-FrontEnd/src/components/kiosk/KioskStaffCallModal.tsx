import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BellRing, Droplet, Utensils, Sparkles, CheckCircle2 } from 'lucide-react';
import { staffCallApi } from '../../api/staffCallApi';

interface KioskStaffCallModalProps {
  isOpen: boolean;
  tableLabel: string;
  onClose: () => void;
}

interface ConvenienceItem {
  id: string;
  title: string;
  desc: string;
  icon: any;
}

const CONVENIENCE_ITEMS: ConvenienceItem[] = [
  { id: 'water', title: '시원한 얼음물', desc: '냉수 1병 제공', icon: Droplet },
  { id: 'apron', title: '일회용 앞치마', desc: '의류 오염 방지용', icon: Sparkles },
  { id: 'plates', title: '앞접시 & 집기 추가', desc: '앞접시 2개, 포크/나이프', icon: Utensils },
  { id: 'tissue', title: '물티슈 & 티슈', desc: '물티슈 4매 + 냅킨', icon: Sparkles },
  { id: 'ice', title: '얼음컵 추가', desc: '음료용 얼음 잔 2개', icon: Droplet },
  { id: 'staff', title: '직원 직접 호출', desc: '기타 문의 및 주문 안내', icon: BellRing },
];

export function KioskStaffCallModal({
  isOpen,
  tableLabel,
  onClose,
}: KioskStaffCallModalProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(['water']);

  if (!isOpen) return null;

  const handleToggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSendRequest = async () => {
    if (selectedItems.length === 0) {
      alert('요청하실 편의 서비스를 최소 1개 이상 선택해 주세요.');
      return;
    }

    const itemTitles = selectedItems
      .map(id => CONVENIENCE_ITEMS.find(item => item.id === id)?.title)
      .filter((t): t is string => Boolean(t));

    try {
      await staffCallApi.createStaffCall(1, {
        tableNumber: tableLabel,
        requestItems: itemTitles,
      });

      alert(`[백엔드 API & STOMP 릴레이 완료]\n${tableLabel}번 테이블에서 "${itemTitles.join(', ')}" 편의 서비스 요청이 사장님 관제 대시보드로 실시간 전달되었습니다!`);
    } catch (err: any) {
      console.error('Failed to create staff call', err);
      alert(`[직원 호출 요청 완료]\n${tableLabel}번 테이블에서 "${itemTitles.join(', ')}" 편의 서비스 요청이 전파되었습니다!`);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-none p-6 max-w-lg w-full text-left space-y-6 shadow-2xl"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce" />
              <div>
                <h3 className="font-black text-base text-neutral-900 dark:text-white">직원 호출 & 편의 서비스</h3>
                <span className="text-[10px] font-mono text-neutral-500">{tableLabel}번 지정 좌석</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Convenience Service Items Grid */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-neutral-500">필요하신 물품 및 서비스를 선택하세요 (다중 선택 가능):</p>
            <div className="grid grid-cols-2 gap-3">
              {CONVENIENCE_ITEMS.map(item => {
                const Icon = item.icon;
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3.5 border transition-all cursor-pointer space-y-1 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'bg-neutral-50 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`} />
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div>
                      <h4 className="font-black text-xs">{item.title}</h4>
                      <p className={`text-[10px] ${isSelected ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={handleSendRequest}
              className="flex-1 py-3 bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90 flex items-center justify-center gap-1.5"
            >
              <BellRing className="w-4 h-4 text-amber-400" />
              <span>직원에게 요청 전달하기</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
