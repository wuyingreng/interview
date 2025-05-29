

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('content-type', 'application/json');

  const resData = {
    name: "Emily1000000",
    site: 'mocoo',
    // 在实际的前端项目里面，在普通的js代码中获取环境变量还是需要在webpack中配置的
    env: process.env.NODE_ENV,
    test: process.env.NODE_TEST
  }
  /**
   * 下面一定要加JSON.stringify 这个方法，否则会报错
   * TypeError [ERR_INVALID_ARG_TYPE]: The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. 
   * Received an instance of Object.
   * 
   * 虽然我这边返回的是个字符串，但是因为content-type设置为了json,所以浏览器自动解析为了json
  */

  res.end(JSON.stringify(resData))
}

module.exports = serverHandle