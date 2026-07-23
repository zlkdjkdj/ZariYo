import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShieldCheck, Zap, Lock, Utensils, Award } from 'lucide-react';

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
  },
  {
    id: 'sw-5',
    badge: 'AUTO ANALYTICS REPORT',
    title: '시간대별 매출 리포트 & CSV 내보내기',
    desc: '매장의 시간대별/요일별 매출 추이를 한눈에 파악하고 엑셀 CSV 파일로 원클릭 다운로드합니다.',
    icon: Award,
    metric: 'CSV 다운로드',
    tag: 'BI ENGINE'
  }
];

export function HorizontalCardSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play infinite slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SWIPER_CARDS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SWIPER_CARDS.length) % SWIPER_CARDS.length);
  };

  return (
    <div className="w-full space-y-6 select-none">
      
      {/* Top Header & Arrows */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-black text-white uppercase tracking-widest">
            ZARIYO CORE ENGINE CAROUSEL ({currentIndex + 1} / {SWIPER_CARDS.length})
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-[3px] bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="이전 카드 슬라이드"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-[3px] bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="다음 카드 슬라이드"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Swipe Container Viewport */}
      <div className="relative overflow-hidden p-1 rounded-[3px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -120 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              SWIPER_CARDS[currentIndex],
              SWIPER_CARDS[(currentIndex + 1) % SWIPER_CARDS.length],
              SWIPER_CARDS[(currentIndex + 2) % SWIPER_CARDS.length],
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="p-7 rounded-[3px] bg-[#111113] border border-white/10 hover:border-white transition-all space-y-4 text-left shadow-none group hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 text-[9.5px] font-mono font-black bg-white/10 text-white rounded-[3px]">
                      {card.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {card.metric}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-[3px] bg-white/10 text-white shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-lg text-white group-hover:text-emerald-400 transition-colors">
                      {card.title}
                    </h4>
                  </div>

                  <p className="text-xs text-neutral-400 font-semibold leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-neutral-500 font-bold">
                    <span>{card.tag}</span>
                    <span className="text-white flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>4.9 / 5.0</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
