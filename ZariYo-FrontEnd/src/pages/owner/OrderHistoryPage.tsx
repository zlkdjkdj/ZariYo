import { useState } from 'react';
import { ConsoleSidebar } from '../../components/owner/ConsoleSidebar';
import { 
  Receipt, Search, 
  CheckCircle, RotateCcw, X, CreditCard, Wallet 
} from 'lucide-react';

interface OrderReceipt {
  id: string;
  billCode: string;
  tableLabel: string;
  time: string;
  amount: number;
  paymentMethod: string;
  items: { name: string; qty: number; price: number }[];
  status: 'paid' | 'refunded';
}

export function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<OrderReceipt | null>(null);

  const [receipts, setReceipts] = useState<OrderReceipt[]>([
    {
      id: 'r1',
      billCode: '#BILL-20260723-01',
      tableLabel: 'T-1',
      time: '2026-07-23 12:45',
      amount: 80000,
      paymentMethod: '신용카드 (현대카드 / 일시불)',
      items: [
        { name: '토마호크 스테이크', qty: 1, price: 48000 },
        { name: '트러플 크림 파스타', qty: 1, price: 18000 },
        { name: '시그니처 수제 에이드', qty: 2, price: 14000 },
      ],
      status: 'paid',
    },
    {
      id: 'r2',
      billCode: '#BILL-20260723-02',
      tableLabel: 'T-2',
      time: '2026-07-23 12:20',
      amount: 36000,
      paymentMethod: '카카오페이 (간편결제)',
      items: [
        { name: '화덕 마르게리타 피자', qty: 2, price: 36000 },
      ],
      status: 'paid',
    },
    {
      id: 'r3',
      billCode: '#BILL-20260723-03',
      tableLabel: '바석-A',
      time: '2026-07-23 11:55',
      amount: 25000,
      paymentMethod: '현금 결제 (지급완료)',
      items: [
        { name: '트러플 크림 파스타', qty: 1, price: 18000 },
        { name: '시그니처 수제 에이드', qty: 1, price: 7000 },
      ],
      status: 'refunded',
    },
  ]);

  const handleRefund = (id: string, code: string) => {
    if (confirm(`영수증 [${code}] 건을 전액 환불/결제 취소 처리하시겠습니까?`)) {
      setReceipts(prev => prev.map(r => r.id === id ? { ...r, status: 'refunded' } : r));
      setSelectedReceipt(null);
      alert(`[${code}] 건이 성공적으로 환불 취소되었습니다.`);
    }
  };

  const filteredReceipts = receipts.filter(r => 
    r.billCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.tableLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-slate-50 dark:bg-[#030303] text-neutral-900 dark:text-[#f5f5f7] font-sans min-h-screen transition-colors duration-300">
      
      {/* Universal Sidebar */}
      <ConsoleSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200 dark:border-white/5 select-none">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#000000]/10 text-[#000000] text-[10px] font-bold font-mono mb-2">
              <Receipt className="w-3.5 h-3.5" /> ORDER HISTORY & PAYMENT METHODS
            </div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white">영수증 이력 & 결제 수단 명세</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold mt-1">
              결제 완료된 영수증 내역과 결제 수단(신용카드/카카오페이/현금)을 조회하고 환불을 실행합니다.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 select-none">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="영수증 번호 또는 테이블 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold focus:outline-none focus:border-[#000000]"
            />
          </div>
        </div>

        {/* Receipt Table List */}
        <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-none overflow-hidden shadow-none select-none text-left">
          <table className="w-full text-xs">
            <thead className="bg-neutral-100/70 dark:bg-white/[0.02] border-b border-neutral-200 dark:border-white/5 font-extrabold text-neutral-500 uppercase font-mono">
              <tr>
                <th className="p-4 pl-6">영수증 번호</th>
                <th className="p-4">테이블</th>
                <th className="p-4">결제 수단</th>
                <th className="p-4">결제 일시</th>
                <th className="p-4">결제 금액</th>
                <th className="p-4">상태</th>
                <th className="p-4 text-right pr-6">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-white/5 font-bold">
              {filteredReceipts.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="p-4 pl-6 font-mono font-extrabold text-neutral-900 dark:text-white">
                    {r.billCode}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-[#000000]/10 text-[#000000] font-black">
                      {r.tableLabel}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-300 font-semibold flex items-center gap-1.5 pt-4">
                    <CreditCard className="w-3.5 h-3.5 text-[#000000]" />
                    <span>{r.paymentMethod}</span>
                  </td>
                  <td className="p-4 text-neutral-500 font-mono">{r.time}</td>
                  <td className="p-4 font-black text-neutral-900 dark:text-white">
                    ₩ {r.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    {r.status === 'paid' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full text-[10.5px]">
                        <CheckCircle className="w-3 h-3" /> 결제 완료
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-full text-[10.5px]">
                        <RotateCcw className="w-3 h-3" /> 환불 완료
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={() => setSelectedReceipt(r)}
                      className="px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs cursor-pointer transition-all"
                    >
                      상세 보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      {/* Receipt Detail & Refund Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-none p-8 max-w-md w-full shadow-none relative text-left">
            
            <button 
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-none bg-[#000000]/10 text-[#000000]">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white">
                  영수증 상세 명세
                </h3>
                <span className="text-[10.5px] text-neutral-400 font-mono">
                  {selectedReceipt.billCode}
                </span>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-3 rounded-none mb-4 flex items-center justify-between text-xs font-bold">
              <span className="text-neutral-400 flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-[#000000]" /> 결제 수단:
              </span>
              <span className="text-neutral-900 dark:text-white">{selectedReceipt.paymentMethod}</span>
            </div>

            {/* Receipt details */}
            <div className="space-y-3 my-4 border-y border-neutral-200 dark:border-white/5 py-4 text-xs font-bold">
              {selectedReceipt.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-neutral-800 dark:text-white">
                  <span>{item.name} (x{item.qty})</span>
                  <span>₩ {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-neutral-400">합계 결제액</span>
              <span className="text-xl font-black text-[#000000]">₩ {selectedReceipt.amount.toLocaleString()}</span>
            </div>

            {/* Refund Action */}
            {selectedReceipt.status === 'paid' ? (
              <button
                onClick={() => handleRefund(selectedReceipt.id, selectedReceipt.billCode)}
                className="w-full py-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-extrabold cursor-pointer shadow-none transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                결제 승인 취소 & 전액 환불
              </button>
            ) : (
              <div className="w-full py-3 text-center bg-red-500/10 text-red-500 rounded-full text-xs font-black">
                이미 환불 완료 처리된 영수증입니다.
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
