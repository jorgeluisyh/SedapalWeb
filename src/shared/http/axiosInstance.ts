import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 50000,
});

// activar al tener token
axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('auth_token');
      if (token) {
 
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth_token');
      window.location.href = '/login'; // redirección forzada
    }
    return Promise.reject(error);
  }
);