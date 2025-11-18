import { api } from '@shared/api/client';
import type { AuthUser } from '../model/useAuthStore';

export interface LoginPayload {
  email: string;
  password: string;
};

export interface LoginResponse {
  message: string;
  token: string;
};

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  surname: string;
  nickname: string;
};

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/login', payload);
  return data;
};

export const registerRequest = async (payload: RegisterPayload): Promise<void> => {
  await api.post('/register', payload);
};

export const getAuthorizedUser = async (): Promise<AuthUser> => {
  const { data } = await api.get<AuthUser>('/get_authorized_user_data');
  return data;
};
