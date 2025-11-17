import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

import { UIText } from "@shared/ui/UIText";
import { theme } from "@shared/config/theme";

type UIFormProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  style?: ViewStyle;
};

export const UIForm: React.FC<UIFormProps> = ({
  title,
  subtitle,
  children,
  footer,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <UIText weight="semibold" style={styles.title}>
              {title}
            </UIText>
          )}
          {subtitle && (
            <UIText style={styles.subtitle}>
              {subtitle}
            </UIText>
          )}
        </View>
      )}

      <View style={styles.fields}>{children}</View>

      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // это «каркас» формы внутри экрана
    width: "100%",
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
    alignItems: "center"
  },
  title: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    opacity: 0.8,
  },
  fields: {
    gap: theme.spacing.md,
  },
  footer: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
});
