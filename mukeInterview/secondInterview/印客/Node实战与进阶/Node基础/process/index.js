
const process=require('node:process');

// arguments vector 参数向量。argv参数数组。记住是个属性，可以直接访问不是一个函数。
/**
 * 执行：node index.js --a
 * [
  '/Users/xiangpeifang/.nvm/versions/node/v20.11.0/bin/node',
  '/Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/Node 基础/process/index.js',
  '--a'
]
 * 
 * 
 * 
 * 
 * */
console.log(process.argv);

// node

console.log(process.argv0);

// 当前进程执行的目录
// /Users/xiangpeifang/Documents/study/interview/mukeInterview/secondInterview/印客/Node实战与进阶/Node基础/process

console.log(process.cwd());

// 这个是执行操作没有返回值的
console.log(process.chdir('../'));


console.log(process.cwd());

console.log(process.env);

process.env.a=1;

console.log(process.env);