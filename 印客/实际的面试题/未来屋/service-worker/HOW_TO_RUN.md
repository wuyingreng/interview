# 🚀 如何运行 Service Worker 缓存策略演示

## ⚠️ 重要提醒

**Service Worker 必须在 HTTP/HTTPS 环境下运行，不能直接打开 HTML 文件！**

直接双击 `demo/index.html` 或使用 `file://` 协议无法使用 Service Worker 功能。

## 🎯 三种启动方式

### 方式一：使用 Node.js（推荐）

#### 前提条件
- 安装 Node.js 14+ 版本
- 下载地址：https://nodejs.org/

#### 启动步骤
```bash
# 1. 进入项目目录
cd service-worker

# 2. 安装依赖
npm install

# 3. 启动服务器
npm start
# 或者
npm run dev
```

#### 访问地址
- 演示页面：http://localhost:8080/demo/
- Service Worker：http://localhost:8080/sw.js

---

### 方式二：使用 Python（无需 Node.js）

#### 前提条件
- 安装 Python 3.6+ 版本
- 大多数系统已预装 Python

#### 启动步骤
```bash
# 1. 进入项目目录
cd service-worker

# 2. 启动 Python 服务器
python3 server.py
# 或者指定端口
python3 server.py 3000
```

#### 访问地址
- 演示页面：http://localhost:8080/demo/
- Service Worker：http://localhost:8080/sw.js

---

### 方式三：使用其他 HTTP 服务器

#### 使用 PHP 内置服务器
```bash
cd service-worker
php -S localhost:8080
```

#### 使用 Ruby 内置服务器
```bash
cd service-worker
ruby -run -e httpd . -p 8080
```

#### 使用 Go 内置服务器
```bash
cd service-worker
go run -m http.server 8080
```

## 🔧 快速启动脚本

### macOS/Linux 用户
```bash
cd service-worker
./start.sh
```

### Windows 用户
```cmd
cd service-worker
start.bat
```

## 🌐 访问演示页面

启动服务器后，在浏览器中访问：

**主要页面**：
- 🎯 **演示页面**：http://localhost:8080/demo/
- ⚙️ **Service Worker**：http://localhost:8080/sw.js
- 📁 **项目根目录**：http://localhost:8080/

## 🧪 功能测试

### 1. 检查 Service Worker 状态
- 打开演示页面
- 查看 "Service Worker 状态" 是否显示 "已注册"
- 如果显示 "未注册"，请检查浏览器控制台错误

### 2. 测试缓存策略
- 点击 "测试缓存策略" 按钮
- 观察测试日志和结果
- 检查缓存命中率统计

### 3. 测试离线模式
- 点击 "测试离线模式" 按钮
- 观察离线状态下的缓存行为
- 验证降级方案是否生效

## 🔍 浏览器开发者工具

### Chrome DevTools
1. 按 F12 打开开发者工具
2. 进入 **Application** 标签页
3. 查看 **Service Workers** 部分
4. 查看 **Storage > Cache Storage**

### 调试命令
在浏览器控制台中运行：

```javascript
// 查看所有缓存
caches.keys().then(names => console.log('缓存列表:', names));

// 查看特定缓存内容
caches.open('app-cache-v1.0.0').then(cache => {
  cache.keys().then(keys => console.log('缓存内容:', keys));
});

// 清理所有缓存
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

## 🛠️ 故障排除

### 问题 1：Service Worker 未注册

**症状**：页面显示 "Service Worker 未注册"

**解决方案**：
1. ✅ 确保通过 HTTP 服务器访问（不是 file:// 协议）
2. ✅ 检查浏览器控制台是否有错误信息
3. ✅ 确保浏览器支持 Service Worker
4. ✅ 尝试硬刷新页面（Ctrl+F5 或 Cmd+Shift+R）

### 问题 2：端口被占用

**症状**：启动服务器时提示端口被占用

**解决方案**：
```bash
# 使用其他端口
python3 server.py 3000
# 或
npm start -- -p 3000
```

### 问题 3：依赖安装失败

**症状**：`npm install` 失败

**解决方案**：
```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 4：Python 服务器启动失败

**症状**：`python3 server.py` 失败

**解决方案**：
```bash
# 检查 Python 版本
python3 --version

# 如果版本过低，请升级 Python
# 或者使用 Node.js 方式
```

## 📱 浏览器兼容性

| 浏览器 | 最低版本 | 推荐版本 | 支持状态 |
|--------|----------|----------|----------|
| Chrome | 40+ | 最新 | ✅ 完全支持 |
| Firefox | 44+ | 最新 | ✅ 完全支持 |
| Safari | 11.1+ | 最新 | ✅ 完全支持 |
| Edge | 17+ | 最新 | ✅ 完全支持 |

## 🎯 演示功能说明

### 主界面功能
1. **状态监控**：实时显示 Service Worker 和缓存状态
2. **策略说明**：详细的缓存策略介绍和使用场景
3. **测试工具**：交互式缓存策略测试
4. **日志查看**：实时测试日志和性能统计

### 测试按钮功能
- **注册 Service Worker**：注册缓存服务
- **测试缓存策略**：运行完整的缓存测试
- **测试静态资源**：测试强缓存策略
- **测试 API 请求**：测试协商缓存策略
- **测试离线模式**：测试离线降级方案
- **清空所有缓存**：清理所有缓存数据
- **注销 Service Worker**：移除缓存服务

## 💡 使用技巧

### 1. 最佳测试流程
1. 启动服务器
2. 打开演示页面
3. 注册 Service Worker
4. 运行缓存策略测试
5. 观察测试结果和日志
6. 尝试离线模式测试

### 2. 性能监控
- 查看缓存命中率统计
- 监控加载时间变化
- 观察网络请求模式
- 分析缓存效果

### 3. 自定义测试
- 修改 `sw.js` 中的缓存配置
- 调整缓存策略参数
- 添加自定义资源类型
- 测试不同的缓存场景

## 🚀 生产环境部署

### 1. 构建优化
```bash
# 压缩 Service Worker
npx terser sw.js -o sw.min.js

# 压缩演示文件
npx html-minifier demo/index.html -o demo/index.min.html
```

### 2. 服务器配置
```nginx
# Nginx 配置
location /sw.js {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}

location /demo/ {
    try_files $uri $uri/ /demo/index.html;
}
```

### 3. HTTPS 配置
```bash
# 使用 Let's Encrypt
sudo certbot --nginx -d yourdomain.com
```

---

**🎯 总结**：选择任一启动方式，确保通过 HTTP 服务器访问，即可体验完整的 Service Worker 缓存策略演示！
