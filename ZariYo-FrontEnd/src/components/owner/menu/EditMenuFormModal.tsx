import { useState, useEffect } from 'react';
import { X, Save, ImageIcon, DollarSign, Type, AlignLeft } from 'lucide-react';
import type { MenuManagementItem } from './MenuCardItem';
import { ImageDropzone } from './ImageDropzone';

interface EditMenuFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: MenuManagementItem | null;
  onUpdateMenu: (updated: MenuManagementItem) => void;
}

export function EditMenuFormModal({ isOpen, onClose, menu, onUpdateMenu }: EditMenuFormModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('메인 요리');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    if (menu) {
      setName(menu.name);
      setCategory(menu.category);
      setPrice(menu.price);
      setDescription(menu.description);
      setImage(menu.image || '');
      setIsSoldOut(menu.isSoldOut);
    }
  }, [menu]);

  if (!isOpen || !menu) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('메뉴 이름을 입력해 주세요.');
      return;
    }
    const updated: MenuManagementItem = {
      ...menu,
      name,
      category,
      price: Number(price),
      description,
      image: image.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop',
      isSoldOut,
    };
    onUpdateMenu(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/10 rounded-none w-full max-w-lg p-6 text-neutral-900 dark:text-white space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-mono font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              EDIT MENU ITEM
            </span>
            <h3 className="text-xl font-black mt-1">메뉴 정보 및 이미지 수정</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          
          {/* Menu Name */}
          <div className="space-y-1">
            <label className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-extrabold">
              <Type className="w-3.5 h-3.5 text-emerald-500" />
              <span>메뉴 명칭</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#111115] border border-neutral-300 dark:border-white/10 rounded-none text-neutral-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-neutral-500 dark:text-neutral-400 font-extrabold">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#111115] border border-neutral-300 dark:border-white/10 rounded-none text-neutral-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
              >
                <option value="메인 요리">메인 요리</option>
                <option value="사이드">사이드</option>
                <option value="음료/주류">음료/주류</option>
                <option value="디저트">디저트</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-extrabold">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>가격 (원)</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#111115] border border-neutral-300 dark:border-white/10 rounded-none text-neutral-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-extrabold">
              <AlignLeft className="w-3.5 h-3.5 text-emerald-500" />
              <span>메뉴 설명</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#111115] border border-neutral-300 dark:border-white/10 rounded-none text-neutral-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Image Drag & Drop Uploader */}
          <div className="space-y-1">
            <label className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-extrabold">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>메뉴 이미지 파일 드래그 앤 드롭 업로드</span>
            </label>
            <ImageDropzone value={image} onChange={(url) => setImage(url)} />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="또는 인터넷 이미지 URL 직접 입력 (https://...)"
              className="w-full px-3 py-1.5 mt-1.5 bg-neutral-50 dark:bg-[#111115] border border-neutral-300 dark:border-white/10 rounded-none text-neutral-900 dark:text-white text-[11px] font-mono font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-200 dark:bg-white/10 hover:bg-neutral-300 dark:hover:bg-white/20 text-neutral-800 dark:text-white font-extrabold cursor-pointer transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-black flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>메뉴 수정사항 저장</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
