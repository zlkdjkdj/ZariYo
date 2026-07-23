import { Utensils, Bike } from 'lucide-react';
import type { DeliveryOrderItem } from './DashboardDeliveryPane';

export interface KdsOrderItem {
  id: string;
  tableLabel: string;
  menuName: string;
  quantity: number;
  time: string;
  status: 'cooking' | 'completed';
  note?: string;
  price: number;
}

interface DashboardKdsPaneProps {
  kdsOrders: KdsOrderItem[];
  deliveryOrders: DeliveryOrderItem[];
  onToggleKdsStatus: (id: string) => void;
  onUpdateDeliveryStatus: (id: string, status: DeliveryOrderItem['status']) => void;
}

export function DashboardKdsPane({
  kdsOrders,
  deliveryOrders,
  onToggleKdsStatus,
  onUpdateDeliveryStatus,
}: DashboardKdsPaneProps) {
  return (
    <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-neutral-800 rounded-[3px] p-6 space-y-6 h-full text-left">
      
      {/* KDS Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
        <div>
          <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
            INTEGRATED KITCHEN DISPLAY SYSTEM
          </span>
          <h3 className="text-lg font-black text-black dark:text-white mt-0.5">
            실시간 홀 & 배달 통합 주방 조리 관제
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-extrabold bg-neutral-100 dark:bg-white/10 px-3 py-1 rounded-[3px] text-black dark:text-white">
            🍽️ 홀 조리: {kdsOrders.filter(o => o.status === 'cooking').length}건
          </span>
          <span className="text-xs font-mono font-extrabold bg-orange-500/10 text-orange-500 px-3 py-1 rounded-[3px]">
            🛵 배달 조리: {deliveryOrders.filter(d => d.status === 'cooking' || d.status === 'received').length}건
          </span>
        </div>
      </div>

      {/* KDS 2-Pane Dual Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        
        {/* Left Section: 🍽️ Hall Store Orders Pane */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-200 dark:border-white/10">
            <Utensils className="w-4 h-4 text-black dark:text-white" />
            <h4 className="font-extrabold text-sm text-black dark:text-white">🍽️ 홀 매장 테이블 조리 대기열</h4>
          </div>

          <div className="space-y-3">
            {kdsOrders.map((order) => {
              const isDone = order.status === 'completed';
              return (
                <div 
                  key={order.id} 
                  className={`p-4 rounded-[3px] border transition-all ${
                    isDone 
                      ? 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 opacity-50' 
                      : 'bg-white dark:bg-white/5 border-neutral-300 dark:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[9px] font-mono font-black bg-black text-white dark:bg-white dark:text-black rounded-[3px]">
                        HALL
                      </span>
                      <span className="font-black text-black dark:text-white text-base">{order.tableLabel}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">{order.time}</span>
                  </div>
                  
                  <h5 className="font-black text-black dark:text-white text-sm">{order.menuName} x{order.quantity}</h5>
                  
                  {order.note && (
                    <div className="mt-2 p-2 rounded-[3px] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-bold">
                      ⚠️ {order.note}
                    </div>
                  )}

                  <button
                    onClick={() => onToggleKdsStatus(order.id)}
                    className={`w-full mt-3 py-2 rounded-[3px] font-black text-xs cursor-pointer border ${
                      isDone 
                        ? 'bg-neutral-200 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border-transparent' 
                        : 'bg-black dark:bg-white text-white dark:text-black border-transparent hover:opacity-90'
                    }`}
                  >
                    {isDone ? '✓ 조리 완료됨 (원복)' : '원터치 조리 완료 (Completed)'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section: 🛵 Delivery & Takeout Orders Pane */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-200 dark:border-white/10">
            <Bike className="w-4 h-4 text-orange-500" />
            <h4 className="font-extrabold text-sm text-black dark:text-white">🛵 배달 & 포장 조리 대기열</h4>
          </div>

          <div className="space-y-3">
            {deliveryOrders.map((d) => {
              const isCompleted = d.status === 'completed' || d.status === 'delivering';
              const isCooking = d.status === 'cooking';

              let badgeBg = 'bg-teal-500 text-white';
              if (d.platform === 'baemin') badgeBg = 'bg-[#2ac1bc] text-white';
              if (d.platform === 'coupang') badgeBg = 'bg-sky-500 text-white';
              if (d.platform === 'yogiyo') badgeBg = 'bg-rose-600 text-white';

              return (
                <div 
                  key={d.id} 
                  className={`p-4 rounded-[3px] border transition-all ${
                    isCompleted 
                      ? 'bg-neutral-100 dark:bg-white/5 border-neutral-200 dark:border-white/10 opacity-50' 
                      : isCooking 
                        ? 'bg-orange-500/5 border-orange-500/30'
                        : 'bg-white dark:bg-white/5 border-neutral-300 dark:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-black rounded-[3px] ${badgeBg}`}>
                        {d.platform.toUpperCase()}
                      </span>
                      <span className="font-black text-black dark:text-white text-base">[{d.orderNo}]</span>
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-orange-500 text-white rounded-[3px]">
                        배달/포장
                      </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">{d.time}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-black text-black dark:text-white text-sm">
                      {d.items.map(i => `${i.name} x${i.qty}`).join(', ')}
                    </p>
                    <p className="text-[11px] text-neutral-500 font-bold truncate">주소: {d.address}</p>
                  </div>

                  {d.note && (
                    <div className="mt-2 p-2 rounded-[3px] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-bold">
                      ⚠️ 요청사항: {d.note}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (d.status === 'received') {
                        onUpdateDeliveryStatus(d.id, 'cooking');
                      } else if (d.status === 'cooking') {
                        onUpdateDeliveryStatus(d.id, 'rider-called');
                      } else {
                        onUpdateDeliveryStatus(d.id, 'cooking');
                      }
                    }}
                    className={`w-full mt-3 py-2 rounded-[3px] font-black text-xs cursor-pointer border ${
                      isCompleted 
                        ? 'bg-neutral-200 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border-transparent' 
                        : d.status === 'cooking'
                          ? 'bg-orange-500 text-white border-transparent hover:bg-orange-600'
                          : 'bg-black dark:bg-white text-white dark:text-black border-transparent hover:opacity-90'
                    }`}
                  >
                    {d.status === 'received' && '조리 시작하기'}
                    {d.status === 'cooking' && '✓ 조리 완료 (라이더 호출)'}
                    {isCompleted && '✓ 조리 및 배차 완료됨'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
