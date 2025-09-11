import { useState, useTransition } from 'react'
import { getUsers, addUser, deleteUser, updateUser } from '../actions.js'

// 用户管理组件 - 演示 Server Actions
export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [isPending, startTransition] = useTransition()
  const [editingUser, setEditingUser] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState('')

  // 加载用户列表
  const loadUsers = async () => {
    try {
      setError('')
      const userList = await getUsers()
      setUsers(userList)
    } catch (err) {
      setError(err.message)
    }
  }

  // 添加用户
  const handleAddUser = async (formData) => {
    startTransition(async () => {
      try {
        setError('')
        const newUser = await addUser(formData)
        setUsers(prev => [...prev, newUser])
        setShowAddForm(false)
        // 重置表单
        document.getElementById('add-user-form').reset()
      } catch (err) {
        setError(err.message)
      }
    })
  }

  // 删除用户
  const handleDeleteUser = async (userId) => {
    if (!confirm('确定要删除这个用户吗？')) return

    startTransition(async () => {
      try {
        setError('')
        await deleteUser(userId)
        setUsers(prev => prev.filter(user => user.id !== userId))
      } catch (err) {
        setError(err.message)
      }
    })
  }

  // 更新用户
  const handleUpdateUser = async (userId, formData) => {
    startTransition(async () => {
      try {
        setError('')
        const updatedUser = await updateUser(userId, formData)
        setUsers(prev => prev.map(user =>
          user.id === userId ? updatedUser : user
        ))
        setEditingUser(null)
      } catch (err) {
        setError(err.message)
      }
    })
  }

  return (
    <div className="user-management">
      <div className="section-header">
        <h3>👥 用户管理 (Server Actions 演示)</h3>
        <div className="actions">
          <button
            onClick={loadUsers}
            disabled={isPending}
            className="load-btn"
          >
            {isPending ? '加载中...' : '加载用户'}
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-btn"
          >
            {showAddForm ? '取消添加' : '添加用户'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {showAddForm && (
        <div className="add-user-form">
          <h4>添加新用户</h4>
          <form
            id="add-user-form"
            action={handleAddUser}
            className="user-form"
          >
            <div className="form-group">
              <label htmlFor="name">姓名:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="请输入姓名"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">邮箱:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="请输入邮箱"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">年龄:</label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="0"
                max="120"
                placeholder="请输入年龄"
              />
            </div>
            <div className="form-actions">
              <button
                type="submit"
                disabled={isPending}
                className="submit-btn"
              >
                {isPending ? '添加中...' : '添加用户'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-list">
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className="user-card">
              {editingUser === user.id ? (
                <EditUserForm
                  user={user}
                  onSave={(formData) => handleUpdateUser(user.id, formData)}
                  onCancel={() => setEditingUser(null)}
                  isPending={isPending}
                />
              ) : (
                <div className="user-info">
                  <div className="user-details">
                    <h4>{user.name}</h4>
                    <p>📧 {user.email}</p>
                    <p>🎂 {user.age} 岁</p>
                  </div>
                  <div className="user-actions">
                    <button
                      onClick={() => setEditingUser(user.id)}
                      className="edit-btn"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="delete-btn"
                    >
                      删除
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>暂无用户数据，点击"加载用户"按钮获取数据</p>
          </div>
        )}
      </div>
    </div>
  )
}

// 编辑用户表单组件
function EditUserForm({ user, onSave, onCancel, isPending }) {
  return (
    <form
      action={onSave}
      className="edit-form"
    >
      <div className="form-group">
        <label htmlFor={`edit-name-${user.id}`}>姓名:</label>
        <input
          type="text"
          id={`edit-name-${user.id}`}
          name="name"
          defaultValue={user.name}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor={`edit-email-${user.id}`}>邮箱:</label>
        <input
          type="email"
          id={`edit-email-${user.id}`}
          name="email"
          defaultValue={user.email}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor={`edit-age-${user.id}`}>年龄:</label>
        <input
          type="number"
          id={`edit-age-${user.id}`}
          name="age"
          defaultValue={user.age}
          required
          min="0"
          max="120"
        />
      </div>
      <div className="form-actions">
        <button
          type="submit"
          disabled={isPending}
          className="save-btn"
        >
          {isPending ? '保存中...' : '保存'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cancel-btn"
        >
          取消
        </button>
      </div>
    </form>
  )
}
