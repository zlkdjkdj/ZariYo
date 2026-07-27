import { apiClient } from './client';

export interface StaffCallCreateRequest {
  tableNumber: string;
  requestItems: string[];
}

export interface StaffCallResponse {
  id: number;
  tableNumber: string;
  requestItems: string;
  isResolved: boolean;
  createdAt: string;
  resolvedAt: string | null;
}

export const staffCallApi = {
  createStaffCall: async (storeId: number, data: StaffCallCreateRequest): Promise<StaffCallResponse> => {
    const res = await apiClient.post<StaffCallResponse>(`/api/stores/${storeId}/staff-calls`, data);
    return res.data;
  },

  getStaffCalls: async (storeId: number, isResolved?: boolean): Promise<StaffCallResponse[]> => {
    const url = isResolved !== undefined
      ? `/api/stores/${storeId}/staff-calls?isResolved=${isResolved}`
      : `/api/stores/${storeId}/staff-calls`;
    const res = await apiClient.get<StaffCallResponse[]>(url);
    return res.data;
  },

  resolveStaffCall: async (callId: number): Promise<StaffCallResponse> => {
    const res = await apiClient.patch<StaffCallResponse>(`/api/staff-calls/${callId}/resolve`);
    return res.data;
  },
};
