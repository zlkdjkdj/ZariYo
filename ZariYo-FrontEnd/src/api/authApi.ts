import { apiClient } from './client';

export interface SignupRequest {
  email: string;
  name: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_OWNER';
}

export interface LoginRequest {
  email: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export const authApi = {
  signup: async (data: SignupRequest): Promise<TokenResponse> => {
    const res = await apiClient.post<TokenResponse>('/api/v1/auth/signup', data);
    return res.data;
  },

  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const res = await apiClient.post<TokenResponse>('/api/v1/auth/login', data);
    return res.data;
  },
};
