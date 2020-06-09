module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
          '.png',
          '.jpg',
        ],
        root: ['.'],
        alias: {
          '@src': './src',
          '@models': './src/models',
          '@services': './src/services',
          '@components': './src/components',
          '@shared': './src/components/shared',
          '@styles': './src/styles',
          '@store': './src/store',
          '@utils': './src/utils',
          '@assets': './assets',
        },
      },
    ],
  ],
};
