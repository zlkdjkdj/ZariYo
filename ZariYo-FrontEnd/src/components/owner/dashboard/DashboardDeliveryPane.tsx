export interface DeliveryOrderItem {
  id: string;
  orderNo: string;
  platform: 'baemin' | 'coupang' | 'yogiyo' | 'takeout';
  address: string;
  phone: string;
  note: string;
  items: { name: string; qty: number; price: number }[];
  totalPrice: number;
  status: 'received' | 'cooking' | 'rider-called' | 'delivering' | 'completed';
  time: string;
  payMethod: string;
}

interface DashboardDeliveryPaneProps {
  deliveryOrders: DeliveryOrderItem[];
  selectedDeliveryId: string | null;
  setSelectedDeliveryId: (id: string) => void;
  onUpdateDeliveryStatus: (id: string, status: DeliveryOrderItem['status']) => void;
}

export function DashboardDeliveryPane({
  deliveryOrders,
  selectedDeliveryId,
  setSelectedDeliveryId,
  onUpdateDeliveryStatus,
}: DashboardDeliveryPaneProps) {
  return (
    <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-neutral-800 rounded-[3px] p-6 space-y-5 h-full text-left">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
        <div>
          <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-widest">
            DELIVERY & TAKEOUT RELAY PANE
          </span>
          <h3 className="text-base font-black text-black dark:text-white mt-0.5">실시간 배달/포장 주문 릴레이 관제</h3>
        </div>
        <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-500 px-3 py-1 rounded-[3px]">
          {deliveryOrders.length}건 전체 수신
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryOrders.map((d) => {
          const isSelected = selectedDeliveryId === d.id;
          let badgeBg = 'bg-teal-500 text-white';
          if (d.platform === 'baemin') badgeBg = 'bg-[#2ac1bc] text-white';
          if (d.platform === 'coupang') badgeBg = 'bg-sky-500 text-white';
          if (d.platform === 'yogiyo') badgeBg = 'bg-rose-600 text-white';

          return (
            <div 
              key={d.id}
              onClick={() => setSelectedDeliveryId(d.id)}
              className={`p-4.5 rounded-[3px] border transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-neutral-100 dark:bg-white/10 border-black dark:border-white shadow-none' 
                  : 'bg-neutral-50 dark:bg-white/5 border-neutral-300 dark:border-white/10 hover:border-neutral-400'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-black rounded-[3px] ${badgeBg}`}>
                    {d.platform.toUpperCase()}
                  </span>
                  <span className="font-black text-black dark:text-white text-sm">[{d.orderNo}]</span>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-500">{d.time}</span>
              </div>

              <p className="font-extrabold text-xs text-black dark:text-white truncate">
                {d.items.map(i => `${i.name} x${i.qty}`).join(', ')}
              </p>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-neutral-200 dark:border-white/10">
                <span className="text-xs font-mono font-black text-black dark:text-white">
                  {d.totalPrice.toLocaleString()}원
                </span>

                <div className="flex gap-1">
                  {d.status === 'received' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateDeliveryStatus(d.id, 'cooking'); }}
                      className="px-3 py-1 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-extrabold text-[10px]"
                    >
                      조리 시작
                    </button>
                  )}
                  {d.status === 'cooking' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateDeliveryStatus(d.id, 'rider-called'); }}
                      className="px-3 py-1 rounded-[3px] bg-orange-500 text-white font-extrabold text-[10px]"
                    >
                      라이더 호출
                    </button>
                  )}
                  {d.status === 'rider-called' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateDeliveryStatus(d.id, 'delivering'); }}
                      className="px-3 py-1 rounded-[3px] bg-blue-600 text-white font-extrabold text-[10px]"
                    >
                      배달 출발
                    </button>
                  )}
                  {d.status === 'delivering' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateDeliveryStatus(d.id, 'completed'); }}
                      className="px-3 py-1 rounded-[3px] bg-emerald-600 text-white font-extrabold text-[10px]"
                    >
                      배달 완료
                    </button>
                  )}
                  {d.status === 'completed' && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">✓ 완료됨</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
