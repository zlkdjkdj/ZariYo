import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Clock, CreditCard, ShoppingBag, Truck, CheckCircle2, ChevronRight } from 'lucide-react';

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
  isDarkMode?: boolean;
}

export function DashboardDeliveryPane({
  deliveryOrders,
  selectedDeliveryId,
  setSelectedDeliveryId,
  onUpdateDeliveryStatus,
  isDarkMode = false,
}: DashboardDeliveryPaneProps) {
  // 모달 팝업 상태 관리
  const [activeModalOrder, setActiveModalOrder] = useState<DeliveryOrderItem | null>(null);

  const handleCardClick = (d: DeliveryOrderItem) => {
    setSelectedDeliveryId(d.id);
    setActiveModalOrder(d);
  };

  return (
    <div className={`border rounded-[24px] p-6 space-y-5 h-full text-left shadow-sm transition-colors duration-300 font-sans ${
      isDarkMode ? 'bg-[#141417] border-white/10 text-white' : 'bg-[#ffffff] border-[#dddddd] text-[#000000]'
    }`}>
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200 dark:border-white/10 select-none">
        <div>
          <span className="text-[10px] font-mono font-black text-[#0381fe] uppercase tracking-widest block mb-0.5">
            SAMSUNG COMMERCE DELIVERY RELAY
          </span>
          <h3 className="text-base font-black tracking-tight font-sans">실시간 배달/포장 주문 릴레이 관제</h3>
        </div>
        <span className="text-xs font-mono font-black bg-[#0381fe]/15 text-[#0381fe] border border-[#0381fe]/30 px-3 py-1 rounded-[20px]">
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
          if (d.platform === 'takeout') badgeBg = 'bg-emerald-600 text-white';

          return (
            <div 
              key={d.id}
              onClick={() => handleCardClick(d)}
              className={`p-4 rounded-[18px] border transition-all cursor-pointer select-none flex flex-col justify-between group ${
                isSelected 
                  ? 'bg-[#0381fe]/10 border-[#0381fe] shadow-md' 
                  : isDarkMode
                    ? 'bg-white/5 border-white/10 hover:border-white/20'
                    : 'bg-[#f8f9fa] border-[#dddddd] hover:border-black'
              }`}
            >
              <div>
                {/* 상단 플랫폼 뱃지, 주문번호 & 수신 시간 */}
                <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`px-2 py-0.5 text-[9px] font-black rounded-[8px] shrink-0 ${badgeBg}`}>
                      {d.platform.toUpperCase()}
                    </span>
                    <span className="font-black text-xs tracking-tight truncate max-w-[120px]">
                      [{d.orderNo}]
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-400 shrink-0">
                    <span>{d.time}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#0381fe]" />
                  </div>
                </div>

                {/* 주문 메뉴 리스트 */}
                <p className={`font-black text-xs leading-relaxed truncate mb-3 ${
                  isDarkMode ? 'text-neutral-200' : 'text-neutral-800'
                }`}>
                  {d.items.map(i => `${i.name} x${i.qty}`).join(', ')}
                </p>
              </div>

              {/* 하단 결제 금액 & 원터치 상태 변경 버튼 */}
              <div className="flex justify-between items-center pt-2.5 border-t border-neutral-200/60 dark:border-white/10 font-mono">
                <span className="text-xs font-black text-[#0381fe]">
                  ₩ {d.totalPrice.toLocaleString()}원
                </span>

                <div className="flex gap-1.5 shrink-0">
                  {d.status === 'received' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateDeliveryStatus(d.id, 'cooking'); }}
                      className="px-3 py-1 rounded-[12px] bg-black dark:bg-white text-white dark:text-black font-black text-[10px] cursor-pointer hover:opacity-90 transition-all shadow-xs"
                    >
                      조리 시작
                    </button>
                  )}
                  {d.status === 'cooking' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateDeliveryStatus(d.id, 'rider-called'); }}
                      className="px-3 py-1 rounded-[12px] bg-amber-500 text-white font-black text-[10px] cursor-pointer hover:opacity-90 transition-all shadow-xs"
                    >
                      라이더 호출
                    </button>
                  )}
                  {d.status === 'rider-called' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateDeliveryStatus(d.id, 'delivering'); }}
                      className="px-3 py-1 rounded-[12px] bg-[#0381fe] text-white font-black text-[10px] cursor-pointer hover:opacity-90 transition-all shadow-xs"
                    >
                      배달 출발
                    </button>
                  )}
                  {d.status === 'delivering' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpdateDeliveryStatus(d.id, 'completed'); }}
                      className="px-3 py-1 rounded-[12px] bg-emerald-600 text-white font-black text-[10px] cursor-pointer hover:opacity-90 transition-all shadow-xs"
                    >
                      배달 완료
                    </button>
                  )}
                  {d.status === 'completed' && (
                    <span className="text-[10px] font-black text-emerald-500 font-mono px-2 py-0.5 rounded-[8px] bg-emerald-500/10 border border-emerald-500/20">
                      ✓ 완료됨
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 배달/포장 주문 상세보기 모달 (DeliveryDetailModal) */}
      <AnimatePresence>
        {activeModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`w-full max-w-md border rounded-[28px] p-6 shadow-2xl space-y-5 text-left transition-colors duration-300 font-sans ${
                isDarkMode ? 'bg-[#141417] border-white/10 text-white' : 'bg-[#ffffff] border-[#dddddd] text-[#000000]'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200 dark:border-white/10 select-none">
                <div>
                  <span className="text-[10px] font-mono font-black text-[#0381fe] uppercase tracking-wider block mb-0.5">
                    [{activeModalOrder.platform.toUpperCase()}] 주문번호 #{activeModalOrder.orderNo}
                  </span>
                  <h3 className="text-lg font-black tracking-tight">배달/포장 주문 상세서</h3>
                </div>
                <button
                  onClick={() => setActiveModalOrder(null)}
                  className="p-2 rounded-full text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 배달 정보 뷰어 */}
              <div className={`p-4 rounded-[18px] border space-y-3 ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#f8f9fa] border-[#dddddd]'
              }`}>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0381fe] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono font-black text-neutral-400 uppercase block mb-0.5">배달 목적지 주소</span>
                    <p className="text-xs font-black leading-relaxed">{activeModalOrder.address || '매장 방문 포장 (Takeout)'}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-200/50 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-mono font-bold">{activeModalOrder.phone || '010-****-5678 (안심번호)'}</span>
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0381fe]" /> {activeModalOrder.time} 수신
                  </span>
                </div>

                {activeModalOrder.note && (
                  <div className="pt-2 border-t border-neutral-200/50 dark:border-white/5">
                    <span className="text-[10px] font-mono font-black text-rose-500 uppercase block mb-0.5">고객 요청사항</span>
                    <p className="text-xs font-extrabold text-rose-500/90 leading-relaxed">"{activeModalOrder.note}"</p>
                  </div>
                )}
              </div>

              {/* 주문 메뉴 수선 명세 */}
              <div>
                <span className="text-[10px] font-mono font-black text-[#0381fe] uppercase tracking-wider block mb-2">
                  <ShoppingBag className="w-3.5 h-3.5 inline mr-1" /> 주문 메뉴 수선 내역
                </span>
                <div className={`p-3.5 rounded-[18px] border space-y-2 font-mono ${
                  isDarkMode ? 'bg-black/30 border-white/5' : 'bg-[#ffffff] border-[#dddddd]'
                }`}>
                  {activeModalOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-bold">
                      <span>{item.name} <span className="text-[#0381fe] font-black">x{item.qty}</span></span>
                      <span>₩ {(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-2.5 border-t border-neutral-200 dark:border-white/10 font-sans">
                    <div className="flex items-center gap-1 text-xs font-extrabold text-neutral-400 font-mono">
                      <CreditCard className="w-3.5 h-3.5 text-[#0381fe]" /> {activeModalOrder.payMethod || '선결제 완료'}
                    </div>
                    <span className="text-base font-black text-[#0381fe] font-mono">
                      총 ₩ {activeModalOrder.totalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* 원터치 상태 조치 조종석 */}
              <div className="pt-2 border-t border-neutral-200 dark:border-white/10 select-none">
                <div className="flex gap-2">
                  {activeModalOrder.status === 'received' && (
                    <button
                      onClick={() => {
                        onUpdateDeliveryStatus(activeModalOrder.id, 'cooking');
                        setActiveModalOrder(prev => prev ? { ...prev, status: 'cooking' } : null);
                      }}
                      className="w-full py-3 rounded-[16px] bg-black text-white dark:bg-white dark:text-black font-black text-xs cursor-pointer hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0381fe]" />
                      <span>조리 개시 처리</span>
                    </button>
                  )}

                  {activeModalOrder.status === 'cooking' && (
                    <button
                      onClick={() => {
                        onUpdateDeliveryStatus(activeModalOrder.id, 'rider-called');
                        setActiveModalOrder(prev => prev ? { ...prev, status: 'rider-called' } : null);
                      }}
                      className="w-full py-3 rounded-[16px] bg-amber-500 text-white font-black text-xs cursor-pointer hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Truck className="w-4 h-4 text-white" />
                      <span>라이더 호출 요청</span>
                    </button>
                  )}

                  {activeModalOrder.status === 'rider-called' && (
                    <button
                      onClick={() => {
                        onUpdateDeliveryStatus(activeModalOrder.id, 'delivering');
                        setActiveModalOrder(prev => prev ? { ...prev, status: 'delivering' } : null);
                      }}
                      className="w-full py-3 rounded-[16px] bg-[#0381fe] text-white font-black text-xs cursor-pointer hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Truck className="w-4 h-4 text-white" />
                      <span>배달 출발 처리</span>
                    </button>
                  )}

                  {activeModalOrder.status === 'delivering' && (
                    <button
                      onClick={() => {
                        onUpdateDeliveryStatus(activeModalOrder.id, 'completed');
                        setActiveModalOrder(prev => prev ? { ...prev, status: 'completed' } : null);
                      }}
                      className="w-full py-3 rounded-[16px] bg-emerald-600 text-white font-black text-xs cursor-pointer hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>배달 완료 처리</span>
                    </button>
                  )}

                  {activeModalOrder.status === 'completed' && (
                    <div className="w-full py-3 rounded-[16px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 font-black text-xs flex items-center justify-center gap-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>배달 완료가 확정되었습니다</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
