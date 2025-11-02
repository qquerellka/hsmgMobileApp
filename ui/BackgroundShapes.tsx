// ui/BackgroundShapes.tsx
import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Svg, { G } from "react-native-svg";

import Up from "@/assets/backgroundSvg/up.svg";
import Cup from "@/assets/backgroundSvg/cup.svg";
import Muscle from "@/assets/backgroundSvg/muscle.svg";
import Lightning from "@/assets/backgroundSvg/lightning.svg";
import Metal from "@/assets/backgroundSvg/metal.svg";
import Man from "@/assets/backgroundSvg/man.svg";

export const BackgroundShapes = () => {
  const { width, height } = useWindowDimensions();
  const vbW = Math.round(width);
  const vbH = Math.round(height);

  return (
    <Svg
      pointerEvents="none"
      style={StyleSheet.absoluteFillObject}
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="none"
    >
      {/* 1 */}
      <G transform="translate(64, 24)">
        <G opacity={0.12} transform="scale(1.18)"><Man width={88} height={88} /></G>
      </G>

      {/* 2 */}
      <G transform={`translate(${vbW - 96}, 160)`}>
        <G opacity={0.10} transform="scale(1.18)"><Metal width={80} height={80} /></G>
      </G>

      {/* 3 */}
      <G transform={`translate(24,${Math.round(vbH * 0.45)}) `}>
        <G opacity={0.10} transform="scale(1.18)"><Muscle width={196} height={196} /></G>
      </G>

      {/* 4 */}
      <G transform={`translate(${vbW - 144},${Math.round(vbH * 0.4)}) rotate(-12)`}>
        <G opacity={0.10} transform="scale(1.2)"><Lightning width={117} height={117} /></G>
      </G>

      {/* 5 */}
      <G transform={`translate(40,${vbH - 180}) rotate(8)`}>
        <G opacity={0.10} transform="scale(1.18)"><Cup width={90} height={90} /></G>
      </G>

      {/* 6 */}
      <G transform={`translate(${vbW - 200},${vbH - 200})`}>
        <G opacity={0.10} transform="scale(1.18)"><Up width={155} height={155} /></G>
      </G>
    </Svg>
  );
};
