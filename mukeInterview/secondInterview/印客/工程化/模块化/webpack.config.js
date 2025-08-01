// 下面配置的时候有语法提示
/** @type {import("webpack").Configuration} */
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  // output必须是个对象，因为要制定path,filename
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      }
    ]

  }
}