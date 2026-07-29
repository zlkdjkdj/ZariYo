import { motion } from 'framer-motion';
import { Plus, Flame, Award } from 'lucide-react';
import type { KioskMenuItem } from '../../data/mockKioskMenus';

interface KioskMenuGridProps {
  menus: KioskMenuItem[];
  selectedCategory: 'all' | 'main' | 'side' | 'drink';
  onSelectCategory: (cat: 'all' | 'main' | 'side' | 'drink') => void;
  onOpenOptionModal: (menu: KioskMenuItem) => void;
}

export function KioskMenuGrid({
  menus,
  selectedCategory,
  onSelectCategory,
  onOpenOptionModal,
}: KioskMenuGridProps) {
  const categoryTabs = [
    { id: 'all', label: '전체 메뉴 (11)' },
    { id: 'main', label: '메인 요리 (5)' },
    { id: 'side', label: '사이드 디쉬 (3)' },
    { id: 'drink', label: '음료/디저트 (3)' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 text-left border-r border-neutral-200 dark:border-neutral-800 select-none">
      
      {/* Category Tabs (Samsung 20px / 40px Pill Chips) */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {categoryTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id as any)}
            className={`h-[40px] px-6 py-2 rounded-[20px] text-xs sm:text-sm font-bold cursor-pointer transition-all shrink-0 font-sans border ${
              selectedCategory === tab.id
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm scale-[1.02]'
                : 'bg-[#f7f7f7] dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-white/10 hover:border-[#0381fe]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Menu Grid Container - Samsung 20px Rounded Media Card Pattern */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
        {menus.map((menu, idx) => (
          <motion.div 
            key={menu.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onOpenOptionModal(menu)}
            className="p-4 sm:p-5 rounded-[20px] bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 hover:border-[#0381fe] dark:hover:border-[#0381fe] transition-all cursor-pointer space-y-3 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-3">
              
              {/* High-Res Food Image Viewport - Samsung Media Card 20px Radius */}
              <div className="aspect-[16/10] bg-[#f7f7f7] dark:bg-white/5 overflow-hidden rounded-[20px] border border-neutral-200 dark:border-white/10 relative">

                <img 
                  src={menu.image} 
                  alt={menu.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {menu.badge && (
                  <span className="absolute top-2 left-2 px-2.5 py-1 text-[10px] font-mono font-black bg-black text-white dark:bg-white dark:text-black border border-white/20 uppercase flex items-center gap-1 shadow-md">
                    {menu.badge.includes('추천') || menu.badge.includes('BEST') ? (
                      <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ) : (
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span>{menu.badge}</span>
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3 className="font-black text-base sm:text-lg text-neutral-950 dark:text-white group-hover:text-amber-500 transition-colors leading-tight">
                  {menu.name}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-bold line-clamp-2 leading-relaxed">
                  {menu.description}
                </p>
              </div>

            </div>

            {/* Price & Add Button */}
            <div className="flex justify-between items-center pt-3 border-t-2 border-neutral-100 dark:border-white/10 mt-2">
              <span className="font-mono text-base sm:text-lg font-black text-rose-600 dark:text-rose-400">
                {menu.price.toLocaleString()}원
              </span>
              <button className="px-3 py-1.5 rounded-none bg-black text-white dark:bg-white dark:text-black font-black text-xs flex items-center gap-1 shadow-md group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
                <span>담기</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

    </div>

  );
}
