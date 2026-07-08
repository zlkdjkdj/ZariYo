import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon } from 'lucide-react';
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
    <div className="bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] font-sans selection:bg-[#3182f6]/20 min-h-screen flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
      {/* Background decoration elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3182f6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#3182f6]/5 blur-[120px] pointer-events-none" />

      {/* Top Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-10">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-black to-[#434343] dark:from-white dark:to-[#a1a1a6] bg-clip-text text-transparent">
            ZariYo
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3182f6]/10 text-[#3182f6] font-medium">
            Console
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-[#86868b] dark:text-[#a1a1a6] hover:text-black dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#86868b] dark:text-[#a1a1a6] hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            로그아웃
          </button>
        </div>
      </header>

      {/* Main Selection Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 z-10">
        {children}
      </main>

      {/* Footer copyright */}
      <footer className="w-full text-center py-6 text-[10px] text-[#86868b] dark:text-[#48484a] border-t border-neutral-100 dark:border-neutral-900/50 mt-auto">
        © 2026 ZariYo. All rights reserved.
      </footer>
    </div>
  );
}
