import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, UtensilsCrossed, Monitor, ChefHat, BarChart3 } from 'lucide-react';


export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-16 pb-20 md:pt-28 md:pb-24 z-10 px-6 max-w-7xl mx-auto overflow-hidden text-left">
      
      {/* Ambient Radial Glow Aura */}
      <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#3182f6]/10 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[160px] pointer-events-none -z-10" />

      {/* 50:50 / 60:40 Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left 6 cols: Value Proposition & CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6 select-none"
        >
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/90 font-mono shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#3182f6]" />
            <span>ZariYo Unified Kiosk & POS Platform v2.5</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
            스마트 식당의 모든 동선,<br />
            <span className="bg-gradient-to-r from-[#3182f6] via-[#60a5fa] to-[#3182f6] bg-clip-text text-transparent">
              단 하나의 플랫폼으로 연결.
            </span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-semibold leading-relaxed max-w-xl">
            손님 테이블 키오스크의 자리 자동 지정과 옵션 주문, 사장님 관제 POS의 실시간 수선서 연동, 주방 KDS 조리 릴레이 및 매출 분석까지 실제 식당 운영에 최적화된 올인원 솔루션입니다.
          </p>

          {/* Core 4 Modules Grid Summary */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
              <UtensilsCrossed className="w-4 h-4 text-[#3182f6] shrink-0" />
              <span>손님 태블릿 키오스크</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
              <Monitor className="w-4 h-4 text-[#3182f6] shrink-0" />
              <span>실시간 관제 POS</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
              <ChefHat className="w-4 h-4 text-[#3182f6] shrink-0" />
              <span>주방 KDS 조리 대기열</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-[#3182f6] shrink-0" />
              <span>매출 분석 & 수선 이력</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
            <button
              onClick={() => navigate('/owner/dashboard')}
              className="w-full sm:w-auto px-8 py-4 font-black text-white rounded-full bg-gradient-to-r from-[#3182f6] to-[#4894fe] hover:opacity-95 hover:scale-[1.02] cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 text-xs md:text-sm shadow-[0_8px_30px_rgba(49,130,246,0.3)]"
            >
              <span>사장님 관제 POS 포털</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => navigate('/reserve')}
              className="w-full sm:w-auto px-7 py-4 text-white font-extrabold flex items-center justify-center gap-1.5 text-xs md:text-sm cursor-pointer bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all duration-200"
            >
              <span>손님 키오스크 모드</span>
              <ChevronRight className="w-4 h-4 text-[#3182f6]" />
            </button>
          </div>
        </motion.div>

        {/* Right 6 cols: Apple/Skiper Aesthetic Control Matrix */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 w-full rounded-[2.5rem] border border-white/10 bg-[#09090b] p-3 relative overflow-hidden shadow-2xl backdrop-blur-2xl"
        >
          {/* Top window control bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-black/60 rounded-t-[2rem]">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="h-5 w-40 bg-white/5 border border-white/5 rounded-full mx-auto flex items-center justify-center text-[9px] text-white/60 font-mono font-bold">
              zariyo.unified.pos.live
            </div>
          </div>

          {/* Seat Layout Matrix */}
          <div className="p-6 flex flex-col justify-between relative bg-black/40 rounded-b-[2rem]">
            <div className="flex items-center justify-between">
              <div className="text-left select-none">
                <span className="text-[9px] uppercase tracking-widest text-[#3182f6] font-extrabold font-mono">REALTIME TABLE MATRIX</span>
                <h3 className="text-sm font-black text-white mt-0.5">ZariYo Premium Restaurant 1F</h3>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3182f6]/10 text-[#3182f6] text-[10px] font-bold border border-[#3182f6]/20">
                  <span className="w-2 h-2 rounded-full bg-[#3182f6] animate-ping" />
                  Live Syncing
                </span>
              </div>
            </div>

            {/* Matrix Nodes */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 my-6">
              {Array.from({ length: 18 }).map((_, idx) => {
                const isReserved = idx % 3 === 0;
                const isSelected = idx === 4;
                
                let cardClass = "border-white/5 text-white/40 bg-white/[0.02]";
                if (isReserved) cardClass = "bg-[#3182f6]/10 border-[#3182f6]/40 text-[#3182f6] shadow-sm";
                if (isSelected) cardClass = "bg-orange-500/15 border-orange-500/40 text-orange-500 font-bold shadow-md";
                
                return (
                  <div 
                    key={idx} 
                    className={`aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 cursor-default hover:scale-[1.04] p-2 ${cardClass}`}
                  >
                    <span className="text-xs font-black">T-{idx + 1}</span>
                    <span className="text-[7.5px] mt-0.5 font-bold uppercase tracking-widest font-mono">
                      {isReserved ? "사용중" : isSelected ? "선점중" : "공석"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/60 pt-4 border-t border-white/5 select-none font-bold">
              <span>실시간 18개 테이블 가동 중</span>
              <div className="flex gap-3">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3182f6]" />식사</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" />선점</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/20" />공석</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
