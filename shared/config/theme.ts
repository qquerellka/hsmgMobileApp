import type { ColorValue } from 'react-native';

export const palette = {
  grey: '#BCBBBB',
  black: '#1C1C1E',
  totalBlack: '#000000',
  white: '#FFFFFF',
  blue: '#9ECCFF80',
  darkBlue: '#007AFF',
  border: '#D1D1D2',
  input: '#F9FAFB',
  lightGrey: '#F3F4F6',
  darkGrey: '#8C8C8D',
  red: '#FA5C4A',
  green: '#00FFAA',
} as const;

export type Palette = typeof palette;

export type GradientColors = [ColorValue, ColorValue, ...ColorValue[]];

export type GradientDef = {
  colors: GradientColors;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
};

// используем `satisfies`, чтобы и тип проверить, и литералы сохранить
export const gradients = {
  main: {
    colors: [palette.darkBlue, palette.green],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  toBottom: {
    colors: [palette.darkBlue, palette.green],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  form: {
    colors: ['rgba(169,210,255,0.6)', 'rgba(169,210,255,0.3)'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
} satisfies Record<string, GradientDef>;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export type Gradients = typeof gradients;

export const theme = { palette, gradients, spacing };
export type Theme = typeof theme;
