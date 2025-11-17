import "react-native-reanimated";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, StatusBar, View } from "react-native";

import { useAuthBootstrap } from "@features/auth/hooks/useAuthBootstrap";
import { theme } from "@shared/config/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGate />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function AuthGate() {
  const segments = useSegments();
  const router = useRouter();

  const {
    isReady,
    isAuthChecking,
    accessToken,
    status,
  } = useAuthBootstrap();

  useEffect(() => {
    if (!isReady || isAuthChecking) return;

    const [root, sub] = segments;
    const inAuthGroup = root === "(auth)";
    const inAppGroup = root === "(app)";
    const isHome = !root;

    if (!accessToken || status === "unauthenticated") {
      if (inAppGroup) {
        router.replace("/");
      }
      return;
    }

    const onProfile = inAppGroup && sub === "profile";

    if ((isHome || inAuthGroup) && !onProfile) {
      router.replace("/profile");
    }
  }, [isReady, isAuthChecking, accessToken, status, segments, router]);

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

  return <Slot />;
}
