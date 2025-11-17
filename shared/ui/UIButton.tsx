import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "@shared/config/theme";
import { UIText } from "@shared/ui/UIText";

type UIButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gradient";
type UIButtonSize = "md" | "sm";

type UIButtonProps = Omit<PressableProps, "style"> & {
  title?: string;
  children?: React.ReactNode;
  variant?: UIButtonVariant;
  size?: UIButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const UIButton: React.FC<UIButtonProps> = ({
  title,
  children,
  variant = "primary",
  size = "md",
  fullWidth = true,
  loading = false,
  disabled,
  style,
  onPress,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  const content = children ?? title;

  const handlePress: PressableProps["onPress"] = (event) => {
    if (isDisabled) return;
    onPress?.(event);
  };

  const renderInner = () => {
    const innerStyle = [styles.inner, getSizeStyle(size)];
    const textNode = loading ? (
      <ActivityIndicator size="small" color={getSpinnerColor(variant)} />
    ) : (
      <UIText
        weight="semibold"
        style={[
          styles.textBase,
          getTextColor(variant),
          size === "sm" && styles.textSmall,
        ]}
      >
        {content}
      </UIText>
    );

    if (variant === "gradient") {
      return (
        <LinearGradient {...theme.gradients.main} style={innerStyle}>
          {textNode}
        </LinearGradient>
      );
    }

    return (
      <View style={[innerStyle, getVariantStyle(variant)]}>{textNode}</View>
    );
  };

  return (
    <Pressable
      {...rest}
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {renderInner()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  inner: {
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  // размеры
  md: {
    height: 52,
    paddingHorizontal: 20,
  },
  sm: {
    height: 40,
    paddingHorizontal: 16,
  },
  // текст
  textBase: {
    fontSize: 16,
    lineHeight: 20,
  },
  textSmall: {
    fontSize: 14,
    lineHeight: 18,
  },
});

const getVariantStyle = (variant: UIButtonVariant): ViewStyle => {
  switch (variant) {
    case "primary":
      return {
        backgroundColor: theme.palette.green,
      };
    case "secondary":
      return {
        backgroundColor: theme.palette.darkBlue,
      };
    case "outline":
      return {
        backgroundColor: "transparent",
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
      };
    case "gradient":
    default:
      return {};
  }
};

const getSizeStyle = (ViewStylesize: UIButtonSize): ViewStyle => {
  switch (ViewStylesize) {
    case "sm":
      return styles.sm;
    case "md":
    default:
      return styles.md;
  }
};

const getTextColor = (variant: UIButtonVariant) => {
  switch (variant) {
    case "primary":
    case "secondary":
      return { color: theme.palette.totalBlack };
    case "outline":
      return { color: theme.palette.lightGrey };
    case "ghost":
    case "gradient":
      return { color: theme.palette.totalBlack };
    default:
      return { color: theme.palette.white };
  }
};

const getSpinnerColor = (variant: UIButtonVariant) => {
  switch (variant) {
    case "primary":
    case "secondary":
      return theme.palette.totalBlack;
    case "outline":
    case "ghost":
    case "gradient":
    default:
      return theme.palette.white;
  }
};
