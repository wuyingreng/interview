// 演示：为什么不是循环依赖

console.log('=== 澄清概念混乱 ===');

// 1. 原生实现 vs 模拟实现
console.log('\n1. 原生 vs 模拟:');

// 这些是 JavaScript 引擎的原生实现 (C++ 代码)
console.log('typeof Object.create:', typeof Object.create); // "function" - 原生实现
console.log('new 是操作符，不是函数'); // new 是操作符，不能用 typeof

// 2. 我们的模拟函数使用的是原生实现
console.log('\n2. 模拟函数的依赖关系:');

// 模拟 new 操作符 - 使用原生的 Object.create
function _new(Constructor, ...args) {
  console.log('_new 调用原生的 Object.create');
  const obj = Object.create(Constructor.prototype); // 使用原生 Object.create
  const result = Constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

// 模拟 Object.create - 使用原生的 new 操作符  
function myObjectCreate(proto) {
  console.log('myObjectCreate 调用原生的 new 操作符');
  function F() { }
  F.prototype = proto;
  return new F(); // 使用原生 new 操作符
}

// 3. 演示它们不是相互依赖
console.log('\n3. 实际使用演示:');

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

// 使用我们的模拟 _new (它内部用的是原生 Object.create)
console.log('使用 _new:');
const person1 = _new(Person, "Alice");
console.log(person1.greet());

// 使用我们的模拟 myObjectCreate (它内部用的是原生 new)
console.log('\n使用 myObjectCreate:');
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  return `${this.name} barks!`;
};

// 创建一个新的构造函数，继承 Dog
function Puppy(name, age) {
  Dog.call(this, name);
  this.age = age;
}

// 设置原型继承 - 使用我们的模拟函数
Puppy.prototype = myObjectCreate(Dog.prototype);
Puppy.prototype.constructor = Puppy;

const puppy = new Puppy("Max", 1); // 这里用的是原生 new
console.log(puppy.bark());

// 4. 更直观的比较
console.log('\n4. 原生 vs 模拟对比:');

// 原生方式
const obj1 = Object.create(Person.prototype);
console.log('原生 Object.create 创建:', obj1.__proto__ === Person.prototype);

// 模拟方式  
const obj2 = myObjectCreate(Person.prototype);
console.log('模拟 Object.create 创建:', obj2.__proto__ === Person.prototype);

// 原生方式
const person2 = new Person("Bob");
console.log('原生 new 创建:', person2.name);

// 模拟方式
const person3 = _new(Person, "Charlie");
console.log('模拟 new 创建:', person3.name);

// 5. 关键理解
console.log('\n=== 关键理解 ===');
console.log('✅ _new() 使用原生的 Object.create()');
console.log('✅ myObjectCreate() 使用原生的 new 操作符');
console.log('✅ 它们模拟的是对方，但使用的是原生实现');
console.log('✅ 没有真正的循环依赖');

// 6. 如果真的有循环依赖会怎样？
console.log('\n6. 真正的循环依赖示例:');
function badNew(Constructor, ...args) {
  const obj = badObjectCreate(Constructor.prototype); // 使用自己的模拟
  const result = Constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function badObjectCreate(proto) {
  // 这里如果调用 badNew 就会造成无限递归
  // return badNew(function(){}, proto); // 这会死循环！

  // 所以实际实现必须使用原生方法
  function F() { }
  F.prototype = proto;
  return new F(); // 必须使用原生 new
}

console.log('避免了真正的循环依赖，因为底层使用原生实现'); 