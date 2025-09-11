import { use, Suspense } from 'react'
import { fetchAnalytics } from '../contexts.js'

// 使用 use() Hook 获取异步数据
function Analytics() {
  const analytics = use(fetchAnalytics())

  return (
    <div className="analytics">
      <h3>📊 数据统计</h3>
      <div className="analytics-grid">
        <div className="metric-card">
          <div className="metric-value">{analytics.totalUsers.toLocaleString()}</div>
          <div className="metric-label">总用户数</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{analytics.activeUsers.toLocaleString()}</div>
          <div className="metric-label">活跃用户</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{analytics.newUsersToday}</div>
          <div className="metric-label">今日新增</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{analytics.pageViews.toLocaleString()}</div>
          <div className="metric-label">页面浏览量</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{(analytics.conversionRate * 100).toFixed(1)}%</div>
          <div className="metric-label">转化率</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{analytics.averageSessionTime}</div>
          <div className="metric-label">平均会话时长</div>
        </div>
      </div>
    </div>
  )
}

// 包装 Suspense 的组件
export default function AnalyticsWithSuspense() {
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <Analytics />
    </Suspense>
  )
}

// 骨架屏组件
function AnalyticsSkeleton() {
  return (
    <div className="analytics skeleton">
      <div className="skeleton-line skeleton-section-title"></div>
      <div className="analytics-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="metric-card skeleton">
            <div className="skeleton-metric-value"></div>
            <div className="skeleton-metric-label"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
