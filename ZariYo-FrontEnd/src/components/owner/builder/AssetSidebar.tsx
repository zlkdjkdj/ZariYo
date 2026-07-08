import { Store, ArrowLeft, HelpCircle, Plus } from 'lucide-react';
import type { PlacedElement } from '../../../types/store';

interface AssetSidebarProps {
  onSelectAsset: (type: PlacedElement['type']) => void;
}

const ELEMENT_TEMPLATES = [
  { type: 'table-2', name: '2인 테이블', width: 60, height: 60, color: 'bg-emerald-500/10 border-emerald-500 text-emerald-500' },
  { type: 'table-4', name: '4인 테이블', width: 100, height: 60, color: 'bg-blue-500/10 border-blue-500 text-blue-500' },
  { type: 'table-bar', name: '바(Bar) 테이블', width: 140, height: 40, color: 'bg-indigo-500/10 border-indigo-500 text-indigo-500' },
  { type: 'socket', name: '콘센트석 (1인)', width: 50, height: 50, color: 'bg-amber-500/10 border-amber-500 text-amber-500' },
  { type: 'counter', name: '주문 카운터', width: 160, height: 50, color: 'bg-stone-500/15 border-stone-400 text-stone-600 dark:text-stone-300' },
  { type: 'door', name: '주 출입구', width: 80, height: 30, color: 'bg-rose-500/10 border-rose-500 text-rose-500' },
  { type: 'toilet', name: '화장실', width: 60, height: 50, color: 'bg-purple-500/10 border-purple-500 text-purple-500' },
] as const;

export function AssetSidebar({ onSelectAsset }: AssetSidebarProps) {
  return (
    <div className="lg:col-span-3 bg-white dark:bg-[#1c1c1e] border border-neutral-200/60 dark:border-neutral-800/80 rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4">
      <div>
        <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#3182f6]" />
          가구 및 기물 추가
        </h3>
        <p className="text-[10px] text-neutral-500 dark:text-[#a1a1a6]">
          아래 요소를 클릭하면 배치 캔버스 상에 추가됩니다.
        </p>
      </div>

      <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
        {ELEMENT_TEMPLATES.map((item) => {
          const Icon = item.type.startsWith('table-') 
            ? Store 
            : item.type === 'door' 
              ? ArrowLeft 
              : item.type === 'toilet' 
                ? HelpCircle 
                : Store;
          return (
            <button
              key={item.type}
              onClick={() => onSelectAsset(item.type)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-xs font-semibold w-full text-left transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${item.color}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
              <span className="text-[9px] ml-auto text-neutral-400">({item.width}x{item.height})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export { ELEMENT_TEMPLATES };
