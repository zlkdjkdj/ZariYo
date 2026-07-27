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

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#09090b] border-b border-neutral-300 dark:border-white/10 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
          <span className="text-[10px] font-mono font-black text-black dark:text-white uppercase tracking-widest bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-[3px]">
            {isConnected ? 'STOMP WEBSOCKET LIVE' : 'CYBER CONTROL ROOM'}
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-black text-black dark:text-white mt-1">
          {storeName}
        </h1>
      </div>

      {/* Top Control Tools */}
      <div className="flex items-center gap-3 flex-wrap">
        
        {/* Drag & Drop Customization Toggle */}
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] border font-black text-xs cursor-pointer transition-all ${
            isEditMode 
              ? 'bg-amber-500 text-white border-amber-600 animate-pulse' 
              : 'bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-white/10 hover:border-black dark:hover:border-white'
          }`}
        >
          <GripVertical className="w-4 h-4" />
          <span>{isEditMode ? '드래그 편집 마치기' : '⋮⋮ 위젯 배치 편집'}</span>
        </button>

        {isEditMode && (
          <button
            onClick={onResetWidgetOrder}
            className="flex items-center gap-1 px-3 py-2 rounded-[3px] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-extrabold text-xs cursor-pointer hover:bg-red-500/20"
            title="기본 순서로 리셋"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>순서 리셋</span>
          </button>
        )}

        {/* View Tab Switcher */}
        <div className="flex p-1 rounded-[3px] bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[3px] font-black text-xs cursor-pointer transition-all ${
              activeTab === 'live' 
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-none' 
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>2D 관제</span>
          </button>
          <button
            onClick={() => setActiveTab('kds')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[3px] font-black text-xs cursor-pointer transition-all ${
              activeTab === 'kds' 
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-none' 
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>통합 주방 KDS</span>
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[3px] font-black text-xs cursor-pointer transition-all ${
              activeTab === 'delivery' 
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-none' 
                : 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white'
            }`}
          >
            <Bike className="w-4 h-4 text-orange-500" />
            <span>배달관제 ({deliveryCount})</span>
          </button>
        </div>

        <button
          onClick={() => navigate('/owner/store/new')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-[3px] bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 border border-neutral-300 dark:border-white/10 text-black dark:text-white font-extrabold text-xs cursor-pointer transition-all"
        >
          <Move className="w-4 h-4" />
          <span>좌석 배치</span>
        </button>
      </div>
    </header>
  );
}
