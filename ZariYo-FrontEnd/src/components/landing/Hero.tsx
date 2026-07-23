import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, ChevronRight, Sparkles, UtensilsCrossed, 
  Monitor, ChefHat, BarChart3, ChevronDown, LayoutGrid, Sun, Moon 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Hero() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Driven Animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const matrixScale = useTransform(scrollYProgress, [0, 0.8], [0.92, 1.05]);
  const matrixRotateX = useTransform(scrollYProgress, [0, 0.8], [22, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <div ref={containerRef} className="relative min-h-[105vh] flex flex-col justify-between overflow-hidden bg-black text-white select-none pt-6 pb-12">
      
      {/* 1. Background Visual Image Overlay with Parallax Zoom */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-100"
      >
        <img 
          src="/images/hero_fullscreen_bg.png" 
          alt="Luxury Restaurant Control Room Background" 
          className="w-full h-full object-cover object-center opacity-40 dark:opacity-30 filter grayscale contrast-125"
        />
        {/* Gradients Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </motion.div>

      {/* Ambient Radial Aura */}
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#000000]/10 blur-[180px] pointer-events-none z-0" />

      {/* 2. Embedded Integrated Brand Top Bar (Header replacement for full immersion) */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-4 pb-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-none bg-white text-black flex items-center justify-center font-black">
            <LayoutGrid className="w-4 h-4 text-black" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
            자리요 <span className="text-white font-mono text-[10px] font-bold tracking-widest uppercase bg-white/10 border border-white/20 px-2 py-0.5 rounded-[3px]">Console</span>
          </span>
        </Link>

        {/* Embedded Portal Links & Theme Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <Link to="/login" className="text-xs text-neutral-300 hover:text-white transition-colors font-extrabold hidden sm:block">
            로그인
          </Link>
          <Link to="/signup" className="text-xs text-neutral-300 hover:text-white transition-colors font-extrabold hidden sm:block">
            회원가입
          </Link>
          <Link 
            to="/owner/dashboard"
            className="px-4.5 py-2 text-xs font-black text-black bg-white hover:bg-neutral-200 rounded-full cursor-pointer transition-all duration-200 shadow-none hover:scale-[1.03]"
          >
            관제 POS 포털
          </Link>
        </div>
      </header>

      {/* 3. Main Hero Content Container */}
      <motion.div 
        style={{ y: heroY, opacity: opacityFade }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full my-auto py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-left space-y-7"
          >
            {/* Top Micro Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold font-mono backdrop-blur-xl text-white shadow-none">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>ZariYo Unified Kiosk & POS v2.5</span>
            </div>

            {/* Giant Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
              스마트 식당의 모든 동선,<br />
              <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
                단 하나의 플랫폼으로 연결.
              </span>
            </h1>

            {/* Sub-description */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-semibold leading-relaxed max-w-xl">
              손님 테이블 키오스크의 자물쇠 선점 락 주문, 사장님 관제 POS의 실시간 수선서 연동, 주방 KDS 조리 릴레이까지 실제 식당 운영에 최적화된 올인원 솔루션입니다.
            </p>

            {/* Core 4 Modules Grid Summary */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs font-extrabold">
              <div className="p-3.5 rounded-[3px] bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-2.5 text-white">
                <UtensilsCrossed className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>스마트 테이블 키오스크</span>
              </div>
              <div className="p-3.5 rounded-[3px] bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-2.5 text-white">
                <Monitor className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>실시간 관제 POS</span>
              </div>
              <div className="p-3.5 rounded-[3px] bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-2.5 text-white">
                <ChefHat className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>주방 KDS 조리 대기열</span>
              </div>
              <div className="p-3.5 rounded-[3px] bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-2.5 text-white">
                <BarChart3 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>매출 분석 & 수선 이력</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3 items-center">
              <button
                onClick={() => navigate('/owner/dashboard')}
                className="w-full sm:w-auto px-8 py-4 font-black text-black rounded-full bg-white hover:bg-neutral-200 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 text-xs md:text-sm shadow-none hover:scale-[1.02]"
              >
                <span>사장님 관제 POS 포털</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => navigate('/reserve')}
                className="w-full sm:w-auto px-7 py-4 text-white font-extrabold flex items-center justify-center gap-1.5 text-xs md:text-sm cursor-pointer bg-white/10 hover:bg-white/20 rounded-full border border-white/20 backdrop-blur-md transition-all duration-200"
              >
                <span>손님 키오스크 모드</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3D Perspective Matrix Dashboard */}
          <motion.div 
            style={{ 
              scale: matrixScale, 
              rotateX: matrixRotateX,
              transformPerspective: 1200 
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full rounded-[3px] border border-white/20 bg-[#09090b]/90 p-4 relative overflow-hidden shadow-2xl backdrop-blur-2xl text-left"
          >
            {/* Top Control Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/80 rounded-t-[3px]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="h-5 px-3 bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-[9px] text-white/80 font-mono font-bold">
                zariyo.unified.pos.live
              </div>
            </div>

            {/* Seat Matrix Content */}
            <div className="p-6 bg-black/60 rounded-b-[3px] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-extrabold font-mono">REALTIME TABLE MATRIX</span>
                  <h3 className="text-sm font-black text-white mt-0.5">ZariYo Premium Restaurant 1F</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Syncing
                </span>
              </div>

              {/* Grid 18 Nodes */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {Array.from({ length: 18 }).map((_, idx) => {
                  const isReserved = idx % 3 === 0;
                  const isSelected = idx === 4;
                  
                  let cardClass = "border-white/10 text-white/50 bg-white/[0.03]";
                  if (isReserved) cardClass = "bg-blue-500/20 border-blue-400/50 text-blue-300 font-bold";
                  if (isSelected) cardClass = "bg-orange-500/25 border-orange-400/60 text-orange-400 font-bold";
                  
                  return (
                    <div 
                      key={idx} 
                      className={`aspect-square rounded-[3px] border flex flex-col items-center justify-center transition-all duration-300 p-1.5 ${cardClass}`}
                    >
                      <span className="text-xs font-black">T-{idx + 1}</span>
                      <span className="text-[7.5px] mt-0.5 font-bold uppercase tracking-widest font-mono">
                        {isReserved ? "사용중" : isSelected ? "선점중" : "공석"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between text-[11px] text-white/70 pt-4 border-t border-white/10 font-bold">
                <span>실시간 18개 테이블 가동 중</span>
                <div className="flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" />식사</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400" />선점</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/30" />공석</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* 4. Bouncing Scroll Down Indicator */}
      <motion.div 
        style={{ opacity: opacityFade }}
        className="relative z-10 flex flex-col items-center gap-2 cursor-pointer pb-2"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
        }}
      >
        <span className="text-[9.5px] font-mono tracking-widest text-neutral-400 uppercase font-extrabold">
          SCROLL TO EXPLORE SYSTEM
        </span>
        <motion.div 
          animate={{ y: [0, 6, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/80" />
        </motion.div>
      </motion.div>

    </div>
  );
}
