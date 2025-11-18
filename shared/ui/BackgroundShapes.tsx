import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import Up from "@/assets/backgroundSvg/up.svg";
import Cup from "@/assets/backgroundSvg/cup.svg";
import Muscle from "@/assets/backgroundSvg/muscle.svg";
import Lightning from "@/assets/backgroundSvg/lightning.svg";
import Metal from "@/assets/backgroundSvg/metal.svg";
import Man from "@/assets/backgroundSvg/man.svg";

const BG_ICON_OPACITY = 0.75;

export const BackgroundShapes = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
      <Man
        width={88}
        height={88}
        style={[
          styles.icon,
          {
            top: 24,
            left: 32,
            opacity: BG_ICON_OPACITY,
          },
        ]}
      />

      <Metal
        width={80}
        height={80}
        style={[
          styles.icon,
          {
            top: 160,
            left: width - 96,
            opacity: BG_ICON_OPACITY,
          },
        ]}
      />

      <Muscle
        width={196}
        height={196}
        style={[
          styles.icon,
          {
            top: Math.round(height * 0.45),
            left: 24,
            opacity: BG_ICON_OPACITY,
          },
        ]}
      />

      <Lightning
        width={117}
        height={117}
        style={[
          styles.icon,
          {
            top: Math.round(height * 0.4),
            left: width - 144,
            opacity: BG_ICON_OPACITY,
            transform: [{ rotate: "-12deg" }],
          },
        ]}
      />

      <Cup
        width={90}
        height={90}
        style={[
          styles.icon,
          {
            top: height - 180,
            left: 40,
            opacity: BG_ICON_OPACITY,
            transform: [{ rotate: "8deg" }],
          },
        ]}
      />

      <Up
        width={155}
        height={155}
        style={[
          styles.icon,
          {
            top: height - 250,
            left: width - 200,
            opacity: BG_ICON_OPACITY,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
  },
});
