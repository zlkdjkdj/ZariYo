import { apiClient } from './client';

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_OWNER' | 'ROLE_ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  createdAt: string;
}

export interface UserStatsResponse {
  totalUsers: number;
  ownerCount: number;
  customerCount: number;
  adminCount: number;
  suspendedCount: number;
}

const mockUsers: UserResponse[] = [
  { id: 1, email: 'admin@zariyo.com', name: '최고 관리자', role: 'ROLE_ADMIN', status: 'ACTIVE', createdAt: '2026-01-01 10:00:00' },
  { id: 2, email: 'owner@zariyo.com', name: '김사장 (강남 메인점)', role: 'ROLE_OWNER', status: 'ACTIVE', createdAt: '2026-02-15 14:20:00' },
  { id: 3, email: 'ceo.park@zariyo.com', name: '박대표 (홍대 아지트)', role: 'ROLE_OWNER', status: 'ACTIVE', createdAt: '2026-03-01 09:15:00' },
  { id: 4, email: 'user1@naver.com', name: '이민수', role: 'ROLE_CUSTOMER', status: 'ACTIVE', createdAt: '2026-04-10 18:30:00' },
  { id: 5, email: 'user2@kakao.com', name: '정수진', role: 'ROLE_CUSTOMER', status: 'ACTIVE', createdAt: '2026-05-22 11:45:00' },
  { id: 6, email: 'spammer@test.com', name: '악성이용자', role: 'ROLE_CUSTOMER', status: 'SUSPENDED', createdAt: '2026-06-05 16:00:00' },
];

export const adminApi = {
  getUsers: async (params?: { query?: string; role?: string; status?: string }): Promise<UserResponse[]> => {
    try {
      const res = await apiClient.get<UserResponse[]>('/api/v1/admin/users', { params });
      return res.data;
    } catch {
      // Mock Fallback
      let result = [...mockUsers];
      if (params?.query) {
        const q = params.query.toLowerCase();
        result = result.filter(u => u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q));
      }
      if (params?.role && params.role !== 'ALL') {
        result = result.filter(u => u.role === params.role);
      }
      if (params?.status && params.status !== 'ALL') {
        result = result.filter(u => u.status === params.status);
      }
      return result;
    }
  },

  getUserStats: async (): Promise<UserStatsResponse> => {
    try {
      const res = await apiClient.get<UserStatsResponse>('/api/v1/admin/users/stats');
      return res.data;
    } catch {
      // Mock Fallback
      const totalUsers = mockUsers.length;
      const ownerCount = mockUsers.filter(u => u.role === 'ROLE_OWNER').length;
      const customerCount = mockUsers.filter(u => u.role === 'ROLE_CUSTOMER').length;
      const adminCount = mockUsers.filter(u => u.role === 'ROLE_ADMIN').length;
      const suspendedCount = mockUsers.filter(u => u.status === 'SUSPENDED').length;
      return { totalUsers, ownerCount, customerCount, adminCount, suspendedCount };
    }
  },

  updateRole: async (userId: number, role: 'ROLE_CUSTOMER' | 'ROLE_OWNER' | 'ROLE_ADMIN'): Promise<UserResponse> => {
    try {
      const res = await apiClient.patch<UserResponse>(`/api/v1/admin/users/${userId}/role`, { role });
      return res.data;
    } catch {
      const target = mockUsers.find(u => u.id === userId);
      if (target) target.role = role;
      return target || mockUsers[0];
    }
  },

  updateStatus: async (userId: number, status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'): Promise<UserResponse> => {
    try {
      const res = await apiClient.patch<UserResponse>(`/api/v1/admin/users/${userId}/status`, { status });
      return res.data;
    } catch {
      const target = mockUsers.find(u => u.id === userId);
      if (target) target.status = status;
      return target || mockUsers[0];
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      await apiClient.delete(`/api/v1/admin/users/${userId}`);
    } catch {
      const index = mockUsers.findIndex(u => u.id === userId);
      if (index !== -1) mockUsers.splice(index, 1);
    }
  },
};
