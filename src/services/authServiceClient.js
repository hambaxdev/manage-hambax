import axios from 'axios';
import { colorSchemes } from '../externals/shared-theme/themePrimitives';

const isLoginPage = () => window.location.pathname === '/login';

export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('logout');
    if (refreshToken) {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, { token: refreshToken });
    }
  } catch (error) {
    console.error('Ошибка выхода:', error);
  }

  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('isBasicRegistrationComplete');

  if (!isLoginPage()) {
    window.location.href = '/login';
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('Refresh token отсутствует');
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
      { token: refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (accessToken && newRefreshToken) {
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
    } else {
      throw new Error('Не удалось обновить токены');
    }
  } catch (error) {
    console.error('Ошибка обновления токена:', error);
    throw error;
  }
};

