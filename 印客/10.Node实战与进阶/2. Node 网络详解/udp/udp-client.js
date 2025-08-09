var dgram = require('dgram');
var message = Buffer.from('chenghuai is here');

var PORT = 33333;
var HOST = '127.0.0.1';

var client = dgram.createSocket('udp4');

client.send(message, PORT, HOST, function (err, bytes) {
	if (err) throw err;
	console.log('UDP message sent to ' + HOST + ':' + PORT);
	client.close();
});
