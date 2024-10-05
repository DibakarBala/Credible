const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "assert": require.resolve("assert/"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "url": require.resolve("url/"),
    "zlib": require.resolve("browserify-zlib"),
    "path": require.resolve("path-browserify"),
    "fs": false,
    "net": false,
    "tls": false,
    "child_process": false,
    "vm": require.resolve("vm-browserify"),
    "process": require.resolve("process/browser"),
  };
  
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': require.resolve('./src/mocks/react-native.js'),
    'react-native-webview$': require.resolve('./src/mocks/react-native.js'),
    'react-native-tcp-socket': require.resolve('./src/mocks/react-native-tcp-socket.js'),
    'process/browser': require.resolve('process/browser'),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ];

  return config;
};