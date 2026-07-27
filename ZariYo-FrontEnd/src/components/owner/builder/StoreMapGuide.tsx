import { MapPin, ShieldCheck } from 'lucide-react';
import { InteractiveStoreMap } from '../../common/InteractiveStoreMap';

interface StoreMapGuideProps {
  storeName: string;
  address?: string;
}

export function StoreMapGuide({ storeName, address = '서울특별시 강남구 테헤란로 123' }: StoreMapGuideProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/10 rounded-none p-6 flex flex-col justify-between min-h-[300px] select-none backdrop-blur-xl shadow-none">
      <div>
        <span className="text-[10px] font-extrabold text-[#000000] px-3 py-1 rounded-full bg-[#000000]/10 border border-[#000000]/20 mb-3 inline-block font-mono tracking-wider">
          GIS MAP SIMULATION
        </span>
        <h3 className="text-sm font-extrabold text-[#191f28] dark:text-white mb-1 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#000000]" />
          지점 실시간 맵핑 시뮬레이션
        </h3>
        <p className="text-xs text-[#4e5968] dark:text-neutral-400 font-semibold leading-relaxed mb-4">
          입력하신 주소를 실시간 해석하여 위경도 좌표 및 지점 마커 핀을 시뮬레이션합니다.
        </p>

        {/* Real Address Responsive Interactive Map Component */}
        <InteractiveStoreMap address={address} storeName={storeName} />
      </div>

      <div className="mt-4 p-3.5 rounded-none bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 flex gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-[#4e5968] dark:text-neutral-400 font-bold">
          입력하신 주소지는 키오스크 고객 2D 위치 및 배달 라이더 수선서에 실시간 동기화됩니다.
        </p>
      </div>
    </div>
  );
}
