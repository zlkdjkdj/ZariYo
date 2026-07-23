import type { LucideIcon } from 'lucide-react';

interface FeatureSpecCardProps {
  idx: number;
  name: string;
  desc: string;
  icon: LucideIcon;
}

export function FeatureSpecCard({ idx, name, desc, icon: Icon }: FeatureSpecCardProps) {
  return (
    <div className="p-6 rounded-[3px] bg-white dark:bg-[#111111] border border-neutral-300 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all flex items-start gap-5 shadow-none text-left">
      <div className="p-3 rounded-[3px] bg-black/5 dark:bg-white/10 text-black dark:text-white shrink-0 mt-0.5">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-neutral-500">#SPEC 0{idx + 1}</span>
          <h4 className="font-extrabold text-base text-black dark:text-white">{name}</h4>
        </div>
        <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 font-semibold leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
