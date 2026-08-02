import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, Lock, Utensils } from 'lucide-react';

interface SwiperCard {
  id: string;
  badge: string;
  title: string;
  desc: string;
  icon: any;
  metric: string;
  tag: string;
}

const SWIPER_CARDS: SwiperCard[] = [
  {
    id: 'sw-1',
    badge: 'REALTIME 2D CANVAS',
    title: '실시간 좌석 관제 & 수선서 오버레이',
    desc: '매장 좌석 배치를 2D 도면으로 관제하고 클릭 한 번으로 Side-by-Side 실시간 영수증 수선서를 펼칩니다.',
    icon: ShieldCheck,
    metric: '99.9% 동기화',
    tag: 'POS ENGINE'
  },
  {
    id: 'sw-2',
    badge: 'ATOMIC REDIS LOCK',
    title: '5분 타임아웃 원자성 선점 락',
    desc: '키오스크 착석 시 Redis Redisson 락 기반으로 5분간 이중 예약을 완벽 차단하고 노쇼 시 자동 공석 원복됩니다.',
    icon: Lock,
    metric: '0건 중복 차단',
    tag: 'REDIS ENGINE'
  },
  {
    id: 'sw-3',
    badge: 'KITCHEN DISPLAY SYSTEM',
    title: '주방 홀 & 배달 2분할 조리 릴레이',
    desc: '단일 주방 박스 안에서 홀 테이블 요리와 배달/포장 주문 요리를 2분할로 깔끔히 배치하여 원터치 릴레이 전파.',
    icon: Utensils,
    metric: '0.1초 릴레이',
    tag: 'KDS ENGINE'
  },
  {
    id: 'sw-4',
    badge: 'DELIVERY API INTEGRATION',
    title: '배달의민족 / 쿠팡이츠 통합 관제',
    desc: '배달 플랫폼 수신부터 원터치 라이더 호출 승인까지 관제판에서 통합 통제하여 배차 지연을 제로화합니다.',
    icon: Zap,
    metric: '통합 API 수신',
    tag: 'DELIVERY RELAY'
  }
];

interface HorizontalCardSwiperProps {
  isDarkMode?: boolean;
}

export function HorizontalCardSwiper({ isDarkMode = false }: HorizontalCardSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SWIPER_CARDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SWIPER_CARDS.length) % SWIPER_CARDS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SWIPER_CARDS.length);
  };

  const current = SWIPER_CARDS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="space-y-8 select-none">
      
      {/* Top Controller Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0381fe] animate-pulse" />
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
          }`}>
            SAMSUNG ONE UI CAROUSEL SHOWCASE ({currentIndex + 1} / {SWIPER_CARDS.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className={`p-2.5 rounded-[20px] border cursor-pointer transition-all hover:scale-105 ${
              isDarkMode 
                ? 'bg-[#141417] border-white/10 text-white hover:bg-white/10' 
                : 'bg-[#f7f7f7] border-[#dddddd] text-black hover:bg-[#eeeeee]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className={`p-2.5 rounded-[20px] border cursor-pointer transition-all hover:scale-105 ${
              isDarkMode 
                ? 'bg-[#141417] border-white/10 text-white hover:bg-white/10' 
                : 'bg-[#f7f7f7] border-[#dddddd] text-black hover:bg-[#eeeeee]'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Swiper Active Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className={`p-8 sm:p-12 rounded-[24px] border space-y-6 text-left transition-colors ${
            isDarkMode 
              ? 'bg-[#141417] border-white/10 text-white' 
              : 'bg-[#ffffff] border-[#dddddd] text-black'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-3 py-1 rounded-[20px]">
              {current.badge}
            </span>
            <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
              {current.tag}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-[20px] bg-[#0381fe] text-white shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-[#000000]'
              }`}>
                {current.title}
              </h3>
              <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-[#707070]'
              }`}>
                {current.desc}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-inherit flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-[#0381fe]">BENCHMARK PERFORMANCE</span>
            <span className="text-emerald-500">{current.metric}</span>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
