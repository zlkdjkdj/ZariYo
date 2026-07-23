import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Utensils, ChevronRight } from 'lucide-react';
import { LandingHeroSection } from '../components/landing/LandingHeroSection';
import { LandingMetricsSection } from '../components/landing/LandingMetricsSection';
import { HorizontalCardSwiper } from '../components/landing/HorizontalCardSwiper';
import { LandingCoreFeaturesSection } from '../components/landing/LandingCoreFeaturesSection';
import { LandingBeforeAfterSection } from '../components/landing/LandingBeforeAfterSection';
import { LandingCtaSection } from '../components/landing/LandingCtaSection';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] text-white transition-colors duration-300 font-sans select-none overflow-x-hidden">
      
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="w-3 h-3 bg-white rounded-none animate-pulse" />
          <span className="text-xl font-black font-mono tracking-widest text-white">
            ZARIYO
          </span>
          <span className="text-[9.5px] font-mono font-bold text-neutral-400 bg-white/10 px-2 py-0.5 rounded-[3px] border border-white/10 uppercase">
            NEXT-GEN STORE OS
          </span>
        </motion.div>

        {/* Header Links */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => navigate('/guide')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white font-extrabold text-xs cursor-pointer transition-all hover:scale-105"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>사용설명서 & 세부 스펙</span>
          </button>

          <button
            onClick={() => navigate('/kiosk')}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white font-extrabold text-xs cursor-pointer transition-all hover:scale-105"
          >
            <Utensils className="w-4 h-4 text-orange-400" />
            <span>손님 키오스크</span>
          </button>

          <button
            onClick={() => navigate('/owner/dashboard')}
            className="px-5 py-2 rounded-[3px] bg-white text-black hover:bg-neutral-200 font-black text-xs cursor-pointer transition-all shadow-none flex items-center gap-1.5 hover:scale-105"
          >
            <span>사장님 관제 시작</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </header>

      {/* Hero Section */}
      <LandingHeroSection />

      {/* Live Impact Metrics Bar */}
      <LandingMetricsSection />

      {/* Horizontal Swiper Carousel Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-b border-white/10">
        <HorizontalCardSwiper />
      </section>

      {/* Core Features Showcase */}
      <LandingCoreFeaturesSection />

      {/* Before vs After Comparison Matrix */}
      <LandingBeforeAfterSection />

      {/* Interactive Bottom CTA Banner */}
      <LandingCtaSection />

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs font-mono text-neutral-500">
        <p>© 2026 ZariYo. Next-Generation Cyber Store Control Room OS. All rights reserved.</p>
      </footer>

    </div>
  );
}
