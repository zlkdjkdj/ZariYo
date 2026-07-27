import { ToggleLeft, ToggleRight, Trash2, Edit } from 'lucide-react';

export interface MenuOption {
  name: string;
  extraPrice: number;
}

export interface MenuManagementItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isSoldOut: boolean;
  description: string;
  options?: MenuOption[];
}

interface MenuCardItemProps {
  menu: MenuManagementItem;
  onToggleSoldOut: (id: string) => void;
  onDeleteMenu: (id: string) => void;
  onEditMenu: (menu: MenuManagementItem) => void;
}

export function MenuCardItem({
  menu,
  onToggleSoldOut,
  onDeleteMenu,
  onEditMenu,
}: MenuCardItemProps) {
  return (
    <div 
      className={`relative p-5 rounded-none border transition-all duration-300 flex flex-col justify-between select-none ${
        menu.isSoldOut 
          ? 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/5 opacity-60' 
          : 'bg-white dark:bg-[#09090b] border-neutral-200 dark:border-white/10 hover:border-black dark:hover:border-white shadow-none'
      }`}
    >
      {/* Sold Out Watermark Badge */}
      {menu.isSoldOut && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-black font-mono px-2 py-0.5 rounded-full z-10">
          SOLD OUT (품절)
        </div>
      )}

      <div>
        <div className="flex gap-4 items-start mb-4">
          <img 
            src={menu.image} 
            alt={menu.name} 
            className="w-20 h-20 rounded-none object-cover shrink-0 border border-neutral-200 dark:border-white/5 shadow-none" 
          />
          <div className="text-left">
            <span className="text-[10px] font-bold text-black dark:text-white font-mono bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full">
              {menu.category}
            </span>
            <h3 className="text-base font-black text-neutral-900 dark:text-white mt-1">{menu.name}</h3>
            <p className="text-xs font-black text-neutral-800 dark:text-neutral-200 mt-1">
              ₩ {menu.price.toLocaleString()}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold leading-relaxed text-left line-clamp-2 mb-3">
          {menu.description}
        </p>

        {/* Display Registered Options */}
        {menu.options && menu.options.length > 0 && (
          <div className="mb-4 text-left border-t border-neutral-100 dark:border-white/5 pt-3">
            <span className="text-[10px] font-extrabold text-neutral-400 block mb-1.5">선택 가능 커스텀 옵션:</span>
            <div className="flex flex-wrap gap-1.5">
              {menu.options.map((opt, idx) => (
                <span 
                  key={idx} 
                  className="text-[9.5px] font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-none border border-black/10 dark:border-white/10"
                >
                  +{opt.name} {opt.extraPrice > 0 ? `(+₩${opt.extraPrice.toLocaleString()})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons (Sold Out Toggle & Delete) */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-white/5 mt-2">
        <button
          onClick={() => onToggleSoldOut(menu.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-extrabold cursor-pointer transition-all ${
            menu.isSoldOut 
              ? 'bg-neutral-200 text-neutral-700 dark:bg-white/10 dark:text-neutral-300' 
              : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
          }`}
        >
          {menu.isSoldOut ? (
            <>
              <ToggleLeft className="w-4 h-4 text-neutral-500" />
              <span>품절 해제하기</span>
            </>
          ) : (
            <>
              <ToggleRight className="w-4 h-4 text-red-500" />
              <span>실시간 품절(Sold-Out) 설정</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEditMenu(menu)}
            className="p-1.5 rounded-none text-neutral-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
            title="메뉴 정보 및 이미지 수정"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteMenu(menu.id)}
            className="p-1.5 rounded-none text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            title="메뉴 삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
