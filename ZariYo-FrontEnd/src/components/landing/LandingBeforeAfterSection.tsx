import { motion } from 'framer-motion';

export function LandingBeforeAfterSection() {
  return (
    <section className="py-24 bg-[#111113] border-t border-b border-white/10 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-6 text-left space-y-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <span className="text-[10.5px] font-mono font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-[3px]">
            WHY ZARIYO?
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            기존 아날로그 POS vs ZariYo 2D 관제 OS
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 font-semibold max-w-xl mx-auto">
            수동 전표와 비효율적인 수동 결제 방식에서 압도적 속도의 스마트 관제 시스템으로 진화하세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm">
          
          {/* Before Column (Slide In from Left x: -80) */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-[3px] bg-red-500/5 border border-red-500/20 space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-red-500/20">
              <span className="px-2.5 py-1 text-[10px] font-mono font-black bg-red-500 text-white rounded-[3px]">
                BEFORE (기존 아날로그)
              </span>
              <h3 className="font-extrabold text-lg text-white">기존 수동 POS 및 종이 수선서</h3>
            </div>

            <div className="space-y-4 text-neutral-300">
              <div className="space-y-1">
                <p className="font-bold text-red-400">❌ 테이블 착석 시 이중 예약 위험</p>
                <p className="text-xs text-neutral-400">수동 확인으로 인한 중복 좌석 안내 및 노쇼 손님 방치</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-red-400">❌ 주방 수선서 누락 및 지연</p>
                <p className="text-xs text-neutral-400">종이 수선서 전달 과정에서 주문 오발송 및 특별 요청 누락</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-red-400">❌ 배달앱 이원화 수동 호출</p>
                <p className="text-xs text-neutral-400">배민, 쿠팡 단말기를 각각 조작하여 기사 호출 분리</p>
              </div>
            </div>
          </motion.div>

          {/* After Column (Slide In from Right x: 80) */}
          <motion.div 
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-[3px] bg-emerald-500/5 border border-emerald-500/30 space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-emerald-500/30">
              <span className="px-2.5 py-1 text-[10px] font-mono font-black bg-emerald-500 text-white rounded-[3px]">
                AFTER (ZariYo OS)
              </span>
              <h3 className="font-extrabold text-lg text-white">2D 실시간 디지털 관제</h3>
            </div>

            <div className="space-y-4 text-neutral-200">
              <div className="space-y-1">
                <p className="font-bold text-emerald-400">✓ 5분 타임아웃 원자성 락 차단</p>
                <p className="text-xs text-neutral-300">Redis 기반 좌석 선점으로 이중 예약 0건 차단 및 자동 공석 원복</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-emerald-400">✓ 0.1초 디지털 KDS 릴레이</p>
                <p className="text-xs text-neutral-300">접수 즉시 주방 관제 카드 전파 및 특이사항 하이라이트</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-emerald-400">✓ 원터치 라이더 호출 승인</p>
                <p className="text-xs text-neutral-300">배민, 쿠팡, 요기요 통합 관제판에서 클릭 한 번으로 배차</p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
