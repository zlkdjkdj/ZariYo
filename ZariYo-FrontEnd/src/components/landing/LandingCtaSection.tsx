import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Award } from 'lucide-react';

interface LandingCtaSectionProps {
  isDarkMode?: boolean;
}

export function LandingCtaSection({ isDarkMode = false }: LandingCtaSectionProps) {
  const navigate = useNavigate();

  return (
    <section className={`py-24 px-6 text-center border-t relative overflow-hidden select-none transition-colors duration-300 ${
      isDarkMode ? 'bg-[#09090b] border-white/10' : 'bg-[#ffffff] border-[#dddddd]'
    }`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto p-12 sm:p-16 rounded-[24px] bg-[#000000] text-white space-y-8 relative z-10 shadow-2xl text-center border border-white/10"
      >
        <div className="p-3.5 rounded-[20px] bg-[#0381fe]/20 border border-[#0381fe]/40 w-fit mx-auto animate-pulse">
          <Award className="w-8 h-8 text-[#0381fe]" />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">
          지금 ZariYo 2D 관제 OS를<br />무료로 체험해보세요
        </h2>

        <p className="text-sm md:text-base text-neutral-300 font-normal max-w-xl mx-auto leading-relaxed">
          별도의 복잡한 설치 과정 없이 웹 브라우저에서 바로 관제판 및 키오스크를 체험하실 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto h-[44px] px-8 rounded-[20px] bg-white text-black hover:bg-neutral-200 font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>사장님 시작하기 (가입 & 로그인)</span>
            <ArrowRight className="w-4 h-4 text-[#0381fe]" />
          </button>

          <button
            onClick={() => navigate('/reserve')}
            className="w-full sm:w-auto h-[44px] px-6 rounded-[20px] bg-transparent text-white border border-white/40 hover:bg-white/10 font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Utensils className="w-4 h-4 text-[#0381fe]" />
            <span>손님 2D 예약 & 키오스크</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
