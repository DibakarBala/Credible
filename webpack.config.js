const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "assert": require.resolve("assert/"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
    },
    alias: {
      'react-native$': path.resolve(__dirname, 'src/mocks/react-native.js'),
      'react-native-webview$': path.resolve(__dirname, 'src/mocks/react-native.js'),
    },
    extensions: ['.web.js', '.js', '.json']
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ],
};