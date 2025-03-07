/** ---------  2. 原型链查找题 ----------*/
function ParentFind() { this.name = 'parent'; }
ParentFind.prototype.getName = function () { return this.name; };

function ChildFind() { this.name = 'child'; }
ChildFind.prototype = new ParentFind();

const cFind = new ChildFind();
console.log(cFind.getName()); // 输出什么？
console.log(cFind.__proto__.__proto__ === ParentFind.prototype); // true还是false？


/** --------- 3. 修改原型影响题 ----------*/
/**
 * 已存在的实例保持对旧原型的引用
 * 修改构造函数prototype属性不影响已创建的实例
*/

function Foo() { }
const obj1 = new Foo();
Foo.prototype.value = 100;

const obj2 = new Foo();
console.log(obj1.value); // ?
console.log(obj2.value); // ?

Foo.prototype = { value: 200 };
const obj3 = new Foo();
console.log(obj3.value); // ?
console.log(obj2.value); // ?

/** --------- 4. 手写继承实现----------*/
function inherit(Child, Parent) {
  // 创建中间原型对象
  const prototype = Object.create(Parent.prototype);
  prototype.constructor = Child;
  Child.prototype = prototype;
}

// 使用示例
function ParentInherit(name) {
  this.name = name;
}
ParentInherit.prototype.sayName = function () {
  console.log(this.name);
};

function ChildInherit(name, age) {
  ParentInherit.call(this, name); // 继承属性
  this.age = age;
}

inherit(Child, Parent); // 继承方法

const cInherit = new ChildInherit('Tom', 10);
cInherit.sayName(); // "Tom"


/** --------- 5. 综合原型链分析----------*/
function A() { }
function B() { }
B.prototype = Object.create(A.prototype);
const b = new B();

console.log(b instanceof B); // ?
console.log(b instanceof A); // ?
console.log(b.__proto__.__proto__ === A.prototype); // ?



/** --------- 6. 手写instanceof----------*/
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;

  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}


/** ---------7. 原型链终点问题----------*/
/**
 * 核心记忆点：
 * 所有原型链终点都是null
 * Function的特殊性：Function.__proto__ === Function.prototype
*/
console.log(Object.prototype.__proto__); // ?
console.log(Function.prototype.__proto__); // ?
console.log(Function.__proto__ === Function.prototype); // ?