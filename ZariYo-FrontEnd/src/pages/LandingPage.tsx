import { motion, useScroll, useSpring } from 'framer-motion';
import { Hero } from '../components/landing/Hero';
import { DetailedFeatureShowcase } from '../components/landing/DetailedFeatureShowcase';
import { ModuleShowcase } from '../components/landing/ModuleShowcase';
import { SpaceShowcase } from '../components/landing/SpaceShowcase';
import { Architecture } from '../components/landing/Architecture';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  // Page-wide Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-main)] font-sans selection:bg-black/20 min-h-screen overflow-x-hidden relative transition-colors duration-300">
      
      {/* Scroll Progress Bar at Very Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-black dark:bg-white z-[100] origin-left shadow-none"
        style={{ scaleX }}
      />

      {/* 1. Full-Screen 100vh Hero Section (Contains Embedded Logo & Nav Links) */}
      <Hero />

      {/* 2. Detailed Specification Feature Showcase (New Specialized Section) */}
      <DetailedFeatureShowcase />

      {/* 3. Core 4 Modules Grid Showcase */}
      <ModuleShowcase />

      {/* 4. Space Gallery Showcase */}
      <SpaceShowcase />

      {/* 5. Technical Architecture Flow */}
      <Architecture />

      {/* 6. Footer */}
      <Footer />

    </div>
  );
}
