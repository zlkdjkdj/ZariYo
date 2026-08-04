import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Monitor, 
  Smartphone, 
  ChefHat, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight,
  MousePointer,
  RotateCcw,
  Sliders,
  Bell,
  Clock,
  QrCode
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TabType = 'builder' | 'dashboard' | 'kiosk' | 'kds';

export function GuideTabSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('builder');

  const tabList = [
    { id: 'builder' as TabType, name: '1. 매장 2D 좌석 배치 설정', icon: LayoutGrid, tag: '사장님' },
    { id: 'dashboard' as TabType, name: '2. 실시간 대시보드 관제', icon: Monitor, tag: '사장님' },
    { id: 'kiosk' as TabType, name: '3. 2D 키오스크 주문/예약', icon: Smartphone, tag: '손님' },
    { id: 'kds' as TabType, name: '4. 주방 KDS & 배달 릴레이', icon: ChefHat, tag: '주방/매장' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#09090b] border-b border-neutral-300 dark:border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Category Tabs Header */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-mono font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-[3px]">
            PRACTICAL USER MANUAL & STEP-BY-STEP GUIDE
          </span>
          <h3 className="text-2xl md:text-4xl font-black text-black dark:text-white">
            역할 및 기능별 실전 시스템 이용 가이드
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-semibold max-w-2xl mx-auto">
            매장 배치 셋업부터 실시간 관제 대시보드 조작, 손님 키오스크 이용, 주방 주문 릴레이까지 원하는 항목을 선택하여 상세 이용 방법을 확인하세요.
          </p>

          {/* Interactive Tab Buttons */}
          <div className="pt-4 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {tabList.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 rounded-[4px] font-black text-xs md:text-sm cursor-pointer transition-all flex items-center gap-2 border ${
                    isActive 
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md scale-[1.02]' 
                      : 'bg-neutral-100 dark:bg-[#111113] text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500 dark:text-blue-600' : 'text-neutral-500'}`} />
                  <span>{tab.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-[2px] font-mono ${
                    isActive ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' : 'bg-neutral-200 dark:bg-white/10 text-neutral-500'
                  }`}>
                    {tab.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="bg-neutral-50 dark:bg-[#111113] border border-neutral-300 dark:border-white/10 rounded-[6px] p-6 md:p-10">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: STORE BUILDER MANUAL */}
            {activeTab === 'builder' && (
              <motion.div
                key="builder"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-300 dark:border-white/10 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
                      <LayoutGrid className="w-4 h-4" />
                      <span>STEP-BY-STEP BUILDER MANUAL</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-black dark:text-white">
                      2D 매장 좌석 배치도 작성 및 가구 세팅 방법
                    </h4>
                  </div>
                  <button
                    onClick={() => navigate('/owner/store/builder')}
                    className="self-start md:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-[3px] flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>스토어 빌더 실행하기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-black flex items-center justify-center">1</span>
                      <MousePointer className="w-4 h-4 text-blue-500" />
                    </div>
                    <h5 className="font-extrabold text-sm text-black dark:text-white">가구/테이블 배치</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      좌측 사이드바의 2인석, 4인석, 바 테이블, 카운터, 출입구 등의 가구 아이콘을 캔버스 중앙으로 드래그 앤 드롭합니다.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-black flex items-center justify-center">2</span>
                      <Sliders className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h5 className="font-extrabold text-sm text-black dark:text-white">속성 및 번호 설정</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      배치된 가구를 클릭하면 우측 속성 창이 활성화됩니다. 테이블 번호(예: T-01), 식별 라벨, 예약 가능 여부를 설정합니다.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-black flex items-center justify-center">3</span>
                      <Clock className="w-4 h-4 text-amber-500" />
                    </div>
                    <h5 className="font-extrabold text-sm text-black dark:text-white">5분 원자성 선점 락 지정</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      손님 착석 및 결제 지연 시 이중 착석을 막기 위해 테이블별로 5분 임시 선점 타임아웃 락 적용 여부를 체크합니다.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-black flex items-center justify-center">4</span>
                      <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    </div>
                    <h5 className="font-extrabold text-sm text-black dark:text-white">저장 및 대시보드 반영</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      우측 상단의 [배치도 저장하기] 버튼을 눌러 DB 및 대시보드 라이브 배치도에 즉시 실시간 연동시킵니다.
                    </p>
                  </div>
                </div>

                {/* Practical Tips Box */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 rounded-[4px] flex items-start gap-3 text-xs">
                  <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-blue-900 dark:text-blue-200 block">💡 실전 운영 팁</span>
                    <p className="text-blue-800 dark:text-blue-300 leading-relaxed font-semibold">
                      2D 배치도는 언제든지 사장님 대시보드 메뉴에서 재편집할 수 있으며, 수정된 좌석 정보는 손님용 키오스크 화면에 0.001초만에 동기화됩니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: DASHBOARD MANUAL */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-300 dark:border-white/10 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      <Monitor className="w-4 h-4" />
                      <span>REALTIME DASHBOARD MONITORING GUIDE</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-black dark:text-white">
                      실시간 대시보드 모니터링 & 좌석 상태 관제 방법
                    </h4>
                  </div>
                  <button
                    onClick={() => navigate('/owner/dashboard')}
                    className="self-start md:self-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-[3px] flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>대시보드 바로가기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <h5 className="font-extrabold text-sm text-black dark:text-white">라이브 2D 테이블 맵 확인</h5>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      초록색(공석), 주황색(5분 선점 진행중), 파란색(착석 완료), 빨간색(노쇼/경고) 등 테이블 색상으로 실시간 매장 현황을 직관적으로 확인합니다.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center gap-2">
                      <MousePointer className="w-4 h-4 text-emerald-500" />
                      <h5 className="font-extrabold text-sm text-black dark:text-white">테이블 수동 상태 변경</h5>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      2D 지도 상의 임의의 테이블을 클릭하면 인라인 팝업이 활성화됩니다. [강제 공석 처리], [입정 확정], [퇴실 완료] 버튼으로 수동 조치할 수 있습니다.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-sky-500" />
                      <h5 className="font-extrabold text-sm text-black dark:text-white">실시간 알림 센터 드로어</h5>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      우측 상단 알림 종 아이콘을 클릭하여 손님 선점 신호, 결제 완료, 5분 타임아웃 만료 알림을 실시간 스트리밍으로 수신합니다.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-[4px] flex items-start gap-3 text-xs">
                  <AlertCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-emerald-900 dark:text-emerald-200 block">⚡ 노쇼 방지 5분 타임아웃 자동 처리</span>
                    <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed font-semibold">
                      손님이 키오스크에서 좌석을 선점했으나 5분 이내 결제하지 않으면 대시보드 타이머가 만료되어 자동으로 좌석이 공석으로 원복됩니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: KIOSK MANUAL */}
            {activeTab === 'kiosk' && (
              <motion.div
                key="kiosk"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-300 dark:border-white/10 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 mb-1">
                      <Smartphone className="w-4 h-4" />
                      <span>CUSTOMER 2D KIOSK USER GUIDE</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-black dark:text-white">
                      손님용 2D 좌석 키오스크 주문 및 예약 이용 순서
                    </h4>
                  </div>
                  <button
                    onClick={() => navigate('/reserve')}
                    className="self-start md:self-auto px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-black rounded-[3px] flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>키오스크 예약 체험해보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-mono text-xs font-black flex items-center justify-center">1</span>
                      <Smartphone className="w-4 h-4 text-sky-500" />
                    </div>
                    <h5 className="font-extrabold text-sm text-black dark:text-white">휴대폰 번호 본인 인증</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      키오스크 입구 화면에서 휴대폰 번호를 입력하면 카카오 알림톡 및 본인 확인 절차가 가동됩니다.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-mono text-xs font-black flex items-center justify-center">2</span>
                      <QrCode className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h5 className="font-extrabold text-sm text-black dark:text-white">2D 배치도에서 좌석 선택</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      매장 2D 좌석 배치도를 직접 확인하고 원하는 공석(2인석/4인석/창가석)을 터치하여 선택합니다.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-mono text-xs font-black flex items-center justify-center">3</span>
                      <Clock className="w-4 h-4 text-amber-500" />
                    </div>
                    <h5 className="font-extrabold text-sm text-black dark:text-white">5분 선점 타임아웃 활성화</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      좌석을 선택하면 5분 카운트다운 타이머가 시작되며 해당 시간 동안 타 손님의 동시 선택이 원자적으로 차단됩니다.
                    </p>
                  </div>

                  <div className="p-5 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-mono text-xs font-black flex items-center justify-center">4</span>
                      <CheckCircle2 className="w-4 h-4 text-purple-500" />
                    </div>
                    <h5 className="font-extrabold text-sm text-black dark:text-white">메뉴 옵션 선택 및 결제</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-semibold">
                      메뉴 및 추가 옵션을 담아 결제를 완료하면 주방 KDS로 주문이 즉시 전송되고 착석 확정 처리됩니다.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 rounded-[4px] flex items-start gap-3 text-xs">
                  <RotateCcw className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-sky-900 dark:text-sky-200 block">💡 좌석 변경 기능 안내</span>
                    <p className="text-sky-800 dark:text-sky-300 leading-relaxed font-semibold">
                      주문 완료 후 좌석 변경을 원하실 경우, 사장님 대시보드 또는 키오스크 좌석 변경 모달에서 빈 자리로 터치 한 번에 이동 조치가 가능합니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: KDS & DELIVERY MANUAL */}
            {activeTab === 'kds' && (
              <motion.div
                key="kds"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-300 dark:border-white/10 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 mb-1">
                      <ChefHat className="w-4 h-4" />
                      <span>KITCHEN DISPLAY SYSTEM & DELIVERY RELAY MANUAL</span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-black dark:text-white">
                      주방 KDS 연동 & 배달 플랫폼 릴레이 관리 방법
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-4">
                    <div className="flex items-center gap-2">
                      <ChefHat className="w-5 h-5 text-orange-500" />
                      <h5 className="font-extrabold text-base text-black dark:text-white">주방 KDS (Kitchen Display System) 뷰</h5>
                    </div>
                    <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 font-semibold leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 font-black">•</span>
                        <span>주방용 태블릿 모니터에 KDS 뷰를 띄워두면 홀 주문과 배달 주문이 2분할 릴레이 카드로 실시간 수신됩니다.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 font-black">•</span>
                        <span>조리 시작 및 조리 완료 터치 시 홀 서빙 및 손님 카카오톡 메시지로 조리 상태 변경 알림이 자동 발송됩니다.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 rounded-[4px] space-y-4">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-purple-500" />
                      <h5 className="font-extrabold text-base text-black dark:text-white">품절(Sold-Out) 스위치 & 배달 라이더 연동</h5>
                    </div>
                    <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 font-semibold leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-black">•</span>
                        <span>특정 재료 소진 시 사장님 메뉴 관리에서 토글 버튼 클릭 1초 만에 전 키오스크 및 배달앱에 품절 상태를 동기화합니다.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-black">•</span>
                        <span>배달/포장 주문 수신 시 원터치로 라이더 배차 요청 API를 릴레이 처리할 수 있습니다.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/40 rounded-[4px] flex items-start gap-3 text-xs">
                  <Lightbulb className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-orange-900 dark:text-orange-200 block">💡 주방 효율화 조언</span>
                    <p className="text-orange-800 dark:text-orange-300 leading-relaxed font-semibold">
                      KDS 조리완료 처리와 동시에 홀 2D 관제판의 해당 테이블 라벨이 "식사 중" 상태로 자동 전환되어 동선 낭비를 최적화합니다.
                    </p>
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
