const express = require('express');
const app = express();
const port = 3000;

// 托管静态文件（HTML）
app.use(express.static('public'));

// 处理慢速 CSS 请求
app.get('/slow.css', (req, res) => {
  const delay =  30000; // 默认延迟 30 秒
  
  setTimeout(() => {
    res.setHeader('Content-Type', 'text/css');
    res.send(`
      h1 { color: red; }
      p { font-size: 20px; }
    `);
    console.log('CSS 已发送');
  }, delay);
});

app.listen(port, () => {
  console.log(`访问 http://localhost:${port}`);
});
