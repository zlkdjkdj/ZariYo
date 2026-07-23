export function Footer() {
  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#030303] border-t border-neutral-200 dark:border-white/5 py-12 text-center text-xs text-neutral-500 dark:text-white/40 select-none transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 font-semibold flex flex-col items-center gap-4">
        <div>
          <p>&copy; {new Date().getFullYear()} ZariYo Dynamic Space Console. All rights reserved.</p>
          <p className="mt-1 text-neutral-400 dark:text-white/30 text-[10px]">
            Designed with Apple Feature Block concept. Powered by React, Redis & Spring Boot.
          </p>
        </div>

        {/* Social / Policy Links */}
        <div className="flex items-center gap-4 text-xs">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors text-[10px]">
            Github
          </a>
          <span className="w-1 h-1 rounded-full bg-[#3182f6]" />
          <a href="#privacy" className="text-neutral-500 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors text-[10px]">
            개인정보처리방침
          </a>
          <span className="w-1 h-1 rounded-full bg-[#3182f6]" />
          <a href="#terms" className="text-neutral-500 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors text-[10px]">
            이용약관
          </a>
        </div>
        
        <div className="text-[9px] text-neutral-400 dark:text-white/20 font-mono">
          CONCURRENT TRANSACTION LATENCY: ~0.5ms | REDISSON LOCK CLUSTER ACTIVE
        </div>
      </div>
    </footer>
  );
}


