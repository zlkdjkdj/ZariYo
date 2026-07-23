import { useState } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, BookOpen, 
  Settings, Key, AlertCircle, ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';

export function AboutPage() {
  const navigate = useNavigate();

  // FAQ 아코디언 상태 관리
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const faqList = [
    {
      q: "5분 임시 선점(Hold) 시스템은 무엇인가요?",
      a: "여러 명의 손님이 동시에 하나의 여유 테이블을 클릭해 예약하려고 경합할 때 발생하는 충돌을 해결하기 위한 원자성 락 장치입니다. 손님이 좌석을 탭하면 즉시 해당 좌석은 다른 사람들에게 '임시 선점' 상태로 락이 걸리며 5분의 카운트다운 타이머가 개시됩니다. 시간 내에 결제 또는 입정을 확정하지 않으면 테이블은 자동으로 비움(Empty) 상태로 원복됩니다."
    },
    {
      q: "매장 크기와 가구 배치는 언제든지 수정 가능한가요?",
      a: "네, 사장님용 매장 빌더의 2단계 캔버스 에디터에서 20px 그리드 스냅 방식의 드래그 앤 드롭 편집 도구를 지원합니다. 새로운 가구를 배치판에 클릭해 추가하거나, 마우스 드래그를 이용해 손쉽게 이동시키고, 좌석 식별 번호와 예약 가능 여부를 팝업으로 자유롭게 수정 및 삭제해 즉시 대시보드에 반영할 수 있습니다."
    },
    {
      q: "Redis Redisson 분산 락(Distributed Lock)이 왜 필요한가요?",
      a: "대규모 행사 티켓팅이나 대학교 수강신청 급의 초당 수천 건 이상 트래픽이 특정 잔여 좌석으로 일시에 몰려드는 멀티 노드 분산 서버 환경에서, 데이터베이스 커넥션 지연 없이 고속 캐시 레벨에서 동시 예약을 원천 차단하기 위해 필요합니다. ZariYo는 Redisson의 Pub/Sub 기반 락 대기 기술을 적용하여 불필요한 스핀 락 부하를 방지하고 있습니다."
    },
    {
      q: "고객용 노쇼(No-Show) 발생 시 관제실에서 어떻게 대처하나요?",
      a: "당일 대기 예약 리스트에서 정해진 시간에 입정하지 않는 고객에 대해 사장님이 '노쇼 처리' 단추를 클릭하면, 실시간 대시보드 맵에서 해당 지정석의 빨간색(사용중) 혹은 파란색(예약됨) 상태가 1초 만에 즉시 녹색(비어있음) 상태로 업데이트되며 실시간 타임라인 스트리밍 로그에 노쇼 취소 건이 아카이빙됩니다."
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#030303] text-neutral-900 dark:text-white font-sans selection:bg-[#3182f6]/20 min-h-screen flex flex-col justify-between relative overflow-x-hidden transition-colors duration-300">
      
      {/* Background radial gradients for dynamic look */}
      <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[50%] rounded-full bg-[#3182f6]/4 dark:bg-[#3182f6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[50%] rounded-full bg-[#3182f6]/2 dark:bg-[#3182f6]/3 blur-[140px] pointer-events-none" />

      {/* Header component */}
      <Header />

      {/* Main Guide Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-250/50 dark:text-white/50 dark:hover:text-white dark:hover:bg-white/5 cursor-pointer transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            랜딩 페이지로 가기
          </button>
        </div>

        {/* Title Block */}
        <div className="text-center md:text-left mb-16 max-w-3xl">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#3182f6]/10 text-[#3182f6] text-[10px] font-bold mb-4 uppercase">
            <BookOpen className="w-3 h-3" /> ZariYo User Guide
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white leading-tight">
            자리요(ZariYo) 이용 가이드
          </h1>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold">
            사장님이 손쉽게 매장 레이아웃을 스케치하고, 고객이 예약 현황을 실시간으로 관람할 수 있는 통합 공간 플랫폼의 상세 동작 원리와 설명서입니다.
          </p>
        </div>

        {/* Grid: Instructions cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: 5-min holds */}
          <div className="p-8 rounded-3xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-md dark:shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold mb-3 text-neutral-900 dark:text-white">1. 실시간 선점 정책</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold">
              임의의 비어있는 좌석을 클릭하면 다른 동시 접속자의 중복 선택을 막기 위해 5분 동안 예약 락(Hold)이 시작됩니다. 5분이 초과되면 자동 비움 롤백 처리됩니다.
            </p>
          </div>

          {/* Card 2: 2D Grid Builder */}
          <div className="p-8 rounded-3xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-md dark:shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold mb-3 text-neutral-900 dark:text-white">2. 격자 드래그 배치 빌더</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold">
              20px 그리드 스냅 연산 기술이 적용된 캔버스를 통해 매장 기본 등록 단계에서 실제 테이블 배치와 사이즈 조절, 콘센트 위치, 출입구 배치를 마우스만으로 디자인합니다.
            </p>
          </div>

          {/* Card 3: Redisson lock */}
          <div className="p-8 rounded-3xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-white/[0.01] shadow-md dark:shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-505 flex items-center justify-center mb-6">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold mb-3 text-neutral-900 dark:text-white">3. 백엔드 분산 락 기술</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-semibold">
              서버 레벨에서는 Redisson 분산 락을 결합해 초당 수천 건 이상이 동일한 자원에 엑세스해도 동시성 레이스 컨디션 없이 안전하게 1건만 예약 선점권을 부여합니다.
            </p>
          </div>

        </div>

        {/* FAQ Accordeon Panel */}
        <div className="w-full bg-white dark:bg-[#09090b]/80 border border-neutral-200 dark:border-white/5 rounded-3xl p-8 shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#3182f6]" />
            자주 묻는 질문 (FAQ)
          </h2>

          <div className="space-y-4">
            {faqList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white/50 dark:bg-white/[0.01] border border-neutral-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-xs md:text-sm text-neutral-800 dark:text-white hover:bg-neutral-50 hover:dark:bg-white/[0.04] cursor-pointer transition-colors"
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-white/5">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
