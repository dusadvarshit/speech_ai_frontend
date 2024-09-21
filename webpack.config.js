const nodeExternals = require('webpack-node-externals');
module.exports = {
  externals: [nodeExternals()],
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "url": require.resolve("url/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "assert": require.resolve("assert/")
    }
  }
}
