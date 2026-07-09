import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Terminal } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 z-10 px-6 max-w-5xl mx-auto flex flex-col items-center text-center overflow-hidden">
      
      {/* Toss Light Blue Glow Aura */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[75%] h-[50%] rounded-full bg-[#3182f6]/4 dark:bg-[#3182f6]/8 blur-[130px] pointer-events-none -z-10" />

      {/* Mini Top Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-200/50 dark:bg-white/5 border border-neutral-350/40 dark:border-white/10 text-[10px] text-neutral-800 dark:text-[#f5f5f7] mb-8 font-mono select-none backdrop-blur-md">
        <Terminal className="w-3.5 h-3.5 text-[#3182f6]" />
        <span>ZariYo Premium Engine v1.0</span>
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl leading-[1.08] text-[#191f28] dark:text-white">
        공간과 좌석을 점유하는
        <br />
        <span className="bg-gradient-to-r from-[#3182f6] to-[#4894fe] bg-clip-text text-transparent">가장 편리한 경험.</span>
      </h1>

      {/* Hero Description */}
      <p className="text-xs sm:text-sm md:text-base text-[#4e5968] dark:text-neutral-400 max-w-2xl mb-12 leading-relaxed font-bold">
        실시간 다중 좌석 예약 분산 트래픽 통제 솔루션 ZariYo. 
        초당 수만 건의 동시 예약 요청도 Redis Redisson 분산 락 기술로 단 1ms 오차 없이 처리합니다.
      </p>

      {/* Main CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 mb-20 select-none">
        <button
          onClick={() => navigate('/reserve')}
          className="w-full sm:w-auto px-8 py-3.5 font-extrabold text-white rounded-full bg-gradient-to-r from-[#3182f6] to-[#4894fe] hover:opacity-95 hover:scale-[1.03] cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 text-xs md:text-sm shadow-[0_8px_30px_rgba(49,130,246,0.25)]"
        >
          <span>실시간 좌석 예약하기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => navigate('/owner')}
          className="w-full sm:w-auto px-6 py-3.5 text-[#4e5968] hover:text-[#191f28] dark:text-[#a1a1a6] dark:hover:text-white font-extrabold flex items-center justify-center gap-1 text-xs md:text-sm cursor-pointer bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full border border-neutral-200 dark:border-white/5 transition-all duration-200"
        >
          <span>관리자 콘솔 진입</span>
          <ChevronRight className="w-4 h-4 text-[#3182f6]" />
        </button>
      </div>

      {/* Glassmorphic Display Frame Mockup */}
      <div className="w-full rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#f9fafb]/70 dark:bg-neutral-900/60 p-2 relative overflow-hidden backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.02)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
        
        {/* Top window control bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-neutral-200 dark:border-white/5 bg-neutral-100 dark:bg-black/40">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <div className="h-4.5 w-36 bg-neutral-200/50 dark:bg-white/5 border border-neutral-350/10 dark:border-white/5 rounded-full mx-auto flex items-center justify-center text-[9px] text-[#4e5968] dark:text-neutral-400 font-mono">
            zariyo.console.live
          </div>
        </div>

        {/* Seat Layout Screen */}
        <div className="aspect-[16/9] bg-white dark:bg-black/60 p-6 flex flex-col justify-between relative">
          
          <div className="flex items-center justify-between">
            <div className="text-left select-none">
              <span className="text-[9px] uppercase tracking-widest text-[#3182f6] font-extrabold font-mono">LIVE CONSOLE STATE</span>
              <h3 className="text-sm font-black text-[#191f28] dark:text-white mt-1">Premium Lounge 1F</h3>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3182f6]/10 text-[#3182f6] text-[10px] font-bold border border-[#3182f6]/20 shadow-[0_0_15px_rgba(49,130,246,0.08)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3182f6] animate-ping" />
                Active Live Mode
              </span>
            </div>
          </div>

          {/* Seat Matrix */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 my-5">
            {Array.from({ length: 24 }).map((_, idx) => {
              const isReserved = idx % 3 === 0;
              const isSelected = idx === 7;
              
              let cardClass = "border-neutral-200 text-[#4e5968] bg-neutral-50 dark:bg-neutral-900/60 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-850 hover:border-neutral-300 dark:hover:border-white/20";
              if (isReserved) cardClass = "bg-[#e8f3ff] dark:bg-[#3182f6]/10 border-[#b3d7ff] dark:border-[#3182f6]/40 text-[#3182f6] shadow-[0_0_10px_rgba(49,130,246,0.02)]";
              if (isSelected) cardClass = "bg-amber-500/10 dark:bg-[#f59f00]/15 border-amber-500/40 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.08)]";
              
              return (
                <div 
                  key={idx} 
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-default hover:scale-[1.04] ${cardClass}`}
                >
                  <span className="text-[11px] font-black">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[7px] mt-0.5 font-bold uppercase tracking-widest">
                    {isReserved ? "예약" : isSelected ? "선점" : "공석"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend and stats */}
          <div className="flex items-center justify-between text-[11px] text-[#4e5968] dark:text-[#a1a1a6] pt-4 border-t border-neutral-200 dark:border-white/5 select-none font-bold">
            <span className="font-semibold">총 120석 중 82석 예약 가능</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#e8f3ff] dark:bg-[#3182f6]/10 border border-[#b3d7ff] dark:border-[#3182f6]/40" />예약</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500/10 dark:bg-[#f59f00]/15 border border-amber-500/40 dark:border-amber-500/30" />선점</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10" />공석</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

