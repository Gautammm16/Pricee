const crypto = require('crypto');

module.exports = {
  // your existing configuration
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
    },
  },
};