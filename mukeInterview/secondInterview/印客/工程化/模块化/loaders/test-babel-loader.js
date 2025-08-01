// 返回的内容 string buffer
//
const babelCore = require('@babel/core')
module.exports = function (content) {
  const options = this.getOptions()
  //   有些场景需要io 是异步操作 标明异步loader
  const callback = this.async()
  babelCore.transform(content, options, (err, res) => {
    if (err) {
      callback(err)
    } else {
      console.log('async loader')
      callback(null, res.code)
    }
  })

  //   return babelCore.transform(source, options).code
}
