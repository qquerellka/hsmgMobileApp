// widgets/profile/ProfileMainInfo.tsx
import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";

import { UIText } from "@shared/ui/UIText";

interface ProfileMainInfoProps {
  name: string;
  surname: string;
  nickname?: string | null; // без @
  heightCm?: number | null; // рост
  weightKg?: number | null; // вес
  style?: StyleProp<ViewStyle>;
}

export const ProfileMainInfo: React.FC<ProfileMainInfoProps> = ({
  name,
  surname,
  nickname,
  heightCm,
  weightKg,
  style,
}) => {
  const fullName = `${name} ${surname}`.trim() || "Имя Фамилия";

  const details = useMemo(() => {
    const parts: string[] = [];

    if (heightCm != null) {
      parts.push(`${heightCm} см`);
    }

    if (weightKg != null) {
      parts.push(`${weightKg} кг`);
    }

    // если нет ни роста, ни веса — вернём пустую строку
    return parts.join(", ");
  }, [heightCm, weightKg]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.firstLine}>
        <UIText weight="semibold" style={styles.nameText} numberOfLines={1}>
          {fullName}
        </UIText>

        {nickname ? (
          <UIText style={styles.nicknameText} numberOfLines={1}>
            {" "}
            @{nickname}
          </UIText>
        ) : null}
      </View>

      {details ? (
        <UIText style={styles.detailsText} numberOfLines={1}>
          {details}
        </UIText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // фон/отступы задаются снаружи
  },
  firstLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 18,
    color: "#000000",
  },
  nicknameText: {
    fontSize: 16,
    color: "#007AFF", // или цвет из theme
  },
  detailsText: {
    marginTop: 4,
    fontSize: 14,
    color: "#000000",
  },
});
