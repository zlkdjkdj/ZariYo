import { Link } from 'react-router-dom';
import { LayoutGrid, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/60 border-b border-neutral-200/50 dark:border-white/5 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#3182f6] to-[#4894fe] flex items-center justify-center shadow-[0_4px_12px_rgba(49,130,246,0.25)]">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-neutral-900 dark:text-white flex items-center">
            자리요 <span className="text-[#3182f6] font-mono text-[10px] ml-1.5 font-bold tracking-widest uppercase bg-[#3182f6]/10 px-1.5 py-0.5 rounded">Console</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/owner" className="text-xs text-neutral-600 hover:text-[#3182f6] dark:text-white/60 dark:hover:text-white transition-colors duration-200 font-extrabold">
            사장님 콘솔
          </Link>
          <Link to="/reserve" className="text-xs text-[#3182f6] font-extrabold hover:underline">
            테이블 키오스크
          </Link>
          <Link to="/about" className="text-xs text-neutral-600 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors duration-200 font-bold">
            이용 안내
          </Link>
        </nav>

        {/* CTA Header Button & Theme Toggle */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-600 dark:text-white/60 hover:text-black dark:hover:text-white transition-all cursor-pointer"
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
            className="text-xs text-neutral-600 hover:text-[#3182f6] dark:text-white/60 dark:hover:text-[#3182f6] transition-colors duration-200 font-bold"
          >
            로그인
          </Link>
          <Link 
            to="/signup" 
            className="text-xs text-neutral-600 hover:text-[#3182f6] dark:text-white/60 dark:hover:text-[#3182f6] transition-colors duration-200 font-bold"
          >
            회원가입
          </Link>
          <Link 
            to="/owner/dashboard"
            className="px-4.5 py-2 text-xs font-black text-white bg-gradient-to-r from-[#3182f6] to-[#4894fe] hover:opacity-90 rounded-full cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(49,130,246,0.25)] hover:scale-[1.03]"
          >
            관제 POS 바로가기
          </Link>
        </div>
      </div>
    </header>

  );
}


