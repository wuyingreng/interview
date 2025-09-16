# 商品管理系统 - React + ahooks useRequest 演示

这个项目演示了如何使用 React 和 ahooks 的 useRequest 实现商品列表页和商品详情页，并展示 SWR（Stale-While-Revalidate）缓存功能。

## 功能特性

- ✅ 商品列表页展示多个商品
- ✅ 商品详情页显示单个商品的详细信息
- ✅ 使用 ahooks useRequest 实现数据请求
- ✅ 实现 SWR 缓存功能：优先返回缓存数据，后台重新请求
- ✅ 两个组件共享相同的缓存键 `product-123`
- ✅ 响应式设计，支持移动端

## 技术栈

- React 18
- ahooks 3.7.8
- React Router DOM 6
- Vite 4

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 http://localhost:3000

## 项目结构

```
src/
├── api/
│   └── product.js          # API 服务函数
├── components/
│   ├── ProductList.jsx     # 商品列表页组件
│   └── ProductDetail.jsx   # 商品详情页组件
├── App.jsx                 # 主应用组件
├── App.css                 # 样式文件
└── main.jsx               # 应用入口
```

## 核心实现

### 1. API 服务函数

```javascript
export const getProductDetail = async (productId) => {
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockProduct;
};
```

### 2. useRequest 配置

```javascript
const { data, loading, error } = useRequest(
  () => getProductDetail(id),
  {
    cacheKey: `product-${id}`,        // 缓存键
    refreshOnWindowFocus: true,       // 窗口聚焦时重新请求
    cacheTime: 5 * 60 * 1000,        // 缓存时间 5 分钟
    staleTime: 30 * 1000,            // 重新验证时间 30 秒
  }
);
```

### 3. SWR 缓存机制

- **首次请求**：显示加载状态，请求完成后显示数据
- **后续请求**：立即返回缓存数据，同时在后台重新请求
- **数据更新**：后台请求完成后自动更新界面
- **缓存共享**：不同组件使用相同 cacheKey 可以共享缓存

## 演示场景

1. **访问商品列表页**：可以看到商品123的缓存状态演示
2. **点击商品123查看详情**：如果已有缓存，会立即显示缓存数据
3. **返回列表页再进入详情页**：会看到缓存数据立即显示
4. **窗口失焦再聚焦**：会自动重新验证数据

## 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 注意事项

- 这是一个演示项目，API 数据是模拟的
- 实际项目中需要替换为真实的 API 接口
- 可以根据需要调整缓存策略和参数
