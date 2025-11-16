// features/auth/api/authApi.ts
import { api } from '@shared/api/client';
import type { AuthUser } from '../model/useAuthStore';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  token: string; // accessToken
};

// 🔹 НОВОЕ: payload регистрации
export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  surname: string;
  nickname: string;
};

// POST /api/login
export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/login', payload);
  return data;
};

// 🔹 НОВОЕ: POST /api/register (без тела ответа)
export const registerRequest = async (payload: RegisterPayload): Promise<void> => {
  await api.post('/register', payload);
};

// GET /api/get_authorized_user_data
export const getAuthorizedUser = async (): Promise<AuthUser> => {
  const { data } = await api.get<AuthUser>('/get_authorized_user_data');
  return data;
};
