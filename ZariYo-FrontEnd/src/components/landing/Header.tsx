import { Link } from 'react-router-dom';
import { LayoutGrid, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 dark:bg-[#0f1215]/70 border-b border-[var(--border-main)]/60 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7 h-7 rounded-none bg-gradient-to-tr from-[#000000] to-[#000000] flex items-center justify-center shadow-none">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-neutral-900 dark:text-white flex items-center">
            자리요 <span className="text-black dark:text-white font-mono text-[10px] ml-1.5 font-bold tracking-widest uppercase bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 px-1.5 py-0.5 rounded-[3px]">Console</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/owner" className="text-xs text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-extrabold">
            사장님 콘솔
          </Link>
          <Link to="/reserve" className="text-xs text-black dark:text-white font-extrabold hover:underline">
            테이블 키오스크
          </Link>
          <Link to="/about" className="text-xs text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-extrabold">
            이용 안내
          </Link>
        </nav>

        {/* CTA Header Button & Theme Toggle */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          <Link 
            to="/login" 
            className="text-xs text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-bold"
          >
            로그인
          </Link>
          <Link 
            to="/signup" 
            className="text-xs text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-bold"
          >
            회원가입
          </Link>
          <Link 
            to="/owner/dashboard"
            className="px-4.5 py-2 text-xs font-black text-white dark:text-black bg-black dark:bg-white hover:opacity-90 rounded-full cursor-pointer transition-all duration-200 shadow-none hover:scale-[1.03]"
          >
            관제 POS 바로가기
          </Link>
        </div>
      </div>
    </header>

  );
}


