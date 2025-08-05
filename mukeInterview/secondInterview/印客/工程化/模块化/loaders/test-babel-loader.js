// 返回的内容 string buffer
//

// 1: content是什么
// 2. this 是什么
// 3. 这个代码是不是写的又没有，没有返回babelCore.transform的结果。
// 4. const callback = this.async() 是什么意思？哪句话可以告诉webpack是异步的loader，
//   什么时候判断执行完成

const babelCore = require('@babel/core')
/**
 * content 是当前 loader 要处理的源文件内容（字符串格式）。
 *例如：
 *如果是处理 .js 文件，content 就是 JavaScript 代码的字符串
 *如果是处理 .css 文件，content 就是 CSS 代码的字符串
 *如果是处理 .vue 文件，content 就是 Vue 单文件组件的字符串
*/
module.exports = function (content) {
  /**
   * this 是 webpack 提供的 loader context（加载器上下文），包含了当前 loader 执行时的各种信息和工具方法。
 *主要属性包括：
 *this.getOptions() - 获取 loader 的配置选项
 *this.async() - 将 loader 标记为异步
 *this.callback() - 异步回调函数
 *this.resourcePath - 当前处理的文件路径
 *this.sourceMap - 是否需要生成 source map
  */
  const options = this.getOptions()
  /*
  * 有些场景需要io 是异步操作 标明异步loader
  * 返回一个回调函数，用于在异步操作完成后通知 webpack
  * callback函数的参数如下：
  * error: 错误对象，成功时为 null
 *result: 处理后的内容
 *sourceMap: 源码映射（可选）
 *meta: 元数据（可选）
 * this.async() 是返回this.callback的
  */

  const callback = this.async()
  // _compilation 实例
  console.log('编译上下文:', this._compilation);
  // 类似
  // 这个callback有点奇怪，成功在前，失败的在后
  babelCore.transform(content, options, (err, res) => {
    if (err) {
      callback(err)
    } else {
      console.log('async loader')
      callback(null, res.code) // 这里返回了转换后的代码
    }
  })

  // 这里的代码不会执行了。因为callback已经执行完了
  //   return babelCore.transform(source, options).code
}
