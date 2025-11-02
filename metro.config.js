// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// Подключаем трансформер для .svg
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Убираем svg из ассетов и добавляем как исходники
const { assetExts, sourceExts } = config.resolver;
config.resolver.assetExts = assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...sourceExts, 'svg'];

module.exports = config;
