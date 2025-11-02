// app/workouts/index.tsx
import { View, StyleSheet } from "react-native";
import { UIText } from "@/ui/UIText";

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <UIText weight={700} style={{ fontSize: 24 }}>Тренировки</UIText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
