// ui/UIMainLink.tsx
import { ReactNode } from "react";
import {
  Pressable,
  Image,
  View,
  StyleSheet,
  PressableProps,
} from "react-native";
import { Link, type Href } from "expo-router";
import { UIText } from "@/ui/UIText";

type Props = {
  href: Href; // куда навигировать
  children?: ReactNode; // свой контент (кастомный)
  title?: string; // быстрый вариант — просто заголовок
  subtitle?: string; // подпись помельче
} & Omit<PressableProps, "onPress">;

export const UIMainPageLink = ({
  href,
  children,
  title,
  subtitle,
  style,
  ...rest
}: Props) => {
  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [styles.base, pressed && styles.pressed, style]}
        android_ripple={{ foreground: true }}
        {...rest}
      >
        {children ?? (
          <View style={styles.container}>
            {title && (
              <UIText weight={600} style={styles.title}>
                {title}
              </UIText>
            )}
            {!!subtitle && (
              <UIText weight={400} style={styles.subtitle}>
                {subtitle}
              </UIText>
            )}
            <Image
              source={require("../assets/linkIcon.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#111827",
  },
  pressed: { opacity: 0.85 },
  title: { fontSize: 18, color: "#fff" },
  subtitle: { marginTop: 4, fontSize: 14, color: "rgba(255,255,255,0.7)" },
  container: {
    marginTop: 80,
    backgroundColor: "#000",
    paddingHorizontal: 50,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20, 
    borderRadius: 50,
  },
});
