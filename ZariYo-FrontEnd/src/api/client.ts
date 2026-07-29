import axios from 'axios';

// 백엔드 Spring Boot REST API 기본 URL
export const API_BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: LocalStorage에 저정된 JWT Access Token을 Bearer 헤더로 자동 부착
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('zariyo_token');
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
      const refreshToken = localStorage.getItem('zariyo_refresh_token');

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, { refreshToken });
          const { accessToken, refreshToken: newRefreshToken, user } = res.data;

          localStorage.setItem('zariyo_token', accessToken);
          localStorage.setItem('zariyo_refresh_token', newRefreshToken);
          if (user) localStorage.setItem('zariyo_user', JSON.stringify(user));

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshErr) {
          localStorage.removeItem('zariyo_token');
          localStorage.removeItem('zariyo_refresh_token');
          localStorage.removeItem('zariyo_user');
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
