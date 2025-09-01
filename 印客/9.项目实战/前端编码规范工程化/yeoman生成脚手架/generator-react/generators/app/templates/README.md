# <%= projectName %>

<%= description %>

## 🚀 快速开始

### 安装依赖
```bash
<% if (packageManager === 'yarn') { %>yarn<% } else if (packageManager === 'pnpm') { %>pnpm install<% } else { %>npm install<% } %>
```

### 启动开发服务器
```bash
<% if (packageManager === 'yarn') { %>yarn start<% } else if (packageManager === 'pnpm') { %>pnpm start<% } else { %>npm start<% } %>
```

### 构建生产版本
```bash
<% if (packageManager === 'yarn') { %>yarn build<% } else if (packageManager === 'pnpm') { %>pnpm build<% } else { %>npm run build<% } %>
```

<% if (useTesting) { %>### 运行测试
```bash
<% if (packageManager === 'yarn') { %>yarn test<% } else if (packageManager === 'pnpm') { %>pnpm test<% } else { %>npm test<% } %>
```<% } %>

<% if (useLinting) { %>### 代码规范检查
```bash
<% if (packageManager === 'yarn') { %>yarn lint<% } else if (packageManager === 'pnpm') { %>pnpm lint<% } else { %>npm run lint<% } %>

# 自动修复
<% if (packageManager === 'yarn') { %>yarn lint:fix<% } else if (packageManager === 'pnpm') { %>pnpm lint:fix<% } else { %>npm run lint:fix<% } %>

# 代码格式化
<% if (packageManager === 'yarn') { %>yarn format<% } else if (packageManager === 'pnpm') { %>pnpm format<% } else { %>npm run format<% } %>
```<% } %>

## 🛠️ 技术栈

- **React** - 用户界面库
- **React Scripts** - 零配置构建工具
<% if (useTypeScript) { %>- **TypeScript** - 类型安全的JavaScript超集<% } %>
<% if (useRouter) { %>- **React Router** - 客户端路由<% } %>
<% if (useStateManagement) { %>- **Redux Toolkit** - 状态管理<% } %>
<% if (useTesting) { %>- **Jest** - 测试框架
- **Testing Library** - React组件测试工具<% } %>
<% if (useLinting) { %>- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化<% } %>

## 📁 项目结构

```
src/
├── components/     # 可复用组件
├── pages/         # 页面组件
├── hooks/         # 自定义Hooks
<% if (useStateManagement) { %>├── store/         # Redux store配置
├── slices/        # Redux slices<% } %>
<% if (useRouter) { %>├── routes/        # 路由配置<% } %>
├── utils/         # 工具函数
├── styles/        # 样式文件
├── App.<%= useTypeScript ? 'tsx' : 'jsx' %>      # 主应用组件
└── index.<%= useTypeScript ? 'tsx' : 'jsx' %>    # 应用入口
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 团队

<%= author %> 