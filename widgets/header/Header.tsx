import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { UIIcon } from "@/shared/ui/UIIcon";

export const HEADER_BAR_HEIGHT = 70;

interface HeaderProps {
  isMenuOpen: boolean;
  onBurgerPress: () => void;
};

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, onBurgerPress }) => {
  return (
    <View style={styles.headerInner}>
      <Image
        source={require("../../assets/hsmgLogo.png")}
        resizeMode="contain"
        style={{ width: 121, height: 28 }}
      />

      <View style={styles.actions}>
        <Pressable hitSlop={10} onPress={onBurgerPress}>
          <UIIcon name={isMenuOpen ? "close" : "burger"} size={44} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerInner: {
    height: HEADER_BAR_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
});
