import { LayoutGrid } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#101012] border-t border-[#f2f4f6] dark:border-white/5 py-16 px-6 relative z-10 transition-colors duration-300 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Footer Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#3182f6] to-[#4894fe] flex items-center justify-center shadow-[0_4px_12px_rgba(49,130,246,0.2)]">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm text-[#191f28] dark:text-white tracking-tight">자리요 (ZariYo)</span>
        </div>

        {/* Copyrights */}
        <p className="text-[10px] text-neutral-500 font-semibold font-mono">
          © 2026 ZariYo. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-neutral-450 hover:text-[#191f28] dark:hover:text-white transition-colors text-[10px]">
            Github
          </a>
          <span className="w-1 h-1 rounded-full bg-[#3182f6]" />
          <a href="#privacy" className="text-neutral-450 hover:text-[#191f28] dark:hover:text-white transition-colors text-[10px]">
            개인정보처리방침
          </a>
          <span className="w-1 h-1 rounded-full bg-[#3182f6]" />
          <a href="#terms" className="text-neutral-450 hover:text-[#191f28] dark:hover:text-white transition-colors text-[10px]">
            이용약관
          </a>
        </div>
      </div>
    </footer>
  );
}
