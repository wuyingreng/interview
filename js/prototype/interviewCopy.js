

function myNew(constructor, ...args) {
  // 1. 创建一个新对象，并将其隐式原型指向构造函数的显示原型
  const obj = Object.create(constructor.prototype)
  // 2. 将构造函数的this绑定到新对象上
  const result = constructor.apply(obj, args);
  // 3. 如果构造函数返回的结果是一个对象，则返回这个对象；否则返回新对象
  return result instanceof Object ? result : obj;
}
