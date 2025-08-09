let http = require('http');
let server = http.createServer();

server.on('request', function (req, res) {
	req.on('end', function () {
		res.write('http protocol connection');
		res.end();
	});
});

// 默认连接成功后 会把socket解析成 req,res，解析后触发一个事件，事件叫request
server.on('connection', function (socket) {
	console.log('connect is success');
});

// 另一种写法
// let server = http.createServer(function (req, res) {
// 	res.end('ok');
// });

server.listen(8080);
