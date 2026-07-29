import { useState, useEffect } from 'react';
import { ConsoleSidebar } from '../../components/owner/ConsoleSidebar';
import { UtensilsCrossed, PlusCircle } from 'lucide-react';
import { MenuCardItem, type MenuManagementItem } from '../../components/owner/menu/MenuCardItem';
import { AddMenuFormModal } from '../../components/owner/menu/AddMenuFormModal';
import { EditMenuFormModal } from '../../components/owner/menu/EditMenuFormModal';
import { INITIAL_MENU_ITEMS } from '../../data/mockMenuManagement';
import { menuApi } from '../../api/menuApi';

export function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuManagementItem[]>(INITIAL_MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingMenu, setEditingMenu] = useState<MenuManagementItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // 메뉴 수정 모달 열기 핸들러
  const handleOpenEditModal = (menu: MenuManagementItem) => {
    setEditingMenu(menu);
    setIsEditModalOpen(true);
  };

  // 메뉴 수정 저장 처리
  const handleUpdateMenu = (updated: MenuManagementItem) => {
    setMenuItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  // 1. 백엔드 DB에서 메뉴 목록 로드
  useEffect(() => {
    const fetchBackendMenus = async () => {
      try {
        const categoriesData = await menuApi.getCategories(1);
        if (categoriesData && categoriesData.length > 0) {
          const loadedBackendItems: MenuManagementItem[] = [];
          categoriesData.forEach((cat: any) => {
            if (cat.menuItems) {
              cat.menuItems.forEach((m: any) => {
                loadedBackendItems.push({
                  id: String(m.id),
                  name: m.name,
                  category: cat.name,
                  price: m.price,
                  description: m.description || '',
                  image: m.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop',
                  isSoldOut: !m.isAvailable,
                  options: [],
                });
              });
            }
          });
          if (loadedBackendItems.length > 0) {
            setMenuItems(loadedBackendItems);
          }
        }
      } catch (err) {
        console.warn('Backend DB Menu API call fallback to active state:', err);
      }
    };
    fetchBackendMenus();
  }, []);

  // 실시간 품절(Sold-Out) 토글 핸들러 (DB API 바인딩)
  const handleToggleSoldOut = async (id: string) => {
    const targetItem = menuItems.find(i => i.id === id);
    const newSoldOut = targetItem ? !targetItem.isSoldOut : true;

    setMenuItems((prev) => 
      prev.map((item) => item.id === id ? { ...item, isSoldOut: !item.isSoldOut } : item)
    );
    try {
      const targetNum = parseInt(id.replace(/\D/g, ''), 10) || 1;
      await menuApi.toggleSoldOut(targetNum, newSoldOut);
    } catch (err) {
      console.warn('Backend SoldOut Toggle API fallback', err);
    }
  };

  // 메뉴 삭제 핸들러
  const handleDeleteMenu = (id: string) => {
    if (confirm('해당 메뉴를 삭제하시겠습니까?')) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 신규 메뉴 등록 핸들러
  const handleAddMenu = (newItem: Omit<MenuManagementItem, 'id'>) => {
    const itemWithId: MenuManagementItem = {
      ...newItem,
      id: `m-${Date.now()}`
    };
    setMenuItems((prev) => [itemWithId, ...prev]);
  };

  const categories = ['전체', '메인 요리', '사이드', '음료/주류', '디저트'];

  const filteredItems = selectedCategory === '전체' 
    ? menuItems 
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden font-sans select-none transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <ConsoleSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[var(--bg-main)] p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800 select-none">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] border border-[#0381fe]/30 text-[10px] font-bold font-mono mb-2">
              <UtensilsCrossed className="w-3.5 h-3.5" /> SAMSUNG STORE MENU ENGINE
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white font-sans">메뉴 & 품절 관리</h1>
            <p className="text-xs text-[#707070] dark:text-neutral-400 font-normal mt-1">
              매장의 전체 메뉴 가격, 이미지 및 실시간 품절(Sold Out) 상태를 클릭 한 번으로 통제합니다.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="h-[40px] px-5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs cursor-pointer hover:opacity-90 flex items-center gap-2 transition-all rounded-[20px] shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-[#0381fe]" />
            <span>신규 메뉴 등록</span>
          </button>
        </div>

        {/* Category Tabs - Samsung 40px Pill Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`h-[40px] px-6 py-2 rounded-[20px] text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                  : 'bg-[#f7f7f7] dark:bg-white/5 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-white/10 hover:border-[#0381fe]'
              }`}
            >
              {cat} ({cat === '전체' ? menuItems.length : menuItems.filter(i => i.category === cat).length})
            </button>
          ))}
        </div>

        {/* Menu Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((menu) => (
            <MenuCardItem 
              key={menu.id}
              menu={menu}
              onToggleSoldOut={handleToggleSoldOut}
              onDeleteMenu={handleDeleteMenu}
              onEditMenu={handleOpenEditModal}
            />
          ))}
        </div>

      </main>


      {/* Add Menu Modal Component */}
      <AddMenuFormModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMenu={handleAddMenu}
      />

      {/* Edit Menu & Image Modal Component */}
      <EditMenuFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        menu={editingMenu}
        onUpdateMenu={handleUpdateMenu}
      />

    </div>
  );
}
