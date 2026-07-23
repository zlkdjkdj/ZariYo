import { motion } from 'framer-motion';
import { ShieldCheck, UtensilsCrossed, Monitor, ChefHat, BarChart3 } from 'lucide-react';

export function GuideHeroBanner() {
  return (
    <section className="py-16 bg-neutral-100 dark:bg-[#111113] border-b border-neutral-300 dark:border-white/10 text-left select-none">
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[10.5px] font-mono font-black text-black dark:text-white uppercase tracking-wider">
            OFFICIAL SYSTEM DOCUMENTATION & USER MANUAL
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-black dark:text-white tracking-tight"
        >
          ZariYo 스마트 매장 관제 OS 사용 설명서
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-semibold max-w-3xl leading-relaxed"
        >
          키오스크 5분 원자성 선점 락부터 2D 좌석 관제 POS, 실시간 주방 KDS 릴레이, 배달/포장 관제판 및 매출 분석까지, ZariYo의 4대 핵심 모듈과 16가지 세부 스펙 및 5단계 초기 매장 셋업 방법을 완벽히 확인하세요.
        </motion.p>

        {/* Module Navigation Chips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4 flex flex-wrap gap-3"
        >
          {[
            { title: '1. 손님 테이블 키오스크', icon: UtensilsCrossed },
            { title: '2. 사장님 2D 관제 POS', icon: Monitor },
            { title: '3. 주방 KDS 관제', icon: ChefHat },
            { title: '4. 매출 분석 & 품절 스위치', icon: BarChart3 },
          ].map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div 
                key={i} 
                className="px-4 py-2 rounded-[3px] bg-white dark:bg-black border border-neutral-300 dark:border-white/10 text-xs font-black text-black dark:text-white flex items-center gap-2 shadow-none hover:border-black dark:hover:border-white transition-all cursor-default"
              >
                <Icon className="w-4 h-4 text-neutral-500" />
                <span>{mod.title}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
