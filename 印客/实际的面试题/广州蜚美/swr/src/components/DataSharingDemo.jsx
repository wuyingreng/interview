import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { getProductDetail } from '../api/product';

const DataSharingDemo = () => {
  const [showComponent1, setShowComponent1] = useState(true);
  const [showComponent2, setShowComponent2] = useState(true);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>ahooks useRequest 数据共享演示</h2>

      <div style={{ marginBottom: '20px', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        <h3>控制面板</h3>
        <label>
          <input
            type="checkbox"
            checked={showComponent1}
            onChange={(e) => setShowComponent1(e.target.checked)}
          />
          显示组件1 (无缓存配置)
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={showComponent2}
            onChange={(e) => setShowComponent2(e.target.checked)}
          />
          显示组件2 (有缓存配置)
        </label>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {showComponent1 && (
          <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>组件1 - 无缓存配置</h3>
            <RequestComponent
              cacheKey="demo-no-cache"
              cacheTime={0}
              staleTime={0}
              description="每次都会发起新请求，会触发数据共享"
            />
          </div>
        )}

        {showComponent2 && (
          <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>组件2 - 有缓存配置</h3>
            <RequestComponent
              cacheKey="demo-with-cache"
              cacheTime={30000}  // 30秒缓存
              staleTime={10000}  // 10秒新鲜时间
              description="有缓存配置，可能不会触发数据共享"
            />
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', background: '#e8f4fd', padding: '15px', borderRadius: '5px' }}>
        <h3>📝 关键说明：</h3>
        <ul>
          <li><strong>组件1</strong>：每次挂载都会发起新请求，会触发数据共享</li>
          <li><strong>组件2</strong>：如果数据在缓存时间内，不会发起新请求，不会触发数据共享</li>
          <li><strong>数据共享</strong>：只有当发起新请求时，相同cacheKey的组件才会共享数据</li>
          <li><strong>cacheTime</strong>：数据缓存时间，期间不会发起新请求</li>
          <li><strong>staleTime</strong>：数据新鲜时间，期间不会发起新请求</li>
        </ul>
      </div>
    </div>
  );
};

const RequestComponent = ({ cacheKey, cacheTime, staleTime, description }) => {
  const { data, loading, error, refresh } = useRequest(
    () => getProductDetail('123'),
    {
      cacheKey,
      cacheTime,
      staleTime,
      refreshOnWindowFocus: false, // 关闭窗口聚焦刷新，便于演示
    }
  );

  const [requestCount, setRequestCount] = useState(0);

  // 监听请求次数
  React.useEffect(() => {
    if (loading) {
      setRequestCount(prev => prev + 1);
    }
  }, [loading]);

  return (
    <div>
      <p><strong>配置：</strong>{description}</p>
      <p><strong>缓存键：</strong>{cacheKey}</p>
      <p><strong>缓存时间：</strong>{cacheTime}ms</p>
      <p><strong>新鲜时间：</strong>{staleTime}ms</p>
      <p><strong>请求次数：</strong>{requestCount}</p>

      <div style={{ margin: '10px 0' }}>
        <button onClick={refresh} disabled={loading}>
          {loading ? '请求中...' : '手动刷新'}
        </button>
      </div>

      {loading && <p style={{ color: 'blue' }}>🔄 正在请求数据...</p>}
      {error && <p style={{ color: 'red' }}>❌ 请求失败</p>}
      {data && (
        <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '3px' }}>
          <p><strong>商品名称：</strong>{data.name}</p>
          <p><strong>商品价格：</strong>¥{data.price}</p>
          <p><strong>请求时间：</strong>{new Date().toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default DataSharingDemo;
