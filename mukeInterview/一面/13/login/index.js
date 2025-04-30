const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// 中间件
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// 数据库连接
mongoose.connect('mongodb://localhost:27017/login-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 用户模型
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// 路由
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 检查用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 12);

    // 创建新用户
    const user = new User({
      username,
      password: hashedPassword
    });
    await user.save();

    res.status(201).json({ message: '用户注册成功' });
  } catch (error) {
    res.status(500).json({ message: '注册失败', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }

    // 生成JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // 设置Cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000 // 1小时
    });

    res.status(200).json({ message: '登录成功', token });
  } catch (error) {
    res.status(500).json({ message: '登录失败', error: error.message });
  }
});

app.get('/api/user', (req, res) => {
  // 获取用户信息
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));