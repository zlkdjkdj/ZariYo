import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

interface LandingBeforeAfterSectionProps {
  isDarkMode?: boolean;
}

export function LandingBeforeAfterSection({ isDarkMode = false }: LandingBeforeAfterSectionProps) {
  return (
    <section className={`py-24 border-t border-b select-none transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#09090b] border-white/10 text-white' 
        : 'bg-[#f7f7f7] border-[#dddddd] text-[#000000]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 space-y-16 text-left">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10.5px] font-mono font-bold tracking-wider text-[#0381fe] uppercase bg-[#0381fe]/10 border border-[#0381fe]/20 px-3.5 py-1.5 rounded-[20px]">
            TRANSFORMATION COMPARISON
          </span>
          <h2 className={`text-3xl md:text-5xl font-bold font-display ${
            isDarkMode ? 'text-white' : 'text-[#000000]'
          }`}>
            수동 관리 vs <span className="text-[#0381fe]">ZariYo 2D 관제 OS</span>
          </h2>
          <p className={`text-xs md:text-sm font-normal ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
            아날로그 포스와 수동 수선서의 혼선에서 완벽히 벗어나 스마트 스토어 OS로 전환하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Before Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-[24px] border space-y-6 ${
              isDarkMode ? 'bg-[#141417] border-white/10' : 'bg-[#ffffff] border-[#dddddd]'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-inherit">
              <span className="text-xs font-mono font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-[20px]">
                BEFORE (기존 수동 POS)
              </span>
              <XCircle className="w-5 h-5 text-red-500" />
            </div>

            <div className="space-y-4 text-xs font-normal">
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <p className={isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}>
                  피크타임에 손님이 몰리면 테이블 수동 지정 혼선으로 노쇼 발생
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <p className={isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}>
                  주방에 종이 수선서 구겨지고 요청사항 누락으로 재조리 발생
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <p className={isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}>
                  마감 시 수동 장부 정산으로 매일 1시간 이상 소요
                </p>
              </div>
            </div>
          </motion.div>

          {/* After Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-[24px] border border-[#0381fe] space-y-6 ${
              isDarkMode ? 'bg-[#141417]' : 'bg-[#ffffff]'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#0381fe]/30">
              <span className="text-xs font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-3 py-1 rounded-[20px]">
                AFTER (ZARIYO 2D STORE OS)
              </span>
              <CheckCircle2 className="w-5 h-5 text-[#0381fe]" />
            </div>

            <div className="space-y-4 text-xs font-normal">
              <div className="flex items-start gap-3">
                <span className="text-[#0381fe] font-bold shrink-0">✓</span>
                <p className={isDarkMode ? 'text-white' : 'text-[#000000]'}>
                  5분 원자성 선점 락으로 노쇼 0% 및 실시간 2D 도면 완벽 관제
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0381fe] font-bold shrink-0">✓</span>
                <p className={isDarkMode ? 'text-white' : 'text-[#000000]'}>
                  주방 KDS 2분할 조리 릴레이로 조리 누락 0건 실현
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0381fe] font-bold shrink-0">✓</span>
                <p className={isDarkMode ? 'text-white' : 'text-[#000000]'}>
                  원클릭 CSV 엑셀 다운로드로 마감 정산 3분 만에 종결
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
