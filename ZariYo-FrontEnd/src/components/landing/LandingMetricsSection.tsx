import { motion } from 'framer-motion';

export function LandingMetricsSection() {
  const metrics = [
    { label: 'ACTIVE STORES', val: '1,420+', desc: '전국 제휴 가맹점', color: 'text-white' },
    { label: 'MONTHLY ORDERS', val: '3,850,000+', desc: '월간 주문 처리 건수', color: 'text-emerald-400' },
    { label: 'ROTATION RATE', val: '+38.5%', desc: '평균 회전율 상승', color: 'text-white' },
    { label: 'SYNC SPEED', val: '0.1 SEC', desc: '실시간 전파 속도', color: 'text-amber-400' },
  ];

  return (
    <section className="py-12 bg-[#111113] border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((metric, idx) => (
          <motion.div 
            key={metric.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="p-4 space-y-1 rounded-[3px] bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-default text-left sm:text-center"
          >
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">{metric.label}</span>
            <p className={`text-3xl sm:text-4xl font-mono font-black ${metric.color}`}>{metric.val}</p>
            <p className="text-xs text-neutral-400 font-semibold">{metric.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
