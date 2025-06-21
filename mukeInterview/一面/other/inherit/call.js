// 父类
function Animal(name, age) {
  this.name = name;
  this.age = age;
  this.colors = ['red', 'blue'];
}

Animal.prototype.getName = function () {
  return this.name;
};

// 子类
function Dog(name, age, breed) {
  // 借用父类构造函数
  Animal.call(this, name, age);
  this.breed = breed;
}

Dog.prototype.bark = function () {
  return 'Woof!';
};

// 测试
const dog1 = new Dog('Max', 3, 'Golden Retriever');
const dog2 = new Dog('Buddy', 2, 'Labrador');

console.log(dog1.name); // "Max"
console.log(dog1.age); // 3

// 引用类型不共享
dog1.colors.push('green');
console.log(dog1.colors); // ["red", "blue", "green"]
console.log(dog2.colors); // ["red", "blue"] - 没有被影响

/**
 * 但是无法访问父类原型方法
 * 缺失的原型链关系
 *  关键问题：没有设置原型链关系！
 * Dog.prototype 仍然指向默认的 Dog.prototype
 * 没有与 Animal.prototype 建立任何联系
 * */
console.log(dog1.getName); // undefined