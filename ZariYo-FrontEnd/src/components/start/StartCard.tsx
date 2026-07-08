import React from 'react';

interface StartCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  actionText: string;
}

export function StartCard({ title, description, icon: Icon, onClick, actionText }: StartCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-[#f5f5f7]/50 dark:bg-[#1c1c1e]/50 border border-neutral-200/60 dark:border-neutral-800/80 rounded-3xl p-8 md:p-10 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white dark:hover:bg-neutral-900/60 hover:border-[#3182f6] dark:hover:border-[#3182f6] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.01)] flex flex-col justify-between min-h-[260px] select-none"
    >
      <div>
        <div className="w-12 h-12 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white mb-6 group-hover:bg-[#3182f6] group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-black dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-xs md:text-sm text-[#86868b] dark:text-[#a1a1a6] leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold text-[#3182f6] mt-6 group-hover:translate-x-1 transition-transform">
        {actionText}
        <span className="text-[14px]">→</span>
      </div>
    </div>
  );
}
