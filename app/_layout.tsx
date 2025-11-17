// app/_layout.tsx
import "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { useFonts } from "expo-font";

import { useAuthBootstrap } from "@features/auth/hooks/useAuthBootstrap";
import { theme } from "@shared/config/theme";
import { Header } from "@/widgets/header/Header";
import { MenuOverlay } from "@/widgets/menu/MenuOverlay";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // ждём загрузки шрифтов
  if (!fontsLoaded) {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isReady || isAuthChecking) return;

    const [root, sub] = segments;
    const inAuthGroup = root === "(auth)";
    const inAppGroup = root === "(app)";
    const isHome = !root; // "/" => true

    if (!accessToken) {
      // неавторизован → запрещаем (app)
      if (inAppGroup) {
        router.replace("/");
      }
      return;
    }

    // авторизован
    const onProfile = inAppGroup && sub === "profile";

    if ((isHome || inAuthGroup) && !onProfile) {
      router.replace("/profile");
    }
  }, [isReady, isAuthChecking, accessToken, segments, router]);

  // при смене роута/авторизации закрываем меню
  useEffect(() => {
    if (!isReady) return;
    setIsMenuOpen(false);
  }, [segments, isReady, accessToken]);

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

  const [root, sub] = segments;
  const inAuthGroup = root === "(auth)";
  const isAuthScreenWithoutHeader =
    inAuthGroup && (sub === "login" || sub === "register");

  const shouldShowHeader = !isAuthScreenWithoutHeader;

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.palette.totalBlack }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.palette.totalBlack}
      />

      {shouldShowHeader && (
        <Header isMenuOpen={isMenuOpen} onBurgerPress={handleToggleMenu} />
      )}

      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      {isMenuOpen && <MenuOverlay onClose={handleCloseMenu} />}
    </View>
  );
}
