import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ChevronRight } from 'lucide-react';
import { GuideHeroBanner } from '../components/guide/GuideHeroBanner';
import { GuideTabSection } from '../components/guide/GuideTabSection';
import { GuideSetupManualSection } from '../components/guide/GuideSetupManualSection';
import { GuideFaqSection } from '../components/guide/GuideFaqSection';

export function GuidePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300 font-sans select-none overflow-x-hidden">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-neutral-300 dark:border-white/10 px-6 md:px-8 py-4 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-[3px] bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 text-black dark:text-white cursor-pointer transition-all flex items-center gap-1 font-extrabold text-xs hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로</span>
          </button>
          <div className="h-4 w-[1px] bg-neutral-300 dark:bg-white/20" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-sm md:text-base font-black text-black dark:text-white">ZariYo 실전 이용 & 셋업 가이드 매뉴얼</h1>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => navigate('/owner/stores')}
            className="px-4 py-2 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90 flex items-center gap-1.5 hover:scale-105"
          >
            <span>사장님 관제 대시보드</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </header>

      {/* Hero Banner Section */}
      <GuideHeroBanner />

      {/* Interactive Role & Feature-based Manual Tab Section */}
      <GuideTabSection />

      {/* 5-Step Detailed Store Setup Manual Section */}
      <GuideSetupManualSection />

      {/* Operation Troubleshooting & FAQ Section */}
      <GuideFaqSection />

    </div>
  );
}
