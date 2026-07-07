import { Timer, Activity, QrCode, ShieldCheck } from 'lucide-react';

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-[#1c1c1e] bg-black">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-wider text-[#3182f6] uppercase">FEATURES</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2.5 mb-4 text-white">
            스마트 오피스를 위한 핵심 기술.
          </h2>
          <p className="text-[#86868b] text-sm md:text-base leading-relaxed">
            자리요는 동시성 트래픽 문제와 자원 분배의 비효율성을 해소하여, 
            관리자와 사용자 모두에게 가장 안전하고 정교한 사용 경험을 제공합니다.
          </p>
        </div>

        {/* Cards Grid - Large border radius, minimal shadows */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: 5분 임시 선점 */}
          <div className="p-10 rounded-3xl border border-[#2c2c2e]/60 bg-[#1c1c1e] hover:border-[#3182f6]/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-[#3182f6] mb-8 group-hover:scale-105 transition-transform duration-200">
              <Timer className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5">5분 임시 선점</h3>
            <p className="text-[#86868b] text-xs leading-relaxed font-normal">
              좌석을 터치하는 순간 5분간 임시 점유 권한을 획득하여 동시 선택 충돌을 해결하며, 미결제 이탈 시 자동 초기화됩니다.
            </p>
          </div>

          {/* Card 2: 실시간 현황 관제 */}
          <div className="p-10 rounded-3xl border border-[#2c2c2e]/60 bg-[#1c1c1e] hover:border-[#3182f6]/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-[#3182f6] mb-8 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5">실시간 통계 및 관제</h3>
            <p className="text-[#86868b] text-xs leading-relaxed font-normal">
              Websocket을 통해 좌석 이용 현황과 가동률 통계를 실시간으로 서버로부터 브로드캐스팅 받아 지연 없이 화면에 연출합니다.
            </p>
          </div>

          {/* Card 3: 스마트 키오스크 연동 */}
          <div className="p-10 rounded-3xl border border-[#2c2c2e]/60 bg-[#1c1c1e] hover:border-[#3182f6]/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-[#3182f6] mb-8 group-hover:scale-105 transition-transform duration-200">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5">키오스크 & QR 연동</h3>
            <p className="text-[#86868b] text-xs leading-relaxed font-normal">
              현장에 거치된 디바이스와 완벽하게 데이터가 동기화되며, 예약된 내역에 대해 모바일 QR 스캔을 통한 간편 체크인을 탑재했습니다.
            </p>
          </div>

          {/* Card 4: 분산 락 동시성 제어 */}
          <div className="p-10 rounded-3xl border border-[#2c2c2e]/60 bg-[#1c1c1e] hover:border-[#3182f6]/40 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-[#3182f6] mb-8 group-hover:scale-105 transition-transform duration-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5">분산 락 트랜잭션</h3>
            <p className="text-[#86868b] text-xs leading-relaxed font-normal">
              Redis Redisson 분산 락을 결합해 초당 수천 건의 트래픽이 몰리는 수강신청급 상황에서도 중복 예약을 원천 제거합니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
