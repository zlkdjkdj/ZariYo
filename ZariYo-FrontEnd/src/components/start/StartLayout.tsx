import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon, LayoutGrid } from 'lucide-react';
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
    <div className="bg-[#f9fafb] dark:bg-[#101012] text-[#191f28] dark:text-[#f9fafb] font-sans selection:bg-[#3182f6]/20 min-h-screen flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
      
      {/* Toss Light Blue Glow spill */}
      <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[70%] h-[50%] rounded-full bg-[#3182f6]/3 dark:bg-[#3182f6]/6 blur-[130px] pointer-events-none -z-10" />

      {/* Top Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-10 select-none">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-[#3182f6] to-[#4894fe] flex items-center justify-center shadow-[0_4px_10px_rgba(49,130,246,0.2)]">
            <LayoutGrid className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-[#191f28] dark:text-white flex items-center">
            ZariYo <span className="text-[#3182f6] dark:text-[#3182f6] font-mono text-[9px] ml-1.5 font-bold tracking-widest uppercase bg-[#3182f6]/10 px-2 py-0.5 rounded-full border border-[#3182f6]/20">Console</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-500 dark:text-neutral-400 hover:text-[#191f28] dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 hover:bg-red-500/10 border border-neutral-200 dark:border-white/5 text-[11px] font-bold text-neutral-500 dark:text-neutral-400 hover:text-red-500 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Selection Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 z-10">
        {children}
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center py-6 text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold font-mono border-t border-[#f2f4f6] dark:border-white/5 mt-auto">
        © 2026 ZariYo. All rights reserved.
      </footer>
    </div>
  );
}


