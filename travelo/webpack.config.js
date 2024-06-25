const webpack = require('webpack');

module.exports = {
  // Other configurations...
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
