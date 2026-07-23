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
}: DashboardReceiptPaneProps) {
  return (
    <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-neutral-800 rounded-[3px] p-6 space-y-6 text-left select-none">
      
      {/* Header depending on Active Tab */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-black dark:text-white" />
          <div>
            <h3 className="text-base font-black text-black dark:text-white">
              {activeTab === 'delivery' 
                ? `[${selectedDelivery.orderNo}] 배달/포장 수선서`
                : selectedBillTable ? `${selectedBillTable.label} 영수증 수선서` : '테이블 선택 필요'}
            </h3>
            <p className="text-[10px] font-mono text-neutral-500 font-semibold">SIDE-BY-SIDE LIVE RECEIPT</p>
          </div>
        </div>
        
        {activeTab !== 'delivery' && selectedBillTable && (
          <button
            onClick={onOpenAddMenuModal}
            className="px-3 py-1.5 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer hover:opacity-90"
          >
            <PlusCircle className="w-4 h-4" />
            <span>메뉴 추가</span>
          </button>
        )}
      </div>

      {/* Delivery Specific Order Receipt Panel */}
      {activeTab === 'delivery' ? (
        <div className="space-y-4 text-xs">
          {/* Platform Badge & Status */}
          <div className="p-3.5 rounded-[3px] bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-black dark:text-white font-mono">주문번호: {selectedDelivery.orderNo}</span>
              <span className="px-2 py-0.5 text-[9.5px] font-mono font-bold bg-orange-500 text-white rounded-[3px]">
                {selectedDelivery.status.toUpperCase()}
              </span>
            </div>
            
            <div className="flex items-start gap-1.5 text-neutral-700 dark:text-neutral-300 pt-1">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span className="font-bold">{selectedDelivery.address}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
              <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
              <span className="font-mono">{selectedDelivery.phone}</span>
            </div>
          </div>

          {/* Rider Special Note */}
          <div className="p-3 rounded-[3px] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 space-y-1">
            <div className="flex items-center gap-1.5 font-extrabold">
              <MessageSquare className="w-4 h-4" />
              <span>라이더 요청사항 메모</span>
            </div>
            <p className="text-[11px] font-bold">{selectedDelivery.note}</p>
          </div>

          {/* Items List */}
          <div className="space-y-2 border-t border-neutral-200 dark:border-white/10 pt-3">
            <p className="font-mono text-neutral-500 font-bold text-[10px] uppercase">ORDER ITEMS SPECIFICATION</p>
            {selectedDelivery.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center font-extrabold text-black dark:text-white py-1">
                <span>{item.name} x{item.qty}</span>
                <span className="font-mono">{(item.price * item.qty).toLocaleString()}원</span>
              </div>
            ))}
          </div>

          {/* Pay & Action */}
          <div className="p-4 rounded-[3px] bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 flex justify-between items-center font-black text-black dark:text-white text-sm">
            <span>결제 금액 ({selectedDelivery.payMethod})</span>
            <span className="font-mono">{selectedDelivery.totalPrice.toLocaleString()}원</span>
          </div>

          <button
            onClick={() => onUpdateDeliveryStatus(selectedDelivery.id, 'rider-called')}
            className="w-full py-3.5 rounded-[3px] bg-orange-500 hover:bg-orange-600 text-white font-black text-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <Bike className="w-4 h-4" />
            <span>라이더 배차 및 호출 승인</span>
          </button>
        </div>
      ) : (
        /* Hall Seat Receipt Panel */
        selectedBillTable && currentBill ? (
          <div className="space-y-4">
            <div className="text-xs font-mono text-neutral-500 border-b border-dashed border-neutral-300 dark:border-white/10 pb-2 flex justify-between">
              <span>결제 수단: {currentBill.paymentMethod}</span>
              <span>입금 상태: 정상 승인</span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {currentBill.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold py-1 border-b border-neutral-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 font-mono">[{idx + 1}]</span>
                    <span className="text-black dark:text-white">{item.name}</span>
                    <span className="text-xs text-neutral-500 font-mono">x{item.qty}</span>
                  </div>
                  <span className="font-mono text-black dark:text-white">{(item.price * item.qty).toLocaleString()}원</span>
                </div>
              ))}
            </div>

            {/* Discount Selector */}
            <div className="p-3 rounded-[3px] bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                <Percent className="w-4 h-4" />
                <span>현장 서비스 할인</span>
              </span>
              <div className="flex gap-1">
                <button onClick={() => setDiscountAmount(0)} className={`px-2 py-1 text-[10px] rounded-[3px] border ${discountAmount === 0 ? 'bg-black dark:bg-white text-white dark:text-black border-transparent' : 'bg-transparent text-neutral-500'}`}>없음</button>
                <button onClick={() => setDiscountAmount(3000)} className={`px-2 py-1 text-[10px] rounded-[3px] border ${discountAmount === 3000 ? 'bg-black dark:bg-white text-white dark:text-black border-transparent' : 'bg-transparent text-neutral-500'}`}>-3천원</button>
                <button onClick={() => setDiscountAmount(5000)} className={`px-2 py-1 text-[10px] rounded-[3px] border ${discountAmount === 5000 ? 'bg-black dark:bg-white text-white dark:text-black border-transparent' : 'bg-transparent text-neutral-500'}`}>-5천원</button>
              </div>
            </div>

            {/* Total Breakdown */}
            <div className="p-4 rounded-[3px] bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-neutral-600 dark:text-neutral-400">
                <span>공급가액 소계</span>
                <span className="font-mono">{subtotal.toLocaleString()}원</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between font-bold text-red-600 dark:text-red-400">
                  <span>현장 서비스 할인 금액</span>
                  <span className="font-mono">-{discountAmount.toLocaleString()}원</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-neutral-300 dark:border-white/10 text-base font-black text-black dark:text-white">
                <span>최종 결제 금액</span>
                <span className="font-mono">{finalTotal.toLocaleString()}원</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  if (selectedBillTable) {
                    onControlState(selectedBillTable.id, selectedBillTable.label, 'empty');
                    alert(`${selectedBillTable.label} 번 테이블 결제 승인 및 퇴석 원복 처리가 완료되었습니다.`);
                  }
                }}
                className="py-3.5 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-black text-xs cursor-pointer hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>결제 & 퇴석 완료</span>
              </button>

              <button
                onClick={() => {
                  if (selectedBillTable) {
                    onControlState(selectedBillTable.id, selectedBillTable.label, 'empty');
                    alert(`${selectedBillTable.label} 번 테이블의 5분 선점 락이 강제 해제되었습니다.`);
                  }
                }}
                className="py-3.5 rounded-[3px] bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 font-extrabold text-xs cursor-pointer border border-neutral-300 dark:border-white/10 flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>선점 락 해제</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="py-16 text-center text-neutral-500 space-y-2">
            <Tv className="w-10 h-10 mx-auto text-neutral-400 opacity-60" />
            <p className="font-extrabold text-xs">좌석 관제판에서 테이블을 클릭하면 수선서가 연동됩니다.</p>
          </div>
        )
      )}

    </div>
  );
}
