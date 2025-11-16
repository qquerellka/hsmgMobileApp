// shared/api/client.ts
import axios from 'axios';
import { useAuthStore } from '@features/auth/model/useAuthStore';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // <-- только из env
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});
