const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)

  // 设置 CORS 头（关键部分）
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8011')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // 处理普通请求
  if (parsedUrl.pathname === '/api/data') {
    // 设置 cookie 测试凭证
    res.setHeader('Set-Cookie', 'token=abc123; SameSite=None; Secure')

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: '跨域请求成功', data: [1, 2, 3] }))
    return
  }

  res.writeHead(404)
  res.end('Not Found')
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})