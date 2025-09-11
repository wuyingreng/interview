#!/usr/bin/env python3
"""
简单的 HTTP 服务器，用于运行 Service Worker 演示
适用于没有 Node.js 的环境
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class ServiceWorkerHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 添加 CORS 头
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Service Worker 需要 no-cache 头
        if self.path.endswith('.js') and 'sw.js' in self.path:
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        
        super().end_headers()
    
    def do_OPTIONS(self):
        # 处理 CORS 预检请求
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        # 自定义日志格式
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def start_server(port=8080):
    """启动 HTTP 服务器"""
    try:
        # 切换到脚本所在目录
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)
        
        # 创建服务器
        with socketserver.TCPServer(("", port), ServiceWorkerHandler) as httpd:
            print(f"🚀 Service Worker 演示服务器已启动")
            print(f"📱 访问地址: http://localhost:{port}")
            print(f"🎯 演示页面: http://localhost:{port}/demo/")
            print(f"⚙️  Service Worker: http://localhost:{port}/sw.js")
            print(f"⏹️  按 Ctrl+C 停止服务器")
            print("-" * 50)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ 端口 {port} 已被占用，请尝试其他端口")
            print(f"💡 使用方法: python3 server.py [端口号]")
        else:
            print(f"❌ 启动服务器失败: {e}")
    except Exception as e:
        print(f"❌ 发生错误: {e}")

if __name__ == "__main__":
    # 获取端口号参数
    port = 8080
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("❌ 无效的端口号，使用默认端口 8080")
    
    start_server(port)
