#!/usr/bin/env python3
"""
环境检查脚本
检查运行 Service Worker 演示所需的环境
"""

import sys
import subprocess
import os

def check_python():
    """检查 Python 版本"""
    print("🐍 检查 Python 环境...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 6:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} - 支持")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} - 版本过低，需要 3.6+")
        return False

def check_node():
    """检查 Node.js 环境"""
    print("📦 检查 Node.js 环境...")
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"✅ Node.js {version} - 支持")
            return True
        else:
            print("❌ Node.js 未安装")
            return False
    except FileNotFoundError:
        print("❌ Node.js 未安装")
        return False

def check_npm():
    """检查 npm 环境"""
    print("📦 检查 npm 环境...")
    try:
        result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"✅ npm {version} - 支持")
            return True
        else:
            print("❌ npm 未安装")
            return False
    except FileNotFoundError:
        print("❌ npm 未安装")
        return False

def check_files():
    """检查必要文件"""
    print("📁 检查项目文件...")
    required_files = [
        'sw.js',
        'demo/index.html',
        'demo/demo.js',
        'package.json',
        'server.py'
    ]
    
    missing_files = []
    for file in required_files:
        if os.path.exists(file):
            print(f"✅ {file}")
        else:
            print(f"❌ {file} - 文件缺失")
            missing_files.append(file)
    
    return len(missing_files) == 0

def suggest_startup_method():
    """建议启动方式"""
    print("\n🚀 建议的启动方式:")
    
    if check_node() and check_npm():
        print("1. 使用 Node.js (推荐):")
        print("   npm install")
        print("   npm start")
        print("   访问: http://localhost:8080/demo/")
    
    if check_python():
        print("2. 使用 Python:")
        print("   python3 server.py")
        print("   访问: http://localhost:8080/demo/")
    
    print("3. 使用启动脚本:")
    if os.name == 'nt':  # Windows
        print("   start.bat")
    else:  # macOS/Linux
        print("   ./start.sh")

def main():
    """主函数"""
    print("🔍 Service Worker 演示环境检查")
    print("=" * 40)
    
    python_ok = check_python()
    node_ok = check_node()
    npm_ok = check_npm()
    files_ok = check_files()
    
    print("\n📊 检查结果:")
    print(f"Python 环境: {'✅' if python_ok else '❌'}")
    print(f"Node.js 环境: {'✅' if node_ok else '❌'}")
    print(f"npm 环境: {'✅' if npm_ok else '❌'}")
    print(f"项目文件: {'✅' if files_ok else '❌'}")
    
    if not files_ok:
        print("\n❌ 项目文件不完整，请确保在正确的目录中运行此脚本")
        return
    
    if not python_ok and not node_ok:
        print("\n❌ 没有可用的运行环境，请安装 Python 3.6+ 或 Node.js 14+")
        return
    
    suggest_startup_method()
    
    print("\n💡 提示:")
    print("- Service Worker 必须在 HTTP 环境下运行")
    print("- 不能直接打开 HTML 文件")
    print("- 推荐使用现代浏览器 (Chrome, Firefox, Safari, Edge)")
    print("- 如果遇到问题，请查看 HOW_TO_RUN.md 文件")

if __name__ == "__main__":
    main()
