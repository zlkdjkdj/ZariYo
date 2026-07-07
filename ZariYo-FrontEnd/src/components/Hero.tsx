import { ArrowRight, ChevronRight, Terminal } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 z-10 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
      
      {/* Mini Top Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] dark:bg-[#1c1c1e] border border-[#e5e5e7] dark:border-[#2c2c2e]/60 text-xs text-[#86868b] mb-6">
        <Terminal className="w-3.5 h-3.5 text-[#3182f6]" />
        <span className="font-medium">ZariYo Core Engine v1.0</span>
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.1] text-[#1d1d1f] dark:text-white">
        공간을 예약하는
        <br />
        <span className="text-[#3182f6]">가장 완벽한 방법.</span>
      </h1>

      {/* Hero Description */}
      <p className="text-base sm:text-lg md:text-xl text-[#86868b] max-w-2xl mb-10 leading-relaxed font-normal">
        자리요(ZariYo)는 실시간 좌석 예약부터 대규모 트래픽 제어, 
        그리고 한눈에 보이는 관리자 관제까지 제공하는 통합 공간 관리 솔루션입니다.
      </p>

      {/* Main CTA Buttons - Toss & Apple hybrid style */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto px-4 mb-20">
        <button
          className="w-full sm:w-auto px-7 py-3.5 font-semibold text-white rounded-2xl bg-[#3182f6] hover:bg-[#1b64da] cursor-pointer transition-all duration-200 shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 group text-sm"
        >
          <span>실시간 좌석 배치도 보기</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
        
        <button
          className="text-[#3182f6] hover:underline font-semibold flex items-center gap-1 text-sm cursor-pointer bg-transparent border-0"
        >
          <span>관리자 대시보드 진입</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dashboard Preview Mockup Graphic - Apple device bezel inspired */}
      <div className="w-full rounded-2xl border border-[#e5e5e7] dark:border-[#2c2c2e] bg-[#f5f5f7] dark:bg-[#1c1c1e] p-2 shadow-2xl relative overflow-hidden transition-colors duration-300">
        
        {/* Top window control bar (Flat Apple Style) */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#e5e5e7]/80 dark:border-[#2c2c2e]/50 bg-[#f5f5f7] dark:bg-[#1c1c1e]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <div className="h-4 w-32 bg-[#e5e5e7] dark:bg-[#2c2c2e] rounded-full mx-auto" />
        </div>

        {/* Seat Layout Screen */}
        <div className="aspect-[16/9] bg-white dark:bg-black rounded-b-xl p-6 flex flex-col justify-between relative transition-colors duration-300">
          
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-[#3182f6] font-semibold">Live status</span>
              <h3 className="text-base font-semibold text-black dark:text-white mt-0.5">스마트 오피스 제1빌딩 3F</h3>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                운영중
              </span>
            </div>
          </div>

          {/* Minimalist Flat Seat Matrix */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 my-6 sm:my-4">
            {Array.from({ length: 24 }).map((_, idx) => {
              const isReserved = idx % 3 === 0;
              const isSelected = idx === 7;
              
              let cardClass = "border-[#e5e5e7] text-[#86868b] bg-black/5 dark:bg-[#1c1c1e]/30 dark:border-[#2c2c2e]";
              if (isReserved) cardClass = "bg-[#e5e5e7] dark:bg-[#2c2c2e] border-transparent text-[#86868b]/70";
              if (isSelected) cardClass = "bg-[#3182f6]/10 border-[#3182f6] text-[#3182f6] shadow-sm shadow-blue-500/5";
              
              return (
                <div 
                  key={idx} 
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-default hover:scale-105 ${cardClass}`}
                >
                  <span className="text-xs font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[7px] mt-0.5 font-semibold uppercase">
                    {isReserved ? "점유" : isSelected ? "선점" : "공석"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend and stats */}
          <div className="flex items-center justify-between text-xs text-[#86868b] pt-3 border-t border-[#e5e5e7] dark:border-[#1c1c1e]">
            <span>총 120석 중 82석 이용 가능</span>
            <div className="flex gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#e5e5e7] dark:bg-[#2c2c2e]" />점유</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#3182f6]" />선점</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-black/5 dark:bg-[#1c1c1e]/40 border border-[#e5e5e7] dark:border-[#2c2c2e]" />공석</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
