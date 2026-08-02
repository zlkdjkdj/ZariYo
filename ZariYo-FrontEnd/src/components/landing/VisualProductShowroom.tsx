import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Smartphone, ChefHat, BarChart2, CheckCircle2, 
  Sparkles, Lock, FileSpreadsheet, Utensils, Bell, CreditCard, Layers
} from 'lucide-react';

interface ShowroomElement {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isOccupied?: boolean;
  isTempOccupied?: boolean;
  tempOccupiedMins?: number;
}

interface VisualProductShowroomProps {
  isDarkMode?: boolean;
}

export function VisualProductShowroom({ isDarkMode = false }: VisualProductShowroomProps) {
  const [activeTab, setActiveTab] = useState<'pos' | 'kiosk' | 'kds' | 'analytics'>('pos');
  
  // Real Interactive ZariYo Store Elements State
  const [selectedTable, setSelectedTable] = useState<string>('T-04');
  const [kdsDone, setKdsDone] = useState<number[]>([]);
  const [soldOutItems, setSoldOutItems] = useState<{ [key: string]: boolean }>({
    '특상 로스카츠': false,
    '제로 콜라': true,
    '안심 카츠 정식': false,
  });
  const [callAlert, setCallAlert] = useState(false);

  // ZariYo Real 2D Store Grid Elements Data
  const demoElements: ShowroomElement[] = [
    { id: 'el-1', type: 'table-4', label: 'T-01', x: 40, y: 40, width: 100, height: 80, isOccupied: true },
    { id: 'el-2', type: 'table-2', label: 'T-02', x: 160, y: 40, width: 80, height: 80, isOccupied: true, isTempOccupied: true, tempOccupiedMins: 3 },
    { id: 'el-3', type: 'table-4', label: 'T-03', x: 260, y: 40, width: 100, height: 80, isOccupied: false },
    { id: 'el-4', type: 'table-2', label: 'T-04', x: 40, y: 150, width: 80, height: 80, isOccupied: true },
    { id: 'el-5', type: 'counter', label: '주문 카운터 POS', x: 160, y: 150, width: 120, height: 80 },
    { id: 'el-6', type: 'door', label: '주 출입구', x: 300, y: 150, width: 60, height: 80 },
    { id: 'el-7', type: 'toilet', label: '화장실', x: 380, y: 150, width: 60, height: 80 },
  ];

  const showroomTabs = [
    { id: 'pos', name: '사장님 2D 관제 POS', icon: Monitor, tag: '라이브 2D 도면' },
    { id: 'kiosk', name: '손님 2D 예약 & 키오스크', icon: Smartphone, tag: '0.1초 원터치 결제' },
    { id: 'kds', name: '주방 KDS 조리 릴레이', icon: ChefHat, tag: '2분할 스마트 주방' },
    { id: 'analytics', name: '실시간 매출 & 품절 통제', icon: BarChart2, tag: '원클릭 정산 & 품절' },
  ];

  return (
    <section className={`py-24 border-t select-none transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#09090b] text-[#ffffff] border-white/10' 
        : 'bg-[#ffffff] text-[#000000] border-[#dddddd]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[20px] bg-[#0381fe]/10 border border-[#0381fe]/20 text-[#0381fe] text-xs font-mono font-bold uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ZARIYO LIVE UI PRODUCT SHOWROOM</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-5xl font-bold tracking-tight font-display ${
              isDarkMode ? 'text-white' : 'text-[#000000]'
            }`}
          >
            화면 속에서 직접 움직이는<br />
            <span className="text-[#0381fe]">ZariYo 실제 2D 관제 OS UI</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-sm sm:text-base font-normal leading-relaxed ${
              isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
            }`}
          >
            정적 이미지가 아닌, 100% ZariYo 실제 매장 2D 배치도 및 실시간 수선서 UI를 눈으로 직접 확인하세요.
          </motion.p>
        </div>

        {/* Showroom Interactive Device Selector Tabs */}
        <div className={`flex flex-wrap items-center justify-center gap-3 border-b pb-4 ${
          isDarkMode ? 'border-white/10' : 'border-[#dddddd]'
        }`}>
          {showroomTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-[20px] text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer shadow-none ${
                  isActive
                    ? isDarkMode 
                      ? 'bg-white text-black border border-white scale-[1.02]' 
                      : 'bg-[#000000] text-white border border-[#000000] scale-[1.02]'
                    : isDarkMode 
                      ? 'bg-[#141417] text-white border border-white/10 hover:bg-white/10' 
                      : 'bg-[#f7f7f7] text-[#000000] border border-[#dddddd] hover:bg-[#eeeeee]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0381fe]' : 'text-[#707070]'}`} />
                <span>{tab.name}</span>
                <span className={`text-[10px] font-mono font-normal px-2 py-0.5 rounded-[20px] ${
                  isActive 
                    ? 'bg-[#0381fe] text-white' 
                    : isDarkMode ? 'bg-white/10 text-neutral-400' : 'bg-[#e5e5e5] text-[#707070]'
                }`}>
                  {tab.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Samsung Galaxy Display Frame with Theme Support */}
        <div className={`relative rounded-[24px] border p-4 sm:p-8 overflow-hidden transition-colors ${
          isDarkMode ? 'bg-[#141417] border-white/10' : 'bg-[#f7f7f7] border-[#dddddd]'
        }`}>
          
          {/* Display Header Status Bar */}
          <div className={`flex items-center justify-between pb-4 mb-6 border-b ${
            isDarkMode ? 'border-white/10' : 'border-[#dddddd]'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0381fe]" />
              <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                ZARIYO STORE CONTROL OS v4.2 (REAL LIVE ENGINE)
              </span>
            </div>
            <div className={`flex items-center gap-2 text-xs font-mono font-bold ${
              isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>REALTIME 2D CANVAS ACTIVE</span>
            </div>
          </div>


          <AnimatePresence mode="wait">
            
            {/* TAB 1: Real ZariYo 2D Dashboard & Side-by-Side Receipt Overlay */}
            {activeTab === 'pos' && (
              <motion.div
                key="real-pos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
              >
                {/* Left 7 cols: Actual ZariYo 2D Map Canvas Component */}
                <div className="lg:col-span-7 bg-[#ffffff] p-6 rounded-[20px] border border-[#dddddd] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#dddddd]">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#0381fe]" />
                      <span className="font-bold text-sm text-[#000000]">실제 매장 2D 도면 관제판 (테이블 터치 가능)</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-2.5 py-1 rounded-[20px]">
                      CLICK TABLE TO VIEW
                    </span>
                  </div>

                  {/* ZariYo 2D Grid Interactive Canvas Rendering */}
                  <div className="relative w-full h-[260px] bg-[#f7f7f7] rounded-[20px] border border-[#dddddd] overflow-hidden p-2">
                    {/* Grid Pattern Lines */}
                    <div className="absolute inset-0 bg-[radial-gradient(#dddddd_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                    
                    {demoElements.map((el) => {
                      const isSelected = selectedTable === el.label;
                      return (
                        <motion.div
                          key={el.id}
                          onClick={() => el.type.startsWith('table') && setSelectedTable(el.label)}
                          whileHover={{ scale: el.type.startsWith('table') ? 1.05 : 1 }}
                          style={{
                            left: `${el.x}px`,
                            top: `${el.y}px`,
                            width: `${el.width}px`,
                            height: `${el.height}px`,
                          }}
                          className={`absolute rounded-[12px] p-2 flex flex-col items-center justify-center transition-all cursor-pointer text-xs font-bold border ${
                            isSelected
                              ? 'bg-[#0381fe] text-white border-[#0381fe] ring-4 ring-[#0381fe]/30 z-20'
                              : el.isTempOccupied
                              ? 'bg-amber-500 text-white border-amber-500'
                              : el.isOccupied
                              ? 'bg-[#000000] text-white border-[#000000]'
                              : el.type.startsWith('table')
                              ? 'bg-[#ffffff] text-[#000000] border-[#dddddd] hover:border-[#0381fe]'
                              : 'bg-[#e5e5e5] text-[#707070] border-[#dddddd]'
                          }`}
                        >
                          <span>{el.label}</span>
                          {el.isTempOccupied && (
                            <span className="text-[9px] font-mono flex items-center gap-1 mt-0.5">
                              <Lock className="w-2.5 h-2.5" /> 3m 42s
                            </span>
                          )}
                          {el.isOccupied && !el.isTempOccupied && (
                            <span className="text-[9px] opacity-80 mt-0.5">사용중</span>
                          )}
                          {!el.isOccupied && el.type.startsWith('table') && (
                            <span className="text-[9px] text-[#0381fe] mt-0.5">공석</span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold text-[#707070] pt-1">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#000000]" /> 사용중</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 5분 선점대기</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-white border border-[#dddddd]" /> 공석</span>
                    </div>
                    <span className="text-[#0381fe]">선택 테이블: {selectedTable}</span>
                  </div>
                </div>

                {/* Right 5 cols: Side-by-Side Receipt Overlay Panel (Real UI) */}
                <div className="lg:col-span-5 bg-[#ffffff] p-6 rounded-[20px] border border-[#dddddd] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#dddddd]">
                    <span className="font-bold text-sm text-[#000000]">{selectedTable} 실시간 수선서</span>
                    <span className="text-xs font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-2.5 py-1 rounded-[20px]">
                      POS OVERLAY
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between font-bold text-[#000000]">
                      <span>• 안심 카츠 정식 (x2)</span>
                      <span>28,000원</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#000000]">
                      <span>• 특상 로스카츠 (곱빼기)</span>
                      <span>15,500원</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#000000]">
                      <span>• 제로 콜라 (x2)</span>
                      <span>4,000원</span>
                    </div>

                    <div className="pt-3 border-t border-[#dddddd] flex justify-between font-bold text-[#000000] text-sm">
                      <span>합계 결제 금액</span>
                      <span className="text-[#0381fe]">47,500원</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button className="w-full py-2.5 rounded-[20px] bg-[#000000] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800">
                      <CreditCard className="w-4 h-4 text-[#0381fe]" />
                      <span>신용카드 결제 완료 처리</span>
                    </button>
                    <button className="w-full py-2 rounded-[20px] bg-[#f7f7f7] text-[#000000] border border-[#dddddd] font-bold text-xs hover:bg-[#eeeeee]">
                      퇴석 처리 및 테이블 공석 원복
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 2: Real ZariYo Kiosk & Customer 2D Reservation Modal */}
            {activeTab === 'kiosk' && (
              <motion.div
                key="real-kiosk"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
              >
                {/* Left 7 cols: Real Customer 2D Table Selection Kiosk */}
                <div className="lg:col-span-7 bg-[#ffffff] p-6 rounded-[20px] border border-[#dddddd] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#dddddd]">
                    <span className="font-bold text-sm text-[#000000]">손님 2D 좌석 선택 & 메뉴 장바구니</span>
                    <span className="text-xs font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-2.5 py-1 rounded-[20px]">
                      CUSTOMER KIOSK
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 py-1">
                    {['T-01 (사용중)', 'T-02 (선점중)', 'T-03 (선택가능)', 'T-04 (사용중)', 'T-05 (선택가능)', 'T-06 (선택가능)'].map((tbl, i) => (
                      <button
                        key={tbl}
                        className={`py-3 px-2 rounded-[20px] border text-xs font-bold transition-all ${
                          i === 2 
                            ? 'bg-[#0381fe] text-white border-[#0381fe] scale-[1.03]' 
                            : i === 0 || i === 3 
                            ? 'bg-[#000000] text-white border-[#000000] opacity-50 cursor-not-allowed' 
                            : 'bg-[#f7f7f7] text-[#000000] border-[#dddddd] hover:border-[#0381fe]'
                        }`}
                      >
                        {tbl}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-[20px] bg-[#f7f7f7] border border-[#dddddd] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#707070] font-bold">SELECTED SEAT</span>
                      <p className="font-bold text-sm text-[#000000]">T-03 (4인용 창가석)</p>
                    </div>
                    <span className="text-xs font-bold text-[#0381fe] bg-[#0381fe]/10 px-3 py-1 rounded-[20px]">
                      5분 임시 선점 적용
                    </span>
                  </div>
                </div>

                {/* Right 5 cols: Kiosk Option & One-touch Call */}
                <div className="lg:col-span-5 bg-[#ffffff] p-6 rounded-[20px] border border-[#dddddd] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#dddddd]">
                    <span className="font-bold text-sm text-[#000000]">메뉴 옵션 & 직원 호출</span>
                    <span className="text-xs font-mono font-bold text-[#0381fe]">KIOSK ACTIONS</span>
                  </div>

                  <div className="p-4 rounded-[20px] bg-[#f7f7f7] border border-[#dddddd] space-y-3">
                    <span className="font-bold text-xs text-[#000000]">특상 로스카츠 정식 (14,000원)</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button className="py-2 rounded-[20px] bg-[#000000] text-white font-bold">기본 (14,000원)</button>
                      <button className="py-2 rounded-[20px] bg-[#ffffff] text-[#000000] border border-[#dddddd] font-bold">곱빼기 (+1,500원)</button>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setCallAlert(true);
                      setTimeout(() => setCallAlert(false), 2500);
                    }}
                    className="w-full py-3 rounded-[20px] bg-[#0381fe] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    <span>원터치 직원 호출 신호 테스트</span>
                  </button>

                  {callAlert && (
                    <div className="p-3 rounded-[20px] bg-[#0381fe]/10 border border-[#0381fe]/30 text-[#0381fe] text-xs font-bold text-center animate-bounce">
                      🔔 [사장님 POS 전파] T-03번 테이블 직원 호출 완료!
                    </div>
                  )}
                </div>

              </motion.div>
            )}

            {/* TAB 3: Real ZariYo Kitchen KDS 2-Split Relay */}
            {activeTab === 'kds' && (
              <motion.div
                key="real-kds"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
              >
                {/* Left 7 cols: 2-Split KDS Order Cards */}
                <div className="lg:col-span-7 bg-[#ffffff] p-6 rounded-[20px] border border-[#dddddd] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#dddddd]">
                    <span className="font-bold text-sm text-[#000000]">주방 KDS 2분할 조리 관제 카운터</span>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-[20px]">
                      STOMP RELAY ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 1, tag: 'HALL ORDER (T-04)', menu: '안심 카츠 정식 x2', note: '미디엄 웰던 / 와사비 많이', time: '18:42' },
                      { id: 2, tag: 'DELIVERY (배민)', menu: '특상 로스카츠 x1', note: '소스 따로 제공 요청', time: '18:45' }
                    ].map((order) => {
                      const isDone = kdsDone.includes(order.id);
                      return (
                        <div 
                          key={order.id}
                          className={`p-4 rounded-[20px] border space-y-2 transition-all ${
                            isDone ? 'bg-[#f7f7f7] border-[#dddddd] opacity-60' : 'bg-[#ffffff] border-[#dddddd]'
                          }`}
                        >
                          <div className="flex justify-between text-[10px] font-mono font-bold">
                            <span className="text-[#0381fe]">{order.tag}</span>
                            <span className="text-[#707070]">{order.time}</span>
                          </div>
                          <h4 className="font-bold text-xs text-[#000000]">{order.menu}</h4>
                          <p className="text-[10px] text-amber-700 font-bold bg-amber-500/10 p-1.5 rounded-[20px] border border-amber-500/20">
                            ⚠️ {order.note}
                          </p>
                          <button
                            onClick={() => {
                              if (isDone) {
                                setKdsDone(kdsDone.filter(id => id !== order.id));
                              } else {
                                setKdsDone([...kdsDone, order.id]);
                              }
                            }}
                            className={`w-full mt-2 py-2 rounded-[20px] font-bold text-[11px] cursor-pointer border ${
                              isDone
                                ? 'bg-[#f7f7f7] text-[#707070] border-[#dddddd]'
                                : 'bg-[#0381fe] text-white border-[#0381fe]'
                            }`}
                          >
                            {isDone ? '✓ 조리 완료됨 (원복)' : '원터치 조리 완료 (Complete)'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right 5 cols: Highlights */}
                <div className="lg:col-span-5 bg-[#ffffff] p-6 rounded-[20px] border border-[#dddddd] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#dddddd]">
                    <span className="font-bold text-sm text-[#000000]">KDS 시스템 장점</span>
                    <span className="text-xs font-mono font-bold text-[#0381fe]">SPEC</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#000000]">
                      <Utensils className="w-4 h-4 text-[#0381fe]" />
                      <span>홀 테이블 요리 & 배달/포장 주문 2분할 자동 정돈</span>
                    </div>

                    <div className="flex items-center gap-2 font-bold text-[#000000]">
                      <CheckCircle2 className="w-4 h-4 text-[#0381fe]" />
                      <span>원터치 완료 시 사장님 POS 및 고객 앱 전파</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 4: Real ZariYo BI Revenue & Sold-out Switcher */}
            {activeTab === 'analytics' && (
              <motion.div
                key="real-analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
              >
                {/* Left 7 cols: Real BI Revenue Cards */}
                <div className="lg:col-span-7 bg-[#ffffff] p-6 rounded-[20px] border border-[#dddddd] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#dddddd]">
                    <span className="font-bold text-sm text-[#000000]">실시간 매출 분석 & 엑셀 내보내기</span>
                    <span className="text-xs font-mono font-bold text-[#0381fe]">BI ENGINE</span>
                  </div>

                  <div className="p-5 rounded-[20px] bg-[#f7f7f7] border border-[#dddddd] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#707070] font-bold">TODAY TOTAL REVENUE</span>
                      <p className="text-2xl font-bold text-[#000000] mt-1">₩ 1,485,000 원</p>
                    </div>
                    <button className="px-4 py-2.5 rounded-[20px] bg-[#000000] text-white font-bold text-xs flex items-center gap-2 hover:bg-neutral-800">
                      <FileSpreadsheet className="w-4 h-4 text-[#0381fe]" />
                      <span>CSV 엑셀 다운로드</span>
                    </button>
                  </div>
                </div>

                {/* Right 5 cols: Live Sold-out Switcher */}
                <div className="lg:col-span-5 bg-[#ffffff] p-6 rounded-[20px] border border-[#dddddd] space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#dddddd]">
                    <span className="font-bold text-sm text-[#000000]">실시간 품절(Sold-Out) 스위치</span>
                    <span className="text-xs font-mono font-bold text-[#0381fe]">LIVE TOGGLE</span>
                  </div>

                  <div className="space-y-2.5">
                    {Object.keys(soldOutItems).map((item) => (
                      <div key={item} className="flex justify-between items-center p-3 rounded-[20px] bg-[#f7f7f7] border border-[#dddddd] text-xs">
                        <span className="font-bold text-[#000000]">{item}</span>
                        <button
                          onClick={() => setSoldOutItems({ ...soldOutItems, [item]: !soldOutItems[item] })}
                          className={`px-3.5 py-1.5 rounded-[20px] text-[11px] font-bold border cursor-pointer ${
                            soldOutItems[item]
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-[#0381fe] text-white border-[#0381fe]'
                          }`}
                        >
                          {soldOutItems[item] ? '품절 (Sold Out)' : '판매 중 (In Stock)'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
