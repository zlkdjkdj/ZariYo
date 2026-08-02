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
    <section className="py-24 bg-[#ffffff] text-[#000000] transition-colors duration-300 border-t border-[#dddddd] select-none">
      <div className="max-w-7xl mx-auto px-6 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[10.5px] font-bold tracking-wider text-[#0381fe] uppercase font-mono bg-[#0381fe]/10 px-3.5 py-1.5 rounded-[20px] border border-[#0381fe]/20">
              DETAILED FEATURE SPECIFICATION
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#000000] mt-4 font-display">
              ZariYo 세분화 핵심 기능 명세
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#707070] font-normal max-w-md leading-relaxed">
            실전 매장에서 검증된 4대 독립 모듈과 16가지 세부 기능 스펙을 실시간 인터랙티브 시뮬레이터로 확인하세요.
          </p>
        </div>

        {/* 4 Module Tabs Switcher - DESIGN.md 0px Selected Tab Title Pattern */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14 border-b border-[#dddddd] pb-3">
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
                className={`py-3.5 px-6 rounded-none font-bold text-xs md:text-sm flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-[#000000] text-white border-b-2 border-[#0381fe]' 
                    : 'bg-[#f7f7f7] text-[#000000] hover:bg-[#eeeeee] border-b-2 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0381fe]' : 'text-[#707070]'}`} />
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
              <span className="text-[10.5px] font-bold font-mono tracking-wider text-[#0381fe]">
                {currentSpec.badge}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-[#000000] mt-1">
                {currentSpec.title}
              </h3>
              <p className="text-xs md:text-sm text-[#707070] font-normal mt-1">
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

