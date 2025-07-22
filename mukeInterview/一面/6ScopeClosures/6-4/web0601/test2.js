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

person.__proto__ === Person.prototype