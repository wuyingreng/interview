
const userName='Emily';
const age=25;
const height=Math.random();

exports.userName=userName;
exports.age=age;
exports.height=height;

// index.js是个空对象
const index=require('./index.js');
console.log('index',index)