import newObjName from './c.js';
import {fn,name} from './b.js';
import newB from './b.js';
// 写一个sum 箭头函数
const sum=(a,b)=>a+b;
const res=sum(10,20)
console.log('res==>',res)

class Student{
	constructor(name,number){
		// this 当前正在构建的实例
		this.name=name;
		this.number=number;
	}
	sayHi(){
		console.log(`my name is${this.name}-学号${this.number}`,)
	}
}

// 通过类new对象、实例
const xialuo=new Student('夏洛',100);
console.log(xialuo.name);
console.log(xialuo.number);
console.log(xialuo.sayHi());

console.log('newObjName==>',newObjName)
console.log('fn==>',fn,'name==>',name)

console.log('b.fn==>',newB.fn,'b.name==>',newB.name)