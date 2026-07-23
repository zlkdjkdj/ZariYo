import { Plus, Minus, ShoppingBag, Check } from 'lucide-react';

interface CartItem {
  menu: { name: string; price: number };
  selectedOptions: { name: string; price: number }[];
  quantity: number;
  itemTotalPrice: number;
}

interface KioskCartPanelProps {
  cart: CartItem[];
  cartTotalAmount: number;
  onUpdateQty: (idx: number, delta: number) => void;
  onRemoveItem: (idx: number) => void;
  onConfirmOrder: () => void;
}

export function KioskCartPanel({
  cart,
  cartTotalAmount,
  onUpdateQty,
  onConfirmOrder,
}: KioskCartPanelProps) {
  return (
    <div className="bg-white dark:bg-[#09090b] border-t md:border-t-0 md:border-l border-neutral-200 dark:border-white/10 p-6 flex flex-col justify-between select-none text-left h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black dark:text-white" />
            <h3 className="font-black text-base text-neutral-900 dark:text-white">주문 장바구니</h3>
          </div>
          <span className="text-xs font-mono font-bold text-neutral-500">{cart.length}개 메뉴</span>
        </div>

        {cart.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 space-y-2">
            <ShoppingBag className="w-10 h-10 mx-auto opacity-30" />
            <p className="text-xs font-bold">장바구니가 비어 있습니다.<br />메뉴를 선택해 장바구니에 담아주세요.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="p-3 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-none space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-xs text-neutral-900 dark:text-white">{item.menu.name}</h4>
                    {item.selectedOptions.length > 0 && (
                      <p className="text-[10px] text-neutral-500 font-bold">
                        {item.selectedOptions.map(o => `+${o.name}`).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-xs font-black text-black dark:text-white">
                    {item.itemTotalPrice.toLocaleString()}원
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-neutral-200/50 dark:border-white/5">
                  <div className="flex items-center border border-neutral-300 dark:border-white/20">
                    <button 
                      onClick={() => onUpdateQty(idx, -1)}
                      className="p-1 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-mono font-black">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(idx, 1)}
                      className="p-1 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary & Order Button */}
      <div className="pt-4 border-t border-neutral-200 dark:border-white/10 space-y-3 mt-4">
        <div className="flex justify-between items-center font-black text-base text-neutral-900 dark:text-white">
          <span>총 결제 예정 금액</span>
          <span className="font-mono text-xl">{cartTotalAmount.toLocaleString()}원</span>
        </div>

        <button
          disabled={cart.length === 0}
          onClick={onConfirmOrder}
          className={`w-full py-4 rounded-none font-black text-sm cursor-pointer flex items-center justify-center gap-2 transition-all ${
            cart.length === 0 
              ? 'bg-neutral-200 text-neutral-400 dark:bg-white/10 dark:text-neutral-500 cursor-not-allowed' 
              : 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90 shadow-none'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>5분 선점 락 주문 결제하기</span>
        </button>
      </div>
    </div>
  );
}
