#!/bin/bash

echo "🚀 启动商品管理系统演示项目"
echo "================================"

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已存在"
fi

echo ""
echo "🎯 项目功能："
echo "- 商品列表页和商品详情页"
echo "- 使用 ahooks useRequest 实现 SWR 缓存"
echo "- 两个组件共享缓存数据 (cacheKey: 'product-123')"
echo ""

echo "🌐 启动开发服务器..."
echo "访问地址: http://localhost:3000"
echo ""

npm run dev
