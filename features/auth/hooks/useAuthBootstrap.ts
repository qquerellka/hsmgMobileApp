import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore, type AuthUser } from '../model/useAuthStore';
import { STORAGE_KEYS } from '@/shared/config/hz';
import { getAuthorizedUser } from '../api/authApi';
import { clearAuth } from '../lib/tokenStorage';

export const useAuthBootstrap = () => {
  const [isReady, setIsReady] = useState(false);

  const accessToken = useAuthStore((s) => s.accessToken);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const setStatus = useAuthStore((s) => s.setStatus);

  // 1. достаём токен
  useEffect(() => {
    const restoreToken = async () => {
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.accessToken);

        if (token) {
          setAccessToken(token);
          setStatus('checking');
        } else {
          setStatus('unauthenticated');
        }
      } catch {
        setStatus('unauthenticated');
      } finally {
        setIsReady(true);
      }
    };

    restoreToken();
  }, [setAccessToken, setStatus]);

  // 2. если токен есть — валидируем его и получаем юзера
  const { data, error, isLoading } = useQuery<AuthUser, Error>({
    queryKey: ['authorized-user', accessToken],
    queryFn: getAuthorizedUser,
    enabled: !!accessToken,
    retry: false,
  });

  useEffect(() => {
    if (!accessToken) return;
    if (!data) return;

    setUser(data);
    setStatus('authenticated');
  }, [data, accessToken, setUser, setStatus]);

  // 3. если /me упал — считаем токен протухшим и чистим авторизацию
  useEffect(() => {
    if (!accessToken) return;
    if (!error) return;

    clearAuth().catch(() => {
      // можно залогировать, если захочешь
    });
  }, [error, accessToken]);

  const status = useAuthStore((s) => s.status);
  const isAuthChecking = status === 'checking' || (!!accessToken && isLoading);

  return { isReady, isAuthChecking, status, accessToken };
};
