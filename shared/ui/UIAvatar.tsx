// shared/ui/UIAvatar.tsx
import React, { useMemo } from "react";
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "@shared/config/theme";
import { UIText } from "@shared/ui/UIText";

// ⚠️ Путь подправь под свою структуру assets
import DefaultAvatarImg from "../../assets/defaultAvatar.png";
type UIAvatarSize = "sm" | "md" | "lg" | "profile";

export interface UIAvatarProps {
  uri?: string | null;          // ссылка на аватар
  label?: string | null;        // для инициалов (как запасной вариант)
  size?: UIAvatarSize | number;
  onPress?: () => void;
  showBorder?: boolean;
  style?: StyleProp<ViewStyle>;
  fallbackSource?: ImageSourcePropType; // можно переопределить дефолт
}

const SIZE_MAP: Record<UIAvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 72,
  profile: 80,
};

function getInitials(label?: string | null): string {
  if (!label) return "";
  const trimmed = label.trim();
  if (!trimmed) return "";

  const parts = trimmed.split(/\s+/);
  const first = parts[0]?.[0];
  const second = parts[1]?.[0];

  const initials = (first || "") + (second || "");
  return initials.toUpperCase();
}

export const UIAvatar: React.FC<UIAvatarProps> = React.memo(
  ({
    uri,
    label,
    size = "md",
    onPress,
    showBorder = false,
    style,
    fallbackSource = DefaultAvatarImg,
  }) => {
    const resolvedSize =
      typeof size === "number" ? size : SIZE_MAP[size] ?? SIZE_MAP.md;

    const initials = useMemo(() => getInitials(label), [label]);

    // 1. Если пришёл uri — используем его
    // 2. Иначе — дефолтный аватар (fallbackSource)
    const imageSource: ImageSourcePropType | null = uri
      ? { uri }
      : fallbackSource || null;

    const Wrapper = onPress ? Pressable : View;

    return (
      <Wrapper
        onPress={onPress}
        style={[
          styles.container,
          {
            width: resolvedSize,
            height: resolvedSize,
            borderRadius: resolvedSize / 2,
          },
          showBorder && styles.border,
          style,
        ]}
        hitSlop={onPress ? 8 : undefined}
      >
        {imageSource ? (
          <Image
            source={imageSource}
            style={{
              width: resolvedSize,
              height: resolvedSize,
              borderRadius: resolvedSize / 2,
            }}
            resizeMode="cover"
          />
        ) : (
          // Запасной вариант: градиент + инициалы, если вдруг нет даже fallbackSource
          <LinearGradient
            {...theme.gradients.main}
            style={[
              styles.gradient,
              {
                borderRadius: resolvedSize / 2,
              },
            ]}
          >
            {initials ? (
              <UIText
                weight="semibold"
                style={[
                  styles.initials,
                  {
                    fontSize: resolvedSize * 0.4,
                  },
                ]}
              >
                {initials}
              </UIText>
            ) : null}
          </LinearGradient>
        )}
      </Wrapper>
    );
  }
);

UIAvatar.displayName = "UIAvatar";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  border: {
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "#FFFFFF",
  },
});
