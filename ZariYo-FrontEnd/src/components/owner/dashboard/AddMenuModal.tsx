import { X } from 'lucide-react';

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTableLabel?: string;
  onAddMenuItem: (name: string, price: number) => void;
}

export function AddMenuModal({
  isOpen,
  onClose,
  selectedTableLabel,
  onAddMenuItem,
}: AddMenuModalProps) {
  if (!isOpen) return null;

  const menuOptions = [
    { name: '시그니처 수제 에이드', price: 7000 },
    { name: '공기밥 추가', price: 1500 },
    { name: '콜라 / 사이다', price: 2000 },
    { name: '하우스 와인 (글라스)', price: 9000 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-[3px] p-6 max-w-md w-full text-left space-y-4 shadow-2xl">
        <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-white/10">
          <h3 className="font-black text-base text-black dark:text-white">
            현장 추가 메뉴 선택 ({selectedTableLabel || '선택 좌석'})
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {menuOptions.map((m) => (
            <div key={m.name} className="flex justify-between items-center p-3 rounded-[3px] bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
              <div>
                <p className="font-extrabold text-xs text-black dark:text-white">{m.name}</p>
                <p className="text-[10px] text-neutral-500 font-mono">{m.price.toLocaleString()}원</p>
              </div>
              <button 
                onClick={() => onAddMenuItem(m.name, m.price)}
                className="px-3 py-1.5 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90"
              >
                추가하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
