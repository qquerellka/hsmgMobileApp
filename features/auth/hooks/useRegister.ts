import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { getApiErrorMessage, type ApiError } from "@shared/api/apiError";
import { registerRequest, type RegisterPayload } from "../api/authApi";
import { ROUTES } from "@/shared/config/hz";

export const useRegister = () => {
  const router = useRouter();

  return useMutation<void, ApiError, RegisterPayload>({
    mutationFn: registerRequest,
    onSuccess: () => {
      Alert.alert("Регистрация", "Вы успешно зарегистрировались", [
        {
          text: "ОК",
          onPress: () => {
            router.replace(ROUTES.login);
          },
        },
      ]);
    },
    onError: (error) => {
      const message = getApiErrorMessage(error);
      Alert.alert("Ошибка регистрации", message);
    },
  });
};
