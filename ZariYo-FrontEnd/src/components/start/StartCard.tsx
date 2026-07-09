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
      className="group bg-white dark:bg-neutral-900/40 backdrop-blur-xl border border-[#f2f4f6] dark:border-neutral-800 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-[#f9fafb] dark:hover:bg-neutral-850 hover:border-[#3182f6]/40 dark:hover:border-[#3182f6]/40 flex flex-col justify-between min-h-[250px] select-none shadow-[0_10px_30px_rgba(0,0,0,0.015)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
    >
      <div>
        <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 flex items-center justify-center text-[#191f28] dark:text-white mb-6 group-hover:bg-gradient-to-tr group-hover:from-[#3182f6] group-hover:to-[#4894fe] group-hover:text-white transition-all duration-300">
          <Icon className="w-5.5 h-5.5" />
        </div>
        <h2 className="text-lg font-extrabold text-[#191f28] dark:text-white mb-2.5">
          {title}
        </h2>
        <p className="text-xs text-[#4e5968] dark:text-neutral-400 leading-relaxed font-bold">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-1 text-xs font-black text-[#3182f6] mt-6 group-hover:translate-x-1 transition-transform">
        {actionText}
        <span className="text-[14px]">→</span>
      </div>
    </div>
  );
}


