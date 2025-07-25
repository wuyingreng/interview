
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
  console.log('req==>', req)
  const url = req.url;
  req.path = url.split('?')[0]
  // 设置返回格式
  res.setHeader('content-type', 'application/json');
  // 处理 blog 路由
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  // 处理 user 路由
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }

  // 未命中路由，返回 404
  res.writeHead(404, { "Content-type": "text/plain" })
  res.write("404 Not Found\n")
  res.end()
}

module.exports = serverHandle