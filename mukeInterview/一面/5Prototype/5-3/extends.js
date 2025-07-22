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
    console.log(`姓名:${this.name}sayHi`)
  }
}

// 通过类new对象、实例
const xialuo = new Student('夏洛', 100);
console.log(xialuo.name);
console.log(xialuo.number);
console.log(xialuo.sayHi());
console.log(xialuo.eat());


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
console.log(wanglaos.name);
console.log(wanglaos.major);
console.log(wanglaos.teach());
console.log(wanglaos.eat());