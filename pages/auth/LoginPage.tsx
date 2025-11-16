// pages/auth/LoginPage.tsx
import React, { useState } from "react";
import { View, StyleSheet, Button, Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { UIText } from "@shared/ui/UIText";
import { UiInput } from "@shared/ui/UiInput";
import { theme } from "@shared/config/theme";
import { useLogin } from "@features/auth/hooks/useLogin";
import { getApiErrorMessage, type ApiError } from "@shared/api/apiError";

export const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Ошибка", "Заполните email и пароль.");
      return;
    }

    try {
      await mutateAsync({ email, password });
      router.replace("/(app)");
    } catch (e) {
      const err = e as ApiError;
      const message = getApiErrorMessage(err);
      Alert.alert("Ошибка входа", message);
    }
  };

  return (
    <View style={styles.container}>
      <UIText weight={700} style={styles.title}>
        Вход
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

      <Button
        title={isPending ? "Входим..." : "Войти"}
        onPress={onSubmit}
        disabled={isPending}
        color={theme.palette.darkBlue}
      />
      <Pressable
        style={styles.registerLink}
        onPress={() => router.push("/(auth)/register")}
      >
        <UIText style={{ color: theme.palette.darkBlue }}>
          Нет аккаунта? Зарегистрироваться
        </UIText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
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
  registerLink: {
    marginTop: 16,
    alignItems: "center",
  },
});
