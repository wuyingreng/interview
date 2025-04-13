const obj1 = { x: 100, y: 200 }
const obj2 = obj1;
// x1是个值类型，赋值是直接把100复制过去，它的改变和引用类型没有关系了。
let x1 = obj1.x

obj2.x = 101
x1 = 102
console.log(obj1) 