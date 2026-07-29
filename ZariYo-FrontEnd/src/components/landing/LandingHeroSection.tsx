import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Zap } from 'lucide-react';

export function LandingHeroSection() {
  const navigate = useNavigate();

  const token = localStorage.getItem('zariyo_token');
  const userStr = localStorage.getItem('zariyo_user');
  let user: { role?: string; name?: string } | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      user = null;
    }
  }

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
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 py-20 overflow-hidden select-none bg-[#000000] text-white">
      
      {/* Visual Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0381fe]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12 text-center">
        
        {/* Top One UI Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-[20px] bg-[#f7f7f7]/10 border border-[#0381fe]/40 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#0381fe] animate-ping" />
          <span className="text-xs font-mono font-bold text-[#0381fe] tracking-widest uppercase">
            SAMSUNG ONE UI 6.0 STORE CONTROL ENGINE
          </span>
        </motion.div>

        {/* Samsung Sharp Sans Main Display Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.12] font-display">
            스마트 매장 관제의 미래,<br />
            <span className="text-[#0381fe]">ZariYo One UI Ecosystem</span>
          </h1>
          <p className="text-base sm:text-xl text-[#707070] dark:text-neutral-300 font-normal max-w-3xl mx-auto leading-relaxed font-sans pt-2">
            2D 실시간 도면 관제, 0.001초 주방 KDS 릴레이 및 배달/포장 통합 오케스트레이션.<br />
            삼성 One UI 디자인 철학을 담아 가장 직관적이고 아름답게 통제하세요.
          </p>
        </motion.div>

        {/* Samsung Contained & Outlined CTA Pattern */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          {token && user ? (
            <button
              onClick={handleDashboardClick}
              className="w-full sm:w-auto h-[44px] px-[28px] rounded-[20px] bg-white text-black hover:bg-neutral-200 font-bold text-[14px] leading-[19px] cursor-pointer transition-all flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-[#0381fe] fill-[#0381fe]" />
              <span>{user.role === 'ROLE_ADMIN' ? '어드민 대시보드 진입' : '내 매장 대시보드로 이동'}</span>
              <ArrowRight className="w-4 h-4 text-[#0381fe]" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto h-[44px] px-[28px] rounded-[20px] bg-white text-black hover:bg-neutral-200 font-bold text-[14px] leading-[19px] cursor-pointer transition-all flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02]"
            >
              <span>사장님 시작하기 (무료 체계)</span>
              <ArrowRight className="w-4 h-4 text-[#0381fe]" />
            </button>
          )}

          <button
            onClick={() => navigate('/reserve')}
            className="w-full sm:w-auto h-[44px] px-[28px] rounded-[20px] bg-transparent text-white border border-white/60 hover:bg-white/10 font-bold text-[14px] leading-[19px] cursor-pointer transition-all flex items-center justify-center gap-2.5 backdrop-blur-md hover:scale-[1.02]"
          >
            <Utensils className="w-4 h-4 text-[#0381fe]" />
            <span>손님 2D 실시간 예약 & 키오스크</span>
          </button>
        </motion.div>

        {/* Samsung Modular Interactive Feature Cards - 3 Column Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left"
        >
          <div className="p-8 rounded-[20px] bg-[#121214] border border-[#333333] space-y-4 hover:border-[#0381fe] transition-all group">
            <div className="w-12 h-12 rounded-[20px] bg-[#0381fe]/15 text-[#0381fe] flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#0381fe] transition-colors">2D 실시간 관제 OS</h3>
            <p className="text-xs text-[#707070] leading-relaxed">
              매장 도면 위에서 실시간 좌석 상태, 영수증 수선서, 입금 및 퇴석 상태를 한눈에 통제합니다.
            </p>
          </div>

          <div className="p-8 rounded-[20px] bg-[#121214] border border-[#333333] space-y-4 hover:border-[#0381fe] transition-all group">
            <div className="w-12 h-12 rounded-[20px] bg-[#0381fe]/15 text-[#0381fe] flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#0381fe] transition-colors">0.001초 STOMP 릴레이</h3>
            <p className="text-xs text-[#707070] leading-relaxed">
              손님 키오스크에서 주문 넣는 순간 0.001초 만에 사장님 포스와 주방 KDS 화면에 동시 전파됩니다.
            </p>
          </div>

          <div className="p-8 rounded-[20px] bg-[#121214] border border-[#333333] space-y-4 hover:border-[#0381fe] transition-all group">
            <div className="w-12 h-12 rounded-[20px] bg-[#0381fe]/15 text-[#0381fe] flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#0381fe] transition-colors">통합 배달/포장 관제</h3>
            <p className="text-xs text-[#707070] leading-relaxed">
              배민, 쿠팡, 요기요 및 포장 수신부터 라이더 자동 배차 호출까지 단 하나의 스크린으로 완성합니다.
            </p>
          </div>
        </motion.div>

      </div>
    </section>

  );
}
