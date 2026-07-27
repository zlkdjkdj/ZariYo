import { apiClient } from './client';

export interface CategoryResponse {
  id: number;
  name: string;
  displayOrder: number;
}

export interface MenuItemOption {
  id: number;
  name: string;
  price: number;
}

export interface MenuItemResponse {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  badge: string;
  isPopular: boolean;
  isSoldOut: boolean;
  options: MenuItemOption[];
}

export const menuApi = {
  getCategories: async (storeId: number): Promise<CategoryResponse[]> => {
    const res = await apiClient.get<CategoryResponse[]>(`/api/stores/${storeId}/categories`);
    return res.data;
  },

  getMenuItems: async (storeId: number): Promise<MenuItemResponse[]> => {
    const res = await apiClient.get<MenuItemResponse[]>(`/api/stores/${storeId}/menus`);
    return res.data;
  },

  toggleSoldOut: async (menuId: number, isSoldOut: boolean) => {
    const res = await apiClient.patch<MenuItemResponse>(`/api/menus/${menuId}/sold-out?isSoldOut=${isSoldOut}`);
    return res.data;
  },
};
