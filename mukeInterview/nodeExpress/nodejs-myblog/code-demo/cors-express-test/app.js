const express = require('express')
const cors = require('cors')

const app = express()

// CORS 允许跨域
app.use(
    cors({
        origin: '*' // 或设置单个 origin
        // 其他配置参考 https://www.npmjs.com/package/cors
    })
)

// 路由
app.get('/', (req, res, next) => {
    res.json({
        errno: 0,
        msg: 'CORS express'
    })
})

app.listen(8000, () => {
    console.log('server is running on port 8000')
})
