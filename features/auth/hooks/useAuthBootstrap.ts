import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore, type AuthUser } from '../model/useAuthStore';
import { ACCESS_TOKEN_KEY } from './useLogin';
import { getAuthorizedUser } from '../api/authApi';

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
        const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

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
    queryKey: ['authorized-user'],
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

  useEffect(() => {
    if (!accessToken) return;
    if (!error) return;

    setAccessToken(null);
    setUser(null);
    setStatus('unauthenticated');
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY).catch(() => {});
  }, [error, accessToken, setAccessToken, setUser, setStatus]);

  const status = useAuthStore((s) => s.status);
  const isAuthChecking = status === 'checking' || (!!accessToken && isLoading);

  return { isReady, isAuthChecking, status, accessToken };
};
