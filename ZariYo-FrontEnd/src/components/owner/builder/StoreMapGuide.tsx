import { MapPin, Store, ShieldCheck } from 'lucide-react';

interface StoreMapGuideProps {
  storeName: string;
}

export function StoreMapGuide({ storeName }: StoreMapGuideProps) {
  return (
    <div className="lg:col-span-2 bg-[#f5f5f7]/60 dark:bg-[#1c1c1e]/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-3xl p-8 flex flex-col justify-between min-h-[300px]">
      <div>
        <span className="text-[10px] font-bold text-[#3182f6] px-2 py-0.5 rounded-full bg-[#3182f6]/10 mb-4 inline-block">
          PREVIEW GUIDE
        </span>
        <h3 className="text-lg font-bold text-black dark:text-white mb-2 flex items-center gap-1.5">
          <MapPin className="w-5 h-5 text-red-500" />
          지도로 보는 매장 주소
        </h3>
        <p className="text-xs text-neutral-500 dark:text-[#a1a1a6] leading-relaxed mb-6">
          입력된 주소를 토대로 매장 주변 기물 및 지도가 활성화됩니다.
        </p>

        {/* Mock Map Layout Graphic */}
        <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-900 rounded-2xl border border-neutral-300 dark:border-neutral-800 relative flex items-center justify-center overflow-hidden">
          {/* Grid Lines for style */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          {/* Mock Map pin decoration */}
          <div className="relative flex flex-col items-center z-10">
            <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white animate-bounce shadow-md">
              <Store className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 rounded-md mt-2 shadow-sm">
              {storeName || '나의 ZariYo 매장'}
            </span>
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] text-neutral-400 bg-neutral-100/80 dark:bg-black/60 px-1.5 py-0.5 rounded">
            Mockup Map API
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/30">
        <div className="flex gap-2">
          <ShieldCheck className="w-5 h-5 text-[#3182f6] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-normal text-neutral-500 dark:text-[#a1a1a6]">
            ZariYo는 사장님들의 소중한 고객 좌석 점유 데이터를 Redisson 분산 락 구조로 안전하게 제어하여, 동시성 오류 및 예약을 사전 차단합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
