// let http = require('http');

// let options = {
// 	hostname: 'localhost',
// 	port: 8080,
// 	path: '/',
// 	method: 'get',
// 	// 告诉服务端我当前要给你发什么样的数据
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded',
// 		'Content-Length': 17,
// 	},
// };

// let req = http.request(options);

// // 当客户端收到服务器响应的时候触发
// req.on('response', function (res) {
// 	res.on('data', function (chunk) {
// 		console.log(chunk);
// 	});
// });
// req.end('chenghuai client send');


const http = require('node:http');
const options = {
	hostname: '127.0.0.1',  // 使用IP地址而不是localhost
	port: 8080,  // 数字，不是字符串
	path: '/',
	method: 'GET',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
};

const req = http.request(options);



req.on('response', function (res) {
	console.log('收到响应, 状态码:', res.statusCode);
	res.on('data', function (chunk) {
		console.log('收到数据:', chunk.toString());
	});

});

console.log('发送HTTP请求到 127.0.0.1:8080...');
req.end(); // 重要：必须调用end()来发送请求