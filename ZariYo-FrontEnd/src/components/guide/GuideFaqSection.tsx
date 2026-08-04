import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight, Wrench } from 'lucide-react';

export function GuideFaqSection() {
  const navigate = useNavigate();

  const faqs = [
    {
      q: 'Q1. 매장 배치도에서 2인석을 4인석으로 바꾸거나 위치를 이동하고 싶을 때는 어떻게 하나요?',
      a: '사장님 관제 메뉴의 [매장 좌석 배치 스토어 빌더]로 진입하신 후, 변경하고 싶은 테이블을 마우스로 드래그하여 이동하거나 우측 속성 창에서 4인석/바 테이블 타입으로 변경한 뒤 우측 상단 [배치도 저장하기]를 클릭하시면 즉시 반영됩니다.'
    },
    {
      q: 'Q2. 손님이 좌석 키오스크에서 주문만 하고 결제 없이 자리를 비웠을 때는 어떻게 조치하나요?',
      a: 'ZariYo는 5분 원자성 선점 락(Atomic Lock)이 적용되어 있습니다. 5분 동안 결제가 이뤄지지 않으면 대시보드 타이머에 의해 자동으로 좌석이 공석으로 원복됩니다. 사장님이 직접 조치하시려면 대시보드 지도에서 해당 테이블을 클릭한 후 [강제 공석 처리] 버튼을 누르시면 됩니다.'
    },
    {
      q: 'Q3. 특정 메뉴의 재료가 갑자기 소진되었을 때 키오스크에 어떻게 품절 표시를 하나요?',
      a: '사장님 관제판 내 [메뉴/재고 관리] 탭에서 해당 메뉴 옆의 품절(Sold-Out) 스위치를 토글하시면, 매장의 모든 키오스크 및 배달 플랫폼 메뉴판에 1초 만에 "품절" 태그가 실시간 전파됩니다.'
    },
    {
      q: 'Q4. 착석 중인 손님이 다른 빈 자리로 위치 이동을 요청하시면 어떻게 하나요?',
      a: '대시보드 라이브 2D 지도에서 손님의 현재 테이블을 클릭한 뒤 [좌석 이동] 메뉴를 선택하고, 이동하고자 하는 빈 테이블을 지정해주시면 주문 내역 및 착석 시간이 새로운 테이블로 자동 이전됩니다.'
    }
  ];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-[#09090b] border-t border-neutral-300 dark:border-white/10 select-none">
      <div className="max-w-5xl mx-auto px-6 text-left space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-2xl font-black text-black dark:text-white">실전 매장 운영 트러블슈팅 & Quick FAQ</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-semibold mt-0.5">
              매장 현장에서 흔히 마주치는 상황에 대한 즉각적인 해결 가이드입니다.
            </p>
          </div>
        </motion.div>

        <div className="space-y-4 text-xs md:text-sm font-semibold">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-[4px] bg-white dark:bg-[#111113] border border-neutral-300 dark:border-white/10 space-y-2 hover:border-black dark:hover:border-white transition-all shadow-sm"
            >
              <h4 className="font-extrabold text-base text-black dark:text-white flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs md:text-sm pl-7">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-6 text-center flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => navigate('/owner/store/builder')}
            className="px-6 py-3.5 rounded-[4px] bg-black dark:bg-white text-white dark:text-black font-black text-xs md:text-sm cursor-pointer hover:opacity-90 transition-all inline-flex items-center gap-2 hover:scale-[1.02]"
          >
            <span>매장 2D 배치 스토어 빌더 실행</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => navigate('/owner/dashboard')}
            className="px-6 py-3.5 rounded-[4px] bg-neutral-200 dark:bg-white/10 text-black dark:text-white font-black text-xs md:text-sm cursor-pointer hover:bg-neutral-300 dark:hover:bg-white/20 transition-all inline-flex items-center gap-2 hover:scale-[1.02]"
          >
            <span>실시간 대시보드 관제 체험</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
