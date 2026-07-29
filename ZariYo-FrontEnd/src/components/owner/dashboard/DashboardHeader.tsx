import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ChefHat, Bike, Move, GripVertical, RefreshCw 
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
    <header className="sticky top-0 z-30 bg-white dark:bg-[#000000] border-b border-[#dddddd] dark:border-neutral-800 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
      <div>
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-[#0381fe] animate-ping' : 'bg-amber-500'}`} />
          <span className="text-[10px] font-mono font-bold text-[#0381fe] uppercase tracking-widest bg-[#0381fe]/10 border border-[#0381fe]/30 px-3 py-1 rounded-[20px]">
            {isConnected ? 'SAMSUNG STOMP LIVE ENGINE' : 'SAMSUNG STORE CONTROL ROOM'}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <h1 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white font-sans">
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
        
        {/* Drag & Drop Customization Toggle */}
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-[20px] border font-bold text-xs cursor-pointer transition-all ${
            isEditMode 
              ? 'bg-[#0381fe] text-white border-[#0381fe] animate-pulse' 
              : 'bg-[#f7f7f7] dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-white/10 hover:border-[#0381fe]'
          }`}
        >
          <GripVertical className="w-4 h-4" />
          <span>{isEditMode ? '편집 마침' : '위젯 위치 편집'}</span>
        </button>

        {isEditMode && (
          <button
            onClick={onResetWidgetOrder}
            className="flex items-center gap-1 px-3 py-2 rounded-[20px] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs cursor-pointer hover:bg-red-500/20"
            title="기본 순서로 리셋"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>리셋</span>
          </button>
        )}

        {/* View Tab Switcher - Samsung Segmented Control (0px inner tab, 20px outer) */}
        <div className="flex p-1 rounded-[20px] bg-[#f7f7f7] dark:bg-white/5 border border-neutral-200 dark:border-white/10">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[20px] font-bold text-xs cursor-pointer transition-all ${
              activeTab === 'live' 
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' 
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#0381fe]" />
            <span>2D 실시간 관제</span>
          </button>
          <button
            onClick={() => setActiveTab('kds')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[20px] font-bold text-xs cursor-pointer transition-all ${
              activeTab === 'kds' 
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' 
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <ChefHat className="w-4 h-4 text-[#0381fe]" />
            <span>주방 KDS</span>
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[20px] font-bold text-xs cursor-pointer transition-all ${
              activeTab === 'delivery' 
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' 
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <Bike className="w-4 h-4 text-[#0381fe]" />
            <span>배달관제 ({deliveryCount})</span>
          </button>
        </div>

        <button
          onClick={() => navigate('/owner/store/new')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-[20px] bg-[#f7f7f7] dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 border border-neutral-200 dark:border-white/10 text-black dark:text-white font-bold text-xs cursor-pointer transition-all"
        >
          <Move className="w-4 h-4 text-[#0381fe]" />
          <span>도면 변경</span>
        </button>
      </div>
    </header>

  );
}
