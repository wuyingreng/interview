// 场景1：自定义对象扩展
// 给所有数组添加快速求和方法
Array.prototype.sum = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

const arr = [1, 2, 3];
console.log(arr.sum()); // 6（所有数组实例均可调用）

// 场景2：实现继承体系
// 传统继承实现
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
};

function Dog(name) {
  Animal.call(this, name); // 调用父类构造函数
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function () {
  console.log(`${this.name} barks.`);
};

const d = new Dog('Buddy');
d.speak(); // "Buddy barks."

// 场景3：性能优化
// 在原型上定义方法可节省内存
function User(name) {
  this.name = name;
}

// 10万实例共享同一方法 
User.prototype.getName = function () {
  return this.name;
};

// vs 每个实例都创建方法
function BadUser(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  }
}

// 场景4：框架开发中的元编程
// Vue 2.x响应式原理简化版
function observe(obj) {
  const keys = Object.keys(obj);
  keys.forEach(key => {
    let value = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        console.log(`Get ${key}: ${value}`);
        return value;
      },
      set(newVal) {
        console.log(`Set ${key} to ${newVal}`);
        value = newVal;
      }
    });
  });

  if (obj.__proto__) {
    observe(obj.__proto__); // 递归处理原型链
  }
}