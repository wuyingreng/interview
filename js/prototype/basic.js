/** ---------  1. array, Array,Object,function,class的关系 ----------*/
const arr = [];
class MyClass { }
// 自定义对象示例
function Person(name) {
  this.name = name
}

console.log(typeof MyClass); // "function"
/**
 * 构造函数的 prototype 属性指向原型对象
 * 所有的都是用最原始的，而不是匿名函数写的
*/


Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};
john = new Person();


console.log(arr.__proto__ === Array.prototype); // true 大大 小小
console.log(john.__proto__ === Person.prototype); // true

console.log(Array.prototype.__proto__ === Object.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
console.log(MyClass.prototype.__proto__ === Object.prototype); // true

//因为构造函数本身是一个函数，而它的`prototype`属性则是用于实例继承的原型对象。
console.log(Person.__proto__ === Function.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
```markdown
john (实例) 
  → __proto__ → Person.prototype 
    → __proto__ → Object.prototype 
      → __proto__ → null
```


// instance.constructor === ConstructorFunction
console.log(john.constructor === Person); // true
// instance.__proto__ === ConstructorFunction.prototype
// ConstructorFunction.prototype.constructor === ConstructorFunction
console.log(Person.prototype.constructor === Person); // true


console.log(Object.prototype.__proto__); // null
console.log(Person.prototype.constructor.__proto__.__proto__.__proto__) // nul

// 方法溯源示例
console.log(arr.push === Array.prototype.push);       // true ✅
console.log(arr.toString === Object.prototype.toString); // true ✅


/** ---------  2. obj.hasOwnProperty('key')与'key' in obj ----------*/
const example = {};
example.prop = "exists";

// `hasOwnProperty` 仅对直接属性返回 true：
example.hasOwnProperty("prop"); // 返回 true
example.hasOwnProperty("toString"); // 返回 false
example.hasOwnProperty("hasOwnProperty"); // 返回 false

// 对于直接或继承的属性，`in` 运算符将返回 true：
"prop" in example; // 返回 true
"toString" in example; // 返回 true
"hasOwnProperty" in example; // 返回 true


/** ---------  3. 手写new操作符 ----------*/
function myNew(constructor, ...args) {
  // 1. 创建一个新对象，并将其隐式原型指向构造函数的显示原型
  const obj = Object.create(constructor.prototype);
  // 2. 将构造函数的this绑定到新对象上
  const result = constructor.apply(obj, args);
  // 3. 如果构造函数返回的结果是一个对象，则返回这个对象；否则返回新对象
  return result instanceof Object ? result : obj;
}

emily = myNew(Person, 'emily')
console.log(emily)


/** ---------  4. 现代语法本质 ----------*/
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise`);
  }
}

// 等价于:
// 构造函数不能用箭头函数
function AnimalFunc(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise`);
};