import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Architecture } from '../components/landing/Architecture';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] font-sans selection:bg-[#3182f6]/20 min-h-screen overflow-x-hidden relative transition-colors duration-300">
      
      {/* 1. Header Navigation (Apple Transparent Bar Style) */}
      <Header />

      {/* 2. Hero Section & Main CTA & Live Seat Matrix Simulation */}
      <Hero />

      {/* 3. Features Card Grid (Toss Large-Border-Radius Cards) */}
      <Features />

      {/* 4. Technical Architecture Flow (Apple Tech Spec style layout) */}
      <Architecture />

      {/* 5. Footer area */}
      <Footer />

    </div>
  );
}
