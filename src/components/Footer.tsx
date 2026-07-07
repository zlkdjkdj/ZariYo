import { LayoutGrid } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#1c1c1e] py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Footer Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1c1c1e] border border-[#2c2c2e]/60 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-[#3182f6]" />
          </div>
          <span className="font-semibold text-sm text-[#f5f5f7] tracking-tight">자리요 (ZariYo)</span>
        </div>

        {/* Copyrights */}
        <p className="text-xs text-[#86868b]">
          © 2026 ZariYo. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#86868b] hover:text-white transition-colors text-xs">
            Github
          </a>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
          <a href="#privacy" className="text-[#86868b] hover:text-white transition-colors text-xs">
            개인정보처리방침
          </a>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
          <a href="#terms" className="text-[#86868b] hover:text-white transition-colors text-xs">
            이용약관
          </a>
        </div>
      </div>
    </footer>
  );
}
