const { default: axios } = require('axios');
const path = require('path');
const webpack = require('webpack')
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'animal-api.js',
    library: 'AnimalApi',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  // externals: {
  //   axios: "axios"
  // },
  plugins: [
    new webpack.ProvidePlugin({
      axios: 'axios' // 自动加载 axios
    }),
  ]

}