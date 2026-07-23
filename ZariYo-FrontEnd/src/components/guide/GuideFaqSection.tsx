import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight } from 'lucide-react';

export function GuideFaqSection() {
  const navigate = useNavigate();

  const faqs = [
    {
      q: 'Q. 5분 원자성 선점 락(Atomic Reservation Lock)은 어떻게 작동하나요?',
      a: '손님이 좌석 키오스크에서 주문을 시작하면 즉시 Redis Redisson 락 기반으로 해당 테이블이 5분간 선점 보존됩니다. 5분 이내 결제 미완료 시 타 손님의 이중 예약을 방지하기 위해 자동으로 공석 원복 처리됩니다.'
    },
    {
      q: 'Q. 기존 POS 및 배달앱(배민/쿠팡이츠/요기요)과 연동이 가능한가요?',
      a: '네! ZariYo 배달관제 릴레이 모듈은 배달의민족, 쿠팡이츠, 요기요, 방문포장 라이더 호출 API와 100% 통합되어 주방 KDS 및 사장님 관제판에 한눈에 릴레이됩니다.'
    },
    {
      q: 'Q. 매장 2D 좌석도는 어떻게 편집하나요?',
      a: '사장님 콘솔 메뉴의 [매장 좌석 배치 스토어 빌더]에서 테이블 개수, 2인석/4인석, 카운터, 입구 위치를 드래그 앤 드롭으로 1분 만에 커스텀 설계할 수 있습니다.'
    }
  ];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-[#09090b] border-t border-neutral-300 dark:border-white/10 select-none">
      <div className="max-w-4xl mx-auto px-6 text-left space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <HelpCircle className="w-6 h-6 text-black dark:text-white" />
          <h3 className="text-2xl font-black text-black dark:text-white">자주 묻는 핵심 시스템 질문 (FAQ)</h3>
        </motion.div>

        <div className="space-y-4 text-xs md:text-sm font-semibold">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-[3px] bg-white dark:bg-[#111113] border border-neutral-300 dark:border-white/10 space-y-2 hover:border-black dark:hover:border-white transition-all"
            >
              <h4 className="font-extrabold text-base text-black dark:text-white">{faq.q}</h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs md:text-sm">{faq.a}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-6 text-center"
        >
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-black text-sm cursor-pointer hover:opacity-90 transition-all inline-flex items-center gap-2 hover:scale-105"
          >
            <span>신규 프리미엄 랜딩 메인으로 돌아가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
