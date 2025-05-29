const http = require('http');
const serverHandle = require('../app');
//  服务器的端口
const PORT = 8000;

// 启动一个服务器
const server = http.createServer(serverHandle);

// 服务器监听8000的端口
server.listen(8000)