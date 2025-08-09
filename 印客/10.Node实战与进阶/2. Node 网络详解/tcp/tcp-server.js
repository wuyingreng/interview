/**
 * 通过net.Server类来创建一个TCP服务器
 */

/* 引入net模块，node内置模块 */
var net = require('net');

/* 实例化一个服务器对象 */
var server = new net.Server();

/* 监听 connection 事件 */
server.on('connection', function (socket) {
	console.log('someone connects');
	var address = server.address();
	var message = 'the server address is: ' + JSON.stringify(address);

	/* 发送数据 */
	socket.write(message, function () {
		var writeSize = socket.bytesWritten;
		console.log(message + ', has send');
		console.log('the size of message is: ' + writeSize);
	});

	/* 监听data事件 */
	socket.on('data', function (data) {
		console.log(data.toString());
		var readSize = socket.bytesRead;
		console.log('the size of data is: ' + readSize);
	});
});

/* 设置监听端口 */
server.listen(8000);

/* 设置监听时的回调函数 */
server.on('listening', function () {
	const serverAddress = server.address();
	const { port, address, family } = serverAddress;
	console.log('Creat server on http://127.0.0.1:8000/');

	/* TCP服务器监听的端口号 */
	console.log('the port of server is: ' + port);

	/* TCP服务器监听的地址, :: 指本地 */
	console.log('the address of server is: ' + address);

	/* 说明TCP服务器监听的地址是 IPv6 还是 IPv4 */
	console.log('the family of server is: ' + family);
});

/* 等同于 */
// server.listen(8000, function () {
// 	console.log('Creat server on http://127.0.0.1:8000/');
// });

/* 设置关闭时的回调函数 */
server.on('close', function () {
	console.log('server closed!');
});

/* 设置错误时的回调函数 */
server.on('error', function (err) {
	console.log('error!');
});
