import axios from 'axios';
import { authStorage } from '../utils/authStorage';

// 백엔드 Spring Boot REST API 기본 URL
export const API_BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: authStorage에서 JWT Access Token을 가져와 Bearer 헤더로 자동 부착
apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: 401 감지 시 Refresh Token을 통한 자동 토큰 재발급 및 요청 재시도 (Silent Refresh)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/api/v1/auth/refresh')) {
      originalRequest._retry = true;
      const refreshToken = authStorage.getRefreshToken();

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, { refreshToken });
          const { accessToken, refreshToken: newRefreshToken, user } = res.data;

          const isRemembered = !!localStorage.getItem('zariyo_token');
          authStorage.setSession(accessToken, newRefreshToken, user, isRemembered);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshErr) {
          authStorage.clearSession();
          window.location.href = '/login';
        }
      }
    }


    if (error.response) {
      console.error(`[API Error ${error.response.status}]`, error.response.data);
    }
    return Promise.reject(error);
  }
);
