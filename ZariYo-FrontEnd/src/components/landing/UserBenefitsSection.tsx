import { motion } from 'framer-motion';
import { Store, UserCheck, HeartHandshake, FileSpreadsheet, Lock, Smartphone, Bell, Zap } from 'lucide-react';

interface UserBenefitsSectionProps {
  isDarkMode?: boolean;
}

export function UserBenefitsSection({ isDarkMode = false }: UserBenefitsSectionProps) {
  return (
    <section className={`py-24 border-t border-b select-none transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#09090b] border-white/10 text-white' 
        : 'bg-[#f7f7f7] border-[#dddddd] text-[#000000]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Section Header - Asymmetric Left Align Option */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-inherit">
          <div className="space-y-4 max-w-2xl text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[20px] bg-[#0381fe]/10 border border-[#0381fe]/20 text-[#0381fe] text-xs font-mono font-bold uppercase"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>USER EXPERIENCE BENTO GRID</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-3xl sm:text-5xl font-bold tracking-tight font-display ${
                isDarkMode ? 'text-white' : 'text-[#000000]'
              }`}
            >
              복잡함은 덜어내고,<br />
              <span className="text-[#0381fe]">사장님과 손님 모두가 편안한 세상</span>
            </motion.h2>
          </div>

          <p className={`text-xs sm:text-sm font-normal max-w-md text-left leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
          }`}>
            ZariYo 스토어 OS는 복잡한 수동 장부와 긴 대기 줄을 제거하여 사장님과 손님 모두에게 가장 감동적인 순간을 제공합니다.
          </p>
        </div>

        {/* Dynamic Asymmetric Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
          
          {/* Bento Card 1 (Span 7): Owner Main 2D Drawing & Anti-NoShow */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`md:col-span-7 p-8 rounded-[24px] border space-y-6 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#141417] border-white/10' : 'bg-[#ffffff] border-[#dddddd]'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-[20px] bg-[#000000] text-white">
                  <Store className="w-6 h-6 text-[#0381fe]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0381fe] uppercase">OWNER ESSENTIAL</span>
                  <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                    3분 만에 완성하는 우리 매장 2D 배치도
                  </h3>
                </div>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
                도면 외주 없이 사장님이 마우스 드래그로 직접 테이블과 화장실, 카운터를 그립니다. 5분 원자성 락이 피크타임 노쇼와 이중 예약을 100% 차단합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-inherit text-xs font-bold">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#0381fe]" />
                <span>5분 임시선점 자동 환원</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#0381fe]" />
                <span>0초 매장 관제 동기화</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2 (Span 5): Owner Excel Report */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`md:col-span-5 p-8 rounded-[24px] border space-y-6 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#141417] border-white/10' : 'bg-[#ffffff] border-[#dddddd]'
            }`}
          >
            <div className="space-y-4">
              <div className="p-3 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] w-fit">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                수동 장부 대신 원클릭 엑셀 내보내기
              </h3>
              <p className={`text-xs leading-relaxed font-normal ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
                오늘의 총매출과 시간대별 인기 메뉴 분석을 클릭 한 번으로 다운로드하여 마감 정산 시간을 30분 단축합니다.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-3 py-1 rounded-[20px] w-fit">
              CSV ONE-CLICK EXPORT
            </span>
          </motion.div>

          {/* Bento Card 3 (Span 5): Customer 0-Wait Seat & Call */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`md:col-span-5 p-8 rounded-[24px] border space-y-6 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#141417] border-white/10' : 'bg-[#ffffff] border-[#dddddd]'
            }`}
          >
            <div className="space-y-4">
              <div className="p-3 rounded-[20px] bg-[#0381fe] text-white w-fit">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                기다림 없는 2D 좌석 선택 & 원터치 호출
              </h3>
              <p className={`text-xs leading-relaxed font-normal ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
                손님이 입구에서 직접 원하는 2D 좌석을 선택하고, 물이나 앞치마 요청 시 시끄럽게 소리칠 필요 없이 원터치로 전달합니다.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#0381fe]">
              <Bell className="w-4 h-4 animate-bounce" />
              <span>스마트 직원 부름 신호 연동</span>
            </div>
          </motion.div>

          {/* Bento Card 4 (Span 7): Customer 0.1s Easy Payment */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`md:col-span-7 p-8 rounded-[24px] border space-y-6 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#141417] border-white/10' : 'bg-[#ffffff] border-[#dddddd]'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe]">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#0381fe] uppercase">CUSTOMER DELIGHT</span>
                  <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                    카카오페이 / 신용카드 0.1초 테이블 간편 결제
                  </h3>
                </div>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
                식사 후 카운터 앞에서 길게 줄을 서지 않고 테이블 키오스크에서 카카오페이나 신용카드로 즉시 결제하고 퇴석합니다.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-inherit text-xs font-mono font-bold">
              <span className="text-[#0381fe]">INSTANT PAYMENT GATEWAY</span>
              <span className="text-emerald-500">0.1s TRANSACTION COMPLETED</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
