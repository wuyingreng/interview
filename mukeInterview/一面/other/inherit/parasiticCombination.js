function myObjectCreate(proto) {
  function F() { } // 创建一个空的构造函数
  F.prototype = proto; // 设置原型
  return new F(); // 返回新实例，但F()是空函数，不会执行任何逻辑
}

// 等价于：
Dog.prototype = myObjectCreate(Animal.prototype);

function Animal(name) {
  console.log('构造函数呗调用')
  this.name = name;
  this.colors = ['blue', 'black']
}
Animal.prototype.sayHi = function () {
  return this.name;
};
Animal.prototype.getName = function () {

  console.log('this==>', this)
  console.log('sayHi==>', sayHi, sayHi())
  return this.name;
};

function Dog(name, breed) {
  Animal.call(this, name);  // 继承属性。第一次调用父类的构造函数
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog;

const dog1 = new Dog('Max');

dog1.colors.push('green');

console.log(dog1.colors);


console.log(dog1.getName());
console.log('Dog1.prototype的属性:', Object.getOwnPropertyNames(Dog.prototype));