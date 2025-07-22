function Person(name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

Person.prototype.strength = 80;

Person.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = new Person('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin

/** ------------  手写new       ------------*/
/**
 * 根据需求写函数
 * 需求1：调用函数，生成一个对象。返回这个对象。this是这个对象
 * 需求2：对象和函数的关系。对象.__proto__==函数.prototype
*/
// 因为new是关键字，所以要用objectFactory函数的形式
function objectFactory(fn, ...args) {
  // 因为要最后返回obj，所以要创建obj.obj在这里是实例
  var obj = {}

  // fn 作为构造函数 Constructor, 实例的原型 和 实例之间的关系
  // Func.prototype === fun1.__proto__
  obj.__proto__ = fn.prototype
  // fn 作为构造函数 Constructor。把函数和对象关联起来
  var result = fn.apply(obj, args)

  /**
   * 这行代码是为了应对下面的情况：
   * function Person(name, age) {
  *this.strength = 60;
  *this.age = age;

  *return {
  *  name: name,
  *  habit: 'Games'
  *}
*}

*var person = new Person('Kevin', '18');

*console.log(person.name) // Kevin
*console.log(person.habit) // Games
*console.log(person.strength) // undefined
*console.log(person.age) // undefined
*strength 和age都没有了
  */
  return typeof result === 'object' ? result : obj
}


// 下面这种构造函数的写法会导致，person.__proto__===Person.prototype //false
function Person(name, age) {
  this.strength = 60;
  this.age = age;

  // 构造函数默认是返回所有的值的，返回特定的属性就表示其他的属性就没有了。
  return {
    name: name,
    habit: 'Games'
  }
}

var person = new Person('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined

