# 🚀 Service Worker 缓存策略演示 - 快速启动指南

## ⚠️ 重要说明

**Service Worker 必须在 HTTPS 或 localhost 环境下运行！**

直接打开 HTML 文件（file:// 协议）无法使用 Service Worker，必须通过 HTTP 服务器访问。

## 🎯 快速启动

### 方法一：使用启动脚本（推荐）

#### macOS/Linux 用户
```bash
cd service-worker
./start.sh
```

#### Windows 用户
```cmd
cd service-worker
start.bat
```

### 方法二：手动启动

#### 1. 安装依赖
```bash
cd service-worker
npm install
```

#### 2. 启动服务器
```bash
npm start
# 或者
npm run dev
```

#### 3. 访问演示页面
打开浏览器访问：http://localhost:8080/demo/

## 🌐 访问地址

启动成功后，可以通过以下地址访问：

- **演示页面**: http://localhost:8080/demo/
- **Service Worker**: http://localhost:8080/sw.js
- **项目根目录**: http://localhost:8080/

## 🔧 环境要求

### 必需环境
- **Node.js**: 14.0.0 或更高版本
- **npm**: 6.0.0 或更高版本
- **现代浏览器**: Chrome 60+, Firefox 55+, Safari 11.1+, Edge 79+

### 推荐环境
- **Node.js**: 16.x 或 18.x LTS 版本
- **浏览器**: Chrome 最新版本（最佳支持）

## 📱 浏览器支持

| 浏览器 | Service Worker | Cache API | 支持状态 |
|--------|---------------|-----------|----------|
| Chrome | ✅ 40+ | ✅ 40+ | 完全支持 |
| Firefox | ✅ 44+ | ✅ 41+ | 完全支持 |
| Safari | ✅ 11.1+ | ✅ 13+ | 完全支持 |
| Edge | ✅ 17+ | ✅ 17+ | 完全支持 |

## 🛠️ 故障排除

### 问题 1: Service Worker 未注册

**症状**: 演示页面显示 "Service Worker 未注册"

**解决方案**:
1. 确保通过 HTTP 服务器访问（不是 file:// 协议）
2. 检查浏览器控制台是否有错误信息
3. 确保浏览器支持 Service Worker

### 问题 2: 依赖安装失败

**症状**: `npm install` 失败

**解决方案**:
```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 3: 端口被占用

**症状**: 端口 8080 被占用

**解决方案**:
```bash
# 使用其他端口
npx http-server . -p 3000 -c-1 --cors

# 或者修改 package.json 中的端口号
```

### 问题 4: 缓存策略不生效

**症状**: 缓存策略测试没有效果

**解决方案**:
1. 确保 Service Worker 已正确注册
2. 检查浏览器开发者工具的 Application > Service Workers
3. 清除浏览器缓存后重新测试

## 🧪 测试功能

### 1. 基本功能测试
- ✅ Service Worker 注册状态
- ✅ 缓存数量统计
- ✅ 网络状态监控

### 2. 缓存策略测试
- ✅ 静态资源缓存测试
- ✅ API 请求缓存测试
- ✅ 离线模式测试

### 3. 性能监控
- ✅ 缓存命中率统计
- ✅ 加载时间测量
- ✅ 网络请求监控

## 📊 演示页面功能

### 主界面功能
1. **状态监控**: 实时显示 Service Worker 状态
2. **策略说明**: 详细的缓存策略介绍
3. **测试工具**: 交互式缓存测试
4. **日志查看**: 实时测试日志和结果

### 测试按钮说明
- **注册 Service Worker**: 注册缓存服务
- **测试缓存策略**: 运行完整的缓存测试
- **清空所有缓存**: 清理所有缓存数据
- **注销 Service Worker**: 移除缓存服务

## 🔍 开发者工具

### Chrome DevTools
1. 打开开发者工具 (F12)
2. 进入 Application 标签页
3. 查看 Service Workers 部分
4. 查看 Storage > Cache Storage

### 调试技巧
```javascript
// 在控制台中查看缓存状态
caches.keys().then(names => console.log('缓存列表:', names));

// 查看特定缓存的内容
caches.open('app-cache-v1.0.0').then(cache => {
  cache.keys().then(keys => console.log('缓存内容:', keys));
});

// 清理所有缓存
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

## 🚀 生产环境部署

### 1. 构建优化
```bash
# 压缩 Service Worker 文件
npx terser sw.js -o sw.min.js

# 压缩演示文件
npx html-minifier demo/index.html -o demo/index.min.html
```

### 2. 服务器配置
```nginx
# Nginx 配置示例
location /sw.js {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires "0";
}

location /demo/ {
    try_files $uri $uri/ /demo/index.html;
}
```

### 3. HTTPS 配置
```bash
# 使用 Let's Encrypt 免费证书
sudo certbot --nginx -d yourdomain.com

# 或者使用自签名证书（仅开发环境）
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

## 📚 学习资源

### 官方文档
- [Service Workers MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Cache API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [PWA 指南](https://web.dev/progressive-web-apps/)

### 相关文章
- [Service Worker 缓存策略](https://web.dev/offline-cookbook/)
- [PWA 最佳实践](https://web.dev/pwa-checklist/)
- [Web 性能优化](https://web.dev/fast/)

## 💡 常见问题

### Q: 为什么不能直接打开 HTML 文件？
A: Service Worker 需要 HTTPS 或 localhost 环境才能运行，file:// 协议不支持。

### Q: 如何修改缓存策略？
A: 编辑 `sw.js` 文件中的 `CACHE_CONFIG` 配置，或修改 `utils/cache-config.js`。

### Q: 如何添加新的资源类型？
A: 在 `utils/cache-config.js` 中添加新的资源匹配规则和配置。

### Q: 如何监控缓存性能？
A: 使用演示页面的测试工具，或查看浏览器开发者工具的 Application 标签页。

---

**🎯 提示**: 如果遇到问题，请检查浏览器控制台的错误信息，或参考故障排除部分。大多数问题都与环境配置相关。
