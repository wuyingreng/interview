@echo off
chcp 65001 >nul
echo 🚀 启动 Service Worker 缓存策略演示
echo ==================================

:: 检查 Node.js 是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到 Node.js，请先安装 Node.js
    echo    下载地址: https://nodejs.org/
    echo    推荐版本: Node.js 16+ 或 18+
    pause
    exit /b 1
)

:: 检查 npm 是否安装
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到 npm，请确保 Node.js 安装完整
    pause
    exit /b 1
)

echo ✅ Node.js 版本: 
node --version
echo ✅ npm 版本: 
npm --version
echo.

:: 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
) else (
    echo ✅ 依赖已安装
)

echo.
echo 🌐 启动本地服务器...
echo    项目将在 http://localhost:8080 打开
echo    演示页面: http://localhost:8080/demo/
echo    按 Ctrl+C 停止服务器
echo.

:: 启动开发服务器
npm run dev
