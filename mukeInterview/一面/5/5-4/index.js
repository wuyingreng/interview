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
  /**
* 1. 静态方法只能类调用，不能实例去调用。否则会报错
* 2. indexCopy.js:42 TypeError: xiaoming.staticMethod1 is not a function
* at indexCopy.js:39:50
* (anonymous)	@	indexCopy.js:42
*/
  static staticMethod1() {
    console.log('我进入了静态方法')
    this.age = this.age + 1
  }
}

// 通过类new对象、实例
const xialuo = new Student('夏洛', 100);

console.log('student staticMethod1===>', Student.staticMethod1())
// todo:一个js代码报错了，后面的代码就不会运行了。所以要用try catch包裹一下下
try {
  console.log('xialuo staticMethod1==>', xialuo.staticMethod1());
  // todo: catch里面得声明一个参数，不然会报错Identifier expected.t
} catch (err) {
  console.error(err)
}
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
console.log(Student instanceof People) // false


// class 实际上是函数，可见是语法糖
console.log('typeof People==>', typeof People);
console.log('typeof Student==>', typeof Student);

