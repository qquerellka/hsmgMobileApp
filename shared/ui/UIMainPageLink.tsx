// ui/UIMainPageLink.tsx
import { Link, type Href } from 'expo-router';
import { ReactNode } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { theme } from '@/shared/config/theme';
import { UIText } from '@/shared/ui/UIText';

type Props = {
  href: Href;
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  // 👇 вместо PressableProps['style']
  style?: StyleProp<ViewStyle>;
};

export const UIMainPageLink = ({
  href,
  children,
  title,
  subtitle = 'Твое приложение для тренировок',
  style,
}: Props) => {
  return (
    <Link href={href} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed,
          style,
        ]}
      >
        <View style={{ flex: 1 }}>
          {title && (
            <UIText weight={600} style={styles.title}>
              {title}
            </UIText>
          )}
          {subtitle && <UIText style={styles.subtitle}>{subtitle}</UIText>}
          {children}
        </View>

        <Image
          source={require('../../assets/icons/navProfileIcon.png')}
          style={{ width: 32, height: 32, tintColor: theme.palette.white }}
          resizeMode="contain"
        />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  pressed: { opacity: 0.85 },
  title: { fontSize: 18, color: theme.palette.white },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  container: {
    marginTop: 80,
    backgroundColor: theme.palette.totalBlack,
    paddingHorizontal: 50,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderRadius: 50,
  },
});
