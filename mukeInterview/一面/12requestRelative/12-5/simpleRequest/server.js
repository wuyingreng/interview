const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)

  // 设置 CORS 头（允许简单请求）
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8011')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // 处理简单的GET请求
  if (req.method === 'GET' && parsedUrl.pathname === '/api/simple-data') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      message: '简单请求成功！浏览器没有发送预检请求',
      data: ['苹果', '香蕉', '橙子'],
      timestamp: new Date().toISOString()
    }))
    return
  }

  // 处理简单的POST请求 (Content-Type: application/x-www-form-urlencoded)
  if (req.method === 'POST' && parsedUrl.pathname === '/api/simple-post') {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        message: '简单POST请求成功！',
        receivedData: body,
        timestamp: new Date().toISOString()
      }))
    })
    return
  }

  // 处理简单的POST请求 (Content-Type: text/plain)
  if (req.method === 'POST' && parsedUrl.pathname === '/api/simple-text') {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        message: '简单文本请求成功！',
        receivedText: body,
        timestamp: new Date().toISOString()
      }))
    })
    return
  }

  res.writeHead(404)
  res.end('Not Found')
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`简单请求服务器运行在 http://localhost:${PORT}`)
  console.log('这个服务器只处理简单请求，不会触发CORS预检请求')
}) 