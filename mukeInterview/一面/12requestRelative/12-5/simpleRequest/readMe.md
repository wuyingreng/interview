# 简单CORS请求示例

## 什么是简单请求？

简单请求是指**不会触发CORS预检请求**的HTTP请求。浏览器会直接发送这些请求，而不需要先发送OPTIONS预检请求。

## 简单请求的条件

1. **请求方法**必须是以下之一：
   - GET
   - HEAD
   - POST

2. **Content-Type**只能是以下值之一：
   - `text/plain`
   - `multipart/form-data`
   - `application/x-www-form-urlencoded`

3. **请求头**只能包含以下简单头部字段：
   - Accept
   - Accept-Language
   - Content-Language
   - Content-Type（仅限上述值）
   - Range（仅限简单范围头值）

## 如何运行

### 1. 启动服务端
```bash
cd 12-5/simpleRequest
node server.js
```
服务端将运行在 `http://localhost:3001`

### 2. 启动客户端
在`simpleRequest`文件夹下执行：
```bash
http-server -p 8011
```

然后在浏览器中访问：`http://localhost:8011/client.html`

## 示例包含的请求类型

1. **简单GET请求** - 最基本的跨域请求
2. **简单POST请求（表单数据）** - Content-Type为application/x-www-form-urlencoded
3. **简单POST请求（纯文本）** - Content-Type为text/plain
4. **XMLHttpRequest简单请求** - 使用传统的XHR对象

## 验证方法

打开浏览器开发者工具的网络面板，观察请求：
- ✅ 简单请求：直接发送，没有OPTIONS预检请求
- ❌ 复杂请求：会先发送OPTIONS预检请求

## 与cros文件夹的区别

- **cros文件夹**：包含复杂请求示例，会触发预检请求
- **simpleRequest文件夹**：只包含简单请求，不会触发预检请求

这样可以直观地对比两种不同类型的CORS请求行为。 