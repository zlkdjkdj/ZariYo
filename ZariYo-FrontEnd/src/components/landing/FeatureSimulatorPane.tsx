import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileSpreadsheet } from 'lucide-react';

interface FeatureSimulatorPaneProps {
  activeTab: 'kiosk' | 'pos' | 'kds' | 'analytics';
  kioskLockTime: number;
  setKioskLockTime: (val: number) => void;
  kioskOption: 'normal' | 'large';
  setKioskOption: (val: 'normal' | 'large') => void;
  kioskCallAlert: boolean;
  setKioskCallAlert: (val: boolean) => void;
  posSelectedTable: string;
  setPosSelectedTable: (val: string) => void;
  posPayMethod: 'card' | 'kakao' | 'cash';
  setPosPayMethod: (val: 'card' | 'kakao' | 'cash') => void;
  kdsCompletedOrders: number[];
  setKdsCompletedOrders: (val: number[]) => void;
  soldOutState: { [key: string]: boolean };
  setSoldOutState: (val: { [key: string]: boolean }) => void;
}

export function FeatureSimulatorPane({
  activeTab,
  kioskLockTime,
  setKioskLockTime,
  kioskOption,
  setKioskOption,
  kioskCallAlert,
  setKioskCallAlert,
  posSelectedTable,
  setPosSelectedTable,
  posPayMethod,
  setPosPayMethod,
  kdsCompletedOrders,
  setKdsCompletedOrders,
  soldOutState,
  setSoldOutState,
}: FeatureSimulatorPaneProps) {
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="lg:col-span-6 w-full rounded-[3px] border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#09090b] p-7 shadow-none text-left select-none">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-extrabold uppercase text-black dark:text-white">
            LIVE SIMULATOR : {activeTab.toUpperCase()} PANE
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 dark:bg-white/10 px-2.5 py-1 rounded-[3px]">
          INTERACTIVE DEMO
        </span>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'kiosk' && (
          <motion.div 
            key="sim-kiosk"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6 text-xs font-semibold"
          >
            <div className="p-5 rounded-[3px] bg-neutral-50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-neutral-500 uppercase font-bold">RESERVATION LOCK TIMEOUT</span>
                <p className="text-xl font-mono font-black text-red-600 dark:text-red-400 mt-1 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  <span>{formatTime(kioskLockTime)}</span>
                </p>
              </div>
              <button 
                onClick={() => setKioskLockTime(300)}
                className="px-4 py-2 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90"
              >
                5분 락 리셋
              </button>
            </div>

            <div className="p-5 rounded-[3px] bg-neutral-50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-black dark:text-white text-sm">메뉴 옵션 선택 모달 (특상 로스카츠)</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">14,000원</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setKioskOption('normal')}
                  className={`py-2.5 px-4 rounded-[3px] border font-bold text-xs cursor-pointer ${
                    kioskOption === 'normal' ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/10'
                  }`}
                >
                  기본 (14,000원)
                </button>
                <button 
                  onClick={() => setKioskOption('large')}
                  className={`py-2.5 px-4 rounded-[3px] border font-bold text-xs cursor-pointer ${
                    kioskOption === 'large' ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/10'
                  }`}
                >
                  곱빼기 (+1,500원)
                </button>
              </div>
            </div>

            <div className="p-5 rounded-[3px] bg-neutral-50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 flex justify-between items-center">
              <div>
                <span className="font-extrabold text-black dark:text-white text-sm">원터치 직원 호출 신호</span>
                <p className="text-xs text-neutral-500 mt-0.5">물 / 앞치마 / 직원 요청</p>
              </div>
              <button 
                onClick={() => {
                  setKioskCallAlert(true);
                  setTimeout(() => setKioskCallAlert(false), 2500);
                }}
                className="px-4 py-2.5 rounded-[3px] bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs cursor-pointer"
              >
                직원 호출 테스트
              </button>
            </div>

            {kioskCallAlert && (
              <div className="p-3.5 rounded-[3px] bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-bold text-center animate-bounce">
                🔔 [관제 POS 수신] T-04번 테이블에서 직원을 호출했습니다!
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'pos' && (
          <motion.div 
            key="sim-pos"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-5 text-xs font-semibold"
          >
            <div className="grid grid-cols-4 gap-2.5">
              {['T-01', 'T-02', 'T-03', 'T-04'].map((tbl) => (
                <button
                  key={tbl}
                  onClick={() => setPosSelectedTable(tbl)}
                  className={`py-3 rounded-[3px] border font-black text-xs cursor-pointer ${
                    posSelectedTable === tbl 
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                      : 'bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-300 border-neutral-300 dark:border-white/10'
                  }`}
                >
                  {tbl} (사용중)
                </button>
              ))}
            </div>

            <div className="p-5 rounded-[3px] bg-neutral-50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 space-y-3.5">
              <div className="flex justify-between border-b border-neutral-200 dark:border-white/10 pb-2.5">
                <span className="font-extrabold text-black dark:text-white text-sm">{posSelectedTable} 영수증 수선서</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">실시간 연동중</span>
              </div>
              <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                <div className="flex justify-between"><span>• 안심 카츠 정식 (x2)</span><span>28,000원</span></div>
                <div className="flex justify-between"><span>• 특상 로스카츠 (곱빼기)</span><span>15,500원</span></div>
                <div className="flex justify-between"><span>• 제로 콜라 (x2)</span><span>4,000원</span></div>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-neutral-200 dark:border-white/10 font-black text-black dark:text-white text-sm">
                <span>합계 금액</span>
                <span>47,500원</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              {(['card', 'kakao', 'cash'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setPosPayMethod(method)}
                  className={`flex-1 py-3 rounded-[3px] border font-bold text-xs cursor-pointer ${
                    posPayMethod === method ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-white/10'
                  }`}
                >
                  {method === 'card' ? '신용카드' : method === 'kakao' ? '카카오페이' : '현금영수증'}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'kds' && (
          <motion.div 
            key="sim-kds"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-4 text-xs font-semibold"
          >
            <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
              REALTIME COOKING QUEUE (2 ORDERS IN QUEUE)
            </div>

            {[
              { id: 1, table: 'T-04', menu: '안심 카츠 정식 x2', note: '미디엄 웰던 / 와사비 많이', time: '오후 6:42' },
              { id: 2, table: 'T-02', menu: '특상 로스카츠 x1', note: '드레싱 따로 요청', time: '오후 6:45' }
            ].map((order) => {
              const isDone = kdsCompletedOrders.includes(order.id);
              return (
                <div 
                  key={order.id} 
                  className={`p-4.5 rounded-[3px] border transition-all ${
                    isDone 
                      ? 'bg-neutral-200 dark:bg-white/5 border-neutral-300 dark:border-white/10 opacity-50' 
                      : 'bg-neutral-50 dark:bg-white/5 border-neutral-300 dark:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-black dark:text-white text-base">{order.table}</span>
                    <span className="text-xs font-mono text-neutral-500">{order.time}</span>
                  </div>
                  <p className="font-extrabold text-black dark:text-white text-sm">{order.menu}</p>
                  <div className="mt-2 p-2 rounded-[3px] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold">
                    ⚠️ Special Note: {order.note}
                  </div>
                  <button
                    onClick={() => {
                      if (isDone) {
                        setKdsCompletedOrders(kdsCompletedOrders.filter(id => id !== order.id));
                      } else {
                        setKdsCompletedOrders([...kdsCompletedOrders, order.id]);
                      }
                    }}
                    className={`w-full mt-3 py-2.5 rounded-[3px] font-black text-xs cursor-pointer border ${
                      isDone 
                        ? 'bg-neutral-300 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border-transparent' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
                    }`}
                  >
                    {isDone ? '✓ 조리 완료됨 (클릭 시 원복)' : '원터치 조리 완료 (Completed)'}
                  </button>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div 
            key="sim-analytics"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-5 text-xs font-semibold"
          >
            <div className="p-5 rounded-[3px] bg-neutral-50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">TODAY TOTAL REVENUE</span>
                <p className="text-2xl font-black text-black dark:text-white mt-1">₩ 1,485,000 원</p>
              </div>
              <button className="px-4 py-2 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>CSV 엑셀 추출</span>
              </button>
            </div>

            <div className="p-5 rounded-[3px] bg-neutral-50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 space-y-3.5">
              <span className="font-extrabold text-black dark:text-white text-sm">실시간 메뉴 품절(Sold-Out) 스위치</span>
              <div className="space-y-2.5">
                {Object.keys(soldOutState).map((item) => (
                  <div key={item} className="flex justify-between items-center p-3 rounded-[3px] bg-white dark:bg-black border border-neutral-200 dark:border-white/10">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 text-xs">{item}</span>
                    <button
                      onClick={() => setSoldOutState({ ...soldOutState, [item]: !soldOutState[item] })}
                      className={`px-3.5 py-1.5 rounded-[3px] text-xs font-extrabold cursor-pointer border ${
                        soldOutState[item] 
                          ? 'bg-red-600 text-white border-red-500' 
                          : 'bg-emerald-600 text-white border-emerald-500'
                      }`}
                    >
                      {soldOutState[item] ? '품절 (Sold Out)' : '판매 중 (In Stock)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
