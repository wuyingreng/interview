import { NextPage } from 'next';
import { useState, useEffect } from 'react';

const HydrationDemo: NextPage = () => {
  // 这个状态会在服务端和客户端都执行
  const [count, setCount] = useState(0);

  // 这个 effect 只会在客户端执行
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Hydration 演示</h1>

      <div className="space-y-4">
        {/* 这个计数器在服务端和客户端都会渲染 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">计数器</h2>
          <p className="mb-2">当前计数: {count}</p>
          <button
            onClick={() => setCount(c => c + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            增加
          </button>
        </div>

        {/* 这个部分只在客户端渲染 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">客户端检测</h2>
          <p>
            {isClient
              ? '这个内容是在客户端渲染的'
              : '这个内容是在服务端渲染的'}
          </p>
        </div>

        {/* 显示当前时间，会在服务端和客户端都执行 */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">当前时间</h2>
          <p>{new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default HydrationDemo; 