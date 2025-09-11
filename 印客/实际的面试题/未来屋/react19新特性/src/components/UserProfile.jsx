import { use, Suspense } from 'react'
import { fetchUserProfile, fetchUserPosts } from '../contexts.js'

// 使用 use() Hook 的组件
function UserProfile({ userId }) {
  // use() Hook 可以直接接受 Promise
  const profile = use(fetchUserProfile(userId))
  const posts = use(fetchUserPosts(userId))

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="avatar"
        />
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p className="bio">{profile.bio}</p>
          <p className="location">📍 {profile.location}</p>
          <p className="join-date">加入时间: {profile.joinDate}</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="number">{profile.followers}</span>
          <span className="label">关注者</span>
        </div>
        <div className="stat">
          <span className="number">{profile.following}</span>
          <span className="label">关注中</span>
        </div>
      </div>

      <div className="posts-section">
        <h3>最新帖子</h3>
        {posts.length > 0 ? (
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <div className="post-meta">
                  <span>{post.publishDate}</span>
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-posts">暂无帖子</p>
        )}
      </div>
    </div>
  )
}

// 包装 Suspense 的组件
export default function UserProfileWithSuspense({ userId }) {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserProfile userId={userId} />
    </Suspense>
  )
}

// 骨架屏组件
function UserProfileSkeleton() {
  return (
    <div className="user-profile skeleton">
      <div className="profile-header">
        <div className="avatar skeleton-avatar"></div>
        <div className="profile-info">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-bio"></div>
          <div className="skeleton-line skeleton-location"></div>
          <div className="skeleton-line skeleton-date"></div>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="skeleton-number"></div>
          <div className="skeleton-label"></div>
        </div>
        <div className="stat">
          <div className="skeleton-number"></div>
          <div className="skeleton-label"></div>
        </div>
      </div>

      <div className="posts-section">
        <div className="skeleton-line skeleton-section-title"></div>
        <div className="posts-list">
          {[1, 2].map(i => (
            <div key={i} className="post-card skeleton">
              <div className="skeleton-line skeleton-post-title"></div>
              <div className="skeleton-line skeleton-post-content"></div>
              <div className="skeleton-line skeleton-post-content"></div>
              <div className="post-meta">
                <div className="skeleton-meta"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
