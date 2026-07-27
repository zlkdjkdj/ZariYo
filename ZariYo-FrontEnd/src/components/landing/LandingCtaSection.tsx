import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Utensils, Award } from 'lucide-react';

export function LandingCtaSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 text-center bg-gradient-to-b from-[#09090b] to-[#111113] border-t border-white/10 relative overflow-hidden select-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-8 relative z-10"
      >
        <div className="p-4 rounded-full bg-white/10 border border-white/20 w-fit mx-auto animate-pulse">
          <Award className="w-8 h-8 text-amber-400" />
        </div>

        <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight">
          지금 ZariYo 2D 관제 OS를<br />무료로 체험해보세요
        </h2>

        <p className="text-sm md:text-base text-neutral-400 font-semibold max-w-xl mx-auto">
          별도의 복잡한 설치 과정 없이 웹 브라우저에서 바로 관제판 및 키오스크를 체험하실 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-10 py-4.5 rounded-[3px] bg-white text-black hover:bg-neutral-200 font-black text-base cursor-pointer transition-all flex items-center justify-center gap-2 shadow-2xl hover:scale-105"
          >
            <span>사장님 시작하기 (가입 & 로그인)</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/reserve')}
            className="w-full sm:w-auto px-10 py-4.5 rounded-[3px] bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-base cursor-pointer transition-all flex items-center justify-center gap-2 hover:scale-105 hover:border-orange-400/50"
          >
            <Utensils className="w-5 h-5 text-orange-400" />
            <span>손님 2D 예약 & 키오스크 바로가기</span>
          </button>

          <button
            onClick={() => navigate('/owner/stores')}
            className="w-full sm:w-auto px-10 py-4.5 rounded-[3px] bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-base cursor-pointer transition-all flex items-center justify-center gap-2 hover:scale-105 hover:border-emerald-400/50"
          >
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>내 매장 관제 대시보드 선택</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
