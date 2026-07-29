import { motion } from 'framer-motion';
import { Monitor, ChefHat, Bike, Lock, CheckCircle } from 'lucide-react';

export function LandingCoreFeaturesSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 text-left space-y-16 select-none">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-[10.5px] font-mono font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-[3px]">
            CORE OS FEATURES
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            독보적인 4대 관제 엔진
          </h2>
        </div>
        <p className="text-xs md:text-sm text-neutral-400 font-semibold max-w-md">
          매장 좌석도 배치부터 주문 릴레이, 수선서 연동, 주방 KDS 조리 릴레이까지 하나의 단일 시스템으로 관제합니다.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Left Slide-In (x: -60) */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.03, borderColor: '#ffffff' }}
          className="p-8 rounded-[3px] bg-[#111113] border border-white/10 transition-all space-y-5 shadow-none"
        >
          <div className="p-3 rounded-[3px] bg-white/10 text-white w-fit">
            <Monitor className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-neutral-500">FEATURE #01</span>
            <h3 className="text-2xl font-black text-white">2D 실시간 매장 좌석도 관제판</h3>
            <p className="text-xs md:text-sm text-neutral-400 font-semibold leading-relaxed">
              매장 좌석 배치를 2D 도면으로 한눈에 파악하고, 테이블 클릭 시 Side-by-Side 실시간 영수증 수선서가 즉시 펼쳐집니다.
            </p>
          </div>
          <div className="pt-2 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>실시간 입금 & 퇴석 원터치 완료</span>
          </div>
        </motion.div>

        {/* Card 2: Right Slide-In (x: 60) */}
        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.03, borderColor: '#ffffff' }}
          className="p-8 rounded-[3px] bg-[#111113] border border-white/10 transition-all space-y-5 shadow-none"
        >
          <div className="p-3 rounded-[3px] bg-white/10 text-white w-fit">
            <Lock className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-neutral-500">FEATURE #02</span>
            <h3 className="text-2xl font-black text-white">0.001초 실시간 2D 동기화 엔진</h3>
            <p className="text-xs md:text-sm text-neutral-400 font-semibold leading-relaxed">
              BroadcastChannel 기반 0.001초 초고속 동기화로 이중 예약을 완벽하게 방지하고 모든 탭 및 디바이스에 즉각 전파됩니다.
            </p>
          </div>
          <div className="pt-2 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>이중예약 0건 완벽 방어</span>
          </div>
        </motion.div>


        {/* Card 3: Left Slide-In (x: -60) */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.03, borderColor: '#ffffff' }}
          className="p-8 rounded-[3px] bg-[#111113] border border-white/10 transition-all space-y-5 shadow-none"
        >
          <div className="p-3 rounded-[3px] bg-white/10 text-white w-fit">
            <ChefHat className="w-7 h-7 text-sky-400" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-neutral-500">FEATURE #03</span>
            <h3 className="text-2xl font-black text-white">통합 주방 조리 관제 (KDS)</h3>
            <p className="text-xs md:text-sm text-neutral-400 font-semibold leading-relaxed">
              단일 박스 안에 홀 매장 테이블 요리와 배달/포장 주문 요리를 2분할로 깔끔히 배치하여 셰프의 조리 효율을 조율합니다.
            </p>
          </div>
          <div className="pt-2 text-xs font-mono text-sky-400 font-bold flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>원터치 조리 완료 릴레이 승인</span>
          </div>
        </motion.div>

        {/* Card 4: Right Slide-In (x: 60) */}
        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.03, borderColor: '#ffffff' }}
          className="p-8 rounded-[3px] bg-[#111113] border border-white/10 transition-all space-y-5 shadow-none"
        >
          <div className="p-3 rounded-[3px] bg-white/10 text-white w-fit">
            <Bike className="w-7 h-7 text-orange-400" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-neutral-500">FEATURE #04</span>
            <h3 className="text-2xl font-black text-white">배달 & 방문 포장 라이브 릴레이</h3>
            <p className="text-xs md:text-sm text-neutral-400 font-semibold leading-relaxed">
              배달의민족, 쿠팡이츠, 요기요 및 방문포장 주문 수신부터 라이더 호출 승인까지 관제판에서 클릭 한 번으로 통제합니다.
            </p>
          </div>
          <div className="pt-2 text-xs font-mono text-orange-400 font-bold flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>라이더 자동 배차 API 수신</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
