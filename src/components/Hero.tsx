import { ArrowRight, Monitor, Terminal } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 z-10 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      
      {/* Tech Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-indigo-300 mb-8 backdrop-blur-sm shadow-inner shadow-white/5">
        <Terminal className="w-3.5 h-3.5" />
        <span>Spring Boot & Redis 기반 고성능 동시성 제어</span>
      </div>

      {/* Hero Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-5xl leading-[1.15]">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400">
          공간의 효율을 극대화하는
        </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
          실시간 스마트 오피스 예약 플랫폼
        </span>
      </h1>

      {/* Hero Description */}
      <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
        자리요(ZariYo)는 실시간 좌석 예약부터 대규모 트래픽 동시성 제어, 
        그리고 직관적인 현장 관리자 관제 시스템까지 제공하는 통합 공유 오피스 및 도서관 관리 솔루션입니다.
      </p>

      {/* Main CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4.5 justify-center items-center w-full sm:w-auto px-4 mb-24">
        <button
          className="w-full sm:w-auto px-8 py-4.5 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 cursor-pointer transition-all duration-300 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
        >
          <span>실시간 좌석 배치도 보기</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <button
          className="w-full sm:w-auto px-8 py-4.5 font-semibold text-slate-200 rounded-xl bg-slate-900/90 border border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 cursor-pointer backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <Monitor className="w-5 h-5 text-slate-400" />
          <span>관리자 대시보드 진입</span>
        </button>
      </div>

      {/* Dashboard Preview Mockup Graphic */}
      <div className="w-full max-w-5xl rounded-2xl border border-slate-800/80 bg-slate-900/30 p-2.5 backdrop-blur-md shadow-2xl shadow-indigo-500/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10 pointer-events-none" />
        
        {/* Top window control bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60 bg-slate-950/40 rounded-t-xl">
          <div className="w-3 h-3 rounded-full bg-rose-500/60" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          <div className="h-4.5 w-40 bg-slate-900/60 rounded-md ml-4 border border-slate-800/40" />
        </div>

        {/* Dummy visual matrix representing workspace seats */}
        <div className="aspect-[16/9] bg-[#050914] rounded-b-xl p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Inner Glowing Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

          <div className="flex items-center justify-between z-10">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold">Live Monitor</span>
              <h3 className="text-lg font-bold text-white mt-0.5">스마트 오피스 제1빌딩 3F</h3>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                실시간 운영중
              </span>
            </div>
          </div>

          {/* Seat Layout Simulation */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 my-8 z-10">
            {Array.from({ length: 24 }).map((_, idx) => {
              const isReserved = idx % 3 === 0;
              const isSelected = idx === 7;
              
              let cardClass = "bg-slate-900/60 border-slate-800 text-slate-500";
              if (isReserved) cardClass = "bg-rose-500/10 border-rose-500/30 text-rose-400";
              if (isSelected) cardClass = "bg-indigo-500/25 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/20";
              
              return (
                <div 
                  key={idx} 
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all duration-300 cursor-default hover:scale-105 ${cardClass}`}
                >
                  <span className="text-xs font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[8px] mt-1 font-semibold uppercase">
                    {isReserved ? "사용중" : isSelected ? "선점중" : "공석"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Metrics footer inside mock graphic */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-900 z-10">
            <span>총 120석 중 82석 예약 가능</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-500/40" />사용중</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-indigo-500/40" />선점중</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-slate-800" />공석</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
