import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ChefHat, TrendingUp, UtensilsCrossed, 
  Receipt, PlusCircle, ArrowLeft, Store, Sun, Moon, Bike 
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
            const isActive = currentPathWithSearch === item.path || (item.path === '/owner/dashboard' && currentPathWithSearch === '/owner/dashboard');
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-[3px] text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-none font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-black' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer & Back Button */}
      <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-white/10">
        <button
          onClick={() => navigate('/reserve')}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[3px] border border-neutral-200 dark:border-white/10 text-xs font-extrabold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer transition-all"
        >
          <ChefHat className="w-4 h-4 text-black dark:text-white" />
          테이블 키오스크 모드
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[3px] text-xs font-extrabold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white cursor-pointer transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-black dark:text-white" />
          메인 랜딩 화면으로
        </button>
      </div>

    </aside>
  );
}
