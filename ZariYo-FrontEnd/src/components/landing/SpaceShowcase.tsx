import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpaceItem {
  src: string;
  title: string;
  description: string;
  code: string;
  color: string;
}

export function SpaceShowcase() {
  
  // 1. Rolling Text (skiper27) 단어 설정 (음식점 추가)
  const words = ["STUDY CAFES", "VIP LOUNGES", "WORK SPACES", "PLAY ZONES", "PREMIUM RESTAURANTS"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const currentWord = words[currentWordIdx];

  // 2. Hover Expand Cards (HoverExpand_001) 설정
  const [activeCard, setActiveCard] = useState<number | null>(0);

  const spaces: SpaceItem[] = [
    {
      src: "/images/spaces/study_cafe.png",
      title: "Premium Study Cafe",
      description: "쾌적하고 정밀한 몰입도를 보장하는 아늑한 개인 독서실 및 스터디 공간.",
      code: "TYPE #STUDY-01",
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      src: "/images/spaces/vip_lounge.png",
      title: "VIP Lounge & Bar",
      description: "부드러운 조명과 세련된 분위기를 갖춘 고품격 프라이빗 비즈니스 휴게 구역.",
      code: "TYPE #LOUNGE-02",
      color: "from-blue-500/20 to-indigo-500/20"
    },
    {
      src: "/images/spaces/shared_office.png",
      title: "Co-Working Office",
      description: "성공적인 협업과 창의적인 발상을 이끌어내는 인체공학적 개방 공유 사무실.",
      code: "TYPE #OFFICE-03",
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      src: "/images/spaces/gaming_zone.png",
      title: "Gaming & Play Zone",
      description: "강렬한 네온 사인과 최고 사양 PC 구성을 갖춘 미래형 게이밍 레저 스테이션.",
      code: "TYPE #GAME-04",
      color: "from-purple-500/20 to-violet-500/20"
    },
    {
      src: "/images/spaces/restaurant.png",
      title: "Premium Restaurant",
      description: "테이블 간의 여유로운 이격과 단정한 무드로 식사 몰입도를 제공하는 고급 다이닝 레스토랑 공간.",
      code: "TYPE #DINING-05",
      color: "from-rose-500/20 to-red-500/20"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-black text-neutral-900 dark:text-[#f5f5f7] transition-colors duration-300 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        {/* Skiper27: Rolling Text Title Block */}
        <div className="text-center mb-16 select-none h-32 flex flex-col justify-center">
          <span className="text-[10px] font-extrabold tracking-widest text-[#3182f6] uppercase font-mono bg-[#3182f6]/10 px-3 py-1 rounded-full mb-3 self-center">
            SPACE SHOWCASE
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight flex items-center justify-center gap-3">
            <span>ZariYo Powers</span>
            
            {/* Rolling area */}
            <span className="relative inline-flex overflow-hidden h-[1.2em] w-[260px] md:w-[380px] justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-[#3182f6] bg-gradient-to-r from-[#3182f6] to-[#4894fe] bg-clip-text text-transparent flex gap-0.5 justify-center"
                >
                  {currentWord.split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: charIdx * 0.02, duration: 0.25 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p className="text-neutral-500 dark:text-[#a1a1a6] text-xs md:text-sm font-semibold mt-3">
            어떤 공간 구조라도, ZariYo의 2D 격자 빌더와 원자성 선점 락을 결합해 스마트하게 제어됩니다.
          </p>
        </div>

        {/* HoverExpand_001 Accordion Image Grid */}
        <div className="w-full flex justify-center py-6">
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-3">
            {spaces.map((space, index) => {
              const isActive = activeCard === index;
              return (
                <motion.div
                  key={index}
                  onHoverStart={() => setActiveCard(index)}
                  onClick={() => setActiveCard(index)}
                  className={`relative cursor-pointer overflow-hidden rounded-[2rem] border transition-all duration-300 w-full ${
                    isActive 
                      ? "border-[#3182f6]/40 shadow-xl dark:shadow-[0_15px_40px_rgba(49,130,246,0.15)]" 
                      : "border-neutral-200 dark:border-white/5 hover:border-neutral-300 hover:dark:border-white/10 shadow-sm"
                  }`}
                  animate={{
                    // Desktop width: active is wide, others are narrow. Mobile height changes instead.
                    height: window.innerWidth < 768 
                      ? (isActive ? "18rem" : "6rem") 
                      : "26rem",
                    width: window.innerWidth >= 768 
                      ? (isActive ? "28rem" : "6.5rem") 
                      : "100%"
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-60"
                  }`} />

                  {/* Absolute Contents */}
                  <div className="absolute inset-0 z-20 p-5 flex flex-col justify-between select-none">
                    
                    {/* Top Row: Code Badge */}
                    <div className="flex justify-between items-start">
                      <span className={`text-[8px] font-black font-mono tracking-widest px-2 py-0.5 rounded-full border bg-black/60 text-white ${
                        isActive ? "border-[#3182f6]/30 text-[#3182f6]" : "border-white/10"
                      }`}>
                        {space.code}
                      </span>
                    </div>

                    {/* Bottom Row: Text Information */}
                    <div className="text-left animate-fadeIn">
                      <h3 className="text-xs md:text-sm font-black text-white mb-1.5 flex items-center gap-2">
                        {space.title}
                      </h3>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-[10px] md:text-[11px] leading-relaxed text-white/70 font-semibold"
                          >
                            {space.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                  {/* Spatial Mockup Image */}
                  <img
                    src={space.src}
                    alt={space.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isActive ? "scale-[1.05]" : "scale-100"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
