import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Timer, Grid, Activity, ShieldCheck, 
  MousePointer, AlertCircle, RefreshCw, Key
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface TabItem {
  id: number;
  title: string;
  badge: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
}

export function AppleFeatureBlock() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { theme } = useTheme();
  
  const tabs: TabItem[] = [
    {
      id: 0,
      title: "5분 임시 선점",
      badge: "HOLD SYSTEM",
      icon: Timer,
      description: "좌석 선택 즉시 5분 타이머가 기동해 타 사용자의 중복 예약을 원천 격리하고, 미결제 이탈 시 무결 원복 처리됩니다.",
      color: "from-orange-500 to-amber-600"
    },
    {
      id: 1,
      title: "2D 그리드 배치 빌더",
      badge: "GRID BUILDER",
      icon: Grid,
      description: "20px 격자 스냅 안내선과 실시간 드래그 앤 드롭 캔버스를 통해 매장의 인테리어를 직관적으로 디자인합니다.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "실시간 현황 관제",
      badge: "MONITORING",
      icon: Activity,
      description: "WebSocket 상태 브로드캐스팅을 통해 손님의 입퇴정 및 노쇼 취소 상태를 0.1초 이내에 대시보드에 연동합니다.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      title: "Redis 분산 락 무결성",
      badge: "DISTRIBUTED LOCK",
      icon: ShieldCheck,
      description: "동시에 수많은 경합 트래픽이 몰려와도 DB 오버헤드 없이 고속 캐시 메모리 락 단계에서 안전하게 1건만 통과시킵니다.",
      color: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-black text-neutral-900 dark:text-[#f5f5f7] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 select-none">
          <span className="text-[10px] font-extrabold tracking-widest text-[#3182f6] uppercase font-mono bg-[#3182f6]/10 px-3 py-1 rounded-full">
            INTERACTIVE SYSTEM
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-5 tracking-tight leading-tight">
            기술로 혁신하는 공간 예약.
          </h2>
          <p className="text-neutral-500 dark:text-[#a1a1a6] text-xs md:text-sm font-semibold leading-relaxed">
            클릭 한 번으로 이루어지는 직관적인 인터랙션 아래 작동하는 ZariYo만의 실시간 동시성 보장 핵심 매커니즘을 체험해 보세요.
          </p>
        </div>

        {/* Apple Feature Container (Side-by-Side Alternating Grid) */}
        <div className="w-full bg-[#f8f9fa] dark:bg-[#09090b] text-neutral-900 dark:text-white rounded-[2.5rem] border border-neutral-200 dark:border-white/10 p-6 md:p-12 relative overflow-hidden shadow-2xl dark:shadow-[0_30px_70px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          {/* Decorative Radial Background light */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#3182f6]/10 dark:from-[#3182f6]/15 to-transparent blur-[140px] pointer-events-none" />


          {/* Left Column: Pill tab selectors */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4 z-10 select-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer border ${
                    isActive 
                      ? "bg-white dark:bg-white/10 border-neutral-350 dark:border-white/20 shadow-md dark:shadow-[0_10px_25px_rgba(255,255,255,0.02)]" 
                      : "bg-black/[0.01] dark:bg-white/[0.02] border-neutral-200/50 dark:border-white/[0.03] hover:bg-black/[0.03] hover:dark:bg-white/[0.05] hover:border-neutral-350 hover:dark:border-white/10"
                  }`}
                >
                  {/* Glow line decoration for active */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${tab.color}`}
                    />
                  )}
                  
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                      isActive 
                        ? "bg-neutral-900 dark:bg-white text-white dark:text-black" 
                        : "bg-neutral-200/60 dark:bg-white/5 text-neutral-500 dark:text-white/50 group-hover:text-neutral-900 group-hover:dark:text-white"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-md ${
                          isActive 
                            ? "bg-neutral-200 dark:bg-white/10 text-neutral-800 dark:text-white" 
                            : "bg-neutral-100 dark:bg-white/5 text-neutral-400 dark:text-white/40"
                        }`}>
                          {tab.badge}
                        </span>
                      </div>
                      <h3 className={`text-base font-extrabold mt-1.5 transition-colors ${
                        isActive 
                          ? "text-neutral-900 dark:text-white" 
                          : "text-neutral-600 dark:text-white/60 group-hover:text-neutral-900 group-hover:dark:text-white/90"
                      }`}>
                        {tab.title}
                      </h3>
                      {isActive && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[11.5px] leading-relaxed text-neutral-500 dark:text-[#a1a1a6] mt-2 font-medium"
                        >
                          {tab.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Phone Mockup Simulation Screen */}
          <div className="w-full lg:w-6/12 flex justify-center items-center z-10">
            <div className="relative w-[280px] h-[520px] md:w-[300px] md:h-[560px] border-[8px] border-neutral-300 dark:border-neutral-800 bg-[#f8f9fa] dark:bg-[#020203] rounded-[3rem] shadow-xl dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between items-center">
              
              {/* Dynamic Island Notch */}
              <div className="w-24 h-5 bg-black rounded-full absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between px-3 select-none">
                <div className="w-1.5 h-1.5 bg-[#0a0a0a] rounded-full border border-neutral-900" />
                <div className="w-5 h-1 bg-[#101010] rounded-full" />
                <div className="w-1.5 h-1.5 bg-[#3182f6]/20 rounded-full animate-pulse" />
              </div>

              {/* Status Bar */}
              <div className="w-full px-6 pt-9 pb-2 flex justify-between items-center text-[10px] text-neutral-600 dark:text-white/60 font-semibold font-mono select-none z-20">
                <span>12:30</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-neutral-400 dark:border-white/40 rounded-sm p-0.5 flex items-center">
                    <div className="h-full w-full bg-neutral-700 dark:bg-white rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Simulator Screens inside Phone */}
              <div className="flex-1 w-full px-4 pb-6 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {activeTab === 0 && <HoldSystemSimulator theme={theme} />}
                  {activeTab === 1 && <GridBuilderSimulator theme={theme} />}
                  {activeTab === 2 && <RealtimeMonitorSimulator theme={theme} />}
                  {activeTab === 3 && <DistributedLockSimulator theme={theme} />}
                </AnimatePresence>
              </div>

              {/* Home Indicator */}
              <div className="w-28 h-1 bg-neutral-400 dark:bg-white/40 rounded-full mb-2 z-20" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// Simulator 1: 5분 임시 선점 (Hold System)
// ----------------------------------------------------
function HoldSystemSimulator({ theme }: { theme: string }) {
  const [timer, setTimer] = useState<string>("05:00");
  const [stage, setStage] = useState<number>(0); 

  useEffect(() => {
    let interval: any = null;
    let timerSec = 300;

    const timeoutIdle = setTimeout(() => setStage(1), 1000); 
    const timeoutLock = setTimeout(() => {
      setStage(2);
      interval = setInterval(() => {
        timerSec -= 1;
        const min = String(Math.floor(timerSec / 60)).padStart(2, '0');
        const sec = String(timerSec % 60).padStart(2, '0');
        setTimer(`${min}:${sec}`);
      }, 1000);
    }, 2800); 

    const timeoutCollision = setTimeout(() => setStage(3), 5000); 

    const timeoutRestart = setTimeout(() => {
      setStage(0);
      setTimer("05:00");
    }, 8500);

    return () => {
      clearTimeout(timeoutIdle);
      clearTimeout(timeoutLock);
      clearTimeout(timeoutCollision);
      clearTimeout(timeoutRestart);
      if (interval) clearInterval(interval);
    };
  }, [theme]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full h-full flex flex-col justify-between items-center py-2"
    >
      {/* Screen Header */}
      <div className="w-full text-center">
        <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
          Hold Lock Screen
        </span>
        <h4 className="text-xs font-extrabold text-neutral-800 dark:text-white mt-1">실시간 예약 경합 테스트</h4>
      </div>

      {/* Interactivity Area */}
      <div className="relative w-full flex-1 flex flex-col justify-center items-center gap-6">
        
        {/* Seat Map Display */}
        <div className="grid grid-cols-2 gap-4 w-full px-2">
          {/* Seat A */}
          <div className={`aspect-square rounded-2xl border flex flex-col justify-center items-center transition-all duration-300 relative ${
            stage >= 2 
              ? "bg-gradient-to-b from-orange-500 to-amber-600 border-orange-400/30 text-white shadow-lg scale-[1.02]" 
              : "bg-neutral-100/80 dark:bg-white/5 border-neutral-350 dark:border-white/10 text-neutral-500 dark:text-white/40"
          }`}>
            <span className="text-[10px] font-bold">좌석 A</span>
            <span className="text-[8px] font-bold font-mono mt-1">
              {stage >= 2 ? "선점 대기" : "비어있음"}
            </span>

            {/* Timer Overlay */}
            {stage >= 2 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-2 bg-black/60 border border-orange-400/20 px-2 py-0.5 rounded-full text-[9px] font-black text-orange-400 font-mono flex items-center gap-1 shadow-md"
              >
                <Timer className="w-2.5 h-2.5 animate-pulse" />
                <span>{timer}</span>
              </motion.div>
            )}

            {/* Alert on Collision */}
            {stage === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [1, 0, 1, 0, 1] }}
                transition={{ duration: 1.5 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 border border-red-400 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap"
              >
                <AlertCircle className="w-2.5 h-2.5" />
                <span>선점 불가 (LOCK)</span>
              </motion.div>
            )}
          </div>

          {/* Seat B */}
          <div className="aspect-square rounded-2xl border bg-neutral-100/80 dark:bg-white/5 border-neutral-350 dark:border-white/10 text-neutral-500 dark:text-white/40 flex flex-col justify-center items-center">
            <span className="text-[10px] font-bold">좌석 B</span>
            <span className="text-[8px] font-bold font-mono mt-1">비어있음</span>
          </div>
        </div>

        {/* Simulated Cursor 1 (User A) */}
        {stage === 1 && (
          <motion.div
            initial={{ x: 60, y: 100, opacity: 0 }}
            animate={{ x: -45, y: -25, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute z-20 pointer-events-none"
          >
            <div className="relative">
              <MousePointer className="w-5 h-5 text-neutral-900 dark:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] fill-current" />
              <motion.div 
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute top-0 left-0 w-5 h-5 bg-neutral-500 dark:bg-white rounded-full -translate-x-1/4 -translate-y-1/4"
              />
            </div>
          </motion.div>
        )}

        {/* Simulated Cursor 2 (User B - Collides) */}
        {stage === 3 && (
          <motion.div
            initial={{ x: 80, y: 60, opacity: 0 }}
            animate={{ x: -30, y: -30, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute z-20 pointer-events-none"
          >
            <div className="relative">
              <MousePointer className="w-5 h-5 text-red-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] fill-red-500" />
              <motion.div 
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-0 left-0 w-5 h-5 bg-red-500 rounded-full -translate-x-1/4 -translate-y-1/4"
              />
            </div>
          </motion.div>
        )}

      </div>

      {/* Info status footer */}
      <div className="w-full bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 rounded-xl p-2.5 text-[10px] text-neutral-700 dark:text-white/70 select-none">
        {stage === 0 && "🔵 클라이언트 접속 완료. 대기 중..."}
        {stage === 1 && "👆 User A: 좌석 A 선택 터치 중..."}
        {stage === 2 && "⚡ 좌석 A 임시 락 획득 성공 (5분 타이머 작동)"}
        {stage === 3 && "❌ User B: 선점된 좌석 클릭 차단됨!"}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// Simulator 2: 2D 그리드 배치 빌더
// ----------------------------------------------------
function GridBuilderSimulator({ theme }: { theme: string }) {
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [stage, setStage] = useState<number>(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(0);
      setPosX(0);
      setPosY(0);
      
      const t1 = setTimeout(() => {
        setStage(1);
        setPosX(15);
        setPosY(-12);
      }, 1000);

      const t2 = setTimeout(() => {
        setStage(2);
        setPosX(20);
        setPosY(-20); 
      }, 2500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }, 4500);

    return () => clearInterval(interval);
  }, [theme]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full h-full flex flex-col justify-between items-center py-2"
    >
      {/* Screen Header */}
      <div className="w-full text-center">
        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
          Builder Grid snap
        </span>
        <h4 className="text-xs font-extrabold text-neutral-800 dark:text-white mt-1">20px 정밀 스냅 배치</h4>
      </div>

      {/* Grid Area */}
      <div className="relative w-full flex-1 border border-neutral-300 dark:border-white/10 rounded-2xl bg-neutral-100/30 dark:bg-white/[0.01] my-4 overflow-hidden flex items-center justify-center">
        
        {/* Background Grid Lines */}
        <div className="absolute inset-0 opacity-15 dark:opacity-20 pointer-events-none"
             style={{
               backgroundImage: theme === 'light' 
                 ? 'linear-gradient(to right, #a0a0a0 1px, transparent 1px), linear-gradient(to bottom, #a0a0a0 1px, transparent 1px)'
                 : 'linear-gradient(to right, #4f4f4f 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }} 
        />

        {/* Snapshot snap helper guides */}
        {stage === 1 && (
          <>
            <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-blue-550/40 w-full" />
            <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-blue-550/40 h-full" />
          </>
        )}

        {/* Snap Line Glow */}
        {stage === 2 && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 border-2 border-blue-500/50 rounded-2xl pointer-events-none"
          />
        )}

        {/* Target Seat Object */}
        <motion.div
          animate={{ x: posX, y: posY }}
          transition={{ duration: stage === 2 ? 0.3 : 1.2, ease: "easeInOut" }}
          className={`w-14 h-14 rounded-xl flex flex-col justify-center items-center z-10 border transition-all ${
            stage === 2 
              ? "bg-gradient-to-b from-blue-500 to-indigo-600 border-blue-400 shadow-md text-white scale-[1.05]" 
              : stage === 1 
                ? "bg-neutral-200/50 dark:bg-white/10 border-blue-400/50 text-blue-600 dark:text-blue-300"
                : "bg-neutral-100 dark:bg-white/5 border-neutral-300 dark:border-white/10 text-neutral-500 dark:text-white/40"
          }`}
        >
          <span className="text-[9px] font-bold">2인석 T1</span>
          <span className="text-[8px] font-mono mt-0.5 opacity-60">
            {stage === 2 ? "X:100 Y:80" : "위치조정"}
          </span>
        </motion.div>

        {/* Simulated Cursor */}
        <motion.div
          animate={{ x: posX + 20, y: posY + 20 }}
          transition={{ duration: stage === 2 ? 0.3 : 1.2, ease: "easeInOut" }}
          className="absolute z-20 pointer-events-none"
        >
          <MousePointer className="w-5 h-5 text-neutral-900 dark:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] fill-current" />
        </motion.div>

      </div>

      {/* Info status footer */}
      <div className="w-full bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 rounded-xl p-2.5 text-[10px] text-neutral-700 dark:text-white/70 select-none">
        {stage === 0 && "🛠️ 드래그로 좌석을 잡아당기는 중..."}
        {stage === 1 && "📐 눈금 정렬 안내선 기동..."}
        {stage === 2 && "🎯 20px 그리드 스냅 연산 완료! 정렬 저장"}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// Simulator 3: 실시간 현황 관제 (Real-time Monitoring)
// ----------------------------------------------------
function RealtimeMonitorSimulator({ theme }: { theme: string }) {
  const [seats, setSeats] = useState([
    { id: 'A-1', status: 'empty', label: '비어있음' },
    { id: 'A-2', status: 'occupied', label: '사용중' },
    { id: 'B-1', status: 'reserved', label: '예약완료' },
    { id: 'B-2', status: 'empty', label: '비어있음' }
  ]);
  const [logs, setLogs] = useState<string[]>([
    "대시보드 실시간 연결 수립됨",
    "이전 통계 로드 완료"
  ]);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const sequence = [
      {
        action: () => {
          setSeats(prev => prev.map(s => s.id === 'B-2' ? { ...s, status: 'hold', label: '선점중' } : s));
          setLogs(l => [...l.slice(-2), "📣 [B-2] 좌석 고객 선점 개시"]);
          setPulse(true);
        },
        delay: 1500
      },
      {
        action: () => {
          setSeats(prev => prev.map(s => s.id === 'A-2' ? { ...s, status: 'empty', label: '비어있음' } : s));
          setLogs(l => [...l.slice(-2), "🔓 [A-1] 고객 퇴실 - 비움 변경"]);
          setPulse(true);
        },
        delay: 3500
      },
      {
        action: () => {
          setSeats(prev => prev.map(s => s.id === 'B-1' ? { ...s, status: 'occupied', label: '사용중' } : s));
          setLogs(l => [...l.slice(-2), "🔴 [B-1] 예약 고객 입장 확정"]);
          setPulse(true);
        },
        delay: 5500
      },
      {
        action: () => {
          setSeats([
            { id: 'A-1', status: 'empty', label: '비어있음' },
            { id: 'A-2', status: 'occupied', label: '사용중' },
            { id: 'B-1', status: 'reserved', label: '예약완료' },
            { id: 'B-2', status: 'empty', label: '비어있음' }
          ]);
          setLogs(["대시보드 실시간 연결 수립됨", "이전 통계 로드 완료"]);
          setPulse(false);
        },
        delay: 8000
      }
    ];

    const timers = sequence.map(s => setTimeout(s.action, s.delay));

    return () => timers.forEach(clearTimeout);
  }, [pulse, theme]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full h-full flex flex-col justify-between items-center py-2"
    >
      {/* Screen Header */}
      <div className="w-full text-center">
        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          WS Monitoring console
        </span>
        <h4 className="text-xs font-extrabold text-neutral-800 dark:text-white mt-1">WebSocket 실시간 브로드캐스트</h4>
      </div>

      {/* Grid of Seats */}
      <div className="relative w-full flex-1 grid grid-cols-2 gap-3 px-2 py-4 select-none">
        
        {pulse && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 border-2 border-emerald-500 rounded-2xl pointer-events-none"
            onAnimationComplete={() => setPulse(false)}
          />
        )}

        {seats.map((seat) => {
          let bgClass = "bg-neutral-100/50 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-white/40";
          if (seat.status === 'occupied') bgClass = "bg-red-500/10 border-red-500/30 text-red-550 dark:text-red-400";
          if (seat.status === 'reserved') bgClass = "bg-blue-500/10 border-blue-500/30 text-blue-550 dark:text-blue-400";
          if (seat.status === 'hold') bgClass = "bg-orange-500/10 border-orange-500/30 text-orange-550 dark:text-orange-400 animate-pulse";
          if (seat.status === 'empty') bgClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400";

          return (
            <div
              key={seat.id}
              className={`rounded-xl border p-2 flex flex-col justify-between transition-colors duration-300 ${bgClass}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold">{seat.id}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  seat.status === 'occupied' ? 'bg-red-500' :
                  seat.status === 'reserved' ? 'bg-blue-500' :
                  seat.status === 'hold' ? 'bg-orange-500' : 'bg-emerald-500'
                }`} />
              </div>
              <span className="text-[8px] font-extrabold font-mono mt-2 text-right">
                {seat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Terminal log logs */}
      <div className="w-full bg-[#050507] border border-white/10 rounded-xl p-2.5 font-mono text-[8.5px] text-white/60 space-y-1 select-none">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-1.5 items-start">
            <span className="text-emerald-500 font-black shrink-0">&gt;</span>
            <span className="truncate">{log}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// Simulator 4: Redis 분산 락 무결성 (Distributed Lock)
// ----------------------------------------------------
function DistributedLockSimulator({ theme }: { theme: string }) {
  const [stage, setStage] = useState(0); 

  useEffect(() => {
    const cycle = setInterval(() => {
      setStage(0);
      const t1 = setTimeout(() => setStage(1), 1000);   
      const t2 = setTimeout(() => setStage(2), 2200);   
      const t3 = setTimeout(() => setStage(3), 3600);   

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }, 5500);

    return () => clearInterval(cycle);
  }, [theme]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full h-full flex flex-col justify-between items-center py-2 font-mono text-neutral-600 dark:text-white/70"
    >
      {/* Screen Header */}
      <div className="w-full text-center font-sans">
        <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
          Redis Mutex lock
        </span>
        <h4 className="text-xs font-extrabold text-neutral-800 dark:text-white mt-1">Redisson 분산 락 트랜잭션</h4>
      </div>

      {/* Architecture flow */}
      <div className="relative w-full flex-1 flex flex-col justify-between items-center py-4 select-none">
        
        {/* Clients Layer */}
        <div className="w-full flex justify-between px-4 z-10">
          {/* User A */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-[10px] font-sans font-bold transition-all ${
              stage >= 1 
                ? "bg-purple-500 border-purple-400 text-white" 
                : "bg-neutral-200/50 dark:bg-white/5 border-neutral-350 dark:border-white/10 text-neutral-600 dark:text-white/50"
            }`}>
              UA
            </div>
            <span className="text-[7.5px] mt-1">유저 A</span>
          </div>

          {/* User B */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-[10px] font-sans font-bold transition-all ${
              stage >= 1 
                ? "bg-purple-500/80 border-purple-400/50 text-white" 
                : "bg-neutral-200/50 dark:bg-white/5 border-neutral-350 dark:border-white/10 text-neutral-600 dark:text-white/50"
            }`}>
              UB
            </div>
            <span className="text-[7.5px] mt-1">유저 B</span>
          </div>
        </div>

        {/* Redis Gate Lock Point */}
        <div className="relative flex flex-col items-center z-10">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
            stage === 2 
              ? "bg-amber-500/20 border-amber-500 text-amber-500 dark:text-amber-300 animate-pulse"
              : stage === 3
                ? "bg-purple-600 border-purple-400 text-white shadow-md"
                : "bg-neutral-200/50 dark:bg-white/5 border-neutral-300 dark:border-white/10 text-neutral-400 dark:text-white/40"
          }`}>
            {stage === 3 ? <Key className="w-5 h-5" /> : <RefreshCw className={`w-5 h-5 ${stage === 2 ? 'animate-spin' : ''}`} />}
          </div>
          <span className="text-[7.5px] mt-1 font-bold">Redis Lock Gate</span>

          {/* Transaction Lines (Animated particles) */}
          {stage === 1 && (
            <>
              <motion.div 
                initial={{ x: -45, y: -90, opacity: 1 }}
                animate={{ x: 0, y: -20 }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full"
              />
              <motion.div 
                initial={{ x: 45, y: -90, opacity: 1 }}
                animate={{ x: 0, y: -20 }}
                transition={{ duration: 1.1, ease: "linear" }}
                className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full"
              />
            </>
          )}
        </div>

        {/* Database layer */}
        <div className="w-full flex flex-col items-center z-10">
          {/* Snap Results Alert overlay */}
          {stage === 2 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute bg-amber-500 text-white text-[8px] font-sans font-bold px-2 py-0.5 rounded shadow-lg"
            >
              선착순 락 경합 검사 중...
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute bg-emerald-550 text-white text-[8px] font-sans font-extrabold px-2.5 py-0.5 rounded shadow-lg flex items-center gap-1"
            >
              UA 락 획득 (OK) / UB 요청 차단
            </motion.div>
          )}

          <div className="w-20 py-1 bg-neutral-200/50 dark:bg-white/5 border border-neutral-350 dark:border-white/10 rounded text-center">
            <span className="text-[8px] text-neutral-500 dark:text-white/50">PostgreSQL DB</span>
          </div>
          <span className="text-[7.5px] mt-1">최종 영속 저장</span>
        </div>

      </div>

      {/* Info status footer */}
      <div className="w-full bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/10 rounded-xl p-2.5 text-[9px] text-neutral-600 dark:text-white/70 font-sans select-none">
        {stage === 0 && "🔵 DB 진입 전 락 게이트 대기..."}
        {stage === 1 && "🚀 두 유저가 거의 동시(1ms 차이) 요청 발송..."}
        {stage === 2 && "⏳ Redis 분산 Mutex 락 획득 연산 처리..."}
        {stage === 3 && "🔒 User A 락 점유 성공! User B는 중복 차단"}
      </div>
    </motion.div>
  );
}
