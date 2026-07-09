import { Link } from 'react-router-dom';
import { LayoutGrid, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#f9fafb]/75 dark:bg-black/60 border-b border-[#f2f4f6] dark:border-neutral-800/40 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#3182f6] to-[#4894fe] flex items-center justify-center shadow-[0_4px_12px_rgba(49,130,246,0.25)]">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-[#191f28] dark:text-white flex items-center">
            자리요 <span className="text-[#3182f6] dark:text-[#3182f6] font-mono text-[10px] ml-1.5 font-bold tracking-widest uppercase bg-[#3182f6]/10 dark:bg-[#3182f6]/15 px-1.5 py-0.5 rounded">Console</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-xs text-[#4e5968] hover:text-[#191f28] dark:text-[#a1a1a6] dark:hover:text-white transition-colors duration-200 font-bold">서비스 특징</a>
          <a href="#architecture" className="text-xs text-[#4e5968] hover:text-[#191f28] dark:text-[#a1a1a6] dark:hover:text-white transition-colors duration-200 font-bold">기술 스택</a>
          <Link to="/about" className="text-xs text-[#4e5968] hover:text-[#191f28] dark:text-[#a1a1a6] dark:hover:text-white transition-colors duration-200 font-bold">이용 안내</Link>
        </nav>

        {/* CTA Header Button & Theme Toggle */}
        <div className="flex items-center gap-5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:text-[#191f28] dark:hover:text-white transition-all cursor-pointer"
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
            className="text-xs text-[#4e5968] hover:text-[#3182f6] dark:text-[#a1a1a6] dark:hover:text-[#3182f6] transition-colors duration-200 font-bold"
          >
            로그인
          </Link>
          <Link 
            to="/signup" 
            className="text-xs text-[#4e5968] hover:text-[#3182f6] dark:text-[#a1a1a6] dark:hover:text-[#3182f6] transition-colors duration-200 font-bold"
          >
            회원가입
          </Link>
          <button 
            onClick={() => window.location.href = '/owner/dashboard'}
            className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#3182f6] to-[#4894fe] hover:opacity-90 rounded-full cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(49,130,246,0.25)] hover:scale-[1.03]"
          >
            콘솔 바로가기
          </button>
        </div>
      </div>
    </header>
  );
}

