// 父类
function Animal(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Animal.prototype.getName = function () {
  return this.name;
};

// 子类
function Dog(name) {
  this.breed = 'Golden Retriever';
}

// 实现继承：子类原型指向父类实例
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  return 'Woof!';
};

// 测试
// Wrong: 这么写是不能成功pass name属性的
const dog1 = new Dog('Max');
const dog2 = new Dog('Buddy');
// Right: 这么写可以得到name属性
dog1.name = 'Max'
dog2.name = 'Buddy'

console.log(dog1.getName()); // undefined (name没有传递)
console.log(dog1.bark()); // "Woof!"


/**
 * Wrong：这么写会共享一个colors数组
 * 因为dog1 实例没有
 * 向上查找到dog1.__proto__也就是Dog.prototype上面有，是对应到
 * new Animal()实例上，指向的是同一个
*/
dog1.colors.push('green');
console.log(dog1.colors); // ["red", "blue", "green"]
console.log(dog2.colors); // ["red", "blue", "green"] - 引用类型被共享

// Right:
dog1.colors2 = ['white']
dog2.colors2 = ['blue']
console.log(dog1.colors2);
console.log(dog2.colors2);

console.log(dog1.__proto__ == Dog.prototype) // true