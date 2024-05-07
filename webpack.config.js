const path = require('path');

module.exports = {
  entry: [
    './src/common.ts',
    './src/Config.ts',
    './src/index.ts',
    './src/directions/Directions.ts',
    './src/directions/Result.ts',
    './src/info/InfoHandler.ts',
    './src/info/RouteGuideHandler.ts',
    './src/render/CanvasHandler.ts',
    './src/utils/HTMLBuilder.ts',
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'script'),
  },
};