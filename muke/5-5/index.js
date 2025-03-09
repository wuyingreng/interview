/*-------------------------------     继承       -----------------------------------*/
// 父类
class People {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(`${this.name}吃什么`)
  }
}

// 子类1：Student
class Student extends People {
  constructor(name, number) {
    // 名字用People的方法，继承父类
    super(name);
    this.number = number
  }
  sayHi() {
    console.log(`姓名:${this.name}sayHi`)
  }
}

// 通过类new对象、实例
const xialuo = new Student('夏洛', 100);


// 子类2：Teacher
class Teacher extends People {
  constructor(name, major) {
    super(name);
    this.major = major
  }
  teach() {
    console.log(`${this.name}教:${this.major}`)
  }
}

const wanglaos = new Teacher('王老师', '语文');

console.log(xialuo instanceof Student)
console.log(xialuo instanceof People) // true 
console.log(xialuo instanceof Object) // true
console.log([] instanceof Array) // true 
console.log([] instanceof Object) // true
console.log({} instanceof Object) // true

console.log(Student instanceof Object) // true
// 为什么这里是false????
console.log('Student.prototype instanceof People', Student.prototype instanceof People) // false


// 隐式原型和显式原型
console.log('xialuo.__proto__==>', xialuo.__proto__);
console.log('Student.prototype==>', Student.prototype);
// 表示两个人引用的内存的堆栈地址是一样的
console.log('xialuo.__proto__===Student.prototype==>', xialuo.__proto__ === Student.prototype);


console.log("xialuo.hasOwnProperty('name')==>", xialuo.hasOwnProperty('name'));
console.log("xialuo.hasOwnProperty('name')==>", xialuo.hasOwnProperty('name'));
console.log("xialuo.hasOwnProperty('sayHi')==>", xialuo.hasOwnProperty('sayHi'));
console.log("xialuo.hasOwnProperty('hasOwnProperty')==>", xialuo.hasOwnProperty('hasOwnProperty'));
console.log("Object.hasOwnProperty('hasOwnProperty')==>", Object.hasOwnProperty('hasOwnProperty'));

console.log("Student.hasOwnProperty('sayHi')==>", Student.hasOwnProperty('sayHi')); // false
console.log("Student.prototype.hasOwnProperty('sayHi')==>", Student.prototype.hasOwnProperty('sayHi')); // true
console.log("Student.prototype.hasOwnProperty('name')==>", Student.prototype.hasOwnProperty('name')); // true
// 
/***
 * instanceof
 * 前面的变量的隐式原型对应到class的显示原型
 * 多看图就能理解这方面的知识了
 */
// 

console.log("xialuo instanceof Student==>", xialuo instanceof Student); // true
console.log("xialuo instanceof People==>", xialuo instanceof People); // true
console.log("xialuo instanceof Object==>", xialuo instanceof Object); // true
console.log("Student.prototype instanceof People==>", Student.prototype instanceof People); // true