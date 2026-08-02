import type { LucideIcon } from 'lucide-react';

interface FeatureSpecCardProps {
  idx: number;
  name: string;
  desc: string;
  icon: LucideIcon;
}

export function FeatureSpecCard({ idx, name, desc, icon: Icon }: FeatureSpecCardProps) {
  return (
    <div className="p-6 rounded-[20px] bg-[#ffffff] border border-[#dddddd] hover:border-[#0381fe] transition-all flex items-start gap-5 shadow-none text-left">
      <div className="p-3 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] shrink-0 mt-0.5">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-[#707070]">#SPEC 0{idx + 1}</span>
          <h4 className="font-bold text-base text-[#000000]">{name}</h4>
        </div>
        <p className="text-xs md:text-sm text-[#707070] font-normal leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

