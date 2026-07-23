import { useState } from 'react';
import { ConsoleSidebar } from '../../components/owner/ConsoleSidebar';
import { 
  UtensilsCrossed, Plus, Trash2, 
  ToggleLeft, ToggleRight, X, Image as ImageIcon, PlusCircle 
} from 'lucide-react';

interface MenuOption {
  name: string;
  extraPrice: number;
}

interface MenuManagementItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isSoldOut: boolean;
  description: string;
  options?: MenuOption[];
}

export function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuManagementItem[]>([
    { 
      id: 'm1', 
      name: '토마호크 스테이크', 
      category: '메인 요리', 
      price: 48000, 
      image: '/images/menu/steak.png', 
      isSoldOut: false, 
      description: '참나무 장작으로 구워낸 고소하고 부드러운 고급 토마호크 스테이크',
      options: [
        { name: '굽기 선택 (미디엄/웰던)', extraPrice: 0 },
        { name: '고기 사이즈 업그레이드 (+100g)', extraPrice: 12000 }
      ]
    },
    { 
      id: 'm2', 
      name: '트러플 크림 파스타', 
      category: '메인 요리', 
      price: 18000, 
      image: '/images/menu/pasta.png', 
      isSoldOut: false, 
      description: '생 트러플 풍미가 그윽한 페투치네 농축 파스타',
      options: [
        { name: '곱빼기 (면 추가)', extraPrice: 3000 },
        { name: '트러플 오일 추가', extraPrice: 2000 }
      ]
    },
    { 
      id: 'm3', 
      name: '화덕 마르게리타 피자', 
      category: '메인 요리', 
      price: 18000, 
      image: '/images/menu/pizza.png', 
      isSoldOut: true, 
      description: '이탈리아산 생 모짜렐라와 바질 향이 일품인 참나무 화덕 피자',
      options: [
        { name: '생 모짜렐라 치즈 추가', extraPrice: 2500 }
      ]
    },
    { 
      id: 'm4', 
      name: '시그니처 수제 에이드', 
      category: '음료/주류', 
      price: 7000, 
      image: '/images/menu/drink.png', 
      isSoldOut: false, 
      description: '자몽과 샬롯 과육이 살아있는 시원한 탄산 수제 에이드',
      options: [
        { name: '탄산수 샷 추가', extraPrice: 1000 }
      ]
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [newMenuCategory, setNewMenuCategory] = useState('메인 요리');
  const [newMenuDesc, setNewMenuDesc] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // 옵션 등록 상태
  const [optionsList, setOptionsList] = useState<MenuOption[]>([]);
  const [optNameInput, setOptNameInput] = useState('');
  const [optPriceInput, setOptPriceInput] = useState('');

  // 이미지 파일 업로드 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  // 옵션 추가
  const handleAddOption = () => {
    if (!optNameInput) return;
    const price = parseInt(optPriceInput, 10) || 0;
    setOptionsList(prev => [...prev, { name: optNameInput, extraPrice: price }]);
    setOptNameInput('');
    setOptPriceInput('');
  };

  const handleRemoveOption = (index: number) => {
    setOptionsList(prev => prev.filter((_, idx) => idx !== index));
  };

  const toggleSoldOut = (id: string) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, isSoldOut: !item.isSoldOut } : item));
  };

  const handleAddMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuName || !newMenuPrice) return;
    const newItem: MenuManagementItem = {
      id: `m-${Date.now()}`,
      name: newMenuName,
      category: newMenuCategory,
      price: parseInt(newMenuPrice, 10),
      image: uploadedImage || '/images/menu/steak.png',
      isSoldOut: false,
      description: newMenuDesc || '신규 등록된 세프의 특선 메뉴입니다.',
      options: optionsList.length > 0 ? optionsList : undefined
    };
    setMenuItems(prev => [...prev, newItem]);
    
    // 리셋
    setNewMenuName('');
    setNewMenuPrice('');
    setNewMenuDesc('');
    setUploadedImage(null);
    setOptionsList([]);
    setIsAddModalOpen(false);
    alert(`신규 메뉴 [${newMenuName}]이(가) 옵션과 함께 등록되었습니다.`);
  };

  const handleDeleteMenu = (id: string, name: string) => {
    if (confirm(`정말로 메뉴 [${name}]을(를) 삭제하시겠습니까?`)) {
      setMenuItems(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="flex bg-slate-50 dark:bg-[#030303] text-neutral-900 dark:text-[#f5f5f7] font-sans min-h-screen transition-colors duration-300">
      
      {/* Universal Sidebar */}
      <ConsoleSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200 dark:border-white/5 select-none">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3182f6]/10 text-[#3182f6] text-[10px] font-bold font-mono mb-2">
              <UtensilsCrossed className="w-3.5 h-3.5" /> SMART MENU & OPTION MANAGEMENT
            </div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white">메뉴 옵션 & 재고/사진 관리</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold mt-1">
              음식 사진 직접 업로드 및 곱빼기/토핑 추가 옵션을 자유롭게 설정하여 손님 키오스크에 제공합니다.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-[#3182f6] hover:bg-[#286fd7] text-white text-xs font-black cursor-pointer shadow-md transition-all select-none"
          >
            <Plus className="w-4 h-4" />
            신규 메뉴 & 옵션 등록하기
          </button>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
          {menuItems.map((menu) => (
            <div 
              key={menu.id} 
              className={`bg-white dark:bg-[#09090b] border rounded-3xl p-6 shadow-md transition-all relative overflow-hidden flex flex-col justify-between ${
                menu.isSoldOut 
                  ? 'border-red-500/30 opacity-70' 
                  : 'border-neutral-200 dark:border-white/5 hover:border-[#3182f6]/40'
              }`}
            >
              {/* Sold Out Watermark Badge */}
              {menu.isSoldOut && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-black font-mono px-2 py-0.5 rounded-full z-10">
                  SOLD OUT (품절)
                </div>
              )}

              <div>
                <div className="flex gap-4 items-start mb-4">
                  <img src={menu.image} alt={menu.name} className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-neutral-200 dark:border-white/5 shadow-sm" />
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-[#3182f6] font-mono bg-[#3182f6]/10 px-2 py-0.5 rounded-full">
                      {menu.category}
                    </span>
                    <h3 className="text-base font-black text-neutral-900 dark:text-white mt-1">{menu.name}</h3>
                    <p className="text-xs font-black text-neutral-800 dark:text-neutral-200 mt-1">₩ {menu.price.toLocaleString()}</p>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 font-semibold leading-relaxed text-left line-clamp-2 mb-3">
                  {menu.description}
                </p>

                {/* Display Registered Options */}
                {menu.options && menu.options.length > 0 && (
                  <div className="mb-4 text-left border-t border-neutral-100 dark:border-white/5 pt-3">
                    <span className="text-[10px] font-extrabold text-neutral-400 block mb-1.5">선택 가능 옵션:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {menu.options.map((opt, idx) => (
                        <span key={idx} className="text-[9.5px] font-bold text-[#3182f6] bg-[#3182f6]/10 px-2 py-0.5 rounded-lg border border-[#3182f6]/20">
                          +{opt.name} {opt.extraPrice > 0 ? `(+₩${opt.extraPrice.toLocaleString()})` : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Controls Footer */}
              <div className="pt-4 border-t border-neutral-200 dark:border-white/5 flex items-center justify-between">
                <button
                  onClick={() => toggleSoldOut(menu.id)}
                  className="flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-colors"
                >
                  {menu.isSoldOut ? (
                    <ToggleRight className="w-6 h-6 text-red-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-emerald-500" />
                  )}
                  <span className={menu.isSoldOut ? 'text-red-500' : 'text-emerald-500'}>
                    {menu.isSoldOut ? '품절 상태' : '판매 중'}
                  </span>
                </button>

                <button
                  onClick={() => handleDeleteMenu(menu.id, menu.name)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-500/10 cursor-pointer transition-all"
                  title="메뉴 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* Add New Menu Modal with Photo Upload & Options Generator */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative text-left max-h-[90vh] overflow-y-auto scrollbar-hide">
            
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-1">
              신규 메뉴 & 옵션 등록
            </h3>
            <p className="text-xs text-neutral-400 font-bold mb-6">
              메뉴 사진 직접 업로드 및 곱빼기/토핑 추가 옵션을 설정하세요.
            </p>

            <form onSubmit={handleAddMenuSubmit} className="space-y-4">
              
              {/* Photo Upload Area */}
              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1.5">
                  메뉴 대표 사진 업로드
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-neutral-400" />
                    )}
                  </div>

                  <label className="flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-white/10 hover:border-[#3182f6] cursor-pointer transition-all bg-neutral-50 dark:bg-white/[0.01]">
                    <span className="text-xs font-bold text-[#3182f6]">이미지 파일 선택</span>
                    <span className="text-[10px] text-neutral-400 mt-0.5 font-semibold">JPG, PNG 파일 지원</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {/* Menu Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">메뉴 이름</label>
                  <input
                    type="text"
                    placeholder="예: 트러플 리조또"
                    value={newMenuName}
                    onChange={(e) => setNewMenuName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold focus:outline-none focus:border-[#3182f6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">판매 단가 (KRW)</label>
                  <input
                    type="number"
                    placeholder="22000"
                    value={newMenuPrice}
                    onChange={(e) => setNewMenuPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold focus:outline-none focus:border-[#3182f6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">카테고리</label>
                <select
                  value={newMenuCategory}
                  onChange={(e) => setNewMenuCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold focus:outline-none focus:border-[#3182f6]"
                >
                  <option value="메인 요리">메인 요리</option>
                  <option value="사이드 메뉴">사이드 메뉴</option>
                  <option value="음료/주류">음료/주류</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1">메뉴 설명</label>
                <textarea
                  placeholder="메뉴에 대한 풍미와 재료 설명을 기입하세요."
                  value={newMenuDesc}
                  onChange={(e) => setNewMenuDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold focus:outline-none focus:border-[#3182f6] h-16 resize-none"
                />
              </div>

              {/* Options Generator Section */}
              <div className="border-t border-neutral-200 dark:border-white/5 pt-4">
                <label className="block text-xs font-bold text-[#3182f6] mb-2 flex items-center gap-1">
                  <PlusCircle className="w-3.5 h-3.5" /> 선택 옵션 추가 (곱빼기, 토핑 등)
                </label>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="옵션명 (예: 곱빼기)"
                    value={optNameInput}
                    onChange={(e) => setOptNameInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="추가금액 (예: 2000)"
                    value={optPriceInput}
                    onChange={(e) => setOptPriceInput(e.target.value)}
                    className="w-28 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="px-3 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-bold cursor-pointer"
                  >
                    추가
                  </button>
                </div>

                {/* List of created options */}
                <div className="flex flex-wrap gap-1.5">
                  {optionsList.map((opt, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <span>+{opt.name} (+₩{opt.extraPrice.toLocaleString()})</span>
                      <button type="button" onClick={() => handleRemoveOption(idx)} className="hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#3182f6] hover:bg-[#286fd7] text-white text-xs font-extrabold cursor-pointer shadow-md transition-all mt-4"
              >
                메뉴 및 옵션 최종 등록
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
