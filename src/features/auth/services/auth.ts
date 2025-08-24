import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api/v1';

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  const response = await api.post('/auth/login', {
    email,
    password,
    rememberMe
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.post('/auth/check-auth-status');
  return response.data;
};

export default api;
