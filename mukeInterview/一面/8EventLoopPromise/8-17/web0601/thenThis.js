// 简化版本：构造函数接受一个函数，专注观察 this 绑定

console.log("=== 简化版本：观察 this 绑定 ===");

class Person {
  constructor(initFunction) {
    this.name = null;
    this.id = Math.random().toString(36).substr(2, 9);

    console.log(`创建 Person 实例: ${this.id}`);

    // 直接执行传入的函数，让它设置 name
    if (initFunction) {
      const result = initFunction();
      this.name = result;
      console.log(`Person ${this.id} 设置 name: ${this.name}`);
    }
  }

  createChild(childFunction) {
    console.log(`\n--- 在 Person ${this.id} 上调用 createChild ---`);
    console.log(`当前 this 指向: ${this.id}`);
    console.log(`当前 this 的 name: ${this.name}`);

    // 关键：创建新的 Person 实例，但 this 不会改变
    // const childPerson = new Person(() => {
    //   console.log(`在 Person ${this.id} 的 createChild 方法内部创建新 Person`);
    //   console.log(`注意：即使创建了新 Person，this 仍然是: ${this.id}`);
    //   console.log(`使用父亲 ${this.id} 的 name "${this.name}" 来创建孩子`);
    //   // 使用外部的 this 来处理
    //   const childName = childFunction(this.name);
    //   return childName;
    // });

    // 改成普通函数this就会丢失
    const childPerson = new Person(function () {
      console.log(' childPerson this==>', this)
      // 使用外部的 this 来处理
      const childName = childFunction(this.name);
      return childName;
    });


    console.log(`createChild 返回新的 Person: ${childPerson.id}`);
    return childPerson;
  }
}

// 测试 1: 基础使用
console.log("\n=== 测试 1: 基础使用 ===");
const father = new Person(() => {
  console.log('执行 father 的初始化函数');
  return '李爸爸';
});

const child = father.createChild((parentName) => {
  console.log(`回调函数收到父亲名字: ${parentName}`);
  return parentName.replace('爸爸', '儿子');
});

console.log(`最终结果 - 父亲: ${father.name}, 孩子: ${child.name}`);

// 测试 2: 链式调用
console.log("\n=== 测试 2: 链式调用 ===");
const grandFather = new Person(() => '张爷爷');

const grandSon = grandFather
  .createChild((name) => {
    console.log(`第一代: 从 ${name} 创建孩子`);
    return name.replace('爷爷', '爸爸');
  })
  .createChild((name) => {
    console.log(`第二代: 从 ${name} 创建孩子`);
    return name.replace('爸爸', '儿子');
  });

console.log(`链式调用结果: ${grandFather.name} → ${grandSon.name}`);

// 测试 3: 演示 this 绑定的关键点
console.log("\n=== 测试 3: this 绑定关键演示 ===");
const person1 = new Person(() => 'Person1');
const person2 = new Person(() => 'Person2');

console.log('现在调用 person1.createChild():');
const result1 = person1.createChild((name) => `${name}的孩子`);

console.log('现在调用 person2.createChild():');
const result2 = person2.createChild((name) => `${name}的孩子`);

console.log(`结果对比:`);
console.log(`person1.createChild() 使用的是 person1 的 name: ${result1.name}`);
console.log(`person2.createChild() 使用的是 person2 的 name: ${result2.name}`);

console.log("\n=== 关键理解点 ===");
console.log("1. 构造函数接受一个函数来初始化实例");
console.log("2. 在 createChild 方法中，this 始终指向调用者");
console.log("3. 即使内部 new Person()，外部的 this 绑定不变");
console.log("4. 新实例的初始化函数中可以访问外部的 this");
console.log("5. 这就是 Promise 中 this 指向的核心机制");

console.log("\n=== 对比 Promise ===");
console.log("这个例子中:");
console.log("- new Person(func) ≈ new Promise(executor)");
console.log("- person.createChild(func) ≈ promise.then(callback)");
console.log("- 都是在方法内部创建新实例，this 指向调用者");
console.log("- 新实例的状态/值由传入的函数决定");


// class MyPromise {
//   then(onFulfilled) {
//     // 当 promise1.then() 被调用时，this 就绑定到 promise1
//     console.log(this); // 这里的 this 是 promise1

//     // 即使创建新对象，this 绑定不会改变
//     const newPromise = new MyPromise((resolve) => {
//       // 在这个回调函数中，外部的 this 仍然是 promise1
//       console.log(this); // 这里的 this 还是 promise1

//       // 这是闭包的特性：可以访问外部作用域的变量
//       if (this.promiseState === 'fulfilled') {
//         // 使用的是 promise1 的状态和结果
//       }
//     });

//     (resolve) => {
//       // 在这个回调函数中，外部的 this 仍然是 promise1
//       console.log(this); // 这里的 this 还是 promise1

//       // 这是闭包的特性：可以访问外部作用域的变量
//       if (this.promiseState === 'fulfilled') {
//         // 使用的是 promise1 的状态和结果
//       }
//     }
//     它说这里是个闭包

//     return newPromise; // 返回新的 Promise 实例
//   }
// }

// 总结：这不是 Promise 特有的设计，而是 JavaScript 语言本身的特性。任何类都可以在方法中创建新实例，同时通过闭包访问原始的 this。这使得链式调用和状态传递成为可能。