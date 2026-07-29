import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Plus, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { StartLayout } from '../../components/start/StartLayout';
import type { StoreInfo } from '../../types/store';

export function StoreSelectPage() {
  const navigate = useNavigate();
  const [stores, setStores] = useState<StoreInfo[]>([]);

  useEffect(() => {
    // 저장된 매장 정보 로드
    const saved = localStorage.getItem('zariyo_store_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStores([parsed]);
      } catch (e) {
        console.error('Failed to parse saved store info', e);
      }
    } else {
      // 기본 매장이 없을 경우
      setStores([]);
    }
  }, []);

  const handleSelectStore = (store: StoreInfo) => {
    localStorage.setItem('zariyo_current_store', JSON.stringify(store));
    alert(`[${store.name}] 매장 관제판으로 진입합니다.`);
    navigate('/owner/dashboard');
  };

  return (
    <StartLayout>
      <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn px-4 select-none">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2.5 rounded-[20px] bg-[#f7f7f7] dark:bg-white/10 border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#0381fe]" />
            </button>
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#0381fe] font-mono uppercase bg-[#0381fe]/10 px-3 py-1 rounded-[20px] border border-[#0381fe]/30 tracking-wider">
                SAMSUNG GATEWAY
              </span>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1 font-sans">
                내 매장 선택하기
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/owner/store/new')}
            className="h-[40px] px-5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs cursor-pointer hover:opacity-90 flex items-center gap-1.5 transition-all rounded-[20px] shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#0381fe]" />
            <span>새로운 매장 등록</span>
          </button>
        </div>

        {/* Store List Cards - Samsung 20px Rounded Media Card */}
        <div className="w-full space-y-4">
          {stores.length === 0 ? (
            <div className="py-20 bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 p-8 rounded-[20px] text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 mx-auto bg-[#f7f7f7] dark:bg-white/10 flex items-center justify-center rounded-[20px]">
                <Store className="w-6 h-6 text-[#0381fe]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white font-sans">등록된 매장이 없습니다</h3>
                <p className="text-xs text-[#707070] mt-1 font-normal">2D 매장 레이아웃 생성 마법사를 통해 나만의 첫 매장을 등록해 보세요!</p>
              </div>
              <button
                onClick={() => navigate('/owner/store/new')}
                className="h-[40px] px-6 bg-black text-white dark:bg-white dark:text-black font-bold text-xs cursor-pointer inline-flex items-center gap-2 hover:opacity-90 transition-all rounded-[20px] shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#0381fe]" />
                <span>첫 매장 2D 배치 등록하기</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stores.map((store, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectStore(store)}
                  className="bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 rounded-[20px] p-6 text-left space-y-4 hover:border-[#0381fe] dark:hover:border-[#0381fe] transition-all cursor-pointer group shadow-sm relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-[#f7f7f7] dark:bg-white/10 rounded-[20px] flex items-center justify-center border border-neutral-200 dark:border-white/10 group-hover:bg-[#0381fe] group-hover:text-white transition-colors">
                        <Store className="w-5 h-5 text-[#0381fe] group-hover:text-white" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-[20px]">
                          OPERATING LIVE
                        </span>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-0.5 font-sans">
                          {store.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-neutral-100 dark:border-white/5 text-xs text-[#707070] dark:text-neutral-400 font-normal">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0381fe] shrink-0" />
                      <span className="truncate">{store.address || '주소 미설정'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#0381fe] shrink-0" />
                      <span>영업시간: {store.weekdayStart} ~ {store.weekdayEnd}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0381fe] group-hover:underline">
                      <span>관제 대시보드 진입</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}

              {/* Add New Store Tile - Samsung 20px Pill Dotted Card */}
              <div
                onClick={() => navigate('/owner/store/new')}
                className="bg-[#f7f7f7] dark:bg-white/[0.02] border-2 border-dashed border-neutral-300 dark:border-white/20 rounded-[20px] p-6 text-center flex flex-col items-center justify-center space-y-3 hover:border-[#0381fe] transition-all cursor-pointer group min-h-[180px]"
              >
                <div className="w-11 h-11 rounded-[20px] bg-white dark:bg-white/10 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5 text-[#0381fe]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white font-sans">추가 매장 신규 등록</h4>
                  <p className="text-[11px] text-[#707070] font-normal mt-0.5">2D 배치도 빌더로 새로운 매장을 작성합니다</p>
                </div>
              </div>

            </div>
          )}
        </div>


      </div>
    </StartLayout>
  );
}
