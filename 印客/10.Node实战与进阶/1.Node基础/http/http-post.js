const http=require('node:http');


const postData=JSON.stringify({ 'msg': 'Hello World!'})

const client=http.request({

	protocol: 'http:',
    hostname: 'localhost',
    port: '8888',
    pathname: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
    }
// 自己去请求是没有req这个参数的
},(res)=>{
	console.log('res.header',res.headers);
	res.setEncoding('utf8');
	let rawData='';
	res.on('data',(chunk)=>{
		rawData+=chunk.toString();
	});
	res.on('end',()=>{
		console.log('rawData==>',rawData)
	});

	console.log('请求成功')
});


client.write(postData)

