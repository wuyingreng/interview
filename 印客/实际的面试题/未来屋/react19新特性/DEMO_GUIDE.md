# 🎯 React 19 演示指南

## 快速开始

### 方法一：使用启动脚本
```bash
# macOS/Linux
./start.sh

# Windows
start.bat
```

### 方法二：手动启动
```bash
npm install
npm run dev
```

## 🎮 演示操作指南

### 1. Server Actions 演示

**功能**: 用户管理系统，展示 Server Actions 的强大功能

**操作步骤**:
1. 点击 "🔧 Server Actions" 标签页
2. 点击 "加载用户" 按钮查看现有用户
3. 点击 "添加用户" 按钮添加新用户
4. 填写表单并提交（观察自动的 loading 状态）
5. 点击用户卡片上的 "编辑" 按钮修改用户信息
6. 点击 "删除" 按钮删除用户

**学习要点**:
- 表单数据自动处理，无需手动状态管理
- 内置 loading 状态和错误处理
- 服务器端验证和错误反馈
- 类型安全的端到端数据流

### 2. use() Hook 演示

**功能**: 异步数据获取，展示 use() Hook 的简洁性

**操作步骤**:
1. 点击 "🎣 use() Hook" 标签页
2. 使用下拉菜单选择不同用户
3. 观察用户资料的异步加载过程
4. 查看数据统计面板的加载效果

**学习要点**:
- 直接消费 Promise，无需 useEffect
- 与 Suspense 的完美配合
- 优雅的骨架屏加载效果
- 自动的数据更新和重渲染

### 3. Context + use() Hook 演示

**功能**: 全局状态管理，展示 use() Hook 与 Context 的结合

**操作步骤**:
1. 点击 "🌐 Context + use()" 标签页
2. 点击 "切换主题" 按钮改变主题
3. 点击 "更新偏好" 按钮修改用户设置
4. 观察状态变化和界面更新

**学习要点**:
- 简化 Context 的使用方式
- 替代 useContext 和 Suspense 的组合
- 响应式的状态更新
- 更直观的状态管理

## 🔍 代码亮点

### Server Actions 核心代码
```javascript
// 服务器端 Action
export async function addUser(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const age = parseInt(formData.get('age'))
  
  // 验证和业务逻辑
  if (!name || !email || !age) {
    throw new Error('所有字段都是必填的')
  }
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // 返回新用户数据
  return { id: nextId++, name, email, age }
}

// 客户端使用
const handleAddUser = async (formData) => {
  startTransition(async () => {
    try {
      const newUser = await addUser(formData)
      setUsers(prev => [...prev, newUser])
    } catch (err) {
      setError(err.message)
    }
  })
}
```

### use() Hook 核心代码
```javascript
// 异步数据获取
function UserProfile({ userId }) {
  // 直接使用 use() Hook 消费 Promise
  const profile = use(fetchUserProfile(userId))
  const posts = use(fetchUserPosts(userId))
  
  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
      {/* 渲染帖子列表 */}
    </div>
  )
}

// Context 使用
function ThemeToggle() {
  // 直接使用 use() Hook 消费 Context
  const theme = use(ThemeContext)
  const preferences = use(UserPreferencesContext)
  
  return (
    <div>
      <p>当前主题: {theme.theme}</p>
      <button onClick={theme.toggleTheme}>切换主题</button>
    </div>
  )
}
```

## 🎨 界面特色

### 视觉设计
- **渐变背景**: 现代化的视觉效果
- **卡片布局**: 清晰的信息层次
- **动画效果**: 流畅的交互反馈
- **响应式设计**: 适配各种设备

### 用户体验
- **骨架屏**: 优雅的加载状态
- **错误处理**: 友好的错误提示
- **状态反馈**: 清晰的操作反馈
- **交互引导**: 直观的操作流程

## 🚀 技术亮点

### 1. 现代化开发体验
- 零配置的 Vite 构建工具
- 热重载和快速刷新
- 类型安全的开发环境

### 2. 优雅的代码组织
- 模块化的组件设计
- 清晰的关注点分离
- 可复用的工具函数

### 3. 最佳实践应用
- 错误边界和异常处理
- 性能优化和懒加载
- 可访问性和用户体验

## 💡 学习建议

1. **先体验功能**: 按照操作指南体验各个功能
2. **查看代码**: 阅读关键组件的实现代码
3. **对比传统方式**: 思考这些新特性相比传统方式的优势
4. **实践应用**: 尝试在自己的项目中应用这些特性

## 🔗 相关资源

- [React 19 官方文档](https://react.dev/)
- [Server Actions 指南](https://react.dev/reference/react/use)
- [use() Hook 文档](https://react.dev/reference/react/use)
- [Vite 构建工具](https://vitejs.dev/)

---

**享受 React 19 带来的全新开发体验！** 🎉
