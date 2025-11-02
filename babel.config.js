// babel.config.js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // другие плагины (если есть)
      'react-native-reanimated/plugin',   // ВАЖНО: последним!
    ],
  }
}
