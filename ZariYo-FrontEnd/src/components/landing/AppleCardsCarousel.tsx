import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Server, Key, LayoutGrid } from 'lucide-react';

interface CardData {
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
}

export function AppleCardsCarousel() {
  const [activeCard, setActiveCard] = useState<CardData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const data: CardData[] = [
    {
      category: "Distributed Mutex Lock",
      title: "Redisson 분산 락으로 1ms 무결성을 제어합니다.",
      src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop",
      content: <LockDetailContent />
    },
    {
      category: "Intelligent Layout Engine",
      title: "20px 격자 스냅과 실시간 드래그 배치 캔버스.",
      src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop",
      content: <LayoutDetailContent />
    },
    {
      category: "Live Stream Gateway",
      title: "WebSocket 관제실로 실시간 현황을 생동감 있게 전파.",
      src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop",
      content: <StreamDetailContent />
    }
  ];

  // Esc key closes active modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCard(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-black text-neutral-900 dark:text-white transition-colors duration-300 relative select-none">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header section with scroll buttons */}
        <div className="flex justify-between items-end mb-10">
          <div className="text-left">
            <span className="text-[10px] font-extrabold tracking-widest text-[#3182f6] uppercase font-mono bg-[#3182f6]/10 px-3 py-1 rounded-full">
              Core Stack Specs
            </span>
            <h2 className="text-2xl md:text-4xl font-black mt-4 tracking-tight">
              자리요 핵심 엔진 들여다보기.
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-white transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel items scrollbar */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-scroll scrollbar-hide pb-6 px-1.5 scroll-smooth snap-x snap-mandatory"
        >
          {data.map((card, idx) => (
            <motion.div
              layoutId={`card-container-${card.title}`}
              key={idx}
              onClick={() => setActiveCard(card)}
              className="relative w-[280px] md:w-[320px] h-[380px] md:h-[420px] rounded-[2.2rem] overflow-hidden cursor-pointer group shadow-lg dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] border border-neutral-200 dark:border-neutral-900 shrink-0 snap-start"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

              {/* Card Media */}
              <img 
                src={card.src} 
                alt={card.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />

              {/* Text Context */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between items-start text-left">
                <span className="text-[10px] font-black tracking-widest text-[#3182f6] uppercase font-mono bg-[#3182f6]/10 px-2.5 py-1 rounded-full border border-[#3182f6]/20 backdrop-blur-md">
                  {card.category}
                </span>
                
                <h3 className="text-base md:text-lg font-black text-white leading-snug drop-shadow-md">
                  {card.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal Popup Details overlay */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            
            {/* Modal Container */}
            <motion.div
              layoutId={`card-container-${activeCard.title}`}
              className="relative w-full max-w-3xl h-[85vh] md:h-[80vh] bg-neutral-50 dark:bg-[#09090b] rounded-[2.5rem] border border-neutral-200 dark:border-white/5 overflow-y-auto scrollbar-hide shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-black/45 border border-white/10 hover:bg-black/70 text-white z-30 transition-all cursor-pointer shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image Banner */}
              <div className="h-[220px] md:h-[300px] w-full relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 dark:from-[#09090b] via-black/20 to-transparent z-10" />
                <img 
                  src={activeCard.src} 
                  alt={activeCard.title} 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-6 left-8 z-20 text-left">
                  <span className="text-[10px] font-black tracking-widest text-[#3182f6] uppercase font-mono bg-[#3182f6]/10 px-2.5 py-1 rounded-full border border-[#3182f6]/20 backdrop-blur-md">
                    {activeCard.category}
                  </span>
                  <h3 className="text-lg md:text-2xl font-black text-white mt-3 drop-shadow-md leading-tight max-w-xl">
                    {activeCard.title}
                  </h3>
                </div>
              </div>

              {/* Inner Details Container */}
              <div className="p-8 flex-1 text-left font-sans leading-relaxed">
                {activeCard.content}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ----------------------------------------------------
// Details Content: Lock
// ----------------------------------------------------
function LockDetailContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-start bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/5 rounded-2xl p-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
          <Key className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-neutral-800 dark:text-white">Redisson Distributed Lock 아카이빙</h4>
          <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 mt-1 font-semibold">
            단일 서버의 싱글 스레드 락과 달리, 수만 명의 경합이 여러 웹서버 노드로 분산 처리되는 현대 클라우드 아키텍처 환경에서는 통합 잠금 관리가 필요합니다. 
            ZariYo는 Redis 내의 고성능 분산 락(Distributed Lock) 라이브러리인 Redisson을 차용했습니다.
          </p>
        </div>
      </div>

      <div className="space-y-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 pl-2">
        <p>• **Pub/Sub 기반의 락 대기**: 주기적으로 스핀 락을 걸지 않고, 락 소유 서버가 락을 해제할 때 메세지를 브로드캐스팅해 불필요한 대기 네트워크 비용을 제로화합니다.</p>
        <p>• **5분 임시 선점 격리**: 최초 점유를 획득하면 즉시 임시 예약(Pending) 상태와 함께 5분 타임아웃 락을 부여하여 중복 탭을 사전 예방합니다.</p>
        <p>• **안전한 만료 롤백**: 예약 단계 중 결제하지 않고 나가거나 비정상 이탈 시 락의 타임아웃 만료로 테이블을 원자적으로 자동 방출합니다.</p>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Details Content: Layout
// ----------------------------------------------------
function LayoutDetailContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-start bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/5 rounded-2xl p-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-neutral-800 dark:text-white">20px 그리드 스냅 에디터 엔진</h4>
          <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 mt-1 font-semibold">
            마우스만으로 가구를 배치하고 회전하고, 식별자를 즉석에서 마킹하는 강력한 매장 설계 도구입니다. 
            소형 카페부터 초대형 공유 오피스 3D 뷰어까지 스무스하게 지원합니다.
          </p>
        </div>
      </div>

      <div className="space-y-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 pl-2">
        <p>• **정렬 스냅 가이드**: 드래그 시 20픽셀 단위 스냅 눈금 연산으로 줄맞춤 정렬 가이드를 생성해 오차 없는 도면을 완성합니다.</p>
        <p>• **가구 조절 패널**: 콘센트, 출입구, 화장실, 회의실, 일반 좌석 등 공간 타입을 실시간 지정하고 회전 각도를 제어합니다.</p>
        <p>• **JSON 도면 동기화**: 설계가 완료되면 캔버스 정보가 전체 경량 JSON 규격으로 파싱되어 API에 동기화 보존됩니다.</p>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Details Content: Stream
// ----------------------------------------------------
function StreamDetailContent() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-start bg-neutral-200/50 dark:bg-white/5 border border-neutral-300 dark:border-white/5 rounded-2xl p-6">
        <div className="w-10 h-10 rounded-xl bg-[#3182f6]/10 text-[#3182f6] flex items-center justify-center shrink-0">
          <Server className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-neutral-800 dark:text-white">WebSocket 양방향 스트리밍 게이트웨이</h4>
          <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 mt-1 font-semibold">
            누군가 예약을 하거나 좌석의 상태가 바뀔 때 매장 점주와 손님들의 맵 화면이 0.1초 내로 갱신되어, 
            노쇼로 인한 좌석 회전율 낭비를 막고 즉각 대처할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="space-y-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 pl-2">
        <p>• **실시간 스트리밍 타임라인**: 입장, 퇴정, 락 만료, 예약 시작 건이 관제 콘솔 로그판에 스트리밍 패킷 형태로 한 줄씩 출력됩니다.</p>
        <p>• **노쇼 조기 차단**: 지정된 대기 시간을 어긴 손님에 대해 노쇼 단추를 클릭하면 즉시 해당 좌석이 공석으로 전환 전파됩니다.</p>
        <p>• **웹소켓 연결 관리**: 클라이언트와 게이트웨이 간 주기적 Heartbeat 체크로 예외 끊김 시 세션을 신속 정리합니다.</p>
      </div>
    </div>
  );
}
