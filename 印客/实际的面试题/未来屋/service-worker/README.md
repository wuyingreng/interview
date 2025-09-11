# Service Worker 缓存策略详解

## 📋 目录

- [概述](#概述)
- [缓存策略类型](#缓存策略类型)
- [何时使用强缓存](#何时使用强缓存)
- [何时使用协商缓存](#何时使用协商缓存)
- [项目结构](#项目结构)
- [使用方法](#使用方法)
- [配置说明](#配置说明)
- [最佳实践](#最佳实践)
- [性能优化](#性能优化)
- [故障排除](#故障排除)

## 🎯 概述

Service Worker 缓存策略是现代 Web 应用性能优化的核心技术。本项目提供了完整的缓存策略实现，包括强缓存和协商缓存两种主要策略，以及相应的工具函数和演示页面。

### 核心特性

- ✅ **多种缓存策略**：Cache First、Network First、Network Only、Cache Only
- ✅ **智能资源分类**：根据资源类型自动选择最佳策略
- ✅ **缓存管理**：自动清理过期缓存，控制缓存大小
- ✅ **离线支持**：提供完整的离线体验
- ✅ **性能监控**：实时监控缓存命中率和性能指标
- ✅ **可视化演示**：直观的演示页面和测试工具

## 🔄 缓存策略类型

### 1. 强缓存 (Cache First)

**策略逻辑**：优先使用缓存，缓存未命中时请求网络

```javascript
// 执行流程
1. 检查缓存 → 2. 缓存命中？ → 3. 返回缓存内容
                    ↓ 否
4. 请求网络 → 5. 更新缓存 → 6. 返回网络响应
```

**适用场景**：
- 静态资源文件 (JS, CSS, 图片, 字体)
- 版本化资源 (带 hash 的文件名)
- 不经常变化的资源
- 离线优先的应用资源

**优势**：
- 极快的加载速度
- 减少网络请求
- 离线可用
- 降低服务器负载

### 2. 协商缓存 (Network First)

**策略逻辑**：优先请求网络，网络失败时使用缓存

```javascript
// 执行流程
1. 请求网络 → 2. 网络成功？ → 3. 更新缓存 → 4. 返回网络响应
                    ↓ 否
5. 检查缓存 → 6. 缓存命中？ → 7. 返回缓存内容
                    ↓ 否
8. 返回错误或离线页面
```

**适用场景**：
- API 接口数据
- 动态内容
- 用户生成内容
- 需要实时性的资源
- 配置信息

**优势**：
- 数据实时性
- 网络失败时的降级方案
- 平衡性能和实时性
- 自动更新机制

### 3. 仅网络 (Network Only)

**策略逻辑**：只使用网络请求，不使用缓存

```javascript
// 执行流程
1. 请求网络 → 2. 返回网络响应
```

**适用场景**：
- 用户登录/注销
- 支付操作
- 文件上传
- 管理操作
- 敏感数据

**优势**：
- 数据安全性
- 实时性保证
- 避免敏感信息泄露

### 4. 仅缓存 (Cache Only)

**策略逻辑**：只使用缓存，不请求网络

```javascript
// 执行流程
1. 检查缓存 → 2. 返回缓存内容
```

**适用场景**：
- 离线模式
- 预加载资源
- 关键资源
- 备用内容
- 降级方案

**优势**：
- 离线可用
- 极快响应
- 节省带宽

## 🎯 何时使用强缓存

### 推荐使用场景

#### 1. 静态资源文件
```javascript
// 这些资源适合强缓存
- JavaScript 文件 (.js)
- CSS 样式文件 (.css)
- 图片资源 (.png, .jpg, .svg, .webp)
- 字体文件 (.woff, .woff2, .ttf)
- 图标文件 (.ico)
```

#### 2. 版本化资源
```javascript
// 带 hash 的文件名，内容变化时文件名也会变化
- bundle.a1b2c3d4.js
- main.e5f6g7h8.css
- logo.i9j0k1l2.svg
```

#### 3. 第三方库文件
```javascript
// CDN 上的第三方库
- https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js
- https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css
```

#### 4. 应用核心资源
```javascript
// 应用启动必需的关键资源
- 主 HTML 文件
- 核心 JavaScript 文件
- 关键 CSS 文件
- 应用图标和清单文件
```

### 配置示例

```javascript
// 强缓存配置
const CACHE_CONFIG = {
  STRONG_CACHE: [
    '/',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/static/media/logo.svg',
    '/manifest.json'
  ],
  DEFAULT_TTL: 7 * 24 * 60 * 60 * 1000, // 7天
  MAX_ENTRIES: 100
};
```

## 🔄 何时使用协商缓存

### 推荐使用场景

#### 1. API 接口数据
```javascript
// 需要实时性的 API 数据
- /api/users          // 用户信息
- /api/posts          // 文章列表
- /api/comments       // 评论数据
- /api/notifications  // 通知信息
```

#### 2. 动态内容
```javascript
// 用户生成或经常变化的内容
- 用户个人资料
- 实时聊天消息
- 动态配置信息
- 系统状态数据
```

#### 3. HTML 页面
```javascript
// 可能包含动态内容的页面
- 首页 (/)
- 用户页面 (/user/:id)
- 文章页面 (/post/:id)
- 搜索结果页面 (/search?q=...)
```

#### 4. 配置和元数据
```javascript
// 可能变化的配置信息
- 应用配置 (/api/config)
- 功能开关 (/api/features)
- 系统信息 (/api/system)
- 版本信息 (/api/version)
```

### 配置示例

```javascript
// 协商缓存配置
const CACHE_CONFIG = {
  NEGOTIATED_CACHE: [
    '/api/users',
    '/api/posts',
    '/api/analytics',
    '/api/config'
  ],
  DEFAULT_TTL: 5 * 60 * 1000, // 5分钟
  MAX_ENTRIES: 50,
  NETWORK_TIMEOUT: 5000 // 5秒
};
```

## 📁 项目结构

```
service-worker/
├── sw.js                    # Service Worker 主文件
├── strategies/              # 缓存策略实现
│   ├── cache-first.js      # 强缓存策略
│   └── network-first.js    # 协商缓存策略
├── utils/                   # 工具函数
│   ├── cache-config.js     # 缓存配置
│   └── cache-utils.js      # 缓存工具
├── demo/                    # 演示页面
│   ├── index.html          # 演示页面
│   └── demo.js             # 演示脚本
└── README.md               # 说明文档
```

## 🚀 使用方法

### 1. 基本使用

```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker/sw.js')
    .then(registration => {
      console.log('Service Worker 注册成功');
    })
    .catch(error => {
      console.error('Service Worker 注册失败:', error);
    });
}
```

### 2. 自定义配置

```javascript
// 修改缓存配置
const customConfig = {
  STRONG_CACHE: [
    '/my-app/',
    '/my-app/static/js/app.js',
    '/my-app/static/css/app.css'
  ],
  NEGOTIATED_CACHE: [
    '/my-app/api/data',
    '/my-app/api/users'
  ],
  DEFAULT_TTL: {
    static: 30 * 24 * 60 * 60 * 1000, // 30天
    api: 10 * 60 * 1000 // 10分钟
  }
};
```

### 3. 监听缓存事件

```javascript
// 监听 Service Worker 消息
navigator.serviceWorker.addEventListener('message', event => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'CACHE_UPDATED':
      console.log('缓存已更新:', data);
      break;
    case 'CACHE_ERROR':
      console.error('缓存错误:', data);
      break;
  }
});
```

## ⚙️ 配置说明

### 缓存配置参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `VERSION` | string | 'v1.0.0' | 缓存版本号 |
| `CACHE_PREFIX` | string | 'sw-cache' | 缓存名称前缀 |
| `DEFAULT_TTL` | object | 见配置 | 各类型资源的默认TTL |
| `MAX_ENTRIES` | object | 见配置 | 各类型资源的最大条目数 |
| `NETWORK_TIMEOUT` | object | 见配置 | 各类型资源的网络超时时间 |

### 资源类型配置

```javascript
const RESOURCE_TYPES = {
  STATIC: 'static',      // 静态资源
  API: 'api',           // API 接口
  HTML: 'html',         // HTML 页面
  IMAGE: 'image',       // 图片资源
  FONT: 'font',         // 字体资源
  SCRIPT: 'script',     // JavaScript 文件
  STYLE: 'style',       // CSS 文件
  MANIFEST: 'manifest', // 应用清单
  SENSITIVE: 'sensitive' // 敏感操作
};
```

### 缓存策略配置

```javascript
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',           // 强缓存
  NETWORK_FIRST: 'network-first',       // 协商缓存
  NETWORK_ONLY: 'network-only',         // 仅网络
  CACHE_ONLY: 'cache-only',             // 仅缓存
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate' // 过期重新验证
};
```

## 🏆 最佳实践

### 1. 资源分类策略

```javascript
// 根据资源类型选择合适的缓存策略
const getCacheStrategy = (url) => {
  if (url.includes('/static/') || url.match(/\.(js|css|png|jpg|svg)$/)) {
    return CACHE_STRATEGIES.CACHE_FIRST; // 静态资源用强缓存
  }
  
  if (url.includes('/api/')) {
    return CACHE_STRATEGIES.NETWORK_FIRST; // API 用协商缓存
  }
  
  if (url.includes('/auth/') || url.includes('/payment/')) {
    return CACHE_STRATEGIES.NETWORK_ONLY; // 敏感操作仅网络
  }
  
  return CACHE_STRATEGIES.NETWORK_FIRST; // 默认协商缓存
};
```

### 2. 缓存过期管理

```javascript
// 设置合理的缓存过期时间
const CACHE_TTL = {
  // 静态资源 - 长期缓存
  static: 30 * 24 * 60 * 60 * 1000, // 30天
  
  // API 数据 - 短期缓存
  api: 5 * 60 * 1000, // 5分钟
  
  // HTML 页面 - 中期缓存
  html: 60 * 60 * 1000, // 1小时
  
  // 图片资源 - 中期缓存
  image: 7 * 24 * 60 * 60 * 1000, // 7天
};
```

### 3. 缓存大小控制

```javascript
// 控制缓存大小，避免占用过多存储空间
const MAX_CACHE_SIZE = {
  static: 50 * 1024 * 1024,  // 50MB
  api: 10 * 1024 * 1024,     // 10MB
  image: 100 * 1024 * 1024,  // 100MB
  total: 200 * 1024 * 1024   // 200MB 总限制
};
```

### 4. 错误处理

```javascript
// 提供优雅的错误处理和降级方案
const handleCacheError = (error, request) => {
  console.error('缓存错误:', error);
  
  // 根据请求类型提供不同的降级方案
  if (request.destination === 'image') {
    return createPlaceholderImage();
  }
  
  if (request.url.includes('/api/')) {
    return createOfflineApiResponse();
  }
  
  return createOfflinePage();
};
```

## 🚀 性能优化

### 1. 预缓存关键资源

```javascript
// 在 Service Worker 安装时预缓存关键资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('precache-v1')
      .then(cache => {
        return cache.addAll([
          '/',
          '/static/js/bundle.js',
          '/static/css/main.css',
          '/manifest.json'
        ]);
      })
  );
});
```

### 2. 缓存更新策略

```javascript
// 使用版本控制管理缓存更新
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

// 激活时清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
```

### 3. 网络请求优化

```javascript
// 设置合理的网络超时时间
const fetchWithTimeout = (request, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  return fetch(request, { signal: controller.signal })
    .finally(() => clearTimeout(timeoutId));
};
```

### 4. 缓存监控

```javascript
// 监控缓存性能
const monitorCachePerformance = async () => {
  const cacheNames = await caches.keys();
  const stats = await Promise.all(
    cacheNames.map(async name => {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      return {
        name,
        size: keys.length,
        urls: keys.map(r => r.url)
      };
    })
  );
  
  console.log('缓存统计:', stats);
  return stats;
};
```

## 🔧 故障排除

### 常见问题

#### 1. Service Worker 未注册

**问题**：Service Worker 注册失败
**解决方案**：
- 检查文件路径是否正确
- 确保在 HTTPS 环境下运行
- 检查浏览器控制台错误信息

#### 2. 缓存未生效

**问题**：资源没有被缓存
**解决方案**：
- 检查缓存策略配置
- 确认资源 URL 匹配规则
- 检查网络请求是否成功

#### 3. 缓存过期问题

**问题**：缓存内容未及时更新
**解决方案**：
- 调整缓存 TTL 设置
- 使用版本控制管理缓存
- 实现缓存更新机制

#### 4. 存储空间不足

**问题**：缓存存储空间超限
**解决方案**：
- 减少缓存条目数量
- 清理过期缓存
- 优化缓存策略

### 调试工具

```javascript
// 缓存调试工具
const debugCache = async () => {
  const cacheNames = await caches.keys();
  console.log('可用缓存:', cacheNames);
  
  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    console.log(`缓存 ${name}:`, keys.map(r => r.url));
  }
};

// 性能监控
const monitorPerformance = () => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log('页面加载时间:', entry.loadEventEnd - entry.loadEventStart);
      }
    }
  });
  
  observer.observe({ entryTypes: ['navigation'] });
};
```

## 📚 参考资料

- [Service Workers MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Cache API MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
- [Web 缓存策略指南](https://web.dev/cache-api-quick-guide/)
- [PWA 缓存策略最佳实践](https://web.dev/offline-cookbook/)

---

**💡 提示**：这个 Service Worker 缓存系统提供了完整的缓存策略实现，可以根据具体需求进行调整和扩展。建议在实际使用前进行充分测试，确保符合应用的性能和安全要求。
