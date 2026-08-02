import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { KioskMenuItem, KioskMenuOption } from '../../data/mockKioskMenus';

interface KioskMenuOptionModalProps {
  selectedMenu: KioskMenuItem | null;
  selectedOptionsTemp: KioskMenuOption[];
  onClose: () => void;
  onToggleOption: (option: KioskMenuOption) => void;
  onAddToCart: () => void;
}

export function KioskMenuOptionModal({
  selectedMenu,
  selectedOptionsTemp,
  onClose,
  onToggleOption,
  onAddToCart,
}: KioskMenuOptionModalProps) {
  return (
    <AnimatePresence>
      {selectedMenu && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-[#141417] border border-neutral-300 dark:border-white/10 rounded-[24px] p-6 max-w-md w-full text-left space-y-4 shadow-2xl text-neutral-900 dark:text-white select-none"
          >
            <div className="flex justify-between items-center border-b border-neutral-200 dark:border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0381fe] uppercase tracking-wider bg-[#0381fe]/10 px-2.5 py-0.5 rounded-[12px]">
                  OPTION SELECTOR
                </span>
                <h3 className="text-lg font-black tracking-tight mt-1">{selectedMenu.name}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold leading-relaxed">
              {selectedMenu.description}
            </p>

            <div className="space-y-2 py-2">
              <span className="text-xs font-black font-mono uppercase tracking-wider text-[#0381fe]">
                추가 옵션 선택 (중복 가능)
              </span>
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {selectedMenu.options.map((option) => {
                  const isSelected = selectedOptionsTemp.some((o) => o.id === option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => onToggleOption(option)}
                      className={`p-3.5 rounded-[16px] border flex justify-between items-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#0381fe] text-white border-[#0381fe]'
                          : 'bg-neutral-50 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200'
                      }`}
                    >
                      <span className="text-xs font-bold">{option.name}</span>
                      <span className="font-mono text-xs">
                        {option.price > 0 ? `+${option.price.toLocaleString()}원` : '무료'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-[20px] bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs cursor-pointer"
              >
                취소
              </button>

              <button
                onClick={onAddToCart}
                className="flex-1 py-3 bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90"
              >
                장바구니 담기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
