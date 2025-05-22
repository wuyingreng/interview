const http = require('http')

const server = http.createServer((req, res) => {
    console.log('req url method: ', req.url, req.method)

    res.setHeader('Access-Control-Allow-Credentials', true) // 允许跨域传递 cookie
    res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域的 origin ，* 代表所有的，谨慎使用
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001') // 允许单个 origin ，可通过前端 JS location.origin 获取
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // 允许的 method

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
        JSON.stringify({ errno: 0, msg: 'CORS nodejs' })
    )
})

server.listen(8000)
console.log('OK')
