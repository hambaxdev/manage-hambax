import axios from 'axios';
import { refreshAccessToken, logout } from './authServiceClient';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        const newToken = localStorage.getItem('authToken');
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error('🔁 Ошибка обновления токена:', refreshError);
        logout();
      }
    }

    return Promise.reject(error);
  }
);


export default instance;
