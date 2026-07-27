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
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[var(--bg-main)]">
        
        {/* Top Control Bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-[#09090b] border-b border-neutral-200 dark:border-white/10 px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-black dark:text-white" />
              <h1 className="text-xl font-black text-neutral-900 dark:text-white">메뉴 및 품절(Sold-Out) 관리</h1>
            </div>
            <p className="text-xs text-neutral-400 font-extrabold mt-0.5 text-left">
              매장 실시간 메뉴 상태 제어 및 곱빼기/토핑 커스텀 옵션 등록
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-none bg-black text-white dark:bg-white dark:text-black font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-all shadow-none"
          >
            <PlusCircle className="w-4 h-4" />
            <span>신규 메뉴 등록</span>
          </button>
        </header>

        {/* Category Filter & Cards Grid */}
        <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Category Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-none text-xs font-black transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-none'
                    : 'bg-white dark:bg-[#09090b] text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-white/10 hover:border-black dark:hover:border-white'
                }`}
              >
                {cat} ({cat === '전체' ? menuItems.length : menuItems.filter(i => i.category === cat).length})
              </button>
            ))}
          </div>

          {/* Menu Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
