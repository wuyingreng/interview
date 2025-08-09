let http = require('http');

let options = {
	hostname: 'localhost',
	port: 8080,
	path: '/',
	method: 'get',
	// 告诉服务端我当前要给你发什么样的数据
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': 17,
	},
};

let req = http.request(options);

// 当客户端收到服务器响应的时候触发
req.on('response', function (res) {
	res.on('data', function (chunk) {
		console.log(chunk);
	});
});
req.end('chenghuai client send');
