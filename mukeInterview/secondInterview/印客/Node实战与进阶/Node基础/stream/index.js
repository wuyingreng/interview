

const {createReadStream,createWriteStream,statSync}=require('node:fs');


// 普通的读取文件流
// const stream=createReadStream('./log.txt',{encoding:'utf8'});


// stream.on('data',function(chunk){
// 	console.log(chunk)
// })



// stream.on('end',function(){
// 	console.log('数据读取完毕')
// });



// 指定文件范围的读取流
const stream=createReadStream('./log.txt',{encoding:'utf8',start:3,end:11});


stream.on('data',function(chunk){
	console.log(chunk)
})



stream.on('end',function(){
	console.log('数据读取完毕')
});