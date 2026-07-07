import { LayoutGrid } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Footer Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
            <LayoutGrid className="w-4.5 h-4.5 text-indigo-500" />
          </div>
          <span className="font-bold text-lg text-slate-200 tracking-tight">자리요 (ZariYo)</span>
        </div>

        {/* Copyrights */}
        <p className="text-xs text-slate-500">
          © 2026 ZariYo 스마트 오피스 예약 플랫폼. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors text-xs flex items-center gap-1">
            Github
          </a>
          <span className="w-1 h-1 rounded-full bg-slate-800" />
          <a href="#privacy" className="text-slate-500 hover:text-white transition-colors text-xs">
            개인정보처리방침
          </a>
          <span className="w-1 h-1 rounded-full bg-slate-800" />
          <a href="#terms" className="text-slate-500 hover:text-white transition-colors text-xs">
            이용약관
          </a>
        </div>
      </div>
    </footer>
  );
}
