// features/auth/lib/authStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuthStore } from '../model/useAuthStore';
import { STORAGE_KEYS } from '@/shared/config/hz'; // у тебя тут уже лежит accessToken

// когда мы успешно залогинились или получили новый валидный токен
export const applyAuth = async (token: string) => {
  const { setAccessToken, setStatus } = useAuthStore.getState();

  setAccessToken(token);
  setStatus('authenticated');

  await AsyncStorage.setItem(STORAGE_KEYS.accessToken, token);
};

// полный разлогин: чистим store + storage
export const clearAuth = async () => {
  const { logout } = useAuthStore.getState();

  logout(); // сбрасывает accessToken, user, status

  await AsyncStorage.removeItem(STORAGE_KEYS.accessToken);
};
