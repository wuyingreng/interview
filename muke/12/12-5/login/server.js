const express = require('express')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const app = express()

// // 新增中间件配置
// app.use(cookieParser())
// app.use(cors({
//   origin: 'http://localhost:8011',
//   credentials: true
// }))


// 中间件配置
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Session 配置
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // 生产环境应设为 true (HTTPS)
    maxAge: 24 * 60 * 60 * 1000 // 24小时
  }
}))

// 模拟用户数据库
const users = [
  {
    id: 1,
    username: 'admin',
    // 密码: "admin123" 的哈希
    password: bcrypt.hashSync('admin123', 8),
    token: null
  }
]

// 登录路由
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  // 1. 验证用户是否存在
  const user = users.find(u => u.username === username)
  if (!user) {
    return res.status(401).json({ message: '用户不存在' })
  }

  // 2. 验证密码
  const passwordValid = await bcrypt.compare(password, user.password)
  if (!passwordValid) {
    return res.status(401).json({ message: '密码错误' })
  }

  // 3. 生成访问令牌
  const token = crypto.randomBytes(32).toString('hex')
  user.token = token

  // 4. 设置 Session 和 Cookie
  req.session.userId = user.id
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  })

  res.json({
    message: '登录成功',
    user: { id: user.id, username: user.username }
  })
})

// 受保护路由
app.get('/api/profile', (req, res) => {
  // 验证 Session
  if (!req.session.userId) {
    return res.status(401).json({ message: '未登录' })
  }

  console.log('req==>', req)
  // 验证 Token
  const token = req.cookies.token
  const user = users.find(u => u.id === req.session.userId && u.token === token)

  if (!user) {
    return res.status(401).json({ message: '无效令牌' })
  }

  res.json({
    user: { id: user.id, username: user.username }
  })
})

// 退出登录
app.post('/api/logout', (req, res) => {
  req.session.destroy()
  res.clearCookie('token')
  res.json({ message: '已退出登录' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})