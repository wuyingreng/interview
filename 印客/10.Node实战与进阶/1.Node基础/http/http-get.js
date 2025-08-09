const http=require('node:http');



http.get('http://localhost:8888/',{
	headers:{
		'X_AUTH':122
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

