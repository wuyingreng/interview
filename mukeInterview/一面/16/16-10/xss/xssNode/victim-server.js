// victim-server.js
const express = require('express');
const path = require('path');

const app = express();

// 托管静态文件
app.use(express.static(path.join(__dirname, 'public')));

app.listen(4000, () => {
    console.log('受害者网站服务器已启动 - http://localhost:4000');
});
