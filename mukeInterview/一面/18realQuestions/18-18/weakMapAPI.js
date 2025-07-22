// WeakMap 示例
console.log('=== WeakMap 示例 ===');

// 创建一个 WeakMap 实例
const weakMap = new WeakMap();

// 创建一些对象作为键
let obj1 = { name: '对象1' };
let obj2 = { name: '对象2' };

// 设置键值对
weakMap.set(obj1, '这是对象1的值');
weakMap.set(obj2, '这是对象2的值');

// 获取值
console.log('获取对象1的值:', weakMap.get(obj1));
console.log('获取对象2的值:', weakMap.get(obj2));

// 检查键是否存在
console.log('对象1是否存在:', weakMap.has(obj1));

// 删除键值对
weakMap.delete(obj1);
console.log('删除后对象1是否存在:', weakMap.has(obj1));

// WeakSet 示例
console.log('\n=== WeakSet 示例 ===');

// 创建一个 WeakSet 实例
const weakSet = new WeakSet();

// 创建一些对象
let obj3 = { name: '对象3' };
let obj4 = { name: '对象4' };

// 添加对象到 WeakSet
weakSet.add(obj3);
weakSet.add(obj4);

// 检查对象是否存在
console.log('对象3是否在 WeakSet 中:', weakSet.has(obj3));
console.log('对象4是否在 WeakSet 中:', weakSet.has(obj4));

// 删除对象
weakSet.delete(obj3);
console.log('删除后对象3是否在 WeakSet 中:', weakSet.has(obj3));

// 演示垃圾回收
console.log('\n=== 垃圾回收演示 ===');
let tempObj = { name: '临时对象' };
weakMap.set(tempObj, '临时对象的值');
weakSet.add(tempObj);

console.log('临时对象在 WeakMap 中:', weakMap.has(tempObj));
console.log('临时对象在 WeakSet 中:', weakSet.has(tempObj));

// 将引用设置为 null，允许垃圾回收
tempObj = null;

// 注意：由于垃圾回收的时机不确定，这里可能不会立即看到效果
// 但在实际运行中，当垃圾回收发生时，tempObj 相关的数据会被自动清理