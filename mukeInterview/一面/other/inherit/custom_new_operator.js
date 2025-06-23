// 手写 new 操作符的实现

console.log("=== 手写 new 操作符 ===\n");

/**
 * 手写 new 操作符
 * @param {Function} constructor 构造函数
 * @param {...any} args 构造函数的参数
 * @returns {Object} 新创建的实例对象
 */
function myNew(constructor, ...args) {
  // 第1步：创建一个新的空对象
  const obj = {};

  // 第2步：将新对象的原型指向构造函数的prototype
  obj.__proto__ = constructor.prototype;
  // 或者使用: Object.setPrototypeOf(obj, constructor.prototype);

  // 第3步：将构造函数的this绑定到新对象上，并执行构造函数
  const result = constructor.apply(obj, args);

  // 第4步：判断构造函数的返回值
  // 如果构造函数返回的是对象，则返回该对象
  // 否则返回新创建的对象
  return result instanceof Object ? result : obj;
}

/**
 * 更现代的写法（使用 Object.create）
 */
function myNew2(constructor, ...args) {
  // 使用 Object.create 直接创建带有正确原型的对象
  const obj = Object.create(constructor.prototype);

  // 执行构造函数
  const result = constructor.apply(obj, args);

  // 返回结果
  return result instanceof Object ? result : obj;
}

function myNew2(constructor, ...args) {
  const obj = {};
  obj.__proto__ = Object.create(constructor.prototype);
  console.log('args==>', args, ...args)
  const result = constructor.apply(obj, args)
  return typeof result === 'object' ? result : obj
}

/**
 * 完整版本（包含更多边界检查）
 */
function myNew3(constructor, ...args) {
  // 检查第一个参数是否为函数
  if (typeof constructor !== 'function') {
    throw new TypeError('constructor must be a function');
  }

  // 创建新对象，原型指向构造函数的prototype
  const obj = Object.create(constructor.prototype);

  // 执行构造函数，绑定this
  const result = constructor.apply(obj, args);

  // 判断返回值类型
  const isObject = typeof result === 'object' && result !== null;
  const isFunction = typeof result === 'function';

  return (isObject || isFunction) ? result : obj;
}

// ========== 测试用例 ==========

// 测试构造函数1：普通构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function () {
    console.log(`Hello, I'm ${this.name}, ${this.age} years old.`);
  };
}

Person.prototype.introduce = function () {
  console.log(`My name is ${this.name}`);
};

// 测试构造函数2：返回对象的构造函数
function Dog(name) {
  this.name = name;
  // 显式返回一个对象
  return {
    name: name,
    type: 'dog',
    bark: function () {
      console.log('Woof!');
    }
  };
}

// 测试构造函数3：返回基本类型的构造函数
function Cat(name) {
  this.name = name;
  // 返回基本类型，应该被忽略
  return 'This will be ignored';
}

Cat.prototype.meow = function () {
  console.log('Meow!');
};

console.log("📝 测试1：普通构造函数");
const person1 = new Person('Alice', 25);
const person2 = myNew(Person, 'Bob', 30);
const person3 = myNew2(Person, 'Charlie', 35);

console.log('原生new:', person1);
console.log('myNew:', person2);
console.log('myNew2:', person3);

console.log('\n验证方法调用:');
person1.sayHello();
person2.sayHello();
person3.introduce();

console.log('\n验证原型链:');
console.log('person1 instanceof Person:', person1 instanceof Person);
console.log('person2 instanceof Person:', person2 instanceof Person);
console.log('person3 instanceof Person:', person3 instanceof Person);

console.log('\n📝 测试2：返回对象的构造函数');
const dog1 = new Dog('Max');
const dog2 = myNew(Dog, 'Rex');

console.log('原生new:', dog1);
console.log('myNew:', dog2);
console.log('dog1 instanceof Dog:', dog1 instanceof Dog); // false，因为返回了新对象
console.log('dog2 instanceof Dog:', dog2 instanceof Dog); // false

console.log('\n📝 测试3：返回基本类型的构造函数');
const cat1 = new Cat('Whiskers');
const cat2 = myNew(Cat, 'Fluffy');

console.log('原生new:', cat1);
console.log('myNew:', cat2);
console.log('cat1 instanceof Cat:', cat1 instanceof Cat); // true
console.log('cat2 instanceof Cat:', cat2 instanceof Cat); // true

cat1.meow();
cat2.meow();

console.log('\n📝 测试4：箭头函数（应该报错）');
const ArrowFunc = (name) => {
  this.name = name;
};

try {
  const test1 = new ArrowFunc('test'); // 这会报错
} catch (e) {
  console.log('原生new with 箭头函数报错:', e.message);
}

try {
  const test2 = myNew3(ArrowFunc, 'test'); // 我们的实现也应该报错
} catch (e) {
  console.log('myNew3 with 箭头函数报错:', e.message);
}

console.log('\n=== 关键知识点总结 ===');
console.log('🎯 new操作符的4个步骤：');
console.log('1. 创建新的空对象');
console.log('2. 设置新对象的原型(__proto__)指向构造函数的prototype');
console.log('3. 将构造函数的this绑定到新对象，执行构造函数');
console.log('4. 根据构造函数返回值决定最终返回什么');

console.log('\n💡 重要细节：');
console.log('- 如果构造函数返回对象/函数，则返回该值');
console.log('- 如果构造函数返回基本类型，则忽略并返回新创建的对象');
console.log('- 箭头函数不能作为构造函数，因为没有prototype属性');
console.log('- instanceof 检查的是原型链，不是构造函数调用');

// ========== 进阶测试 ==========
console.log('\n📚 进阶测试：继承场景');

function Animal(name) {
  this.name = name;
}

Animal.prototype.getName = function () {
  return this.name;
};

function Dog2(name, breed) {
  // 在子类构造函数中调用父类构造函数
  Animal.call(this, name);
  this.breed = breed;
}

// 设置继承关系
Dog2.prototype = Object.create(Animal.prototype);
Dog2.prototype.constructor = Dog2;

Dog2.prototype.getBreed = function () {
  return this.breed;
};

const dog3 = new Dog2('Buddy', 'Golden Retriever');
const dog4 = myNew(Dog2, 'Charlie', 'Labrador');

console.log('继承测试 - 原生new:', dog3.getName(), dog3.getBreed());
console.log('继承测试 - myNew:', dog4.getName(), dog4.getBreed());
console.log('dog3 instanceof Animal:', dog3 instanceof Animal);
console.log('dog4 instanceof Animal:', dog4 instanceof Animal);
console.log('dog3 instanceof Dog2:', dog3 instanceof Dog2);
console.log('dog4 instanceof Dog2:', dog4 instanceof Dog2); 