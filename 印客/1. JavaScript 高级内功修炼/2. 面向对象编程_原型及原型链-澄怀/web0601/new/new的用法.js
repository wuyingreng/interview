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




// 下面这种构造函数的写法会导致，person.__proto__===Person.prototype //false
function Person2(name, age) {
  this.strength = 60;
  this.age = age;

  // 构造函数默认是返回所有的值的，返回特定的属性就表示其他的属性就没有了。
  return {
    name: name,
    habit: 'Games'
  }
}

var person = new Person2('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined

var person1 = objectFactory(Person, 'testkenvin1', 18);

console.log('person1==>', person1)