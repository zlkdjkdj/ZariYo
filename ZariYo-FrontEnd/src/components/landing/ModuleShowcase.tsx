import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UtensilsCrossed, Monitor, ChefHat, BarChart3, 
  ChevronRight, CheckCircle2 
} from 'lucide-react';


export function ModuleShowcase() {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'kiosk',
      title: '손님 전용 스마트 테이블 키오스크',
      subtitle: 'Menu-First Kiosk & Auto Table Assignment',
      icon: UtensilsCrossed,
      color: 'from-blue-500 to-indigo-600',
      badge: 'GUEST MODULE',
      description: '실제 테이블 태블릿 모드로 자동 자리가 지정되며, 손님이 곱빼기/토핑 추가 옵션 선택 모달과 원터치 물/직원호출 단추를 통해 편하게 실시간 주문합니다.',
      features: [
        '자물쇠 5분 타임아웃 선점 락 자동 연동',
        '곱빼기, 토핑 추가금 옵션 선택 팝업 모달',
        '원터치 물/직원호출/앞치마 수신 서비스 단추',
        '테이블 수동 지정 변경 팝업 모달 제공'
      ],
      link: '/reserve',
      linkText: '키오스크 체험하기'
    },
    {
      id: 'pos',
      title: '사장님 실시간 2D 관제 & Side-by-Side POS',
      subtitle: 'Cyber Control Room & Live Receipt',
      icon: Monitor,
      color: 'from-purple-500 to-violet-600',
      badge: 'OWNER POS MODULE',
      description: '매장 좌석 도면 맵을 탭하여 수선서를 1초 만에 확인하고, 현장에서 음료나 요리를 즉석 추가 주문하며, 퇴석 및 전액 결제 승인을 진행합니다.',
      features: [
        '2D 좌석도 맵 & 영수증 수선서 Side-by-Side 밀착 배치',
        '현장 POS 메뉴 직접 추가 주문 기능',
        '결제 수단 명세 표출 (신용카드 / 카카오페이 / 현금)',
        '실시간 5분 선점 및 퇴석/공석 원복 스위치'
      ],
      link: '/owner/dashboard',
      linkText: '관제 POS 진입하기'
    },
    {
      id: 'kds',
      title: '주방 실시간 조리 관제 (Kitchen KDS)',
      subtitle: 'Realtime Cooking Queue Relay',
      icon: ChefHat,
      color: 'from-orange-500 to-amber-600',
      badge: 'KITCHEN MODULE',
      description: '손님의 키오스크 주문이나 사장님 POS 주문이 발송되는 즉시 주방 화면 조리 대기열 카드로 표출되며 원터치 조리 완료 릴레이를 수행합니다.',
      features: [
        '테이블별 접수 시각 및 요리 수량 카드 렌더링',
        '특별 요청사항 (미디엄 웰던, 매운맛) 하이라이트',
        '원터치 조리 완료(Completed) 스위치 연동',
        '관제판 테이블 조리 상태 실시간 동기화'
      ],
      link: '/owner/dashboard?tab=kds',
      linkText: '주방 KDS 보기'
    },
    {
      id: 'management',
      title: '매출 분석 & 메뉴/영수증 이력 관리',
      subtitle: 'Analytics & Stock Management',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
      badge: 'ANALYTICS MODULE',
      description: '시간대별 매출 추이 보고서, 실시간 품절(Sold-Out) 스위치, 메뉴 대표 사진 직접 업로드 및 결제수단별 환불 처리 기능을 지원합니다.',
      features: [
        '매출 분석 리포트 & CSV 엑셀 내보내기',
        '신규 메뉴 사진 직접 업로드 미리보기',
        '옵션 가격 생성기 & 품절 토글 스위치',
        '영수증 결제 취소 / 전액 환불 모달'
      ],
      link: '/owner/analytics',
      linkText: '매출 분석 보고서'
    }
  ];

  return (
    <section className="py-24 bg-[#030303] text-[#f5f5f7] select-none relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] rounded-full bg-[#3182f6]/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8">
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#3182f6] uppercase font-mono bg-[#3182f6]/10 px-3 py-1 rounded-full border border-[#3182f6]/20">
              CORE SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
              실제 구축된 ZariYo 4대 핵심 모듈
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 font-semibold max-w-md">
            실전 매장 현장에서 검증된 강력한 4가지 독립 기능 모듈이 하나의 유기적인 네트워크로 연결됩니다.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#09090b] border border-white/10 hover:border-[#3182f6]/40 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#3182f6] group-hover:bg-[#3182f6] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[9.5px] font-black text-[#3182f6] font-mono tracking-wider">
                          {mod.badge}
                        </span>
                        <h3 className="text-lg font-black text-white">{mod.title}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 font-semibold leading-relaxed mb-6">
                    {mod.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8 border-t border-white/5 pt-5">
                    {mod.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3182f6] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(mod.link)}
                  className="w-full py-3.5 rounded-full bg-white/5 hover:bg-[#3182f6] text-white text-xs font-extrabold cursor-pointer border border-white/10 hover:border-[#3182f6] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <span>{mod.linkText}</span>
                  <ChevronRight className="w-4 h-4 text-[#3182f6] group-hover/btn:text-white transition-colors" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
