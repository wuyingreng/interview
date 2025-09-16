import React from 'react';
import { useRequest } from 'ahooks';
import { getProductList, getProductDetail } from '../api/product';
import { Link } from 'react-router-dom';

const ProductList = () => {
  // 获取商品列表
  // const { data: productList, loading: listLoading, error: listError } = useRequest(getProductList, {
  //   cacheKey: 'product-list',
  //   // 缓存时间5分钟
  //   cacheTime: 5 * 60 * 1000,
  // });

  const { data: productList, loading: listLoading, error: listError } = useRequest(getProductList, {
    cacheKey: 'product-list',
    cacheTime: 5 * 60 * 1000
  })

  // 预加载商品123的详情数据（演示SWR缓存功能）
  const { data: product123, loading: detailLoading } = useRequest(
    () => getProductDetail('123'),
    {
      cacheKey: 'product-123',
      // 启用SWR模式：优先返回缓存，后台重新请求
      refreshOnWindowFocus: true,

    }
  );

  if (listLoading) {
    return <div className="loading">正在加载商品列表...</div>;
  }

  if (listError) {
    return <div className="error">加载商品列表失败</div>;
  }

  return (
    <div className="product-list">
      <h1>商品列表</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link to="/demo" style={{
          background: '#17a2b8',
          color: 'white',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block',
          marginRight: '10px'
        }}>
          🔍 查看数据共享演示
        </Link>
        <Link to="/comparison" style={{
          background: '#28a745',
          color: 'white',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block'
        }}>
          ⚖️ 对比演示
        </Link>
      </div>

      {/* 显示商品123的缓存状态 */}
      <div className="cache-status">
        <h3>缓存状态演示</h3>
        <p>商品123详情状态: {detailLoading ? '正在加载...' : '已缓存'}</p>
        {product123 && (
          <div className="cached-product">
            <p>已缓存的商品123: {product123.name} - ¥{product123.price}</p>
            <Link to="/product/123">查看详情</Link>
          </div>
        )}
      </div>

      {/* 商品列表 */}
      <div className="products-grid">
        {productList?.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">¥{product.price}</p>
            <Link to={`/product/${product.id}`} className="view-detail">
              查看详情
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
