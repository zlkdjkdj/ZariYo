import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Zap, Sparkles, Layers, Lock, ShieldCheck } from 'lucide-react';

import { authStorage } from '../../utils/authStorage';

interface LandingHeroSectionProps {
  isDarkMode?: boolean;
}

export function LandingHeroSection({ isDarkMode = false }: LandingHeroSectionProps) {
  const navigate = useNavigate();

  const token = authStorage.getAccessToken();
  const user = authStorage.getUser<{ role?: string; name?: string }>();

  const handleDashboardClick = () => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    if (user.role === 'ROLE_ADMIN') {
      navigate('/admin/users');
    } else {
      navigate('/owner/stores');
    }
  };

  return (
    <section className={`relative min-h-[90vh] flex flex-col justify-center items-center px-6 py-20 overflow-hidden select-none transition-colors duration-300 ${
      isDarkMode ? 'bg-[#09090b] text-[#ffffff]' : 'bg-[#ffffff] text-[#000000]'
    }`}>
      
      {/* Visual Background Soft Glow Effects */}
      <div className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none ${
        isDarkMode ? 'bg-[#0381fe]/15' : 'bg-[#0381fe]/8'
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none ${
        isDarkMode ? 'bg-indigo-600/10' : 'bg-blue-400/10'
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Dynamic Asymmetric 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (6.5 cols): Asymmetric Headline & Action Group */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Samsung One UI Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-[20px] border backdrop-blur-md ${
                isDarkMode 
                  ? 'bg-[#141417] border-[#0381fe]/40 text-[#0381fe]' 
                  : 'bg-[#f7f7f7] border-[#0381fe]/30 text-[#0381fe]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0381fe] animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                SAMSUNG ONE UI 6.0 STORE CONTROL ENGINE
              </span>
            </motion.div>

            {/* Samsung Sharp Sans Main Asymmetric Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-4"
            >
              <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] font-display ${
                isDarkMode ? 'text-white' : 'text-[#000000]'
              }`}>
                스마트 매장 관제의 미래,<br />
                <span className="text-[#0381fe]">ZariYo One UI OS</span>
              </h1>
              <p className={`text-base sm:text-lg font-normal max-w-2xl leading-relaxed font-sans pt-2 ${
                isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
              }`}>
                3분 만에 완성하는 2D 매장 도면 배치, 손님이 기다리지 않는 0초 주문 전파.<br />
                삼성 One UI 디자인 철학을 담아 사장님과 손님 모두가 가장 쉽고 아름답게 경험하세요.
              </p>
            </motion.div>

            {/* Samsung Contained & Outlined CTA Group */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {token && user ? (
                <button
                  onClick={handleDashboardClick}
                  className={`h-[44px] px-[28px] rounded-[20px] font-bold text-[14px] leading-[19px] cursor-pointer transition-all flex items-center justify-center gap-2 shadow-none hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-white text-black hover:bg-neutral-200 border border-white'
                      : 'bg-[#000000] text-white hover:bg-neutral-800 border border-[#000000]'
                  }`}
                >
                  <Zap className="w-4 h-4 text-[#0381fe] fill-[#0381fe]" />
                  <span>{user.role === 'ROLE_ADMIN' ? '어드민 대시보드 진입' : '내 매장 대시보드로 이동'}</span>
                  <ArrowRight className="w-4 h-4 text-[#0381fe]" />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className={`h-[44px] px-[28px] rounded-[20px] font-bold text-[14px] leading-[19px] cursor-pointer transition-all flex items-center justify-center gap-2 shadow-none hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-white text-black hover:bg-neutral-200 border border-white'
                      : 'bg-[#000000] text-white hover:bg-neutral-800 border border-[#000000]'
                  }`}
                >
                  <span>사장님 시작하기 (무료 체계)</span>
                  <ArrowRight className="w-4 h-4 text-[#0381fe]" />
                </button>
              )}

              <button
                onClick={() => navigate('/reserve')}
                className={`h-[44px] px-[24px] rounded-[20px] font-bold text-[14px] leading-[19px] cursor-pointer transition-all flex items-center justify-center gap-2 hover:scale-[1.02] ${
                  isDarkMode
                    ? 'bg-transparent text-white border border-white/40 hover:bg-white/10'
                    : 'bg-transparent text-[#000000] border border-[#000000] hover:bg-black/5'
                }`}
              >
                <Utensils className="w-4 h-4 text-[#0381fe]" />
                <span>손님 2D 실시간 예약 & 키오스크</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column (5.5 cols): Floating 2D Interactive Tilt Canvas Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: -1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Interactive Floating Tilt Card */}
            <div className={`p-6 rounded-[24px] border shadow-2xl space-y-5 transition-colors transform hover:rotate-0 transition-transform duration-500 ${
              isDarkMode 
                ? 'bg-[#141417] border-white/10 text-white shadow-black/80' 
                : 'bg-[#ffffff] border-[#dddddd] text-black shadow-xl'
            }`}>
              <div className="flex justify-between items-center pb-3 border-b border-inherit">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0381fe]" />
                  <span className="font-bold text-xs font-mono">2D REALTIME STORE CANVAS</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#0381fe]/10 text-[#0381fe] px-2.5 py-1 rounded-[20px]">
                  0.001s LIVE SYNC
                </span>
              </div>

              {/* Simulated 2D Table Layout Chip Stack */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-[16px] border space-y-1 ${
                  isDarkMode ? 'bg-[#09090b] border-white/10' : 'bg-[#f7f7f7] border-[#dddddd]'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">테이블 T-01</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] text-[#0381fe] font-bold">4인석 (사용중)</p>
                </div>

                <div className="p-3.5 rounded-[16px] bg-[#0381fe] text-white space-y-1 shadow-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">테이블 T-02</span>
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-[10px] font-mono font-bold">5분 임시 선점중 (2m 14s)</p>
                </div>
              </div>

              {/* Floating Overlapping Receipt Snippet */}
              <div className={`p-4 rounded-[18px] border space-y-2 text-xs ${
                isDarkMode ? 'bg-[#09090b] border-white/10' : 'bg-[#f7f7f7] border-[#dddddd]'
              }`}>
                <div className="flex justify-between font-bold">
                  <span>실시간 주문 수선서 (T-04)</span>
                  <span className="text-[#0381fe]">47,500원</span>
                </div>
                <div className="text-[11px] text-[#707070] space-y-0.5 font-normal">
                  <p>• 안심 카츠 정식 x2 (28,000원)</p>
                  <p>• 특상 로스카츠 정식 x1 (15,500원)</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#707070]">
                <span className="flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0381fe]" />
                  이중 예약 완전 차단 보장
                </span>
                <span className="font-mono text-[10px] uppercase text-[#0381fe]">REDIS REDISSON LOCK</span>
              </div>
            </div>

            {/* Asymmetric Floating Accent Chip */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className={`absolute -bottom-6 -left-6 p-4 rounded-[20px] border shadow-xl flex items-center gap-3 backdrop-blur-md ${
                isDarkMode 
                  ? 'bg-[#141417]/90 border-white/20 text-white' 
                  : 'bg-[#ffffff]/90 border-[#dddddd] text-black'
              }`}
            >
              <div className="p-2.5 rounded-[16px] bg-[#0381fe] text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold">월간 피크타임 노쇼 0%</p>
                <p className="text-[10px] text-[#707070] font-mono">AUTOMATIC RELEASE</p>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* Modular Feature Cards - Asymmetric Offset 3 Column Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left"
        >
          <div className={`p-8 rounded-[20px] border space-y-4 transition-all group shadow-none ${
            isDarkMode 
              ? 'bg-[#141417] border-white/10 hover:border-[#0381fe]' 
              : 'bg-[#ffffff] border-[#dddddd] hover:border-[#0381fe]'
          }`}>
            <div className="w-12 h-12 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className={`text-xl font-bold transition-colors group-hover:text-[#0381fe] ${
              isDarkMode ? 'text-white' : 'text-[#000000]'
            }`}>
              2D 매장 실시간 도면 관제
            </h3>
            <p className={`text-xs leading-relaxed font-normal ${
              isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
            }`}>
              매장 도면 위에서 실시간 좌석 상태, 영수증 수선서, 입금 및 퇴석 상태를 한눈에 통제합니다.
            </p>
          </div>

          <div className={`p-8 rounded-[20px] border space-y-4 transition-all group shadow-none md:mt-4 ${
            isDarkMode 
              ? 'bg-[#141417] border-white/10 hover:border-[#0381fe]' 
              : 'bg-[#ffffff] border-[#dddddd] hover:border-[#0381fe]'
          }`}>
            <div className="w-12 h-12 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className={`text-xl font-bold transition-colors group-hover:text-[#0381fe] ${
              isDarkMode ? 'text-white' : 'text-[#000000]'
            }`}>
              기다림 없는 0초 주문 전파
            </h3>
            <p className={`text-xs leading-relaxed font-normal ${
              isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
            }`}>
              손님이 테이블 키오스크에서 주문하는 순간 사장님 포스와 주방 모니터로 0초 만에 동시에 전달됩니다.
            </p>
          </div>

          <div className={`p-8 rounded-[20px] border space-y-4 transition-all group shadow-none md:mt-8 ${
            isDarkMode 
              ? 'bg-[#141417] border-white/10 hover:border-[#0381fe]' 
              : 'bg-[#ffffff] border-[#dddddd] hover:border-[#0381fe]'
          }`}>
            <div className="w-12 h-12 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className={`text-xl font-bold transition-colors group-hover:text-[#0381fe] ${
              isDarkMode ? 'text-white' : 'text-[#000000]'
            }`}>
              배달 & 방문 포장 통합 관제
            </h3>
            <p className={`text-xs leading-relaxed font-normal ${
              isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
            }`}>
              배민, 쿠팡, 요기요 주문부터 라이더 배차 호출까지 단 하나의 스크린으로 손쉽게 운영하세요.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
