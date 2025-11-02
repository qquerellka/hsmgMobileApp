// components/UiText.tsx
import { Text, TextProps } from "react-native";

type FontWeight = 400 | 500 | 600 | 700;

type UITextProps = TextProps & {
  weight?: FontWeight;
};

const fontMap: Record<FontWeight, string> = {
  400: "Montserrat_400Regular",
  500: "Montserrat_500Medium",
  600: "Montserrat_600SemiBold",
  700: "Montserrat_700Bold",
};

export const UIText = ({ style, weight = 500, ...rest }: UITextProps) => (
  <Text {...rest} style={[{ fontFamily: fontMap[weight] }, style]} />
);
