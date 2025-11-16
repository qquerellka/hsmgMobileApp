// features/auth/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuthStore } from '../model/useAuthStore';
import {
  loginRequest,
  type LoginPayload,
  type LoginResponse,
} from '../api/authApi';
import type { ApiError } from '@shared/api/apiError';

export const ACCESS_TOKEN_KEY = 'accessToken';

export const useLogin = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const setStatus = useAuthStore((s) => s.setStatus);

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: loginRequest,
    onMutate: () => {
      setStatus('checking');
    },
    onSuccess: async (data) => {
      // кладём токен (обрати внимание: поле называется token)
      setAccessToken(data.token);
      setStatus('authenticated');
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.token);

      // если хочешь сразу после логина подгрузить профиль:
      // try {
      //   const user = await getAuthorizedUser();
      //   setUser(user);
      //   setStatus('authenticated');
      // } catch {
      //   setUser(null);
      // }
    },
    onError: async () => {
      setAccessToken(null);
      setUser(null);
      setStatus('unauthenticated');
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    },
  });
};
