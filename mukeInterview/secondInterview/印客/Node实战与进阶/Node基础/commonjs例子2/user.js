const userName='Emily';
const age=25;
const height=150;

console.log('=== 演示1：初始状态 ===');
console.log('module.exports === exports:', module.exports === exports);
console.log('module.exports:', module.exports);
console.log('exports:', exports);

module.exports={
	userName,
	age
}





 exports.height=height;

console.log('=== 演示2：修改后的状态 ===');
console.log('module.exports:', module.exports);
// exports还是指向原来的module.exports，但是module.exports已经被重新赋值了。
console.log('exports:', exports); 

const testa={};
console.log(testa);
testa[1]=1
console.log(testa);


