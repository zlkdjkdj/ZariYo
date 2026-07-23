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
      className="group bg-white dark:bg-white/[0.01] border border-neutral-200 dark:border-white/5 rounded-none p-8 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-[#fcfdfe] hover:dark:bg-white/[0.03] hover:border-[#000000]/40 flex flex-col justify-between min-h-[250px] select-none shadow-none dark:shadow-none"
    >
      <div>
        <div className="w-11 h-11 rounded-none bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-white/50 mb-6 group-hover:bg-gradient-to-tr group-hover:from-[#000000] group-hover:to-[#000000] group-hover:text-white transition-all duration-300">
          <Icon className="w-5.5 h-5.5" />
        </div>
        <h2 className="text-lg font-extrabold text-neutral-900 dark:text-white mb-2.5">
          {title}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-bold">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-1 text-xs font-black text-[#000000] mt-6 group-hover:translate-x-1 transition-transform">
        {actionText}
        <span className="text-[14px]">→</span>
      </div>
    </div>
  );
}




