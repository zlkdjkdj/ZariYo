import { LayoutGrid } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-[#2c2c2e]/40 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <LayoutGrid className="w-4 h-4 text-white group-hover:text-[#3182f6] transition-colors" />
          <span className="font-semibold text-sm tracking-tight text-white">
            자리요 <span className="text-[#86868b] font-normal text-xs ml-1">ZariYo</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-xs text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-200 font-normal">서비스 특징</a>
          <a href="#architecture" className="text-xs text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-200 font-normal">기술 스택</a>
          <a href="#about" className="text-xs text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-200 font-normal">이용 안내</a>
          <a href="#support" className="text-xs text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-200 font-normal">고객지원</a>
        </nav>

        {/* CTA Header Button */}
        <div className="flex items-center">
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
