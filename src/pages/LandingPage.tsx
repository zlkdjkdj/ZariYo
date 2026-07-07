import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Architecture } from '../components/Architecture';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500/40 min-h-screen overflow-x-hidden relative">
      
      {/* Background Decorative Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vh] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vh] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Section & Main CTA & Live Seat Matrix Simulation */}
      <Hero />

      {/* 3. Features Card Grid */}
      <Features />

      {/* 4. Technical Architecture Flow */}
      <Architecture />

      {/* 5. Footer area */}
      <Footer />

    </div>
  );
}
