#!/bin/bash

echo "🚀 启动 Service Worker 缓存策略演示"
echo "=================================="

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    echo "   下载地址: https://nodejs.org/"
    echo "   推荐版本: Node.js 16+ 或 18+"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请确保 Node.js 安装完整"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已安装"
fi

echo ""
echo "🌐 启动本地服务器..."
echo "   项目将在 http://localhost:8080 打开"
echo "   演示页面: http://localhost:8080/demo/"
echo "   按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm run dev
