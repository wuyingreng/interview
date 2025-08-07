const http=require('node:http');


// 接收请求
const server=http.createServer((req,res)=>{
	console.log('req.headers==>',req.headers);
	console.log('req.httpVersion==>',req.httpVersion);
	console.log('req.method==>',req.method);
	console.log('req.url==>',req.url);


	// res.setHeader('tenant','AE');
	// res.write('hello');
	// 
	res.write('world');
	// res.statusCode=404;

	if(req.method==='POST'){
		let result='';
		res.on('data',(chunk)=>{
			result+=chunk;
		});
		res.write(result);
		res.end('post ok')
	}else{
		res.end('get ok')
	}


	

});


// 为什么这里还需要一个回调呢？
server.listen(8888,()=>{
	console.log('服务已经启动了')
});



