// ui/UIMainLink.tsx
import { ReactNode } from "react";
import { Pressable, View, StyleSheet, PressableProps } from "react-native";
import { Link, type Href } from "expo-router";
import { UIText } from "./UIText";
import { UIIcon } from "./UIIcon";
type Props = {
  href: Href;
  children?: ReactNode;
  title?: string;
} & Omit<PressableProps, "onPress">;

export const UIMainPageLink = ({
  href,
  children,
  title,
  style,
  ...rest
}: Props) => {
  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="button"
        android_ripple={{ foreground: true }}
        {...rest}
      >
        {children ?? (
          <View style={styles.container}>
            <UIText weight={'semibold'} style={styles.title}>
              {title}
            </UIText>

            <UIIcon name={"link"} size={40} />
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
