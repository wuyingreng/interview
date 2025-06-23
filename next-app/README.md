# Next.js 渲染方式演示项目

这个项目展示了 Next.js 中三种主要渲染方式的完整示例：静态站点生成（SSG）、服务端渲染（SSR）和客户端渲染（CSR）。

## 📊 渲染方式分析

### 🗂️ 静态站点生成（SSG）

这些页面在**构建时**预渲染，生成静态HTML文件：

#### 1. **纯静态页面**
- **`pages/index.tsx`** - 首页
- **`pages/about.tsx`** - 关于页面
- **`pages/blog/index.tsx`** - 博客列表页
- **特点**: 无数据获取函数，完全静态内容
- **优势**: 最快的加载速度，最佳的SEO

#### 2. **带数据的SSG页面**
- **`pages/users/index.tsx`** - 用户列表页
  ```typescript
  export const getStaticProps: GetStaticProps = async () => {
    const items: User[] = sampleUserData;
    return { 
      props: { items, lastUpdated: new Date().toISOString() },
      revalidate: 60 // ISR: 每60秒重新生成
    };
  };
  ```
  - **特点**: 使用 `getStaticProps` + ISR（增量静态再生）
  - **优势**: 静态性能 + 内容更新能力

#### 3. **动态路由SSG页面**
- **`pages/users/[id].tsx`** - 用户详情页
  ```typescript
  export const getStaticPaths: GetStaticPaths = async () => {
    const paths = sampleUserData.map((user) => ({
      params: { id: user.id.toString() },
    }));
    return { paths, fallback: false };
  };

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const item = sampleUserData.find((data) => data.id === Number(params?.id));
    return { props: { item } };
  };
  ```
  - **特点**: 预生成所有可能的动态路径
  - **优势**: 动态路由也享受静态性能

### 🖥️ 服务端渲染（SSR）

这些页面在**每次请求时**在服务器上渲染：

#### 1. **SSR数据获取页面**
- **`pages/data-fetching.tsx`** - 数据获取演示页
  ```typescript
  export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    return {
      props: { posts, timestamp: new Date().toISOString() }
    };
  };
  ```
  - **特点**: 使用 `getServerSideProps`，每次请求都获取最新数据
  - **优势**: 数据始终最新，良好的SEO
  - **缺点**: 响应时间较慢

### 🌐 客户端渲染（CSR）

这些页面在**浏览器中**动态渲染和获取数据：

#### 1. **SWR数据获取页面**
- **`pages/global-state.tsx`** - 全局状态管理演示
  ```typescript
  const { data: users, error, mutate } = useSWR<User[]>(
    'https://jsonplaceholder.typicode.com/users',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
    }
  );
  ```
  - **特点**: 使用 SWR 进行客户端数据获取
  - **优势**: 缓存、重新验证、乐观更新
  - **适用**: 用户交互频繁的页面

#### 2. **水合演示页面**
- **`pages/hydration-demo.tsx`** - 水合过程演示
  ```typescript
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true); // 只在客户端执行
  }, []);
  ```
  - **特点**: 展示服务端预渲染 + 客户端水合过程
  - **说明**: 演示了 Next.js 的混合渲染机制

### 🔌 API路由（服务端运行时）

- **`pages/api/users/index.ts`** - 用户API接口
- **`pages/api/revalidate.ts`** - 按需重新验证API
- **`pages/api/webhook.ts`** - Webhook处理API
- **特点**: 在服务端运行，处理API请求

## 📈 性能对比

| 渲染方式 | 首次加载 | SEO | 实时性 | 服务器负载 | 适用场景 |
|---------|---------|-----|--------|-----------|----------|
| **SSG** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | 内容相对稳定 |
| **SSG + ISR** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 内容需要定期更新 |
| **SSR** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | 数据实时性要求高 |
| **CSR** | ⭐⭐ | ⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 用户交互丰富 |

## 🚀 快速开始

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 启动生产服务器
```bash
npm start
# 或
yarn start
# 或
pnpm start
```

## 🌟 页面访问

- **首页**: http://localhost:3000/ （纯静态SSG）
- **关于页**: http://localhost:3000/about （纯静态SSG）
- **用户列表**: http://localhost:3000/users （SSG + ISR）
- **用户详情**: http://localhost:3000/users/101 （动态路由SSG）
- **数据获取**: http://localhost:3000/data-fetching （SSR）
- **全局状态**: http://localhost:3000/global-state （CSR）
- **水合演示**: http://localhost:3000/hydration-demo （混合渲染）
- **博客列表**: http://localhost:3000/blog （纯静态SSG）

## 🔧 自动构建触发

项目支持多种自动构建触发方式，详见 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)：

1. **ISR（增量静态再生）**: 定时自动更新
2. **按需重新验证**: API触发式更新
3. **Webhook集成**: CMS内容更新时自动触发

## 📱 部署

### Vercel（推荐）
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

### 其他平台
- **Netlify**: 支持SSG和API路由
- **AWS Amplify**: 完整的Next.js支持
- **自建服务器**: 使用Docker部署

## 📚 技术栈

- **框架**: Next.js 13+
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据获取**: SWR
- **部署**: Vercel

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## �� 许可证

MIT License
