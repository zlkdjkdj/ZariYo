import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ChefHat, Bike, Move, GripVertical, RefreshCw, Sun, Moon, Bell 
} from 'lucide-react';

interface DashboardHeaderProps {
  storeName: string;
  activeTab: 'live' | 'kds' | 'delivery';
  setActiveTab: (tab: 'live' | 'kds' | 'delivery') => void;
  deliveryCount: number;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  onResetWidgetOrder: () => void;
  isConnected?: boolean;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationCount?: number;
}

export function DashboardHeader({
  storeName,
  activeTab,
  setActiveTab,
  deliveryCount,
  isEditMode,
  setIsEditMode,
  onResetWidgetOrder,
  isConnected = false,
  isDarkMode = false,
  toggleTheme,
  onOpenNotifications,
  unreadNotificationCount = 0,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    return localStorage.getItem('zariyo_store_is_open') !== 'false';
  });

  useEffect(() => {
    const handleStorage = () => {
      setIsOpen(localStorage.getItem('zariyo_store_is_open') !== 'false');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleOpen = () => {
    const nextVal = !isOpen;
    setIsOpen(nextVal);
    localStorage.setItem('zariyo_store_is_open', String(nextVal));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <header className={`sticky top-0 z-30 border-b px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none transition-colors duration-300 ${
      isDarkMode ? 'bg-[#09090b] border-white/10 text-white' : 'bg-[#ffffff] border-[#dddddd] text-[#000000]'
    }`}>
      <div>
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-[#0381fe] animate-ping' : 'bg-amber-500'}`} />
          <span className="text-[10px] font-mono font-black text-[#0381fe] uppercase tracking-widest bg-[#0381fe]/10 border border-[#0381fe]/30 px-3 py-1 rounded-[20px]">
            {isConnected ? 'SAMSUNG STOMP LIVE ENGINE' : 'SAMSUNG STORE CONTROL ROOM'}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <h1 className="text-xl md:text-2xl font-black tracking-tight font-sans">
            {storeName}
          </h1>
          <button
            onClick={toggleOpen}
            className={`px-3 py-1 rounded-[20px] text-xs font-bold font-mono tracking-wider transition-all cursor-pointer border flex items-center gap-1.5 ${
              isOpen
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40 hover:bg-rose-500/25'
            }`}
            title="영업 상태 토글 (OPEN / CLOSED)"
          >
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span>{isOpen ? 'OPEN (영업중)' : 'CLOSED (영업종료)'}</span>
          </button>
        </div>
      </div>

      {/* Top Control Tools - Samsung One UI Pill Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        
        {/* Notification Bell Button */}
        {onOpenNotifications && (
          <button
            onClick={onOpenNotifications}
            className={`relative p-2.5 rounded-[20px] border transition-all cursor-pointer flex items-center justify-center ${
              isDarkMode 
                ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
                : 'bg-[#f7f7f7] text-neutral-800 border-[#dddddd] hover:bg-neutral-200'
            }`}
            title="실시간 매장 알림 센터"
          >
            <Bell className="w-4 h-4 text-[#0381fe]" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-mono font-black flex items-center justify-center animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>
        )}

        {/* Theme Switcher Button */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-[20px] border transition-all cursor-pointer flex items-center justify-center ${
              isDarkMode 
                ? 'bg-white/10 text-amber-400 border-white/20 hover:bg-white/20' 
                : 'bg-[#f7f7f7] text-neutral-800 border-[#dddddd] hover:bg-neutral-200'
            }`}
            title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        )}


        {/* Drag & Drop Customization Toggle */}
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-[20px] border font-bold text-xs cursor-pointer transition-all ${
            isEditMode 
              ? 'bg-[#0381fe] text-white border-[#0381fe] animate-pulse' 
              : isDarkMode
                ? 'bg-white/10 text-neutral-200 border-white/10 hover:border-[#0381fe]'
                : 'bg-[#f7f7f7] text-neutral-800 border-[#dddddd] hover:border-[#000000]'
          }`}
        >
          <GripVertical className="w-4 h-4" />
          <span>{isEditMode ? '편집 마침' : '위젯 위치 편집'}</span>
        </button>

        {isEditMode && (
          <button
            onClick={onResetWidgetOrder}
            className="flex items-center gap-1 px-3 py-2 rounded-[20px] bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs cursor-pointer hover:bg-rose-500/20"
            title="기본 순서로 리셋"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>리셋</span>
          </button>
        )}

        {/* View Tab Switcher - Samsung Segmented Control */}
        <div className={`flex p-1 rounded-[20px] border ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#f7f7f7] border-[#dddddd]'
        }`}>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[20px] font-bold text-xs cursor-pointer transition-all ${
              activeTab === 'live' 
                ? isDarkMode ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-sm'
                : isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#0381fe]" />
            <span>2D 실시간 관제</span>
          </button>
          <button
            onClick={() => setActiveTab('kds')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[20px] font-bold text-xs cursor-pointer transition-all ${
              activeTab === 'kds' 
                ? isDarkMode ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-sm'
                : isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
            }`}
          >
            <ChefHat className="w-4 h-4 text-[#0381fe]" />
            <span>주방 KDS</span>
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[20px] font-bold text-xs cursor-pointer transition-all ${
              activeTab === 'delivery' 
                ? isDarkMode ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-sm'
                : isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
            }`}
          >
            <Bike className="w-4 h-4 text-[#0381fe]" />
            <span>배달관제 ({deliveryCount})</span>
          </button>
        </div>

        <button
          onClick={() => navigate('/owner/store/new')}
          className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-[20px] border font-bold text-xs cursor-pointer transition-all ${
            isDarkMode
              ? 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
              : 'bg-[#f7f7f7] hover:bg-neutral-200 border-[#dddddd] text-[#000000]'
          }`}
        >
          <Move className="w-4 h-4 text-[#0381fe]" />
          <span>도면 변경</span>
        </button>
      </div>
    </header>
  );
}
