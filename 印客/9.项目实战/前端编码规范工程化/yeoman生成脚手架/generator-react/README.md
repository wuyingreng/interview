# 团队React脚手架生成器

这是一个为团队内部使用的React项目脚手架生成器，基于Yeoman构建。

## ✨ 特性

- 🚀 快速创建React项目
- 📱 支持TypeScript和JavaScript
- 🛣️ 可选的React Router集成
- 🔄 可选的Redux Toolkit状态管理
- 🧪 可选的Jest + Testing Library测试配置
- 📝 可选的ESLint + Prettier代码规范配置
- 📦 支持多种包管理器(npm, yarn, pnpm)
- 🎨 现代化的项目结构和样式

## 🚀 快速开始

### 1. 安装Yeoman

```bash
npm install -g yo
```

### 2. 安装本生成器

```bash
# 在生成器目录中
npm link
```

### 3. 使用生成器

```bash
yo react
```

## 📋 配置选项

生成器会询问以下配置选项：

- **项目名称**: 你的项目名称
- **项目描述**: 项目描述信息
- **作者**: 作者名称
- **包管理器**: 选择npm、yarn或pnpm
- **TypeScript**: 是否使用TypeScript
- **React Router**: 是否包含路由功能
- **状态管理**: 是否包含Redux Toolkit
- **测试**: 是否包含测试配置
- **代码规范**: 是否包含ESLint和Prettier

## 📁 生成的项目结构

```
your-project/
├── public/
│   └── index.html
├── src/
│   ├── components/     # 可复用组件
│   ├── pages/         # 页面组件
│   ├── hooks/         # 自定义Hooks
│   ├── store/         # Redux store (如果选择)
│   ├── slices/        # Redux slices (如果选择)
│   ├── routes/        # 路由配置 (如果选择)
│   ├── utils/         # 工具函数
│   ├── styles/        # 样式文件
│   ├── App.js/tsx     # 主应用组件
│   └── index.js/tsx   # 应用入口
├── package.json       # 项目配置
├── README.md          # 项目说明
├── tsconfig.json      # TypeScript配置 (如果选择)
├── .eslintrc.js      # ESLint配置 (如果选择)
├── .prettierrc       # Prettier配置 (如果选择)
└── jest.config.js    # Jest配置 (如果选择)
```

## 🛠️ 开发

### 本地开发

```bash
# 安装依赖
npm install

# 链接到全局
npm link

# 测试生成器
yo react
```

### 发布到npm

```bash
# 登录npm
npm login

# 发布
npm publish
```

## 📝 自定义

你可以根据团队需求自定义以下内容：

1. **模板文件**: 修改`generators/app/templates/`目录下的文件
2. **配置选项**: 在`index.js`中添加或修改提示选项
3. **依赖版本**: 更新`package.json`模板中的依赖版本
4. **项目结构**: 添加新的目录和文件模板
5. **代码规范**: 调整ESLint和Prettier配置

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个生成器！

## 📄 许可证

MIT 