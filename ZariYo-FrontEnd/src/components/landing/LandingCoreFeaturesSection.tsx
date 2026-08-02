import { motion } from 'framer-motion';
import { Monitor, ChefHat, Bike, Lock, CheckCircle } from 'lucide-react';

interface LandingCoreFeaturesSectionProps {
  isDarkMode?: boolean;
}

export function LandingCoreFeaturesSection({ isDarkMode = false }: LandingCoreFeaturesSectionProps) {
  return (
    <section className={`py-24 border-t border-b select-none transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#09090b] border-white/10 text-white' 
        : 'bg-[#ffffff] border-[#dddddd] text-[#000000]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 text-left space-y-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[10.5px] font-mono font-bold tracking-wider text-[#0381fe] uppercase bg-[#0381fe]/10 border border-[#0381fe]/20 px-3.5 py-1.5 rounded-[20px]">
              CORE OS FEATURES
            </span>
            <h2 className={`text-3xl md:text-5xl font-bold mt-4 font-display ${
              isDarkMode ? 'text-white' : 'text-[#000000]'
            }`}>
              독보적인 4대 관제 엔진
            </h2>
          </div>
          <p className={`text-xs md:text-sm font-normal max-w-md leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
          }`}>
            매장 좌석도 배치부터 주문 릴레이, 수선서 연동, 주방 KDS 조리 릴레이까지 하나의 단일 시스템으로 관제합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`p-8 rounded-[20px] border transition-all space-y-5 shadow-none ${
              isDarkMode 
                ? 'bg-[#141417] border-white/10 hover:border-[#0381fe]' 
                : 'bg-[#ffffff] border-[#dddddd] hover:border-[#0381fe]'
            }`}
          >
            <div className="p-3.5 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] w-fit">
              <Monitor className="w-7 h-7" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                2D 실시간 도면 관제 파이프라인
              </h3>
              <p className={`text-xs md:text-sm font-normal leading-relaxed mt-2 ${
                isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
              }`}>
                20px 스냅 격자 도면 빌더로 실시간 매장 좌석 배치를 구축하고 테이블 상태 및 입금/퇴석을 직관적으로 관리합니다.
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-inherit text-xs font-semibold">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0381fe]" /> 20px 격자 스냅 2D 도면 빌더 마법사</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0381fe]" /> 영수증 결제 & 현금영수증 원터치 발급</div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`p-8 rounded-[20px] border transition-all space-y-5 shadow-none ${
              isDarkMode 
                ? 'bg-[#141417] border-white/10 hover:border-[#0381fe]' 
                : 'bg-[#ffffff] border-[#dddddd] hover:border-[#0381fe]'
            }`}
          >
            <div className="p-3.5 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] w-fit">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                5분 원자성 Redis 선점 락
              </h3>
              <p className={`text-xs md:text-sm font-normal leading-relaxed mt-2 ${
                isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
              }`}>
                키오스크 주문 및 예약 착석 시 Redis Redisson 원자성 락을 통해 5분간 이중 예약을 완벽 차단하고 노쇼 시 자동 공석 원복됩니다.
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-inherit text-xs font-semibold">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0381fe]" /> Redis Redisson 원자성 분산 락 탑재</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0381fe]" /> 5분 선점 카운트다운 타이머 펄스 경고</div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`p-8 rounded-[20px] border transition-all space-y-5 shadow-none ${
              isDarkMode 
                ? 'bg-[#141417] border-white/10 hover:border-[#0381fe]' 
                : 'bg-[#ffffff] border-[#dddddd] hover:border-[#0381fe]'
            }`}
          >
            <div className="p-3.5 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] w-fit">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                주방 KDS 2분할 스마트 조리 릴레이
              </h3>
              <p className={`text-xs md:text-sm font-normal leading-relaxed mt-2 ${
                isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
              }`}>
                종이 수선서 없이 주방 KDS 화면으로 직통 전달되며 홀 테이블 요리와 배달/포장 요리가 2분할로 깔끔히 정돈됩니다.
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-inherit text-xs font-semibold">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0381fe]" /> 소스따로 / 미디엄 웰던 등 특이사항 하이라이트</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0381fe]" /> 원터치 조리완료 시 POS 자동 전파</div>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`p-8 rounded-[20px] border transition-all space-y-5 shadow-none ${
              isDarkMode 
                ? 'bg-[#141417] border-white/10 hover:border-[#0381fe]' 
                : 'bg-[#ffffff] border-[#dddddd] hover:border-[#0381fe]'
            }`}
          >
            <div className="p-3.5 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] w-fit">
              <Bike className="w-7 h-7" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
                배달 & 포장 통합 관제 시스템
              </h3>
              <p className={`text-xs md:text-sm font-normal leading-relaxed mt-2 ${
                isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
              }`}>
                배달의민족, 쿠팡이츠, 요기요 수신부터 라이더 배차 호출까지 단 하나의 스크린으로 통합 관제합니다.
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-inherit text-xs font-semibold">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0381fe]" /> 배달 라이더 자동 지점 배차 연동</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#0381fe]" /> 원클릭 메뉴 1초 품절 처리 스위치</div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
