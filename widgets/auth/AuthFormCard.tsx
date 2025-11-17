import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "@shared/config/theme";

interface AuthFormCardProps {
  children: React.ReactNode;
};

export const AuthFormCard: React.FC<AuthFormCardProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(169,210,255,0.55)",
          "rgba(21,31,55,0.98)",
        ]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.totalBlack,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 384,
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 40,
    overflow: "hidden",
  },
});
