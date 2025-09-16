import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { getProductDetail } from '../api/product';

const DataSharingComparison = () => {
  const [showComponents, setShowComponents] = useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🔍 数据共享对比演示</h2>

      <div style={{ marginBottom: '20px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h3>📝 核心原理</h3>
        <p><strong>数据共享的前提：必须发起新请求</strong></p>
        <ul>
          <li>❌ 有缓存配置 → 不发起新请求 → 不共享数据</li>
          <li>✅ 无缓存配置 → 发起新请求 → 共享数据</li>
        </ul>
      </div>

      <button
        onClick={() => setShowComponents(!showComponents)}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        {showComponents ? '隐藏组件' : '显示组件对比'}
      </button>

      {showComponents && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* 有缓存配置 - 不会共享数据 */}
          <div style={{ border: '2px solid #dc3545', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: '#dc3545' }}>❌ 有缓存配置 - 不共享数据</h3>
            <CachedComponent
              cacheKey="shared-data-with-cache"
              cacheTime={30000}  // 30秒缓存
              staleTime={10000}  // 10秒新鲜时间
              description="设置了缓存，不会共享数据"
            />
          </div>

          {/* 无缓存配置 - 会共享数据 */}
          <div style={{ border: '2px solid #28a745', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: '#28a745' }}>✅ 无缓存配置 - 共享数据</h3>
            <CachedComponent
              cacheKey="shared-data-no-cache"
              cacheTime={0}      // 不缓存
              staleTime={0}      // 不保持新鲜
              description="没有缓存，会共享数据"
            />
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px', background: '#e7f3ff', padding: '20px', borderRadius: '8px' }}>
        <h3>🎯 你的理解完全正确！</h3>
        <div style={{ background: 'white', padding: '15px', borderRadius: '5px', marginTop: '10px' }}>
          <p><strong>要实现数据跨组件共享：</strong></p>
          <pre style={{ background: '#f8f9fa', padding: '10px', borderRadius: '3px', overflow: 'auto' }}>
            {`// ✅ 正确配置 - 会共享数据
const { data } = useRequest(getData, {
  cacheKey: 'shared-data',
  cacheTime: 0,    // 不缓存
  staleTime: 0,    // 不保持新鲜
})

// ❌ 错误配置 - 不会共享数据  
const { data } = useRequest(getData, {
  cacheKey: 'shared-data',
  cacheTime: 30000,  // 有缓存
  staleTime: 10000,  // 有新鲜时间
})`}
          </pre>
        </div>
      </div>
    </div>
  );
};

const CachedComponent = ({ cacheKey, cacheTime, staleTime, description }) => {
  const { data, loading, error, refresh } = useRequest(
    () => getProductDetail('123'),
    {
      cacheKey,
      cacheTime,
      staleTime,
      refreshOnWindowFocus: false,
    }
  );

  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(null);

  React.useEffect(() => {
    if (loading) {
      setRequestCount(prev => prev + 1);
      setLastRequestTime(new Date().toLocaleTimeString());
    }
  }, [loading]);

  return (
    <div>
      <p><strong>配置：</strong>{description}</p>
      <p><strong>缓存键：</strong><code>{cacheKey}</code></p>
      <p><strong>缓存时间：</strong>{cacheTime}ms</p>
      <p><strong>新鲜时间：</strong>{staleTime}ms</p>

      <div style={{
        background: '#f8f9fa',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px 0',
        border: '1px solid #dee2e6'
      }}>
        <p><strong>📊 统计信息：</strong></p>
        <p>请求次数: <strong style={{ color: '#007bff' }}>{requestCount}</strong></p>
        <p>最后请求: {lastRequestTime || '无'}</p>
        <p>当前状态: {loading ? '🔄 请求中...' : '✅ 已完成'}</p>
      </div>

      <button
        onClick={refresh}
        disabled={loading}
        style={{
          background: loading ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginRight: '10px'
        }}
      >
        {loading ? '请求中...' : '手动刷新'}
      </button>

      {error && <p style={{ color: '#dc3545' }}>❌ 请求失败</p>}

      {data && (
        <div style={{
          background: '#d4edda',
          padding: '10px',
          borderRadius: '5px',
          marginTop: '10px',
          border: '1px solid #c3e6cb'
        }}>
          <p><strong>📦 商品数据：</strong></p>
          <p>名称: {data.name}</p>
          <p>价格: ¥{data.price}</p>
          <p>获取时间: {new Date().toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default DataSharingComparison;
