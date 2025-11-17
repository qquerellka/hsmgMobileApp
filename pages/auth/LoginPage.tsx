import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

import { UiInput } from "@shared/ui/UiInput";
import { useLogin } from "@features/auth/hooks/useLogin";
import { getApiErrorMessage, type ApiError } from "@shared/api/apiError";
import { UIForm } from "@/shared/ui/UIForm";
import { UIButton } from "@/shared/ui/UIButton";
import { AuthFormCard } from "@/widgets/auth/AuthFormCard";

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
      router.replace("/profile");
    } catch (e) {
      const err = e as ApiError;
      const message = getApiErrorMessage(err);
      Alert.alert("Ошибка входа", message);
    }
  };

  return (
    <AuthFormCard>
      <UIForm
        title="Войдите в аккаунт"
        footer={
          <View style={styles.buttonsContainer}>
            <UIButton variant="gradient" loading={isPending} onPress={onSubmit}>
              Войти
            </UIButton>
            <UIButton
              variant="outline"
              onPress={() => router.push("/register")}
            >
              Регистрация
            </UIButton>
          </View>
        }
      >
        <UiInput
          value={email}
          onChangeText={setEmail}
          placeholder="Почта"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <UiInput
          value={password}
          onChangeText={setPassword}
          placeholder="Пароль"
          secureTextEntry
        />
      </UIForm>
    </AuthFormCard>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
});
