import { Timer, Activity, QrCode, ShieldCheck } from 'lucide-react';

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-white/5 bg-[#030303] text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Background spill light */}
      <div className="absolute right-[-10%] top-[30%] w-[50%] h-[50%] rounded-full bg-[#000000]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 select-none">
          <span className="text-[10px] font-extrabold tracking-widest text-[#000000] uppercase font-mono bg-[#000000]/10 px-3 py-1 rounded-full">CORE FEATURES</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-5 text-white tracking-tight leading-tight">
            스마트 오피스를 지탱하는 강력한 설계.
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-bold">
            이용자와 관리자 모두에게 영화처럼 부드럽고 매끄러운 2D 공간 배치와 실시간 동시성 락 제어 편의를 선사합니다.
          </p>
        </div>

        {/* Cards Grid - Glassmorphism rounded cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: 5분 임시 선점 */}
          <div className="p-8 rounded-none border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 group hover:scale-[1.02] shadow-none">
            <div className="w-10 h-10 rounded-none bg-gradient-to-tr from-[#000000] to-[#000000] flex items-center justify-center text-white mb-6 shadow-none">
              <Timer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-3">5분 임시 선점</h3>
            <p className="text-neutral-400 text-[11.5px] leading-relaxed font-semibold">
              좌석 선택 즉시 5분 타이머가 기동해 실시간 중복 예약을 완벽 격리하며, 미결제 이탈 시 상태가 자동으로 무결 원복 처리됩니다.
            </p>
          </div>

          {/* Card 2: 실시간 현황 관제 */}
          <div className="p-8 rounded-none border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 group hover:scale-[1.02] shadow-none">
            <div className="w-10 h-10 rounded-none bg-gradient-to-tr from-[#000000] to-[#000000] flex items-center justify-center text-white mb-6 shadow-none">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-3">실시간 통계 및 관제</h3>
            <p className="text-neutral-400 text-[11.5px] leading-relaxed font-semibold">
              매장 좌석 현황과 입정/노쇼 기록들이 실시간 웹소켓 통신을 통해 0.1초 갭 없이 관리자 화면에 인터랙티브하게 반영됩니다.
            </p>
          </div>

          {/* Card 3: 스마트 키오스크 연동 */}
          <div className="p-8 rounded-none border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 group hover:scale-[1.02] shadow-none">
            <div className="w-10 h-10 rounded-none bg-gradient-to-tr from-[#000000] to-[#000000] flex items-center justify-center text-white mb-6 shadow-none">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-3">부담을 낮춘 접근성</h3>
            <p className="text-neutral-400 text-[11.5px] leading-relaxed font-semibold">
              테블릿 단독 운용 및 손님용 간이 결제 예약이 물 흐르듯 작동하여, 복잡한 인프라 도입 비용 부담을 획기적으로 낮춥니다.
            </p>
          </div>

          {/* Card 4: 분산 락 동시성 제어 */}
          <div className="p-8 rounded-none border border-white/5 bg-white/[0.01] backdrop-blur-xl hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 group hover:scale-[1.02] shadow-none">
            <div className="w-10 h-10 rounded-none bg-gradient-to-tr from-[#000000] to-[#000000] flex items-center justify-center text-white mb-6 shadow-none">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-3">분산 락 트랜잭션</h3>
            <p className="text-neutral-400 text-[11.5px] leading-relaxed font-semibold">
              Redis Redisson 분산 락을 백엔드에 관통해 동시 경합 트래픽 부하 속에서도 좌석 데이터의 무결성을 철저하게 보호합니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
