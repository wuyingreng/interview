// 演示引用类型的工作原理

console.log('=== 基本类型 vs 引用类型 ===');

// 基本类型示例
let num1 = 5;
let num2 = num1;
console.log('初始值:');
console.log('num1:', num1);  // 5
console.log('num2:', num2);  // 5

num2 = 10;
console.log('修改 num2 后:');
console.log('num1:', num1);  // 5 (未改变)
console.log('num2:', num2);  // 10

console.log('\n=== 引用类型示例 ===');

// 引用类型示例
let obj1 = { name: 'Alice' };
let obj2 = obj1;
console.log('初始值:');
console.log('obj1:', obj1);  // { name: 'Alice' }
console.log('obj2:', obj2);  // { name: 'Alice' }

obj2.name = 'Bob';
console.log('修改 obj2.name 后:');
console.log('obj1:', obj1);  // { name: 'Bob' } (改变了！)
console.log('obj2:', obj2);  // { name: 'Bob' }

console.log('\n=== 您的代码分析 ===');

// 您的代码
const testa = {};
console.log('第一次打印 testa:', testa); // {}

testa[1] = 1;
console.log('第二次打印 testa:', testa); // {1: 1}

console.log('\n=== 内存地址验证 ===');

// 验证是否是同一个对象
const original = testa;
console.log('original === testa:', original === testa); // true

// 修改 testa 会影响 original
testa[2] = 2;
console.log('修改后 original:', original); // {1: 1, 2: 2}
console.log('修改后 testa:', testa);       // {1: 1, 2: 2}

console.log('\n=== 重新赋值 vs 修改属性 ===');

let obj3 = { x: 1 };
let obj4 = obj3;

console.log('初始状态:');
console.log('obj3:', obj3); // { x: 1 }
console.log('obj4:', obj4); // { x: 1 }

// 修改属性 - 会影响所有引用
obj3.x = 2;
console.log('修改属性后:');
console.log('obj3:', obj3); // { x: 2 }
console.log('obj4:', obj4); // { x: 2 }

// 重新赋值 - 只影响当前变量
obj3 = { x: 3 };
console.log('重新赋值后:');
console.log('obj3:', obj3); // { x: 3 }
console.log('obj4:', obj4); // { x: 2 } (未改变！)

console.log('\n=== 函数参数传递 ===');

function modifyObject(obj) {
  obj.newProperty = 'added';
  console.log('函数内部 obj:', obj);
}

let testObj = { original: 'value' };
console.log('调用函数前:', testObj);

modifyObject(testObj);
console.log('调用函数后:', testObj); // { original: 'value', newProperty: 'added' }

console.log('\n=== 数组也是引用类型 ===');

let arr1 = [1, 2, 3];
let arr2 = arr1;

console.log('初始数组:');
console.log('arr1:', arr1); // [1, 2, 3]
console.log('arr2:', arr2); // [1, 2, 3]

arr2.push(4);
console.log('修改 arr2 后:');
console.log('arr1:', arr1); // [1, 2, 3, 4] (改变了！)
console.log('arr2:', arr2); // [1, 2, 3, 4] 