import { Link } from 'react-router-dom';
import { LayoutGrid, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/75 dark:bg-black/70 border-b border-[#e5e5e7]/80 dark:border-[#2c2c2e]/40 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <LayoutGrid className="w-4 h-4 text-black dark:text-white group-hover:text-[#3182f6] transition-colors" />
          <span className="font-semibold text-sm tracking-tight text-black dark:text-white">
            자리요 <span className="text-[#86868b] font-normal text-xs ml-1">ZariYo</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-xs text-[#86868b] hover:text-black dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] transition-colors duration-200 font-normal">서비스 특징</a>
          <a href="#architecture" className="text-xs text-[#86868b] hover:text-black dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] transition-colors duration-200 font-normal">기술 스택</a>
          <a href="#about" className="text-xs text-[#86868b] hover:text-black dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] transition-colors duration-200 font-normal">이용 안내</a>
          <a href="#support" className="text-xs text-[#86868b] hover:text-black dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] transition-colors duration-200 font-normal">고객지원</a>
        </nav>

        {/* CTA Header Button & Theme Toggle */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer text-[#86868b] hover:text-black dark:hover:text-white"
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
            className="text-xs text-[#86868b] hover:text-black dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] transition-colors duration-200 font-medium"
          >
            로그인
          </Link>
          <Link 
            to="/signup" 
            className="text-xs text-[#86868b] hover:text-black dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] transition-colors duration-200 font-medium"
          >
            회원가입
          </Link>
          <button 
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#3182f6] hover:bg-[#1b64da] rounded-full cursor-pointer transition-all duration-200 shadow-sm"
          >
            대시보드 바로가기
          </button>
        </div>
      </div>
    </header>
  );
}
