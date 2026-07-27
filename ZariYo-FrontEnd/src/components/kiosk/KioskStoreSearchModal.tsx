import { useState, useEffect } from 'react';
import { Search, Store, MapPin, ChevronRight, Sparkles, X } from 'lucide-react';
import { storeApi } from '../../api/storeApi';

interface StoreItem {
  id: number;
  name: string;
  address: string;
  category: string;
}

interface KioskStoreSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStore: (store: StoreItem) => void;
}

export function KioskStoreSearchModal({ isOpen, onClose, onSelectStore }: KioskStoreSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 백엔드 DB 및 로컬스토리지 저장 매장 동적 로드
  useEffect(() => {
    if (!isOpen) return;

    const loadStoresList = async () => {
      setIsLoading(true);
      try {
        const backendStores = await storeApi.getStoresByOwner(1);
        if (backendStores && backendStores.length > 0) {
          const mapped: StoreItem[] = backendStores.map((s: any) => ({
            id: s.id,
            name: s.name,
            address: s.address || '서울특별시 강남구 테헤란로 123',
            category: s.category || '다이닝 & 펍',
          }));
          setStores(mapped);
        } else {
          // 백엔드 연결 전 로컬스토리지 저장 매장 및 표준 매장 로드
          const localSaved = localStorage.getItem('zariyo_store_info');
          const localObj = localSaved ? JSON.parse(localSaved) : null;
          const defaultList: StoreItem[] = [
            { id: 1, name: localObj?.name || '내 매장', address: localObj?.address || '매장 주소', category: '프리미엄 세션 & 펍' },
            { id: 2, name: 'ZariYo 부산 해운대점', address: '부산광역시 해운대구 우동 100', category: '해산물 다이닝 & 라운지' },
            { id: 3, name: 'ZariYo 대구 동성로점', address: '대구광역시 중구 동성로 50', category: '카페 & 디저트 펍' },
          ];
          setStores(defaultList);
        }
      } catch (err) {
        console.warn('Store API Search fallback to local list:', err);
        const localSaved = localStorage.getItem('zariyo_store_info');
        const localObj = localSaved ? JSON.parse(localSaved) : null;
        setStores([
          { id: 1, name: localObj?.name || '내 매장', address: localObj?.address || '매장 주소', category: '프리미엄 세션 & 펍' },
          { id: 2, name: 'ZariYo 부산 해운대점', address: '부산광역시 해운대구 우동 100', category: '해산물 다이닝 & 라운지' },
          { id: 3, name: 'ZariYo 대구 동성로점', address: '대구광역시 중구 동성로 50', category: '카페 & 디저트 펍' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoresList();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-[#09090b] border border-neutral-800 rounded-none w-full max-w-lg p-6 text-white space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500 text-black font-black">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  STEP 2. STORE SELECTION
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              </div>
              <h3 className="text-lg font-black mt-0.5">방문 매장 검색 및 선택</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="매장명 또는 주소 검색 (예: 강남, 해운대, ZariYo)"
            className="w-full pl-11 pr-4 py-3 bg-[#111115] border border-white/10 rounded-none text-white text-sm font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            autoFocus
          />
        </div>

        {/* Stores List Container */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {isLoading ? (
            <div className="py-12 text-center text-xs font-mono text-neutral-400 animate-pulse">
              백엔드 DB 매장 데이터 로딩 중...
            </div>
          ) : filteredStores.length === 0 ? (
            <div className="py-12 text-center text-xs font-semibold text-neutral-500">
              일치하는 매장이 없습니다. 검색어를 확인해 주세요.
            </div>
          ) : (
            filteredStores.map((store) => (
              <div
                key={store.id}
                onClick={() => onSelectStore(store)}
                className="p-4 bg-[#111115] hover:bg-[#18181f] border border-white/10 hover:border-amber-400/50 rounded-none transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {store.category}
                    </span>
                    <h4 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors truncate">
                      {store.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-semibold truncate">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="truncate">{store.address}</span>
                  </div>
                </div>

                <div className="p-2 bg-white/5 group-hover:bg-amber-400 group-hover:text-black text-neutral-400 transition-all shrink-0 ml-3">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <p className="text-[11px] text-neutral-500 text-center font-semibold border-t border-white/10 pt-3">
          매장을 선택하시면 해당 매장의 2D 좌석 뷰어 및 실시간 메뉴판으로 이동합니다.
        </p>

      </div>
    </div>
  );
}
