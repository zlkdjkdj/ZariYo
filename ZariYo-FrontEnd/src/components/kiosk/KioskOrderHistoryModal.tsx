import { Receipt, X } from 'lucide-react';

interface CustomerOrderItem {
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

interface CustomerOrder {
  id: string;
  orderNo: string;
  time: string;
  tableLabel: string;
  items: CustomerOrderItem[];
  totalAmount: number;
}

interface KioskOrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ordersList: CustomerOrder[];
}

export function KioskOrderHistoryModal({ isOpen, onClose, ordersList }: KioskOrderHistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/20 rounded-none p-6 max-w-lg w-full text-left space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-500" />
            <h3 className="font-black text-base text-neutral-900 dark:text-white">
              나의 키오스크 주문 내역 영수증
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {ordersList.length === 0 ? (
          <div className="py-12 text-center text-neutral-400 font-bold text-xs">
            아직 완료된 주문 내역이 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {ordersList.map((ord) => (
              <div
                key={ord.id}
                className="p-4 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-none space-y-2"
              >
                <div className="flex justify-between items-center text-xs font-mono font-bold text-neutral-500 border-b border-neutral-200 dark:border-white/5 pb-2">
                  <span>
                    [{ord.orderNo}] 테이블: {ord.tableLabel}
                  </span>
                  <span>{ord.time}</span>
                </div>
                <div className="space-y-1 py-1">
                  {ord.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-xs font-extrabold text-neutral-900 dark:text-white"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-mono">{item.price?.toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-white/10 flex justify-between items-center font-mono font-black text-sm text-black dark:text-white">
                  <span>총 결제금액</span>
                  <span className="text-emerald-500">{ord.totalAmount?.toLocaleString()}원</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
