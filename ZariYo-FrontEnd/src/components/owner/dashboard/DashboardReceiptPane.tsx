import { 
  Receipt, PlusCircle, MapPin, Phone, MessageSquare, Percent, CreditCard, X, Tv, Bike 
} from 'lucide-react';
import type { DeliveryOrderItem } from './DashboardDeliveryPane';

interface BillItem {
  name: string;
  qty: number;
  price: number;
}

interface DashboardReceiptPaneProps {
  activeTab: 'live' | 'kds' | 'delivery';
  selectedBillTable: { id: string; label: string } | null;
  selectedDelivery: DeliveryOrderItem;
  currentBill: { items: BillItem[]; paymentMethod: string } | null;
  discountAmount: number;
  setDiscountAmount: (val: number) => void;
  subtotal: number;
  finalTotal: number;
  onOpenAddMenuModal: () => void;
  onControlState: (elId: string, label: string, newState: 'empty' | 'using' | 'temp-occupied' | 'reserved') => void;
  onUpdateDeliveryStatus: (id: string, status: DeliveryOrderItem['status']) => void;
  isDarkMode?: boolean;
}

export function DashboardReceiptPane({
  activeTab,
  selectedBillTable,
  selectedDelivery,
  currentBill,
  discountAmount,
  setDiscountAmount,
  subtotal,
  finalTotal,
  onOpenAddMenuModal,
  onControlState,
  onUpdateDeliveryStatus,
  isDarkMode = false,
}: DashboardReceiptPaneProps) {
  return (
    <div className={`border rounded-[24px] p-6 space-y-6 text-left select-none transition-colors duration-300 ${
      isDarkMode
        ? 'bg-[#141417] border-white/10 text-white shadow-lg shadow-black/40'
        : 'bg-[#ffffff] border-[#dddddd] text-[#000000] shadow-sm'
    }`}>
      
      {/* Header depending on Active Tab */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className={`p-2.5 rounded-[20px] ${
            isDarkMode ? 'bg-white/10 text-white' : 'bg-[#f7f7f7] text-black'
          }`}>
            <Receipt className="w-5 h-5 text-[#0381fe]" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight font-sans">
              {activeTab === 'delivery' 
                ? (selectedDelivery ? `[${selectedDelivery.orderNo}] 배달/포장 수선서` : '배달/포장 주문 선택')
                : (selectedBillTable ? `${selectedBillTable.label} 영수증 수선서` : '테이블 선택 필요')}
            </h3>
            <p className="text-[10px] font-mono text-[#0381fe] font-black tracking-widest uppercase">SAMSUNG LIVE COMMERCE RECEIPT</p>
          </div>
        </div>
        
        {activeTab !== 'delivery' && selectedBillTable && (
          <button
            onClick={onOpenAddMenuModal}
            className={`h-[40px] px-4 py-2 rounded-[20px] font-black text-xs flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-all border ${
              isDarkMode
                ? 'bg-white text-black border-white'
                : 'bg-black text-white border-black'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#0381fe]" />
            <span>메뉴 추가</span>
          </button>
        )}
      </div>

      {/* Delivery Specific Order Receipt Panel */}
      {activeTab === 'delivery' ? (
        !selectedDelivery ? (
          <div className="py-16 text-center space-y-2 border border-dashed border-neutral-300 dark:border-white/10 rounded-[20px]">
            <Receipt className="w-8 h-8 mx-auto text-neutral-400" />
            <p className="text-xs font-black text-neutral-400">선택된 배달/포장 주문 내역이 없습니다.</p>
            <p className="text-[10px] text-neutral-500 font-mono">실시간 신규 주문 수신 시 수선서가 표시됩니다.</p>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            {/* Platform Badge & Status */}
            <div className={`p-3.5 rounded-[18px] border space-y-2 ${
              isDarkMode ? 'bg-black/30 border-white/10' : 'bg-[#f7f7f7] border-[#dddddd]'
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-black font-mono">주문번호: {selectedDelivery.orderNo}</span>
                <span className="px-2.5 py-0.5 text-[9.5px] font-mono font-black bg-amber-500 text-white rounded-[12px]">
                  {selectedDelivery.status.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-start gap-1.5 pt-1 font-bold">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>{selectedDelivery.address}</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="font-mono">{selectedDelivery.phone}</span>
              </div>
            </div>

            {/* Rider Special Note */}
            <div className="p-3 rounded-[16px] bg-rose-500/10 border border-rose-500/20 text-rose-500 space-y-1">
              <div className="flex items-center gap-1.5 font-black">
                <MessageSquare className="w-4 h-4" />
                <span>라이더 요청사항 메모</span>
              </div>
              <p className="text-[11px] font-bold">{selectedDelivery.note}</p>
            </div>

            {/* Items List */}
            <div className="space-y-2 border-t border-neutral-200 dark:border-white/10 pt-3">
              <p className="font-mono text-[#0381fe] font-black text-[10px] uppercase">ORDER ITEMS SPECIFICATION</p>
              {selectedDelivery.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center font-bold py-1">
                  <span>{item.name} x{item.qty}</span>
                  <span className="font-mono">{(item.price * item.qty).toLocaleString()}원</span>
                </div>
              ))}
            </div>

            {/* Pay & Action */}
            <div className={`p-4 rounded-[18px] border flex justify-between items-center font-black text-sm ${
              isDarkMode ? 'bg-black/30 border-white/10' : 'bg-[#f7f7f7] border-[#dddddd]'
            }`}>
              <span>결제 금액 ({selectedDelivery.payMethod})</span>
              <span className="font-mono text-[#0381fe]">{selectedDelivery.totalPrice.toLocaleString()}원</span>
            </div>

            <button
              onClick={() => onUpdateDeliveryStatus(selectedDelivery.id, 'rider-called')}
              className="w-full py-3.5 rounded-[20px] bg-amber-500 hover:bg-amber-600 text-white font-black text-xs cursor-pointer flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Bike className="w-4 h-4" />
              <span>라이더 배차 및 호출 승인</span>
            </button>
          </div>
        )
      ) : (
        /* Hall Seat Receipt Panel */
        selectedBillTable && currentBill ? (
          <div className="space-y-4">
            <div className="text-xs font-mono text-neutral-400 border-b border-dashed border-neutral-200 dark:border-white/10 pb-2 flex justify-between">
              <span>결제 수단: {currentBill.paymentMethod}</span>
              <span className="text-emerald-500 font-bold">입금 상태: 정상 승인</span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {currentBill.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold py-1 border-b border-neutral-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0381fe] font-mono">[{idx + 1}]</span>
                    <span>{item.name}</span>
                    <span className="text-xs text-neutral-400 font-mono">x{item.qty}</span>
                  </div>
                  <span className="font-mono">{(item.price * item.qty).toLocaleString()}원</span>
                </div>
              ))}
            </div>

            {/* Discount Selector */}
            <div className={`p-3 rounded-[16px] border flex items-center justify-between text-xs font-bold ${
              isDarkMode ? 'bg-black/30 border-white/10' : 'bg-[#f7f7f7] border-[#dddddd]'
            }`}>
              <span className="flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-[#0381fe]" />
                <span>현장 서비스 할인</span>
              </span>
              <div className="flex gap-1 font-mono">
                <button onClick={() => setDiscountAmount(0)} className={`px-2.5 py-1 text-[10px] rounded-[12px] border ${discountAmount === 0 ? 'bg-[#0381fe] text-white border-[#0381fe] font-black' : 'bg-transparent text-neutral-400'}`}>없음</button>
                <button onClick={() => setDiscountAmount(3000)} className={`px-2.5 py-1 text-[10px] rounded-[12px] border ${discountAmount === 3000 ? 'bg-[#0381fe] text-white border-[#0381fe] font-black' : 'bg-transparent text-neutral-400'}`}>-3천원</button>
                <button onClick={() => setDiscountAmount(5000)} className={`px-2.5 py-1 text-[10px] rounded-[12px] border ${discountAmount === 5000 ? 'bg-[#0381fe] text-white border-[#0381fe] font-black' : 'bg-transparent text-neutral-400'}`}>-5천원</button>
              </div>
            </div>

            {/* Total Breakdown */}
            <div className={`p-4 rounded-[18px] border space-y-2 text-xs ${
              isDarkMode ? 'bg-black/30 border-white/10' : 'bg-[#f7f7f7] border-[#dddddd]'
            }`}>
              <div className="flex justify-between font-bold text-neutral-400">
                <span>공급가액 소계</span>
                <span className="font-mono">{subtotal.toLocaleString()}원</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between font-bold text-rose-500">
                  <span>현장 서비스 할인 금액</span>
                  <span className="font-mono">-{discountAmount.toLocaleString()}원</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-neutral-200 dark:border-white/10 text-base font-black">
                <span>최종 결제 금액</span>
                <span className="font-mono text-[#0381fe]">{finalTotal.toLocaleString()}원</span>
              </div>
            </div>

            {/* Action Buttons - Samsung Contained & Outlined CTA Pattern */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  if (selectedBillTable) {
                    onControlState(selectedBillTable.id, selectedBillTable.label, 'empty');
                    alert(`${selectedBillTable.label} 번 테이블 삼성 페이 원터치 결제 승인 및 퇴석 처리가 완료되었습니다.`);
                  }
                }}
                className={`h-[42px] rounded-[20px] font-black text-xs cursor-pointer hover:opacity-90 flex items-center justify-center gap-2 shadow-md transition-all ${
                  isDarkMode
                    ? 'bg-[#0381fe] text-white border border-[#0381fe]'
                    : 'bg-[#000000] text-white border border-[#000000]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>삼성 페이 결제</span>
              </button>

              <button
                onClick={() => {
                  if (selectedBillTable) {
                    onControlState(selectedBillTable.id, selectedBillTable.label, 'empty');
                    alert(`${selectedBillTable.label} 번 테이블이 빈 좌석으로 초기화되었습니다.`);
                  }
                }}
                className={`h-[42px] rounded-[20px] font-black text-xs cursor-pointer border flex items-center justify-center gap-1.5 transition-all ${
                  isDarkMode
                    ? 'border-white/20 hover:bg-white/10 text-white'
                    : 'border-[#dddddd] hover:bg-neutral-100 text-[#000000]'
                }`}
              >
                <X className="w-4 h-4" />
                <span>테이블 비우기</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="py-16 text-center text-neutral-400 space-y-2 font-bold text-xs">
            <Tv className="w-10 h-10 mx-auto text-neutral-400 opacity-60" />
            <p>좌석 관제판에서 테이블을 클릭하면 수선서가 연동됩니다.</p>
          </div>
        )
      )}

    </div>
  );
}
