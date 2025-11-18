import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { BackgroundShapes } from "@shared/ui/BackgroundShapes";
import { UIText } from "@shared/ui/UIText";
import { UIMainPageLink } from "@shared/ui/UIMainPageLink";
import { theme } from "@shared/config/theme";
import { Screen } from "@/shared/ui/Screen";
import { ROUTES } from "@/shared/config/hz";

export const HomePage = () => {
  return (
    <Screen>
      <LinearGradient {...theme.gradients.main} style={styles.container}>
        <BackgroundShapes />

        <UIText weight={"medium"} style={styles.text}>
          Открывай новые тренировки. Вдохновляй своим прогрессом.
        </UIText>

        <UIMainPageLink
          href={ROUTES.login}
          title="Начать тренироваться"
          style={{ marginTop: 24 }}
        />
      </LinearGradient>
    </Screen>
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
