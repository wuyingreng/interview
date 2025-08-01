// 返回的内容 string buffer
module.exports = function (source) {
  console.log(source, 'self-loader')
  console.log('options', this.getOptions())
  return source
}
