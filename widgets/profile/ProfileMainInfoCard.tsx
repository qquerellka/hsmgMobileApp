// widgets/profile/ProfileMainInfoCard.tsx
import React, { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

import { UIAvatar } from "@shared/ui/UIAvatar";
import { UIText } from "@shared/ui/UIText";

interface ProfileMainInfoCardProps {
  name: string;
  surname: string;
  nickname?: string | null; // без @, мы сами добавим
  heightCm?: number | null;  // рост
  weightKg?: number | null;  // вес
  avatarUri?: string | null;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;      // переход на экран редактирования профиля и т.п.
}

export const ProfileMainInfoCard: React.FC<ProfileMainInfoCardProps> = ({
  name,
  surname,
  nickname,
  heightCm,
  weightKg,
  avatarUri,
  style,
  onPress,
}) => {
  const fullName = `${name} ${surname}`.trim();

  const details = useMemo(() => {
    const parts: string[] = [];

    if (heightCm != null) {
      parts.push(`${heightCm} см`);
    }

    if (weightKg != null) {
      parts.push(`${weightKg} кг`);
    }

    return parts.join(", ");
  }, [heightCm, weightKg]);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && onPress && styles.pressed,
        style,
      ]}
    >
      <View style={styles.avatarWrapper}>
        <UIAvatar uri={avatarUri} label={fullName || nickname || undefined} size={64} />
      </View>

      <View style={styles.textBlock}>
        <UIText weight="semibold" style={styles.nameText} numberOfLines={1}>
          {fullName || "Имя Фамилия"}
        </UIText>

        {nickname ? (
          <UIText style={styles.nicknameText} numberOfLines={1}>
            @{nickname}
          </UIText>
        ) : null}

        {details ? (
          <UIText style={styles.detailsText} numberOfLines={1}>
            {details}
          </UIText>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    // лёгкая тень под iOS/Android
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  pressed: {
    opacity: 0.85,
  },
  avatarWrapper: {
    marginRight: 16,
  },
  textBlock: {
    flex: 1,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 18,
    marginBottom: 2,
  },
  nicknameText: {
    fontSize: 14,
    color: "#007AFF", // можно заменить на цвет из theme, если есть
    marginBottom: 2,
  },
  detailsText: {
    fontSize: 14,
    color: "#777777",
  },
  chevronWrapper: {
    marginLeft: 12,
  },
});
