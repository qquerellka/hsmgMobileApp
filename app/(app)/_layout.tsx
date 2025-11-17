import React, { useEffect, useState } from "react";
import { Slot, useSegments } from "expo-router";
import { View, StatusBar } from "react-native";
import { theme } from "@shared/config/theme";
import { Screen } from "@shared/ui/Screen";
import { Header } from "@/widgets/header/Header";
import { MenuOverlay } from "@/widgets/menu/MenuOverlay";

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);
  const segments = useSegments();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [segments]);
  return (
    <View style={{ flex: 1, backgroundColor: theme.palette.totalBlack }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.palette.totalBlack}
      />

      <Header isMenuOpen={isMenuOpen} onBurgerPress={handleToggleMenu} />

      <Screen>
        <Slot />
      </Screen>

      {isMenuOpen && <MenuOverlay onClose={handleCloseMenu} />}
    </View>
  );
}
