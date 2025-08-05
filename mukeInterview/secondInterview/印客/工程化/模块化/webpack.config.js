// 下面配置的时候有语法提示
/** @type {import("webpack").Configuration} */


const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileListPlugin = require('./plugins/fileList')
// 默认导出

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  // output必须是个对象，因为要制定path,filename
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    environment: {
      arrowFunction: false,
    },
  },
  resolveLoader: {
    // 告诉webpack loader查找规则
    modules: ['node_modules', 'loaders']
  },
  module: {
    // rules也是一个数组
    rules: [
      {
        test: /\.js$/,
        // use是一个数组
        use: [{
          loader: 'babel-loader',
          options: {
            // 这里写错了。要重写下
            presets: ["@babel/preset-env"]
          }
        }, {
          loader: 'self-loader'
        }]
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }, {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader']
      }
    ]

  },
  // plugins也是一个数组
  plugins: [
    // 要传入地址
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new FileListPlugin()
  ]
}