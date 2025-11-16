// app/_layout.tsx
import "react-native-reanimated";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, StatusBar, View } from "react-native";

import { useAuthBootstrap } from "@features/auth/hooks/useAuthBootstrap";
import { theme } from "@shared/config/theme";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGateWrapper />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function AuthGateWrapper() {
  const segments = useSegments();
  const router = useRouter();

  const { isReady, isAuthChecking, accessToken } = useAuthBootstrap();

   useEffect(() => {
    if (!isReady || isAuthChecking) return;

    const [root, sub] = segments;
    const inAuthGroup = root === '(auth)';
    const inAppGroup = root === '(app)';
    const isHome = !root; // "/" => true

    // ❌ неавторизован
    if (!accessToken) {
      // запрещаем ходить в (app) без авторизации
      if (inAppGroup) {
        router.replace('/');
      }
      return;
    }

    // ✅ авторизован
    const onProfile = inAppGroup && sub === 'profile'; // см. пункт ниже про путь

    // если сидим на home или в (auth) — кидаем в профиль
    if ((isHome || inAuthGroup) && !onProfile) {
      router.replace('/profile');
    }
  }, [isReady, isAuthChecking, accessToken, segments, router]);
  
  if (!isReady || isAuthChecking) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.palette.totalBlack,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={theme.palette.white} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.palette.totalBlack}
      />
      <Slot />
    </>
  );
}
