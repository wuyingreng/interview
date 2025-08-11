// let http = require('http');
// let server = http.createServer();

// server.on('request', function (req, res) {
// 	req.on('end', function () {
// 		res.write('http protocol connection');
// 		res.end();
// 	});
// });

// // 默认连接成功后 会把socket解析成 req,res，解析后触发一个事件，事件叫request
// server.on('connection', function (socket) {
// 	console.log('connect is success');
// });

// // 另一种写法
// // let server = http.createServer(function (req, res) {
// // 	res.end('ok');
// // });

// server.listen(8080);


const http = require('node:http');

// 创建一个服务器
const server = http.createServer();

// 监听请求
server.on('request', function (req, res) {
	// 连接之后的监听
	req.on('end', function () {
		res.write('http连接创建成功\n');
		res.end('http发送完成');
	});
	
	// 重要：开始读取请求数据
	req.resume();
});


// 监听8080的端口号
server.listen(8080, function () {
	console.log('服务器已经启动，监听端口: 8080');
	console.log('可以通过 http://localhost:8080 访问');
});