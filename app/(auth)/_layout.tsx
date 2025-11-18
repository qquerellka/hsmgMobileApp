import React from "react";
import { Slot } from "expo-router";
import { Screen } from "@shared/ui/Screen";

export default function AuthLayout() {
  return (
    <Screen>
      <Slot />
    </Screen>
  );
}
