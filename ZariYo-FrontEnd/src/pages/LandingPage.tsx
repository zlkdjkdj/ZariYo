import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Utensils, ChevronRight, Sun, Moon } from 'lucide-react';
import { LandingHeroSection } from '../components/landing/LandingHeroSection';
import { LandingMetricsSection } from '../components/landing/LandingMetricsSection';
import { VisualProductShowroom } from '../components/landing/VisualProductShowroom';
import { HorizontalCardSwiper } from '../components/landing/HorizontalCardSwiper';
import { UserBenefitsSection } from '../components/landing/UserBenefitsSection';
import { LandingCoreFeaturesSection } from '../components/landing/LandingCoreFeaturesSection';
import { LandingBeforeAfterSection } from '../components/landing/LandingBeforeAfterSection';
import { LandingCtaSection } from '../components/landing/LandingCtaSection';

import { authStorage } from '../utils/authStorage';

export function LandingPage() {
  const navigate = useNavigate();

  // Realtime Light / Dark Theme Switcher State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('zariyo_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('zariyo_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const token = authStorage.getAccessToken();
  const user = authStorage.getUser<{ role?: string; name?: string }>();

  const handleAuthAction = () => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    if (user.role === 'ROLE_ADMIN') {
      navigate('/admin/users');
    } else {
      navigate('/owner/dashboard');
    }
  };

  const handleLogout = () => {
    authStorage.clearSession();
    window.location.reload();
  };


  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans select-none overflow-x-hidden ${
      isDarkMode ? 'bg-[#09090b] text-[#ffffff]' : 'bg-[#ffffff] text-[#000000]'
    }`}>
      
      {/* Top Navigation Header with Light/Dark Theme Switcher */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b px-8 py-3.5 flex items-center justify-between transition-colors ${
        isDarkMode 
          ? 'bg-[#09090b]/90 border-white/10 text-white' 
          : 'bg-[#ffffff]/90 border-[#dddddd] text-[#000000]'
      }`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="w-3 h-3 bg-[#0381fe] rounded-full animate-pulse" />
          <span className={`text-xl font-bold tracking-tight font-display ${isDarkMode ? 'text-white' : 'text-[#000000]'}`}>
            ZARIYO
          </span>
          <span className="text-[10.5px] font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-2.5 py-1 rounded-[20px] border border-[#0381fe]/20 uppercase">
            SAMSUNG ONE UI STORE OS
          </span>
        </motion.div>

        {/* Header Navigation Actions & Sun/Moon Toggler */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          {/* Light / Dark Mode Toggle Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-[20px] border font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 hover:scale-105 ${
              isDarkMode 
                ? 'bg-[#141417] text-amber-400 border-white/10 hover:border-amber-400/50' 
                : 'bg-[#f7f7f7] text-[#0381fe] border-[#dddddd] hover:border-[#0381fe]'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0381fe]" />}
            <span className="hidden sm:inline font-mono font-bold text-[11px]">
              {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
            </span>
          </button>

          <button
            onClick={() => navigate('/reserve')}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-[20px] border font-bold text-xs cursor-pointer transition-all hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#141417] border-white/10 text-white hover:bg-white/10'
                : 'bg-[#f7f7f7] border-[#dddddd] text-neutral-800 hover:bg-[#eeeeee]'
            }`}
          >
            <Utensils className="w-4 h-4 text-[#0381fe]" />
            <span>손님 2D 예약 & 키오스크</span>
          </button>

          <button
            onClick={() => navigate('/guide')}
            className={`hidden md:flex items-center gap-1.5 px-4 py-2 rounded-[20px] border font-bold text-xs cursor-pointer transition-all hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-[#141417] border-white/10 text-white hover:bg-white/10'
                : 'bg-[#f7f7f7] border-[#dddddd] text-neutral-800 hover:bg-[#eeeeee]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>사용설명서</span>
          </button>

          {/* Contained CTA - Samsung Homepage Pattern */}
          <button
            onClick={handleAuthAction}
            className={`h-[40px] px-6 rounded-[20px] font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 shadow-none hover:scale-[1.02] ${
              isDarkMode
                ? 'bg-white text-black hover:bg-neutral-200 border border-white'
                : 'bg-[#000000] text-white hover:bg-neutral-800 border border-[#000000]'
            }`}
          >
            <span>{user?.role === 'ROLE_ADMIN' ? '어드민 관리판 이동' : '내 매장 대시보드로 이동'}</span>
            <ChevronRight className="w-4 h-4 text-[#0381fe]" />
          </button>

          {/* Outlined CTA */}
          {token && user ? (
            <button
              onClick={handleLogout}
              className="h-[40px] px-4 rounded-[20px] bg-transparent hover:bg-red-500/10 border border-red-400 text-red-500 font-bold text-xs cursor-pointer transition-all"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className={`h-[40px] px-5 rounded-[20px] bg-transparent font-bold text-xs cursor-pointer transition-all flex items-center gap-1 hover:scale-[1.02] ${
                isDarkMode
                  ? 'border border-white/40 text-white hover:bg-white/10'
                  : 'border border-[#000000] text-[#000000] hover:bg-black/5'
              }`}
            >
              <span>로그인</span>
            </button>
          )}
        </motion.div>

      </header>

      {/* Hero Section with Asymmetric 2-Column Split Layout */}
      <LandingHeroSection isDarkMode={isDarkMode} />

      {/* Live Impact Metrics Bar */}
      <LandingMetricsSection isDarkMode={isDarkMode} />

      {/* Visual Store OS UI Product Showroom */}
      <VisualProductShowroom isDarkMode={isDarkMode} />

      {/* Horizontal Swiper Carousel Section */}
      <section className={`py-20 max-w-7xl mx-auto px-6 border-b ${
        isDarkMode ? 'bg-[#09090b] border-white/10' : 'bg-[#ffffff] border-[#dddddd]'
      }`}>
        <HorizontalCardSwiper isDarkMode={isDarkMode} />
      </section>

      {/* Customer & Owner Benefits Experience Section with Asymmetric Bento Grid */}
      <UserBenefitsSection isDarkMode={isDarkMode} />

      {/* Core Features Showcase */}
      <LandingCoreFeaturesSection isDarkMode={isDarkMode} />

      {/* Before vs After Comparison Matrix */}
      <LandingBeforeAfterSection isDarkMode={isDarkMode} />

      {/* Interactive Bottom CTA Banner */}
      <LandingCtaSection isDarkMode={isDarkMode} />

      {/* Samsung Clean Minimal Footer */}
      <footer className={`py-10 border-t text-center text-xs transition-colors ${
        isDarkMode ? 'bg-[#141417] border-white/10 text-neutral-400' : 'bg-[#f7f7f7] border-[#dddddd] text-[#707070]'
      }`}>
        <p className="font-sans font-normal">© 2026 ZariYo Store OS. Inspired by Samsung One UI Design Philosophy. All rights reserved.</p>
      </footer>

    </div>
  );
}
