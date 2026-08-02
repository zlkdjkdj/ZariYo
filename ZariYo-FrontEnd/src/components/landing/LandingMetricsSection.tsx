import { motion } from 'framer-motion';
import { Store, Users, Zap, Award } from 'lucide-react';

interface LandingMetricsSectionProps {
  isDarkMode?: boolean;
}

export function LandingMetricsSection({ isDarkMode = false }: LandingMetricsSectionProps) {
  const animateCount = 1420;

  const metrics = [
    { label: '전국 누적 가맹점', value: `${animateCount.toLocaleString()}개+`, icon: Store, note: '실시간 가동 매장' },
    { label: '월간 2D 예약 처리', value: '1,420,000건+', icon: Users, note: '노쇼 자동 차단율 99.9%' },
    { label: '주방 KDS 릴레이 속도', value: '0.001초', icon: Zap, note: '실시간 STOMP 소켓' },
    { label: '점주 만족도 평가', value: '99.8점', icon: Award, note: '5점 만점 환산' },
  ];

  return (
    <section className={`py-12 border-t border-b select-none transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#09090b] border-white/10 text-white' 
        : 'bg-[#f7f7f7] border-[#dddddd] text-[#000000]'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-[20px] border flex flex-col justify-between space-y-3 transition-all hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-[#141417] border-white/10 hover:border-[#0381fe]' 
                    : 'bg-[#ffffff] border-[#dddddd] hover:border-[#0381fe]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-neutral-400' : 'text-[#707070]'}`}>
                    {m.label}
                  </span>
                  <div className="p-2 rounded-[14px] bg-[#0381fe]/10 text-[#0381fe]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <div className={`text-2xl sm:text-3xl font-bold tracking-tight font-display ${
                    isDarkMode ? 'text-white' : 'text-[#000000]'
                  }`}>
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono text-[#0381fe]">
                    {m.note}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
