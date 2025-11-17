import React, { useState } from "react";
import { View, StyleSheet, Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { UiInput } from "@shared/ui/UiInput";
import { UIText } from "@shared/ui/UIText";
import { UIForm } from "@/shared/ui/UIForm";
import { UIButton } from "@/shared/ui/UIButton";
import { useRegister } from "@features/auth/hooks/useRegister";
import { getApiErrorMessage, type ApiError } from "@shared/api/apiError";
import { AuthFormCard } from "@/widgets/auth/AuthFormCard";
import { theme } from "@shared/config/theme";
import { ROUTES } from "@/shared/config/hz";

type Step = 1 | 2;

export const RegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);

  // шаг 1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  // шаг 2
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");

  const { mutateAsync, isPending } = useRegister();

  const goToLogin = () => {
    router.replace(ROUTES.login);
  };

  const handleNext = () => {
    if (!email || !password || !passwordRepeat) {
      Alert.alert("Ошибка", "Заполните все поля.");
      return;
    }
    if (password !== passwordRepeat) {
      Alert.alert("Ошибка", "Пароли не совпадают.");
      return;
    }
    setStep(2);
  };

  const handleRegister = async () => {
    if (!name || !surname || !nickname) {
      Alert.alert("Ошибка", "Заполните все поля профиля.");
      return;
    }

    try {
      await mutateAsync({ email, password, name, surname, nickname });
      router.replace(ROUTES.login);
    } catch (e) {
      const err = e as ApiError;
      const message = getApiErrorMessage(err);
      Alert.alert("Ошибка регистрации", message);
    }
  };

  return (
    <AuthFormCard>
      {step === 1 ? (
        <RegisterStep1
          email={email}
          password={password}
          passwordRepeat={passwordRepeat}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onPasswordRepeatChange={setPasswordRepeat}
          onNext={handleNext}
          onGoToLogin={goToLogin}
        />
      ) : (
        <RegisterStep2
          name={name}
          surname={surname}
          nickname={nickname}
          onNameChange={setName}
          onSurnameChange={setSurname}
          onNicknameChange={setNickname}
          onRegister={handleRegister}
          onGoToLogin={goToLogin}
          isPending={isPending}
        />
      )}
    </AuthFormCard>
  );
};

const FooterLoginLink: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <View style={styles.footerRow}>
    <UIText style={styles.footerText}>Уже есть аккаунт? </UIText>
    <Pressable onPress={onPress}>
      <UIText weight="semibold" style={styles.footerLink}>
        Войти
      </UIText>
    </Pressable>
  </View>
);

interface RegisterStep1Props {
  email: string;
  password: string;
  passwordRepeat: string;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onPasswordRepeatChange: (v: string) => void;
  onNext: () => void;
  onGoToLogin: () => void;
};

const RegisterStep1: React.FC<RegisterStep1Props> = ({
  email,
  password,
  passwordRepeat,
  onEmailChange,
  onPasswordChange,
  onPasswordRepeatChange,
  onNext,
  onGoToLogin,
}) => {
  return (
    <UIForm
      title="Регистрация"
      footer={
        <>
          <UIButton variant="gradient" onPress={onNext}>
            Далее
          </UIButton>
          <FooterLoginLink onPress={onGoToLogin} />
        </>
      }
    >
      <UiInput
        value={email}
        onChangeText={onEmailChange}
        placeholder="Почта"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <UiInput
        value={password}
        onChangeText={onPasswordChange}
        placeholder="Пароль"
        secureTextEntry
      />
      <UiInput
        value={passwordRepeat}
        onChangeText={onPasswordRepeatChange}
        placeholder="Повтор пароля"
        secureTextEntry
      />
    </UIForm>
  );
};

// 👇 шаг 2 — профиль
interface RegisterStep2Props {
  name: string;
  surname: string;
  nickname: string;
  onNameChange: (v: string) => void;
  onSurnameChange: (v: string) => void;
  onNicknameChange: (v: string) => void;
  onRegister: () => void;
  onGoToLogin: () => void;
  isPending: boolean;
};

const RegisterStep2: React.FC<RegisterStep2Props> = ({
  name,
  surname,
  nickname,
  onNameChange,
  onSurnameChange,
  onNicknameChange,
  onRegister,
  onGoToLogin,
  isPending,
}) => {
  return (
    <UIForm
      title="Заполните профиль"
      footer={
        <>
          <UIButton
            variant="gradient"
            onPress={onRegister}
            loading={isPending}
          >
            Зарегистрироваться
          </UIButton>
          <FooterLoginLink onPress={onGoToLogin} />
        </>
      }
    >
      <UiInput value={name} onChangeText={onNameChange} placeholder="Имя" />
      <UiInput value={surname} onChangeText={onSurnameChange} placeholder="Фамилия" />
      <UiInput value={nickname} onChangeText={onNicknameChange} placeholder="Ник" />
    </UIForm>
  );
};

const styles = StyleSheet.create({
  footerRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    color: theme.palette.white,
    textDecorationLine: "underline",
  },
});
