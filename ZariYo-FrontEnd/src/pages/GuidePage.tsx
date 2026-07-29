import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ChevronRight } from 'lucide-react';
import { GuideHeroBanner } from '../components/guide/GuideHeroBanner';
import { GuideSetupManualSection } from '../components/guide/GuideSetupManualSection';
import { DetailedFeatureShowcase } from '../components/landing/DetailedFeatureShowcase';
import { GuideFaqSection } from '../components/guide/GuideFaqSection';

export function GuidePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 font-sans select-none overflow-x-hidden">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-md border-b border-neutral-300 dark:border-white/10 px-8 py-4 flex items-center justify-between">
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
            <BookOpen className="w-5 h-5 text-black dark:text-white" />
            <h1 className="text-base font-black text-black dark:text-white">ZariYo 시스템 사용설명서 & 세부 명세서</h1>
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
            <span>사장님 관제 대시보드 진입</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </header>

      {/* Guide Hero Banner */}
      <GuideHeroBanner />

      {/* 5-Step Detailed Store Setup Manual Section */}
      <GuideSetupManualSection />

      {/* Main Detailed Showcase Component (16 Specs & 2D Live Simulator) */}
      <DetailedFeatureShowcase />

      {/* Manual FAQ Bottom Section */}
      <GuideFaqSection />

    </div>
  );
}
