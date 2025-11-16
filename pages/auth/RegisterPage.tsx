// pages/auth/RegisterPage.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { UIText } from '@shared/ui/UIText';
import { UiInput } from '@shared/ui/UiInput';
import { theme } from '@shared/config/theme';
import { useRegister } from '@features/auth/hooks/useRegister';
import { getApiErrorMessage, type ApiError } from '@shared/api/apiError';

export const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nickname, setNickname] = useState('');

  const { mutateAsync, isPending } = useRegister();

  const onSubmit = async () => {
    if (!email || !password || !name || !surname || !nickname) {
      Alert.alert('Ошибка', 'Заполните все поля.');
      return;
    }

    try {
      await mutateAsync({ email, password, name, surname, nickname });
      Alert.alert('Успешно', 'Регистрация прошла успешно. Теперь войдите.', [
        {
          text: 'Ок',
          onPress: () => router.replace('/(auth)/login'),
        },
      ]);
    } catch (e) {
      const err = e as ApiError;
      const message = getApiErrorMessage(err);
      Alert.alert('Ошибка регистрации', message);
    }
  };

  return (
    <View style={styles.container}>
      <UIText weight={700} style={styles.title}>
        Регистрация
      </UIText>

      <UiInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <UiInput
        value={password}
        onChangeText={setPassword}
        placeholder="Пароль"
        secureTextEntry
        style={styles.input}
      />

      <UiInput
        value={name}
        onChangeText={setName}
        placeholder="Имя"
        style={styles.input}
      />

      <UiInput
        value={surname}
        onChangeText={setSurname}
        placeholder="Фамилия"
        style={styles.input}
      />

      <UiInput
        value={nickname}
        onChangeText={setNickname}
        placeholder="Никнейм"
        style={styles.input}
      />

      <Button
        title={isPending ? 'Регистрируем...' : 'Зарегистрироваться'}
        onPress={onSubmit}
        disabled={isPending}
        color={theme.palette.darkBlue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: theme.palette.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color: theme.palette.totalBlack,
  },
  input: {
    marginBottom: 12,
  },
});
