import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { MenuOption, MenuManagementItem } from './MenuCardItem';

interface AddMenuFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMenu: (newItem: Omit<MenuManagementItem, 'id'>) => void;
}

export function AddMenuFormModal({
  isOpen,
  onClose,
  onAddMenu,
}: AddMenuFormModalProps) {
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuCategory, setNewMenuCategory] = useState('메인 요리');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [newMenuDesc, setNewMenuDesc] = useState('');
  const [newMenuImage, setNewMenuImage] = useState('/images/menu/steak.png');
  const [newMenuOptions, setNewMenuOptions] = useState<MenuOption[]>([]);
  const [tempOptionName, setTempOptionName] = useState('');
  const [tempOptionPrice, setTempOptionPrice] = useState('');

  if (!isOpen) return null;

  const handleAddTempOption = () => {
    if (!tempOptionName.trim()) return;
    setNewMenuOptions([
      ...newMenuOptions,
      { name: tempOptionName.trim(), extraPrice: Number(tempOptionPrice) || 0 }
    ]);
    setTempOptionName('');
    setTempOptionPrice('');
  };

  const handleRemoveOption = (index: number) => {
    setNewMenuOptions(newMenuOptions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuName || !newMenuPrice) return;

    onAddMenu({
      name: newMenuName,
      category: newMenuCategory,
      price: Number(newMenuPrice),
      image: newMenuImage,
      isSoldOut: false,
      description: newMenuDesc,
      options: newMenuOptions
    });

    // Reset & Close
    setNewMenuName('');
    setNewMenuPrice('');
    setNewMenuDesc('');
    setNewMenuOptions([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-none p-6 max-w-lg w-full text-left space-y-4 shadow-none max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-white/5">
          <h3 className="text-base font-black text-neutral-900 dark:text-white">신규 메뉴 및 커스텀 옵션 추가</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">메뉴 이름 *</label>
            <input 
              type="text"
              required
              placeholder="예: 트러플 버섯 리조또"
              value={newMenuName}
              onChange={(e) => setNewMenuName(e.target.value)}
              className="w-full px-3 py-2 rounded-none bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">카테고리</label>
              <select
                value={newMenuCategory}
                onChange={(e) => setNewMenuCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-none bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
              >
                <option value="메인 요리">메인 요리</option>
                <option value="사이드">사이드</option>
                <option value="음료/주류">음료/주류</option>
                <option value="디저트">디저트</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">판매 가격 (원) *</label>
              <input 
                type="number"
                required
                placeholder="예: 22000"
                value={newMenuPrice}
                onChange={(e) => setNewMenuPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-none bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">메뉴 이미지 샘플 선택</label>
            <div className="flex gap-2">
              {[
                { label: '스테이크', path: '/images/menu/steak.png' },
                { label: '파스타', path: '/images/menu/pasta.png' },
                { label: '피자', path: '/images/menu/pizza.png' },
                { label: '에이드', path: '/images/menu/ade.png' },
              ].map((img) => (
                <button
                  type="button"
                  key={img.path}
                  onClick={() => setNewMenuImage(img.path)}
                  className={`flex-1 py-1.5 rounded-none border text-[11px] font-bold cursor-pointer transition-all ${
                    newMenuImage === img.path 
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' 
                      : 'bg-neutral-50 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">메뉴 설명</label>
            <textarea 
              rows={2}
              placeholder="메뉴의 주요 재료와 맛의 특징을 기재해주세요..."
              value={newMenuDesc}
              onChange={(e) => setNewMenuDesc(e.target.value)}
              className="w-full px-3 py-2 rounded-none bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white resize-none"
            />
          </div>

          {/* Dynamic Option Input */}
          <div className="border-t border-neutral-100 dark:border-white/5 pt-3">
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-2">
              커스텀 옵션 등록 (곱빼기, 맵기, 토핑 추가금)
            </label>
            
            <div className="flex gap-2 mb-2">
              <input 
                type="text"
                placeholder="옵션명 (예: 곱빼기)"
                value={tempOptionName}
                onChange={(e) => setTempOptionName(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-semibold text-neutral-900 dark:text-white"
              />
              <input 
                type="number"
                placeholder="추가금 (예: 1500)"
                value={tempOptionPrice}
                onChange={(e) => setTempOptionPrice(e.target.value)}
                className="w-28 px-3 py-1.5 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-semibold text-neutral-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddTempOption}
                className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90"
              >
                + 등록
              </button>
            </div>

            {/* List of Temp Options */}
            {newMenuOptions.length > 0 && (
              <div className="space-y-1 mt-2">
                {newMenuOptions.map((opt, idx) => (
                  <div key={idx} className="flex justify-between items-center px-3 py-1.5 bg-neutral-100 dark:bg-white/5 text-xs">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">
                      +{opt.name} {opt.extraPrice > 0 ? `(+₩${opt.extraPrice.toLocaleString()})` : '(추가금 없음)'}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveOption(idx)}
                      className="text-neutral-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-none bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-extrabold text-xs cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-none bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90"
            >
              메뉴 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
