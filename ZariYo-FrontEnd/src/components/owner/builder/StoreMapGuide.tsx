import { MapPin, Store, ShieldCheck } from 'lucide-react';

interface StoreMapGuideProps {
  storeName: string;
}

export function StoreMapGuide({ storeName }: StoreMapGuideProps) {
  return (
    <div className="lg:col-span-2 bg-neutral-900/40 border border-white/10 rounded-2xl p-7 flex flex-col justify-between min-h-[300px] select-none backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div>
        <span className="text-[10px] font-extrabold text-[#ff153c] px-3 py-1 rounded-full bg-[#e50914]/10 border border-[#e50914]/20 mb-4 inline-block font-mono tracking-wider">
          GEOLOCATION FEEDBACK
        </span>
        <h3 className="text-sm font-extrabold text-white mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#e50914]" />
          지점 맵핑 시뮬레이션
        </h3>
        <p className="text-xs text-neutral-400 font-semibold leading-relaxed mb-6">
          입력하신 상세 주소지를 해석해 기하학적 좌표 구조의 가상 지도 핀으로 선점합니다.
        </p>

        {/* Mock Map Layout Graphic */}
        <div className="w-full h-48 bg-black/60 rounded-xl border border-white/5 relative flex items-center justify-center overflow-hidden">
          {/* Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          {/* Map pin with red pulse glows */}
          <div className="relative flex flex-col items-center z-10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e50914] to-[#ff153c] text-white flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.5)] animate-bounce">
              <Store className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-white bg-neutral-900 border border-white/10 px-3 py-1 rounded-full mt-3 shadow-lg">
              {storeName || '나의 ZariYo 매장'}
            </span>
          </div>
          <div className="absolute bottom-2.5 right-2.5 text-[8px] text-neutral-500 bg-black/60 border border-white/5 px-2 py-0.5 rounded-full font-mono">
            Mapbox Engine API
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5 flex gap-2.5">
        <ShieldCheck className="w-5 h-5 text-[#ff153c] shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-neutral-400 font-bold">
          분산 트래픽 락을 획득하는 과정에서 중복 예약을 원천 방지하기 위해 5분 선점 잠금(distributed lock) 정책이 탑재되어 있습니다.
        </p>
      </div>
    </div>
  );
}
