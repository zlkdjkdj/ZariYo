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
        <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-none bg-white border border-neutral-200 dark:bg-white/5 dark:border-white/5 hover:bg-neutral-100 text-neutral-600 dark:text-neutral-300 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#000000]" />
            </button>
            <div className="text-left">
              <span className="text-[10px] font-extrabold text-[#000000] font-mono uppercase bg-[#000000]/10 px-2 py-0.5 rounded border border-[#000000]/20 tracking-wider">
                Store Gateway
              </span>
              <h1 className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">
                내 매장 선택하기
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/owner/store/new')}
            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90 flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>새로운 매장 등록</span>
          </button>
        </div>

        {/* Store List Cards */}
        <div className="w-full space-y-4">
          {stores.length === 0 ? (
            <div className="py-20 bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 p-8 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 mx-auto bg-neutral-100 dark:bg-white/10 flex items-center justify-center rounded-full">
                <Store className="w-6 h-6 text-neutral-400" />
              </div>
              <div>
                <h3 className="text-base font-black text-neutral-900 dark:text-white">등록된 매장이 없습니다</h3>
                <p className="text-xs text-neutral-500 mt-1">2D 매장 레이아웃 생성 마법사를 통해 나만의 첫 매장을 등록해 보세요!</p>
              </div>
              <button
                onClick={() => navigate('/owner/store/new')}
                className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs cursor-pointer inline-flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>나만의 첫 매장 2D 배치 등록하기</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stores.map((store, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectStore(store)}
                  className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-white/10 p-6 text-left space-y-4 hover:border-black dark:hover:border-white transition-all cursor-pointer group shadow-sm relative overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 dark:bg-white/10 flex items-center justify-center border border-neutral-200 dark:border-white/10 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">
                          OPERATING LIVE
                        </span>
                        <h3 className="text-lg font-black text-neutral-900 dark:text-white mt-0.5 group-hover:text-black dark:group-hover:text-white transition-colors">
                          {store.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-white/5 text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{store.address || '주소 미설정'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>영업시간: {store.weekdayStart} ~ {store.weekdayEnd}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-black dark:text-white group-hover:underline">
                      <span>관제 대시보드 진입</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}

              {/* Add New Store Tile */}
              <div
                onClick={() => navigate('/owner/store/new')}
                className="bg-neutral-50 dark:bg-white/[0.02] border-2 border-dashed border-neutral-300 dark:border-white/20 p-6 text-center flex flex-col items-center justify-center space-y-3 hover:border-black dark:hover:border-white transition-all cursor-pointer group min-h-[180px]"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 text-neutral-700 dark:text-white" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-neutral-900 dark:text-white">추가 매장 신규 등록</h4>
                  <p className="text-[11px] text-neutral-500 font-semibold mt-0.5">2D 배치도 빌더로 새로운 매장을 작성합니다</p>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </StartLayout>
  );
}
