import React from 'react';
import { useRequest } from 'ahooks';
import { getProductDetail } from '../api/product';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  // 使用useRequest获取商品详情，启用SWR缓存
  const {
    data: product,
    loading,
    error,
    refresh
  } = useRequest(
    () => getProductDetail(id),
    {
      cacheKey: `product-${id}`,
      // 启用SWR模式：优先返回缓存，后台重新请求
      refreshOnWindowFocus: true,
      // 缓存时间5分钟
      cacheTime: 5 * 60 * 1000,
      // 重新验证时间30秒
      staleTime: 30 * 1000,
    }
  );

  if (loading && !product) {
    return <div className="loading">正在加载商品详情...</div>;
  }

  if (error) {
    return (
      <div className="error">
        加载商品详情失败
        <button onClick={refresh}>重试</button>
      </div>
    );
  }

  if (!product) {
    return <div className="not-found">商品不存在</div>;
  }

  return (
    <div className="product-detail">
      <div className="breadcrumb">
        <Link to="/">返回商品列表</Link>
      </div>

      <div className="product-content">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">¥{product.price}</p>
          <p className="description">{product.description}</p>

          <div className="product-meta">
            <div className="meta-item">
              <span className="label">分类:</span>
              <span className="value">{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="label">库存:</span>
              <span className="value">{product.stock}件</span>
            </div>
            <div className="meta-item">
              <span className="label">评分:</span>
              <span className="value">{product.rating}分 ({product.reviews}条评价)</span>
            </div>
          </div>

          <div className="actions">
            <button className="add-to-cart">加入购物车</button>
            <button className="buy-now">立即购买</button>
            <button onClick={refresh} className="refresh">
              {loading ? '刷新中...' : '刷新数据'}
            </button>
          </div>
        </div>
      </div>

      {/* 显示缓存状态 */}
      <div className="cache-info">
        <p>缓存键: product-{id}</p>
        <p>数据状态: {loading ? '正在重新验证...' : '已缓存'}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
