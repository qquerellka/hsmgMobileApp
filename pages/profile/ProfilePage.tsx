// pages/profile/ProfilePage.tsx
import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UIText } from '@shared/ui/UIText';
import { theme } from '@shared/config/theme';
import { useAuthStore } from '@features/auth/model/useAuthStore';
import { ACCESS_TOKEN_KEY } from '@features/auth/hooks/useLogin';

export const ProfilePage = () => {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const logoutStore = useAuthStore((s) => s.logout);

  const displayName =
    user?.nickname ||
    [user?.name, user?.surname].filter(Boolean).join(' ') ||
    user?.email;

  const handleLogout = async () => {
    try {
      // 1. чистим стор авторизации
      logoutStore();

      // 2. убираем токен из AsyncStorage
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

      // 3. уводим на HomePage
      router.replace('/');
    } catch (e) {
      console.error('Logout error', e);
      Alert.alert('Ошибка', 'Не удалось выйти из аккаунта.');
    }
  };

  return (
    <View style={styles.container}>
      <UIText weight={700} style={styles.title}>
        Профиль
      </UIText>

      {displayName && (
        <UIText style={styles.subtitle}>Привет, {displayName} 👋</UIText>
      )}

      {!displayName && (
        <UIText style={styles.subtitle}>
          Ты авторизован, но данные профиля ещё не подгружены.
        </UIText>
      )}

      <View style={styles.logoutWrapper}>
        <Button
          title="Выйти"
          onPress={handleLogout}
          color={theme.palette.red}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.palette.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    color: theme.palette.totalBlack,
  },
  subtitle: {
    fontSize: 16,
    color: theme.palette.darkGrey,
    marginBottom: 32,
  },
  logoutWrapper: {
    marginTop: 'auto', // кнопка уезжает вниз
  },
});
