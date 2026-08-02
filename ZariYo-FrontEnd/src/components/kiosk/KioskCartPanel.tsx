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
    <div className="bg-white dark:bg-[#121214] border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 flex flex-col justify-between select-none text-left h-full shadow-sm">
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-[#0381fe]" />
            <h3 className="font-bold text-lg sm:text-xl text-neutral-900 dark:text-white font-sans">주문 장바구니</h3>
          </div>
          <span className="text-xs sm:text-sm font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 border border-[#0381fe]/30 px-3 py-1 rounded-[20px]">
            {cart.length}개 메뉴
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 space-y-3">
            <ShoppingBag className="w-12 h-12 mx-auto opacity-30 text-[#0381fe]" />
            <p className="text-sm font-bold leading-relaxed text-[#707070]">장바구니가 비어 있습니다.<br />메뉴를 선택해 장바구니에 담아주세요.</p>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="p-4 bg-[#f7f7f7] dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-[20px] space-y-2.5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-tight font-sans">{item.menu.name}</h4>
                    {item.selectedOptions.length > 0 && (
                      <p className="text-xs text-[#707070] font-bold mt-0.5">
                        {item.selectedOptions.map(o => `+${o.name}`).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    {item.itemTotalPrice.toLocaleString()}원
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-200 dark:border-white/10">
                  <div className="flex items-center border border-neutral-300 dark:border-white/20 rounded-[20px]">
                    <button
                      onClick={() => onUpdateQty(idx, -1)}
                      className="p-1.5 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-l-[20px] transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-mono font-bold text-xs">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(idx, 1)}
                      className="p-1.5 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-r-[20px] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary & Order Action Button - Samsung Pay 20px Pill Button */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex justify-between items-center text-lg sm:text-xl font-bold font-sans">
          <span>총 결제금액</span>
          <span className="font-mono text-[#0381fe]">{cartTotalAmount.toLocaleString()}원</span>
        </div>

        <button
          onClick={onConfirmOrder}
          disabled={cart.length === 0}
          className={`w-full h-[44px] py-3 rounded-[20px] font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${cart.length > 0
              ? 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90'
              : 'bg-[#f7f7f7] text-neutral-400 dark:bg-white/5 border border-neutral-200 cursor-not-allowed'
            }`}
        >
          <Check className="w-5 h-5 text-[#0381fe]" />
          <span>주문 완료하기</span>
        </button>
      </div>

    </div>
  );
}
