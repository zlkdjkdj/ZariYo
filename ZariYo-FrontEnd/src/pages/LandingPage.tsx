import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { AppleFeatureBlock } from '../components/landing/AppleFeatureBlock';
import { ModuleShowcase } from '../components/landing/ModuleShowcase';
import { SpaceShowcase } from '../components/landing/SpaceShowcase';
import { Architecture } from '../components/landing/Architecture';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="bg-[#030303] text-[#f5f5f7] font-sans selection:bg-[#3182f6]/20 min-h-screen overflow-x-hidden relative transition-colors duration-300">
      
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Actual 4 Core Modules Showcase */}
      <ModuleShowcase />

      {/* 4. Interactive Apple Feature Block */}
      <AppleFeatureBlock />

      {/* 5. Space Gallery Showcase */}
      <SpaceShowcase />

      {/* 6. Technical Architecture Flow */}
      <Architecture />

      {/* 7. Footer */}
      <Footer />

    </div>
  );
}






