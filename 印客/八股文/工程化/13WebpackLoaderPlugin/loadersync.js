/**
 * 1. loader要用普通函数。要获取this
 * 2. source是上一个loader处理好的文件内容
 * this ，发现输出结果是非常长的一串内容，this 上有很多我们可以在 loader 中使用的有用信息，所以，对于
 *  loader的编写，一定不要使用箭头函数，那样会改变 this 的指向。
 * 
 * 初步版：
 * */
module.exports=function(source){
	let finalSource=source+'升职加薪';

	return loader
}







