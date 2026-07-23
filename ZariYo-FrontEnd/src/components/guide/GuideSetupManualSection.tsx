import { motion } from 'framer-motion';
import { Layers, Lock, ChefHat, Bike, Sliders, CheckCircle2 } from 'lucide-react';

export function GuideSetupManualSection() {
  const setupSteps = [
    {
      step: 'STEP 01',
      title: '2D 좌석도 도면 스토어 빌더 설정',
      desc: '[스토어 빌더] 메뉴에서 2인석/4인석/바석 테이블, 카운터 POS, 입구 위치를 마우스 드래그 앤 드롭으로 1분 만에 시각 배치합니다.',
      icon: Layers,
      highlight: '로컬 스토리지 및 DB 레이아웃 자동 저장',
      color: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      step: 'STEP 02',
      title: '키오스크 5분 원자성 선점 락 세팅',
      desc: '손님이 키오스크 착석 시 5분 타임아웃 락이 자동 발동되어 중복 착석을 방지하며, 미결제 시 노쇼 방지를 위해 공석 처리됩니다.',
      icon: Lock,
      highlight: 'Redis Redisson 락 자동 원복',
      color: 'text-amber-500'
    },
    {
      step: 'STEP 03',
      title: '주방 KDS 2분할 태블릿 연동',
      desc: '주방 모니터 태블릿에 KDS 뷰를 마운트하면 홀 테이블 요리와 배달 주문 요리가 2분할 카드로 실시간 릴레이 전파됩니다.',
      icon: ChefHat,
      highlight: '원터치 조리 완료 릴레이 승인',
      color: 'text-sky-500'
    },
    {
      step: 'STEP 04',
      title: '배달 플랫폼 (배민/쿠팡) 기사 연동',
      desc: '배달의민족, 쿠팡이츠, 요기요 API 수신 시 사장님 관제판에서 버튼 한 번으로 라이더 호출 및 배차를 완료 처리합니다.',
      icon: Bike,
      highlight: '통합 배차 릴레이 제어',
      color: 'text-orange-500'
    },
    {
      step: 'STEP 05',
      title: '품절(Sold-Out) & 커스텀 옵션 세팅',
      desc: '재료 소진 시 토글 한 번으로 키오스크 전체에 품절을 전파하고, 곱빼기/토핑 추가금을 10초 만에 동적 등록합니다.',
      icon: Sliders,
      highlight: '실시간 전 매장 품절 전파',
      color: 'text-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#09090b] border-b border-neutral-300 dark:border-white/10 text-left select-none">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        <div>
          <span className="text-[10.5px] font-mono font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-[3px]">
            STEP-BY-STEP SETUP GUIDE
          </span>
          <h3 className="text-2xl md:text-4xl font-black text-black dark:text-white mt-2">
            실전 매장 관제 OS 5단계 셋업 가이드북
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-semibold mt-1">
            신규 가맹 매장이 10분 만에 실시간 2D 관제 시스템을 설치하고 운영할 수 있는 단계별 상세 설정 매뉴얼입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {setupSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-[3px] bg-neutral-50 dark:bg-[#111113] border border-neutral-300 dark:border-white/10 space-y-4 hover:border-black dark:hover:border-white transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-mono font-black bg-black text-white dark:bg-white dark:text-black rounded-[3px]">
                    {item.step}
                  </span>
                  <Icon className="w-5 h-5 text-neutral-500" />
                </div>
                <h4 className="font-extrabold text-base text-black dark:text-white">{item.title}</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-semibold leading-relaxed">
                  {item.desc}
                </p>
                <div className={`pt-2 text-[11px] font-mono ${item.color} font-bold flex items-center gap-1`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
