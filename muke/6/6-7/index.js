/*-------------------------------     继承       -----------------------------------*/
// 父类 有公共特性的类
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
    // 通过super来调用父类的构建函数
    super(name);
    this.number = number
  }
  sayHi() {
    console.log('this=>', this)
    /**
     * xiaoluo.sayHi()调用sayHi（），this是实例的this.
     * xialuo.__proto__ 调用sayHi（）this是个类，是没有name,number属性的
     */
    console.log(`姓名:${this.name}sayHi`)
  }
}

// 通过类new对象、实例
const xialuo = new Student('夏洛', 100);
console.log(xialuo.name);
console.log(xialuo.number);
console.log(xialuo.sayHi());// xialuo.__proto__.sayHi.call('xialuo')
console.log('xialuo.__proto__.sayHi()==>', xialuo.__proto__.sayHi());
console.log('xialuo.__proto__.name==>', xialuo.__proto__.name);
console.log('xialuo.__proto__.number==>', xialuo.__proto__.number);