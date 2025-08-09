
const user1=require('./user.js');
console.log(user1.height)

const user2=require('./user.js');
console.log(user2.height);

const name='emily';
const path='./index';
module.exports={
	name,
	path
}
console.log('module=>',module)
/**
 * 执行node index.js的整个过程的分析:
* 1. 生成 module={
* }
 * 2. 加载user.js,执行里面的代码
 * 此时const index=require('./index.js');
 * index还是个空对象，所以打印出来
 * console.log('index',index) 是个空对象
 * 3. 加载user.js
 * 
 * */