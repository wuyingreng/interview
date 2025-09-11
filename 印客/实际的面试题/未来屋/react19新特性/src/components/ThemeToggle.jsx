import { use, useState } from 'react'
import { ThemeContext, UserPreferencesContext } from '../contexts.js'

// 使用 use() Hook 消费 Context
function ThemeToggle() {
  const theme = use(ThemeContext)
  const preferences = use(UserPreferencesContext)

  return (
    <div className="theme-toggle">
      <h4>🎨 主题设置</h4>
      <div className="theme-info">
        <p>当前主题: <span className="theme-name">{theme.theme}</span></p>
        <p>语言设置: <span className="language">{preferences.language}</span></p>
        <p>通知状态: <span className="notifications">{preferences.notifications ? '开启' : '关闭'}</span></p>
      </div>
      <div className="theme-actions">
        <button
          onClick={theme.toggleTheme}
          className="toggle-btn"
        >
          切换主题
        </button>
        <button
          onClick={preferences.updatePreferences}
          className="preferences-btn"
        >
          更新偏好
        </button>
      </div>
    </div>
  )
}

export default ThemeToggle
