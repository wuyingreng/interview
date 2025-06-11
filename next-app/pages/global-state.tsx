import { NextPage } from 'next';
import useSWR from 'swr';

// 定义 fetcher 函数
const fetcher = (url: string) => fetch(url).then(res => res.json());

interface User {
  id: number;
  name: string;
  email: string;
}

const GlobalStatePage: NextPage = () => {
  // 使用 SWR 获取数据，它会自动处理缓存和重新验证
  const { data: users, error, mutate } = useSWR<User[]>(
    'https://jsonplaceholder.typicode.com/users',
    fetcher,
    {
      // 配置选项
      revalidateOnFocus: false, // 窗口聚焦时不重新获取
      revalidateOnReconnect: true, // 重新连接时重新获取
      dedupingInterval: 5000, // 5秒内的重复请求会被合并
    }
  );

  if (error) return <div>加载失败</div>;
  if (!users) return <div>加载中...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">全局状态管理示例</h1>

      <div className="mb-4">
        <button
          onClick={() => mutate()} // 手动触发重新获取
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          刷新数据
        </button>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-6 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalStatePage; 