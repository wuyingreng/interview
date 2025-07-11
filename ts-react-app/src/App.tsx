import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Request } from '@ali/lzddt-request';

// 创建请求实例
const request = new Request({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  debug: true
});

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取用户数据
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request.get<User[]>('/users');
      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError(response.errorMessage || '获取用户数据失败');
      }
    } catch (error) {
      setError('网络请求失败');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>使用自定义请求库获取数据</h1>

        <div style={{ marginTop: '20px' }}>
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? '加载中...' : '重新获取用户数据'}
          </button>
        </div>

        {error && (
          <div style={{ color: 'red', marginTop: '20px' }}>
            错误: {error}
          </div>
        )}

        {users.length > 0 && (
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <h3>用户列表 (前5个):</h3>
            <ul style={{ fontSize: '14px' }}>
              {users.slice(0, 5).map(user => (
                <li key={user.id} style={{ marginBottom: '10px' }}>
                  <strong>{user.name}</strong><br />
                  Email: {user.email}<br />
                  Phone: {user.phone}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          这个示例使用了自定义的 @ali/lzddt-request 请求库
        </p>
      </header>
    </div>
  );
}

export default App;
