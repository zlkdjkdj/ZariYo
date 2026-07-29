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

  const token = localStorage.getItem('zariyo_token');
  const userStr = localStorage.getItem('zariyo_user');
  let user: { role?: string; name?: string } | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      user = null;
    }
  }

  const handleAuthAction = () => {
    if (!token || !user) {
      navigate('/owner/dashboard');
      return;
    }

    if (user.role === 'ROLE_ADMIN') {
      navigate('/admin/users');
    } else {
      navigate('/owner/dashboard');
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('zariyo_token');
    localStorage.removeItem('zariyo_refresh_token');
    localStorage.removeItem('zariyo_user');
    window.location.reload();
  };

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
          className="flex items-center gap-3"
        >
          <button
            onClick={() => navigate('/reserve')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white font-extrabold text-xs cursor-pointer transition-all hover:scale-105"
          >
            <Utensils className="w-4 h-4 text-orange-400" />
            <span>손님 2D 예약 & 키오스크</span>
          </button>

          <button
            onClick={() => navigate('/guide')}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white font-extrabold text-xs cursor-pointer transition-all hover:scale-105"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>사용설명서</span>
          </button>

          <button
            onClick={handleAuthAction}
            className="px-5 py-2 rounded-[3px] bg-amber-400 text-black hover:bg-amber-300 font-black text-xs cursor-pointer transition-all shadow-none flex items-center gap-1.5 hover:scale-105"
          >
            <span>{user?.role === 'ROLE_ADMIN' ? '어드민 관리판 이동' : '내 매장 대시보드로 이동'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {token && user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-[3px] bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-bold text-xs cursor-pointer transition-all"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-[3px] bg-white/10 text-white hover:bg-white/20 border border-white/15 font-bold text-xs cursor-pointer transition-all flex items-center gap-1 hover:scale-105"
            >
              <span>로그인</span>
            </button>
          )}
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
