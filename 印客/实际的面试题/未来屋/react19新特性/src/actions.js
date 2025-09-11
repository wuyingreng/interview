// React Server Actions 演示
// 这些函数在服务器端运行，但可以在客户端组件中直接调用

// 模拟用户数据存储
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', age: 25 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 30 },
  { id: 3, name: '王五', email: 'wangwu@example.com', age: 28 }
]

let nextId = 4

// 获取用户列表的 Action
export async function getUsers() {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  return users
}

// 添加用户的 Action
export async function addUser(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const age = parseInt(formData.get('age'))

  // 模拟验证
  if (!name || !email || !age) {
    throw new Error('所有字段都是必填的')
  }

  if (age < 0 || age > 120) {
    throw new Error('年龄必须在 0-120 之间')
  }

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  const newUser = {
    id: nextId++,
    name,
    email,
    age
  }

  users.push(newUser)
  return newUser
}

// 删除用户的 Action
export async function deleteUser(userId) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300))

  const userIndex = users.findIndex(user => user.id === userId)
  if (userIndex === -1) {
    throw new Error('用户不存在')
  }

  const deletedUser = users.splice(userIndex, 1)[0]
  return deletedUser
}

// 更新用户信息的 Action
export async function updateUser(userId, formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const age = parseInt(formData.get('age'))

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 600))

  const userIndex = users.findIndex(user => user.id === userId)
  if (userIndex === -1) {
    throw new Error('用户不存在')
  }

  if (!name || !email || !age) {
    throw new Error('所有字段都是必填的')
  }

  if (age < 0 || age > 120) {
    throw new Error('年龄必须在 0-120 之间')
  }

  users[userIndex] = { ...users[userIndex], name, email, age }
  return users[userIndex]
}
