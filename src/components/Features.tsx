import { Timer, Activity, QrCode, ShieldCheck } from 'lucide-react';

export function Features() {
  return (
    <section id="features" className="py-24 relative z-10 border-t border-slate-900/60 bg-[#02050c]/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">FEATURES</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-5 tracking-tight text-white">
            스마트 오피스를 완성하는 4가지 혁신 기술
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            자리요는 동시성 트래픽 문제와 공간 자원 분배의 비효율성을 해소하여, 
            관리자와 사용자 모두에게 끊김 없는 최상의 사용 경험을 제공합니다.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: 5분 임시 선점 */}
          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/40 hover:bg-slate-900/40 hover:border-indigo-500/20 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Timer className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">5분 임시 선점 시스템</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              좌석 선택 시 5분 동안 임시 점유 권한을 획득하여 동시성 충돌을 원천 차단하고, 미결제 상태 이탈 시 자동 반환 처리합니다.
            </p>
          </div>

          {/* Card 2: 실시간 현황 관제 */}
          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/40 hover:bg-slate-900/40 hover:border-blue-500/20 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">실시간 통계 및 관제</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              웹소켓 통신을 통해 실시간 좌석 이용률 및 잔여 좌석을 즉시 반영하여 모니터링하고, 직관적인 관리 콘솔을 지원합니다.
            </p>
          </div>

          {/* Card 3: 스마트 키오스크 연동 */}
          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/40 hover:bg-slate-900/40 hover:border-purple-500/20 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">물리 키오스크 & QR</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              모바일 앱 예약 정보와 현장 키오스크를 실시간 연동하고, 신속한 QR 체크인으로 물리적 이동 동선을 효율화합니다.
            </p>
          </div>

          {/* Card 4: 분산 락 동시성 제어 */}
          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/40 hover:bg-slate-900/40 hover:border-emerald-500/20 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">고성능 분산 락 제어</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Redis Redisson 분산 락 기술을 활용하여 초당 대규모의 예약 트래픽이 몰리더라도 단 한 건의 중복 없는 안전한 트랜잭션을 실현합니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
