import { Store, ArrowLeft, HelpCircle, Plus } from 'lucide-react';
import type { PlacedElement } from '../../../types/store';

interface AssetSidebarProps {
  onSelectAsset: (type: PlacedElement['type']) => void;
}

const ELEMENT_TEMPLATES = [
  { type: 'table-2', name: '2인 테이블', width: 60, height: 60, color: 'bg-neutral-900/60 border-white/10 text-white hover:border-[#e50914]/50' },
  { type: 'table-4', name: '4인 테이블', width: 100, height: 60, color: 'bg-neutral-900/60 border-white/10 text-white hover:border-[#e50914]/50' },
  { type: 'table-bar', name: '바(Bar) 테이블', width: 140, height: 40, color: 'bg-neutral-900/60 border-white/10 text-white hover:border-[#e50914]/50' },
  { type: 'socket', name: '콘센트석 (1인)', width: 50, height: 50, color: 'bg-neutral-900/60 border-white/10 text-white hover:border-[#e50914]/50' },
  { type: 'counter', name: '주문 카운터', width: 160, height: 50, color: 'bg-neutral-800/80 border-white/10 text-neutral-300 hover:border-[#e50914]/50' },
  { type: 'door', name: '주 출입구', width: 80, height: 30, color: 'bg-neutral-900/60 border-white/10 text-white hover:border-[#e50914]/50' },
  { type: 'toilet', name: '화장실', width: 60, height: 50, color: 'bg-neutral-900/60 border-white/10 text-white hover:border-[#e50914]/50' },
] as const;

export function AssetSidebar({ onSelectAsset }: AssetSidebarProps) {
  return (
    <div className="lg:col-span-3 bg-neutral-900/60 border border-white/10 rounded-2xl p-5 shadow-none space-y-4 select-none backdrop-blur-xl">
      <div>
        <h3 className="text-xs font-black text-white flex items-center gap-1.5 uppercase font-mono">
          <Plus className="w-4 h-4 text-[#e50914]" />
          Furniture Templates
        </h3>
        <p className="text-[10px] text-neutral-400 font-semibold">
          배치할 물품을 클릭하여 격자판에 추가합니다.
        </p>
      </div>

      <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-0.5 scrollbar-thin">
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-[11px] font-extrabold w-full text-left transition-all hover:bg-[#e50914]/10 active:scale-[0.98] cursor-pointer ${item.color}`}
            >
              <Icon className="w-4 h-4 text-[#e50914]" />
              <span>{item.name}</span>
              <span className="text-[8.5px] ml-auto text-neutral-500 font-mono">({item.width}x{item.height})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export { ELEMENT_TEMPLATES };
