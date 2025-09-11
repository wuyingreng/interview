
this.a = 1;
exports.b = 2;

console.log('exports===module.exports===this,',exports===module.exports,this===exports,this===module.exports,this);// true,{a:1,b:2}

// exports = {
// 	c: 3
// };

// module.exports = {
// 	d: 4
// }

// // false,this {a:1,b:2},exports:{c:3},module.exports:{d:4}

// console.log('exports===module.exports===this,',exports===this===module.exports,this,module.exports,exports);

// exports.e = 5
// this.f = 6


// // false,this {a:1,b:2,f:6},exports:{c:3,e:5},module.exports:{d:4}
// console.log('exports===module.exports===this,',exports===this===module.exports,this,module.exports,exports);






/**
 * 1. 组件最开始加载的时候
 * this, module.exports,exports执行同一个内存地址 {}。
 * this 的指向在模块执行过程中不会改变，即使后续对 module.exports 进行了重新赋值。也就是说，this 始终指向最初的 module.exports 对象
 *  
 * let module={};
 * exports=module.exports={};
 * module.exports={ 断开了联系
 * 	d:4
 * }
 * exports.e=5。 
 * 
 * 2. require引入的一直都是module.exports。打印module.exports 
*/
