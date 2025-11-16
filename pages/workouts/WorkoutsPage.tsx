// pages/workouts/WorkoutsPage.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

import { UIText } from "@shared/ui/UIText";

export const WorkoutsPage = () => {
  return (
    <View style={styles.container}>
      <UIText weight={700} style={{ fontSize: 24 }}>
        Тренировки
      </UIText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
