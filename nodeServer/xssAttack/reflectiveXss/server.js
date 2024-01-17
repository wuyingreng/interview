const http = require("http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parameter = url.searchParams.get("param"); // 获取传递的参数
  console.log('req=>', req.url, url.searchParams.get("param"))

  // 构造返回的HTML
  const html = `
    <html>
      <head>
        <title>示例页面</title>
      </head>
      <body>
        <h1>参数值：${parameter}</h1>
      </body>
    </html>
  `;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(html); // 返回HTML
});

server.listen(3000, () => {
  console.log("服务已启动，监听端口3000");
});

