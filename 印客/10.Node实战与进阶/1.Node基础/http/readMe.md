# 如何模拟post请求


1. 用http-server -p 8080 去启动静态服务器。访问form.html
2. 提交用户名和密码到对应的请求中去。
3. 执行node --watch index.js 启动服务器，--watch 可以让Node.js 自动监听文件变化并重启程序

# 如果模拟get请求
## 方法一：
1. 直接在浏览器上访问http://localhost:8888 就是可以模拟get请求了。

## 方法二：
1. 用发送请求.js去请求