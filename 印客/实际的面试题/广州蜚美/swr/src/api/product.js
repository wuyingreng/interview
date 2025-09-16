// 模拟API请求函数
export const getProductDetail = async (productId) => {
  console.log(`正在请求商品详情: ${productId}`);

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 10000));

  // 模拟API响应
  const mockProduct = {
    id: productId,
    name: `商品${productId}`,
    price: 99.99,
    description: `这是商品${productId}的详细描述，包含了很多有用的信息。`,
    image: `https://picsum.photos/300/200?random=${productId}`,
    category: '电子产品',
    stock: 100,
    rating: 4.5,
    reviews: 128
  };

  return mockProduct;
};

// 获取商品列表的API函数
export const getProductList = async () => {
  console.log('正在请求商品列表');

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));

  // 模拟商品列表数据
  const mockProducts = [
    { id: '123', name: '商品123', price: 99.99, image: 'https://picsum.photos/200/150?random=123' },
    { id: '124', name: '商品124', price: 199.99, image: 'https://picsum.photos/200/150?random=124' },
    { id: '125', name: '商品125', price: 299.99, image: 'https://picsum.photos/200/150?random=125' },
    { id: '126', name: '商品126', price: 399.99, image: 'https://picsum.photos/200/150?random=126' }
  ];

  return mockProducts;
};
