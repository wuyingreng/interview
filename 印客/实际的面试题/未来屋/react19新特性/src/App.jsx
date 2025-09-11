import { useState, createContext } from 'react'
import UserManagement from './components/UserManagement.jsx'
import UserProfileWithSuspense from './components/UserProfile.jsx'
import AnalyticsWithSuspense from './components/Analytics.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { ThemeContext, UserPreferencesContext } from './contexts.js'
import './App.css'

// 创建 Context Provider 组件
function AppProviders({ children }) {
  const [theme, setTheme] = useState('light')
  const [preferences, setPreferences] = useState({
    language: 'zh-CN',
    notifications: true
  })

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const updatePreferences = () => {
    setPreferences(prev => ({
      ...prev,
      language: prev.language === 'zh-CN' ? 'en-US' : 'zh-CN',
      notifications: !prev.notifications
    }))
  }

  const themeValue = { theme, toggleTheme }
  const preferencesValue = { ...preferences, updatePreferences }

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserPreferencesContext.Provider value={preferencesValue}>
        {children}
      </UserPreferencesContext.Provider>
    </ThemeContext.Provider>
  )
}

// 主应用组件
function App() {
  const [activeTab, setActiveTab] = useState('actions')
  const [selectedUserId, setSelectedUserId] = useState(1)

  return (
    <AppProviders>
      <div className="app">
        <header className="app-header">
          <h1>🚀 React 19 新特性演示</h1>
          <p>体验 Actions 和 use() Hook 的强大功能</p>
        </header>

        <nav className="tab-navigation">
          <button
            className={`tab ${activeTab === 'actions' ? 'active' : ''}`}
            onClick={() => setActiveTab('actions')}
          >
            🔧 Server Actions
          </button>
          <button
            className={`tab ${activeTab === 'use-hook' ? 'active' : ''}`}
            onClick={() => setActiveTab('use-hook')}
          >
            🎣 use() Hook
          </button>
          <button
            className={`tab ${activeTab === 'context' ? 'active' : ''}`}
            onClick={() => setActiveTab('context')}
          >
            🌐 Context + use()
          </button>
        </nav>

        <main className="app-main">
          {activeTab === 'actions' && (
            <div className="tab-content">
              <div className="feature-intro">
                <h2>🔧 React Server Actions</h2>
                <p>
                  Server Actions 允许在客户端组件中直接调用服务器端定义的异步函数，
                  极大地简化了数据变更（如表单提交）的逻辑。
                </p>
                <div className="feature-highlights">
                  <div className="highlight">
                    <strong>✨ 简化表单处理:</strong> 无需手动处理状态和 API 调用
                  </div>
                  <div className="highlight">
                    <strong>🔄 自动优化:</strong> 内置 loading 状态和错误处理
                  </div>
                  <div className="highlight">
                    <strong>📡 类型安全:</strong> 端到端的类型安全保证
                  </div>
                </div>
              </div>
              <UserManagement />
            </div>
          )}

          {activeTab === 'use-hook' && (
            <div className="tab-content">
              <div className="feature-intro">
                <h2>🎣 use() Hook</h2>
                <p>
                  use() Hook 是一个实验性的 Hook，可以接受 Promise 或 Context 作为参数，
                  旨在简化异步数据和 Context 的消费。
                </p>
                <div className="feature-highlights">
                  <div className="highlight">
                    <strong>⚡ 异步数据:</strong> 直接消费 Promise，无需 useEffect
                  </div>
                  <div className="highlight">
                    <strong>🎯 简化 Context:</strong> 替代 useContext 和 Suspense 的组合
                  </div>
                  <div className="highlight">
                    <strong>🔄 自动重渲染:</strong> 数据变化时自动更新组件
                  </div>
                </div>
              </div>

              <div className="use-hook-demo">
                <div className="demo-section">
                  <h3>异步数据演示</h3>
                  <div className="user-selector">
                    <label>选择用户查看详情:</label>
                    <select
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
                    >
                      <option value={1}>张三</option>
                      <option value={2}>李四</option>
                      <option value={3}>王五</option>
                    </select>
                  </div>
                  <UserProfileWithSuspense userId={selectedUserId} />
                </div>

                <div className="demo-section">
                  <AnalyticsWithSuspense />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'context' && (
            <div className="tab-content">
              <div className="feature-intro">
                <h2>🌐 Context + use() Hook</h2>
                <p>
                  结合 Context 和 use() Hook，可以更优雅地管理全局状态和配置。
                </p>
                <div className="feature-highlights">
                  <div className="highlight">
                    <strong>🎨 主题管理:</strong> 使用 use() 直接消费 Context
                  </div>
                  <div className="highlight">
                    <strong>⚙️ 配置管理:</strong> 简化全局配置的访问和更新
                  </div>
                  <div className="highlight">
                    <strong>🔄 响应式更新:</strong> Context 变化时自动重渲染
                  </div>
                </div>
              </div>
              <ThemeToggle />
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>
            💡 这个演示展示了 React 19 的两个核心新特性：
            <strong>Server Actions</strong> 和 <strong>use() Hook</strong>
          </p>
        </footer>
      </div>
    </AppProviders>
  )
}

export default App
