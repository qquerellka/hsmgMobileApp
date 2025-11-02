// app/_layout.tsx
import 'react-native-reanimated';
import { Slot } from "expo-router";
import { View, Image, StatusBar, Pressable, StyleSheet } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const HEADER_BAR_HEIGHT = 70;

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <LayoutWithHeader />
    </SafeAreaProvider>
  );
}

function LayoutWithHeader() {
  const insets = useSafeAreaInsets();
  const headerTotalHeight = insets.top + HEADER_BAR_HEIGHT;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View
        style={[
          styles.headerWrap,
          { paddingTop: insets.top, height: headerTotalHeight },
        ]}
      >
        <Header />
      </View>

      <View style={{ flex: 1, paddingTop: headerTotalHeight }}>
        <Slot />
      </View>
    </View>
  );
}

export const Header = () => {
  return (
    <View style={styles.headerInner}>
      <Image
        source={require("../assets/hsmgLogo.png")}
        resizeMode="contain"
        style={{ width: 121, height: 28 }}
      />

      <View style={styles.actions}>
        <Pressable hitSlop={10} onPress={() => {}}>
          <Image
            source={require("../assets/icons/navProfileIcon.png")}
            style={{ width: 44, height: 44, tintColor: "#fff" }}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable hitSlop={10} onPress={() => {}}>
          <Image
            source={require("../assets/icons/navBurgerIcon.png")}
            style={{ width: 44, height: 44, tintColor: "#fff" }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 16,
  },

  headerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "#000",
  },

  headerInner: {
    height: HEADER_BAR_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  actions: {
    flexDirection: "row",
    gap: 16,
  },
});
