import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { theme } from "@shared/config/theme";

type UITextProps = TextProps & {
  weight?: "regular" | "medium" | "semibold" | "bold";
};

export const UIText: React.FC<UITextProps> = ({
  style,
  weight = "regular",
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[styles.base, getFontStyle(weight), style]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    color: theme.palette.white,
    fontSize: 16,
  },
});

const getFontStyle = (weight: UITextProps["weight"]) => {
  switch (weight) {
    case "medium":
      return { fontFamily: "Montserrat-Medium" };
    case "semibold":
      return { fontFamily: "Montserrat-SemiBold" };
    case "bold":
      return { fontFamily: "Montserrat-Bold" };
    case "regular":
    default:
      return { fontFamily: "Montserrat-Regular" };
  }
};
