import { useState } from 'react';
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

  const savedStoreInfo = localStorage.getItem('zariyo_store_info');
  const storeObj = savedStoreInfo ? JSON.parse(savedStoreInfo) : null;
  const currentStoreName = storeObj?.name || 'ZariYo 강남 본점';

  const [isOpenStatus, setIsOpenStatus] = useState<boolean>(() => {
    return localStorage.getItem('zariyo_store_is_open') !== 'false';
  });

  const toggleOpenStatus = () => {
    const nextStatus = !isOpenStatus;
    setIsOpenStatus(nextStatus);
    localStorage.setItem('zariyo_store_is_open', String(nextStatus));
  };

  const navItems = [
    { path: '/owner/dashboard', label: '2D 실시간 홀 관제 (POS)', icon: LayoutDashboard },
    { path: '/owner/dashboard?tab=kds', label: '주방 조리 관제 (KDS)', icon: ChefHat },
    { path: '/owner/dashboard?tab=delivery', label: '배달/포장 실시간 관제', icon: Bike },
    { path: '/owner/analytics', label: '매출 분석 & 통계', icon: TrendingUp },
    { path: '/owner/menu-management', label: '메뉴 & 품절 관리', icon: UtensilsCrossed },
    { path: '/owner/order-history', label: '영수증 이력 & 환불', icon: Receipt },
    { path: '/owner/store/new', label: '가게 정보 및 도면 수정', icon: PlusCircle },
    { path: '/guide', label: '시스템 사용설명서', icon: BookOpen },
  ];

  return (

    <aside className="w-64 bg-white dark:bg-[#09090b] border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between p-5 select-none shrink-0 h-screen sticky top-0 transition-colors duration-300">
      
      {/* Top Branding & Store Name + Theme Toggle */}
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <div 
            onClick={() => navigate('/owner/stores')} 
            className="flex items-center gap-3 cursor-pointer group truncate"
          >
            <div className="w-10 h-10 rounded-[20px] bg-black dark:bg-white flex items-center justify-center shadow-md shrink-0 border border-[#0381fe]">
              <Store className="w-5 h-5 text-[#0381fe] dark:text-[#0381fe]" />
            </div>
            <div className="text-left truncate">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight truncate font-sans">
                {currentStoreName}
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOpenStatus();
                }}
                className={`mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[20px] text-[9.5px] font-bold font-mono tracking-wider transition-all cursor-pointer border ${
                  isOpenStatus
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40 hover:bg-rose-500/25'
                }`}
                title="클릭하여 매장 영업 Open/Close 상태 토글"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isOpenStatus ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <span>{isOpenStatus ? 'OPEN (영업중)' : 'CLOSED (영업종료)'}</span>
              </button>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/15 hover:bg-neutral-200 dark:hover:bg-white/20 text-neutral-800 dark:text-white transition-all cursor-pointer shrink-0"
            title="다크/라이트 모드 변경"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-neutral-800" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>

        {/* Navigation Item List - Samsung Style Rounding */}
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[20px] font-bold text-xs transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-[#f7f7f7] dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0381fe]' : 'text-neutral-500'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Landing Link & Store Code Info */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
        <div className="p-3.5 bg-[#f7f7f7] dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-[20px] text-left">
          <p className="text-[10px] text-[#0381fe] font-mono font-bold tracking-widest uppercase">SAMSUNG ONE UI ENGINE</p>
          <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate mt-0.5">{currentStoreName}</p>
        </div>

        <button
          onClick={() => window.open('/reserve', '_blank')}
          className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-[#0381fe] hover:bg-blue-600 text-white font-bold text-xs transition-all cursor-pointer rounded-[20px] shadow-sm hover:scale-[1.01]"
          title="새 탭에서 손님 키오스크/2D 예약을 띄워 실시간 STOMP 알림 테스트"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>손님 키오스크 화면 열기 ↗</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#f7f7f7] hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 font-bold text-xs transition-colors cursor-pointer rounded-[20px] border border-neutral-200 dark:border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>랜딩페이지로 이동</span>
        </button>
      </div>



    </aside>
  );
}
