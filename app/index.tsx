// app/(root)/home.tsx (пример)
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UIText } from "@/ui/UIText";
import { UIMainPageLink } from "@/ui/UIMainPageLink";
import { BackgroundShapes } from "@/ui/BackgroundShapes";

export default function HomeScreen() {

  return (
    <LinearGradient
      colors={["#007AFF", "#00FFAA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <BackgroundShapes />

      <UIText weight={600} style={styles.text}>
        Открывай новые тренировки. Вдохновляй своим прогрессом.
      </UIText>
      <UIMainPageLink
        href="/workouts"
        title="Открыть тренировки"
        style={{ marginTop: 24 }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  text: { fontSize: 36, color: "#000", marginTop: 140 },
});
