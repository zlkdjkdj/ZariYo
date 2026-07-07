import { LayoutGrid } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#030712]/75 border-b border-slate-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <LayoutGrid className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            자리요 <span className="text-indigo-400 font-medium text-sm ml-0.5">ZariYo</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium">서비스 특징</a>
          <a href="#architecture" className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium">기술 스택</a>
          <a href="#about" className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium">이용 안내</a>
          <a href="#support" className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium">고객지원</a>
        </nav>

        {/* CTA Header Button */}
        <div className="flex items-center gap-4">
          <button 
            className="px-4.5 py-2 text-xs font-semibold text-indigo-400 hover:text-white border border-indigo-500/30 hover:border-indigo-500 bg-indigo-500/5 hover:bg-indigo-500 rounded-lg cursor-pointer transition-all duration-300"
          >
            대시보드 바로가기
          </button>
        </div>
      </div>
    </header>
  );
}
