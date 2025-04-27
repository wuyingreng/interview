# 新建文件，确认index.html在public目录下面

# 起服务
1. 安装依赖并运行
初始化 Node.js 项目：


npm init -y
2. 安装 Express：


npm install express
3. 启动服务器：


node server.js

4. ：观察效果
访问 http://localhost:3000，浏览器会：

立即开始解析 HTML（但保持白屏）
等待 30 秒（直到 CSS 加载完成）
同时显示文字和样式

要是一直失败会显示黑色的字体的

5. 改了代码要重新跑node server.js,强制刷新http://localhost:3000/。避免304缓存

# 关键截图说明

|阶段	|浏览器表现	|Network 面板|
| -----------| ----------- | ----------- | 
|加载中	|白屏	|CSS 请求处于 Pending 状态|
|加载完成	|页面渲染	|CSS 请求状态码 200