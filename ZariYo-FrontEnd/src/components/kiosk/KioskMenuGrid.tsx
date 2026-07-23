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
    <div className="p-6 space-y-6 text-left border-r border-neutral-200 dark:border-white/10 select-none">
      
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categoryTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id as any)}
            className={`px-4 py-2 rounded-none text-xs font-black cursor-pointer border transition-all ${
              selectedCategory === tab.id
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                : 'bg-white dark:bg-[#09090b] text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Menu Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map((menu, idx) => (
          <motion.div 
            key={menu.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onOpenOptionModal(menu)}
            className="p-4 rounded-none bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 hover:border-black dark:hover:border-white transition-all cursor-pointer space-y-3 flex flex-col justify-between group shadow-none"
          >
            <div className="space-y-2.5">
              
              {/* High-Res Food Image Viewport */}
              <div className="aspect-video bg-neutral-100 dark:bg-white/5 overflow-hidden border border-neutral-200 dark:border-white/5 relative">
                <img 
                  src={menu.image} 
                  alt={menu.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {menu.badge && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-mono font-black bg-black text-white dark:bg-white dark:text-black border border-white/20 uppercase flex items-center gap-1">
                    {menu.badge.includes('추천') || menu.badge.includes('BEST') ? (
                      <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ) : (
                      <Award className="w-3 h-3 text-emerald-400" />
                    )}
                    <span>{menu.badge}</span>
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="font-black text-sm text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  {menu.name}
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold line-clamp-2 leading-relaxed">
                  {menu.description}
                </p>
              </div>

            </div>

            {/* Price & Add Button */}
            <div className="flex justify-between items-center pt-3 border-t border-neutral-100 dark:border-white/5">
              <span className="font-mono text-sm font-black text-neutral-900 dark:text-white">
                {menu.price.toLocaleString()}원
              </span>
              <button className="p-1.5 rounded-none bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs group-hover:scale-110 transition-transform">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
