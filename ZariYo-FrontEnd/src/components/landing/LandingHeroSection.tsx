import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Zap } from 'lucide-react';

export function LandingHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 text-center overflow-hidden border-b border-white/10 select-none">
      
      {/* Visual Background Image Layer */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0.2 }}
        animate={{ scale: 1.0, opacity: 0.35 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center mix-blend-luminosity"
        style={{ backgroundImage: `url('/images/hero_fullscreen_bg.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />
      
      <div className="relative z-10 max-w-5xl mx-auto space-y-8 py-16">
        
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[3px] bg-white/10 border border-white/20 backdrop-blur-md hover:border-amber-400/50 transition-colors"
        >
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
          <span className="text-xs font-mono font-black text-white tracking-widest uppercase">
            REDEFINING CYBER STORE CONTROL ROOM
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]"
        >
          매장 관제의 패러다임을<br />
          <span className="underline decoration-amber-400/50 underline-offset-8 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            완전히 바꾸다
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-xl text-neutral-300 font-semibold max-w-3xl mx-auto leading-relaxed"
        >
          실시간 2D 매장 좌석 관제, 5분 원자성 선점 락, 주방 KDS 조리 릴레이 및 배달/포장 통합 관제 시스템.<br />
          복잡한 매장 운영을 클릭 한 번으로 완벽하게 제어하세요.
        </motion.p>

        {/* Dual Power CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto px-8 py-4 rounded-[3px] bg-white text-black hover:bg-neutral-200 font-black text-sm cursor-pointer transition-all flex items-center justify-center gap-2 shadow-2xl hover:scale-105 hover:shadow-white/20"
          >
            <span>사장님 시작하기 (회원가입 & 매장등록)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/reserve')}
            className="w-full sm:w-auto px-8 py-4 rounded-[3px] bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-sm cursor-pointer transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:scale-105 hover:border-orange-400/50"
          >
            <Utensils className="w-4 h-4 text-orange-400" />
            <span>손님 2D 실시간 예약 & 키오스크</span>
          </button>

          <button
            onClick={() => navigate('/owner/stores')}
            className="w-full sm:w-auto px-8 py-4 rounded-[3px] bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-sm cursor-pointer transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:scale-105 hover:border-emerald-400/50"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>내 매장 선택 & 관제판 진입</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
