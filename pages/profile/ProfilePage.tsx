import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

import { UIText } from "@shared/ui/UIText";
import { theme } from "@shared/config/theme";
import { useAuthStore } from "@features/auth/model/useAuthStore";
import { clearAuth } from "@/features/auth/lib/tokenStorage";
import { UIAvatar } from "@/shared/ui/UIAvatar";
import { ProfileMainInfoCard } from "@/widgets/profile/ProfileMainInfoCard";
import { ProfileMainInfo } from "@/widgets/profile/ProfileMainInfo";

export const ProfilePage = () => {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);

  const displayName =
    user?.nickname ||
    [user?.name, user?.surname].filter(Boolean).join(" ") ||
    user?.email;

  const handleLogout = async () => {
    await clearAuth();
    router.replace("/");
  };
  

  return (
    <View style={styles.container}>
      <UIText weight={"bold"} style={styles.title}>
        Профиль
      </UIText>
      <UIAvatar
        size="profile"
        uri={user?.avatar ?? null}
        label={user?.nickname || `${user?.name} ${user?.surname}`}
        showBorder
      />
      <ProfileMainInfo
        name={user?.name ?? ""}
        surname={user?.surname ?? ""}
        nickname={user?.nickname ?? undefined}
        // heightCm={user?.height}
        // weightKg={user?.weight}
      />
      {displayName && (
        <UIText style={styles.subtitle}>Привет, {displayName} 👋</UIText>
      )}

      {!displayName && (
        <UIText style={styles.subtitle}>
          Ты авторизован, но данные профиля ещё не подгружены.
        </UIText>
      )}

      <View style={styles.logoutWrapper}>
        <Button
          title="Выйти"
          onPress={handleLogout}
          color={theme.palette.red}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.palette.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    color: theme.palette.totalBlack,
  },
  subtitle: {
    fontSize: 16,
    color: theme.palette.darkGrey,
    marginBottom: 32,
  },
  logoutWrapper: {
    marginTop: "auto",
  },
});
