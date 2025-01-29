const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    client: './src/client.js',
    bundle: './src/server.mjs',
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  target: 'node', // Target for server
  externals: [nodeExternals()], // Excludes node_modules from bundle
};
