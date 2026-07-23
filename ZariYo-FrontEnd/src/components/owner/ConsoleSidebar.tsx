import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ChefHat, TrendingUp, UtensilsCrossed, 
  Receipt, PlusCircle, ArrowLeft, Store, Sun, Moon, Bike, BookOpen 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ConsoleSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathWithSearch = location.pathname + location.search;
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: '/owner/dashboard', label: '2D 실시간 홀 관제 (POS)', icon: LayoutDashboard },
    { path: '/owner/dashboard?tab=kds', label: '주방 조리 관제 (KDS)', icon: ChefHat },
    { path: '/owner/dashboard?tab=delivery', label: '배달/포장 실시간 관제', icon: Bike },
    { path: '/owner/analytics', label: '매출 분석 & 통계', icon: TrendingUp },
    { path: '/owner/menu-management', label: '메뉴 & 품절 관리', icon: UtensilsCrossed },
    { path: '/owner/order-history', label: '영수증 이력 & 환불', icon: Receipt },
    { path: '/owner/store/new', label: '2D 도면 빌더', icon: PlusCircle },
    { path: '/guide', label: '시스템 사용설명서', icon: BookOpen },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#09090b] border-r border-neutral-200 dark:border-white/10 flex flex-col justify-between p-5 select-none shrink-0 h-screen sticky top-0 transition-colors duration-300">
      
      {/* Top Branding & Store Name + Theme Toggle */}
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <div 
            onClick={() => navigate('/owner')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-none bg-black dark:bg-white flex items-center justify-center shadow-none">
              <Store className="w-5 h-5 text-white dark:text-black" />
            </div>
            <div className="text-left">
              <h2 className="text-base font-black text-neutral-900 dark:text-white leading-tight">ZariYo POS</h2>
              <span className="text-[9px] font-extrabold font-mono text-black dark:text-white bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full">CYBER CONSOLE</span>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-white transition-all cursor-pointer"
            title="다크/라이트 모드 변경"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-neutral-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>

        {/* Navigation Item List */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            // 쿼리 파라미터가 포함된 경로 처리
            const isActive = item.path.includes('?') 
              ? currentPathWithSearch === item.path
              : location.pathname === item.path && !location.search;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-none font-bold text-xs transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-none font-black'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white dark:text-black' : 'text-neutral-500'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Landing Link & Store Code Info */}
      <div className="pt-4 border-t border-neutral-200 dark:border-white/10 space-y-3">
        <div className="p-3 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-none text-left">
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono font-bold">ZARIYO STORE ENGINE v2.5</p>
          <p className="text-xs font-black text-neutral-800 dark:text-neutral-200 truncate mt-0.5">강남 테헤란로 1호점</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-700 dark:text-neutral-300 font-bold text-xs transition-colors cursor-pointer rounded-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>랜딩페이지로 이동</span>
        </button>
      </div>

    </aside>
  );
}
