import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface StartLayoutProps {
  children: ReactNode;
}

export function StartLayout({ children }: StartLayoutProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div className="bg-slate-50 dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-[#000000]/20 min-h-screen flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
      
      {/* Light/Dark Responsive Blue Glow spill */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[70%] h-[50%] rounded-full bg-[#000000]/4 dark:bg-[#000000]/5 blur-[130px] pointer-events-none -z-10" />

      {/* Top Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-10 select-none">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-6.5 h-6.5 rounded-none bg-gradient-to-tr from-[#000000] to-[#000000] flex items-center justify-center shadow-none">
            <LayoutGrid className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-white flex items-center">
            ZariYo <span className="text-[#000000] font-mono text-[9px] ml-1.5 font-bold tracking-widest uppercase bg-[#000000]/10 px-2 py-0.5 rounded-full border border-[#000000]/20">Console</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-600 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-white/5 hover:bg-red-500/10 border border-neutral-200 dark:border-white/10 text-[11px] font-bold text-neutral-600 dark:text-white/60 hover:text-red-500 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Selection Area */}
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 flex flex-col items-center justify-center px-6 py-10 z-10"
      >
        {children}
      </motion.main>

      {/* Footer copyright */}
      <footer className="w-full text-center py-6 text-[10px] text-neutral-500 dark:text-white/20 font-semibold font-mono border-t border-neutral-200/50 dark:border-white/5 mt-auto">
        © 2026 ZariYo. All rights reserved.
      </footer>
    </div>
  );
}




