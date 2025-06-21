// this绑定问题演示

class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
    console.log('this指向:', this);
  }
}

console.log('=== 演示this绑定问题 ===');

// 1. 正常调用 - this绑定正确
const person = new Person("Alice");
console.log('\n1. 正常调用：');
person.greet(); // 输出: Hello, I'm Alice

// 2. 方法赋值后调用 - this绑定丢失
console.log('\n2. 方法赋值后调用：');
const greet = person.greet;
try {
  greet(); // 报错或输出: Hello, I'm undefined
} catch (error) {
  console.log('报错:', error.message);
}

// 让我们看看this到底指向什么
console.log('\n3. 查看this的指向：');
const greetWithThis = function () {
  console.log('在greet函数中，this是:', this);
  console.log('this === undefined:', this === undefined);
  console.log('this === window (浏览器) or global (Node.js):', this === globalThis);
};

const greetCopy = greetWithThis;
greetCopy(); // this指向全局对象或undefined

// 4. 更明显的例子
console.log('\n4. 更明显的对比：');
class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(num) {
    console.log(`计算: ${this.value} + ${num} = ${this.value + num}`);
    return this.value + num;
  }
}

const calc = new Calculator(10);

// 正常调用
console.log('正常调用:');
calc.add(5); // 输出: 计算: 10 + 5 = 15

// 方法赋值后调用
console.log('方法赋值后调用:');
const addMethod = calc.add;
try {
  addMethod(5); // 报错：Cannot read property 'value' of undefined
} catch (error) {
  console.log('报错:', error.message);
}

// 5. 解决方案演示
console.log('\n=== 解决方案 ===');

// 方案1: 使用bind
console.log('\n方案1: bind绑定');
const boundGreet = person.greet.bind(person);
boundGreet(); // 正常工作

// 方案2: 使用箭头函数
console.log('\n方案2: 箭头函数');
class PersonWithArrow {
  constructor(name) {
    this.name = name;
  }

  // 箭头函数会继承外层的this
  greet = () => {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const person2 = new PersonWithArrow("Bob");
const arrowGreet = person2.greet;
arrowGreet(); // 正常工作

// 方案3: 使用call/apply
console.log('\n方案3: call/apply');
const greetMethod = person.greet;
greetMethod.call(person); // 正常工作
greetMethod.apply(person); // 正常工作

// 方案4: 包装函数
console.log('\n方案4: 包装函数');
const wrappedGreet = () => person.greet();
wrappedGreet(); // 正常工作 