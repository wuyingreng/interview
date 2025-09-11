import { createContext } from 'react'

// 创建主题 Context
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => { }
})

// 创建用户偏好 Context
export const UserPreferencesContext = createContext({
  language: 'zh-CN',
  notifications: true,
  updatePreferences: () => { }
})

// 模拟异步数据获取
export async function fetchUserProfile(userId) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  const profiles = {
    1: {
      id: 1,
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
      bio: '前端开发工程师，热爱 React 和新技术',
      location: '北京',
      joinDate: '2023-01-15',
      followers: 1200,
      following: 300
    },
    2: {
      id: 2,
      name: '李四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
      bio: '全栈开发工程师，专注于用户体验设计',
      location: '上海',
      joinDate: '2022-08-20',
      followers: 2500,
      following: 500
    },
    3: {
      id: 3,
      name: '王五',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
      bio: '技术架构师，关注系统性能和可扩展性',
      location: '深圳',
      joinDate: '2021-12-10',
      followers: 5000,
      following: 800
    }
  }

  return profiles[userId] || null
}

// 模拟异步获取用户帖子
export async function fetchUserPosts(userId) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  const posts = {
    1: [
      {
        id: 1,
        title: 'React 19 新特性深度解析',
        content: 'React 19 带来了许多令人兴奋的新特性，包括 Actions 和 use() Hook...',
        publishDate: '2024-01-15',
        likes: 45,
        comments: 12
      },
      {
        id: 2,
        title: '前端性能优化最佳实践',
        content: '分享一些在前端开发中提升性能的实用技巧...',
        publishDate: '2024-01-10',
        likes: 32,
        comments: 8
      }
    ],
    2: [
      {
        id: 3,
        title: '用户体验设计思考',
        content: '如何设计出既美观又实用的用户界面...',
        publishDate: '2024-01-12',
        likes: 28,
        comments: 15
      }
    ],
    3: [
      {
        id: 4,
        title: '微前端架构实践',
        content: '在大型项目中如何合理使用微前端架构...',
        publishDate: '2024-01-08',
        likes: 67,
        comments: 23
      },
      {
        id: 5,
        title: '系统监控与告警设计',
        content: '构建可靠的系统监控和告警机制...',
        publishDate: '2024-01-05',
        likes: 41,
        comments: 18
      }
    ]
  }

  return posts[userId] || []
}

// 模拟异步获取统计数据
export async function fetchAnalytics() {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1200))

  return {
    totalUsers: 1250,
    activeUsers: 890,
    newUsersToday: 23,
    pageViews: 15600,
    conversionRate: 0.12,
    averageSessionTime: '3分45秒'
  }
}
