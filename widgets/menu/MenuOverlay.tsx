import React from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  Linking,
} from "react-native";

import { theme } from "@shared/config/theme";
import { UIText } from "@/shared/ui/UIText";
import { HEADER_BAR_HEIGHT } from "@/widgets/header/Header";
import { UIIcon } from "@/shared/ui/UIIcon";

interface MenuOverlayProps {
  onClose: () => void;
};

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ onClose }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(-20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  const handleAnimatedClose = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onClose();
      }
    });
  };

  const handleOpenTelegram = () => {
    const url = "https://t.me/C4eboksar";
    Linking.openURL(url);
    handleAnimatedClose();
  };

  return (
    <Animated.View
      style={[
        styles.menuOverlay,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={handleAnimatedClose} />

      <View style={styles.menuContent}>
        <Pressable>
          <UIText style={styles.menuItemText}>Реферальная программа</UIText>
        </Pressable>

        <View style={styles.menuItemRow}>
          <UIText style={styles.menuItemText}>Связаться с нами</UIText>

          <Pressable hitSlop={10} onPress={handleOpenTelegram}>
            <UIIcon name="tg" size={30} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    position: "absolute",
    top: HEADER_BAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.totalBlack,
  },
  menuContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItemText: {
    color: theme.palette.white,
  },
});
