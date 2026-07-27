import { apiClient } from './client';

export interface OrderItemRequest {
  menuItemId: number;
  quantity: number;
  optionsSummary?: string;
}

export interface OrderCreateRequest {
  tableNumber: string;
  orderType: 'EAT_IN' | 'TAKE_OUT';
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  menuItemId: number;
  menuItemName: string;
  price: number;
  quantity: number;
  optionsSummary: string;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  tableNumber: string;
  totalAmount: number;
  status: 'PENDING' | 'PREPARING' | 'SERVED' | 'COMPLETED' | 'CANCELLED';
  orderType: 'EAT_IN' | 'TAKE_OUT';
  items: OrderItemResponse[];
  createdAt: string;
}

export const orderApi = {
  createOrder: async (storeId: number, data: OrderCreateRequest): Promise<OrderResponse> => {
    const res = await apiClient.post<OrderResponse>(`/api/stores/${storeId}/orders`, data);
    return res.data;
  },

  getOrders: async (storeId: number, status?: string): Promise<OrderResponse[]> => {
    const url = status ? `/api/stores/${storeId}/orders?status=${status}` : `/api/stores/${storeId}/orders`;
    const res = await apiClient.get<OrderResponse[]>(url);
    return res.data;
  },

  updateStatus: async (orderId: number, status: string): Promise<OrderResponse> => {
    const res = await apiClient.patch<OrderResponse>(`/api/orders/${orderId}/status?status=${status}`);
    return res.data;
  },
};
