const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FileListPlugin = require('./plugins/fileList')

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  output: {
    environment: {
      arrowFunction: false,
    },
    path: __dirname + '/dist',
  },
  resolveLoader: {
    modules: ['node_modules', './loaders'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // babelrc babel-config.js
            // preset-react
            // preset-typescript
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          //   {
          //     loader: 'self-loader',
          //     options: {
          //       name: 'hello self-loader',
          //     },
          //   },
          //   {
          //     loader: 'test-babel-loader',
          //     options: {
          //       presets: ['@babel/preset-env'],
          //     },
          //   },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new FileListPlugin(),
  ],
}
