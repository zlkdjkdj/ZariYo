import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UtensilsCrossed, Monitor, ChefHat, BarChart3 
} from 'lucide-react';
import { FeatureSpecCard } from './FeatureSpecCard';
import { FeatureSimulatorPane } from './FeatureSimulatorPane';
import { FEATURE_SPECS } from '../../data/mockFeatureSpecs';

export function DetailedFeatureShowcase() {
  const [activeTab, setActiveTab] = useState<'kiosk' | 'pos' | 'kds' | 'analytics'>('kiosk');
  
  // Interactive Simulator States
  const [kioskLockTime, setKioskLockTime] = useState(299); // 04:59
  const [kioskOption, setKioskOption] = useState<'normal' | 'large'>('large');
  const [kioskCallAlert, setKioskCallAlert] = useState(false);
  const [posSelectedTable, setPosSelectedTable] = useState('T-04');
  const [posPayMethod, setPosPayMethod] = useState<'card' | 'kakao' | 'cash'>('card');
  const [kdsCompletedOrders, setKdsCompletedOrders] = useState<number[]>([]);
  const [soldOutState, setSoldOutState] = useState<{ [key: string]: boolean }>({ '특상 로스카츠': false, '제로 콜라': true });

  const currentSpec = FEATURE_SPECS[activeTab];

  return (
    <section className="py-24 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 border-t border-neutral-300 dark:border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-6 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[10px] font-black tracking-widest text-black dark:text-white uppercase font-mono bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full border border-black/20 dark:border-white/20">
              DETAILED FEATURE SPECIFICATION
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white mt-3">
              ZariYo 세분화 핵심 기능 명세
            </h2>
          </div>
          <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 font-semibold max-w-md">
            실전 매장에서 검증된 4대 독립 모듈과 16가지 세부 기능 스펙을 실시간 인터랙티브 시뮬레이터로 확인하세요.
          </p>
        </div>

        {/* 4 Module Tabs Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { id: 'kiosk', label: '1. 테이블 키오스크', icon: UtensilsCrossed },
            { id: 'pos', label: '2. 사장님 관제 POS', icon: Monitor },
            { id: 'kds', label: '3. 주방 KDS 관제', icon: ChefHat },
            { id: 'analytics', label: '4. 매출 분석 & 영수증', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-6 rounded-[3px] border font-black text-xs md:text-sm flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-none scale-[1.02]' 
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-white/10 hover:border-black dark:hover:border-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: Left 4 Detailed Specs, Right 2D Interactive Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left 6 cols: 4 Detailed Specs Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="mb-4">
              <span className="text-[10.5px] font-extrabold font-mono tracking-widest text-emerald-600 dark:text-emerald-400">
                {currentSpec.badge}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-black dark:text-white mt-1">
                {currentSpec.title}
              </h3>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-semibold mt-1">
                {currentSpec.subtitle}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {currentSpec.specs.map((spec, idx) => (
                  <FeatureSpecCard 
                    key={spec.id}
                    idx={idx}
                    name={spec.name}
                    desc={spec.desc}
                    icon={spec.icon}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right 6 cols: 2D Live Interactive Simulator Pane */}
          <FeatureSimulatorPane 
            activeTab={activeTab}
            kioskLockTime={kioskLockTime}
            setKioskLockTime={setKioskLockTime}
            kioskOption={kioskOption}
            setKioskOption={setKioskOption}
            kioskCallAlert={kioskCallAlert}
            setKioskCallAlert={setKioskCallAlert}
            posSelectedTable={posSelectedTable}
            setPosSelectedTable={setPosSelectedTable}
            posPayMethod={posPayMethod}
            setPosPayMethod={setPosPayMethod}
            kdsCompletedOrders={kdsCompletedOrders}
            setKdsCompletedOrders={setKdsCompletedOrders}
            soldOutState={soldOutState}
            setSoldOutState={setSoldOutState}
          />

        </div>
      </div>
    </section>
  );
}
