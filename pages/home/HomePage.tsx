// pages/home/HomePage.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { BackgroundShapes } from "@shared/ui/BackgroundShapes";
import { UiInput } from "@shared/ui/UiInput";
import { UIText } from "@shared/ui/UIText";
import { UIMainPageLink } from "@shared/ui/UIMainPageLink";
import { theme } from "@shared/config/theme";

export const HomePage = () => {
  return (
    <LinearGradient {...theme.gradients.main} style={styles.container}>
      <BackgroundShapes />

      <UiInput fontSize={18} />

      <UIText weight={600} style={styles.text}>
        Открывай новые тренировки. Вдохновляй своим прогрессом.
      </UIText>

      <UIMainPageLink
        href="/(auth)/login"         // 👈 теперь ведём на авторизацию
        title="Войти"
        style={{ marginTop: 24 }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 36,
    color: theme.palette.totalBlack,
    marginTop: 140,
  },
});
