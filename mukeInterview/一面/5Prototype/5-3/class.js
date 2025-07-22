/*-------------------------------     类      -----------------------------------*/
class Student {
  constructor(name, number) {
    // this 当前正在构建的实例
    this.name = name;
    this.number = number;
    // 属性这里可以用箭头函数
  }
  // 下面这块不可以用箭头函数。写了也是实例属性，不是原型方法
  sayHi() {
    console.log(`my name is${this.name}-学号${this.number}`,)
  }
}


/**
 * 通过类new对象、实例
 * new的时候会走constructor
*/
const xialuo = new Student('夏洛', 100);
console.log(xialuo.name);
console.log(xialuo.number);
console.log(xialuo.sayHi());