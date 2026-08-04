import { motion } from 'framer-motion';
import { BookOpen, MousePointerClick, Sliders, Smartphone, Monitor } from 'lucide-react';

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
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-[10.5px] font-mono font-black text-black dark:text-white uppercase tracking-wider">
            SYSTEM OPERATION MANUAL & USER GUIDE
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-black dark:text-white tracking-tight"
        >
          ZariYo 실전 매장 이용 & 셋업 가이드북
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-semibold max-w-3xl leading-relaxed"
        >
          사장님의 2D 매장 좌석 배치도 작성법부터 실시간 관제 대시보드 조작, 손님용 2D 키오스크 5분 선점 예약, 그리고 주방 KDS 및 실전 운영 트러블슈팅 가이드를 단계별로 상세히 안내해 드립니다.
        </motion.p>

        {/* Quick Quick Guide Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4 flex flex-wrap gap-3"
        >
          {[
            { title: '매장 2D 드래그 배치 가이드', icon: MousePointerClick },
            { title: '실시간 관제 & 상태 제어 가이드', icon: Monitor },
            { title: '2D 키오스크 주문 순서', icon: Smartphone },
            { title: '품절 설정 & KDS 연동', icon: Sliders },
          ].map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div 
                key={i} 
                className="px-4 py-2 rounded-[3px] bg-white dark:bg-black border border-neutral-300 dark:border-white/10 text-xs font-black text-black dark:text-white flex items-center gap-2 shadow-none transition-all cursor-default"
              >
                <Icon className="w-4 h-4 text-blue-500" />
                <span>{mod.title}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
