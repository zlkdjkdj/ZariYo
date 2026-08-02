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
  isDarkMode?: boolean;
}

export function MenuCardItem({
  menu,
  onToggleSoldOut,
  onDeleteMenu,
  onEditMenu,
  isDarkMode = false,
}: MenuCardItemProps) {
  return (
    <div 
      className={`relative p-5 rounded-[24px] border transition-all duration-300 flex flex-col justify-between select-none font-sans ${
        menu.isSoldOut 
          ? isDarkMode
            ? 'bg-[#141417]/50 border-white/5 opacity-60 text-white'
            : 'bg-neutral-100 border-[#dddddd] opacity-70 text-[#000000]'
          : isDarkMode
            ? 'bg-[#141417] border-white/10 text-white hover:border-[#0381fe] shadow-lg shadow-black/40'
            : 'bg-[#ffffff] border-[#dddddd] text-[#000000] hover:border-[#000000] shadow-sm'
      }`}
    >
      {/* Sold Out Watermark Badge */}
      {menu.isSoldOut && (
        <div className="absolute top-4 right-4 bg-rose-500 text-white text-[9.5px] font-black font-mono px-2.5 py-0.5 rounded-[12px] shadow-sm z-10">
          SOLD OUT (품절)
        </div>
      )}

      <div>
        <div className="flex gap-4 items-start mb-4 text-left">
          <img 
            src={menu.image} 
            alt={menu.name} 
            className="w-20 h-20 rounded-[18px] object-cover shrink-0 border border-neutral-200 dark:border-white/10 shadow-sm" 
          />
          <div className="text-left">
            <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-[12px] ${
              isDarkMode ? 'bg-[#0381fe]/10 text-[#0381fe]' : 'bg-[#000000]/10 text-[#000000]'
            }`}>
              {menu.category}
            </span>
            <h3 className="text-base font-black mt-1.5 tracking-tight">{menu.name}</h3>
            <p className="text-sm font-black font-mono text-[#0381fe] mt-0.5">
              ₩ {menu.price.toLocaleString()}
            </p>
          </div>
        </div>

        <p className={`text-xs font-medium leading-relaxed text-left line-clamp-2 mb-4 ${
          isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
        }`}>
          {menu.description}
        </p>

        {/* Display Registered Options */}
        {menu.options && menu.options.length > 0 && (
          <div className="mb-4 text-left border-t border-neutral-200/50 dark:border-white/10 pt-3">
            <span className="text-[10px] font-black text-[#0381fe] uppercase font-mono block mb-1.5">선택 가능 커스텀 옵션:</span>
            <div className="flex flex-wrap gap-1.5 font-mono">
              {menu.options.map((opt, idx) => (
                <span 
                  key={idx} 
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-[12px] border ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 text-neutral-200' 
                      : 'bg-[#f7f7f7] border-[#dddddd] text-neutral-800'
                  }`}
                >
                  +{opt.name} {opt.extraPrice > 0 ? `(+₩${opt.extraPrice.toLocaleString()})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons (Sold Out Toggle & Delete) */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-200/50 dark:border-white/10 mt-2 font-mono">
        <button
          onClick={() => onToggleSoldOut(menu.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[20px] text-xs font-black cursor-pointer transition-all ${
            menu.isSoldOut 
              ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
          }`}
        >
          {menu.isSoldOut ? (
            <>
              <ToggleLeft className="w-4 h-4 text-emerald-500" />
              <span>품절 해제하기</span>
            </>
          ) : (
            <>
              <ToggleRight className="w-4 h-4 text-rose-500" />
              <span>실시간 품절(Sold-Out) 설정</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEditMenu(menu)}
            className="p-2 rounded-full text-neutral-400 hover:text-[#0381fe] hover:bg-[#0381fe]/10 transition-colors cursor-pointer"
            title="메뉴 정보 및 이미지 수정"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteMenu(menu.id)}
            className="p-2 rounded-full text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="메뉴 삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
