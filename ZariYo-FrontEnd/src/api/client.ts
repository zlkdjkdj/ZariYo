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

// Response Interceptor: 공통 에러 핸들링
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`[API Error ${error.response.status}]`, error.response.data);
    }
    return Promise.reject(error);
  }
);
