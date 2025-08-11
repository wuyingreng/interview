/**
 * findIndex 和 indexOf 的区别详解
 */

console.log('=== findIndex 和 indexOf 的区别 ===\n');

// 1. 基本语法和用途
console.log('1. 基本语法和用途:');
console.log('indexOf: 用于查找基本类型值的索引');
console.log('findIndex: 用于查找满足条件的元素索引\n');

// 2. 参数类型不同
const numbers = [1, 2, 3, 4, 5, 2];

// indexOf: 接受要查找的值
console.log('2. 参数类型:');
console.log('indexOf(2):', numbers.indexOf(2)); // 1 (第一个匹配的索引)
console.log('indexOf(6):', numbers.indexOf(6)); // -1 (未找到)

// findIndex: 接受回调函数
console.log('findIndex(x => x > 3):', numbers.findIndex(x => x > 3)); // 3
console.log('findIndex(x => x > 10):', numbers.findIndex(x => x > 10)); // -1
console.log('');

// 3. 查找复杂对象的区别
const users = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 }
];

console.log('3. 查找复杂对象:');

// indexOf 对于对象无法正确工作（因为对象引用不同）
const targetUser = { id: 2, name: '李四', age: 30 };
console.log('indexOf查找对象:', users.indexOf(targetUser)); // -1 (无法找到)

// findIndex 可以通过条件查找
console.log('findIndex查找对象:', users.findIndex(user => user.id === 2)); // 1
console.log('findIndex查找姓名:', users.findIndex(user => user.name === '王五')); // 2
console.log('');

// 4. 支持的数据类型
console.log('4. 支持的数据类型:');

// indexOf: 适用于基本类型
const strings = ['apple', 'banana', 'orange'];
console.log('字符串数组 indexOf("banana"):', strings.indexOf('banana')); // 1

const booleans = [true, false, true];
console.log('布尔数组 indexOf(false):', booleans.indexOf(false)); // 1

// findIndex: 适用于任何复杂条件
console.log('findIndex 复杂条件查找:');
console.log('查找长度大于5的字符串:', strings.findIndex(str => str.length > 5)); // 1 (banana)
console.log('查找年龄在25-30之间的用户:', users.findIndex(user => user.age >= 25 && user.age <= 30)); // 0
console.log('');

// 5. 性能对比
console.log('5. 性能对比:');
console.log('indexOf: 性能更高，直接值比较');
console.log('findIndex: 性能稍低，需要执行回调函数');

// 性能测试示例
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

console.time('indexOf性能测试');
for (let i = 0; i < 1000; i++) {
  largeArray.indexOf(50000);
}
console.timeEnd('indexOf性能测试');

console.time('findIndex性能测试');
for (let i = 0; i < 1000; i++) {
  largeArray.findIndex(x => x === 50000);
}
console.timeEnd('findIndex性能测试');
console.log('');

// 6. 实际应用场景
console.log('6. 实际应用场景:');

// indexOf 使用场景
console.log('indexOf 适用场景:');
console.log('- 检查数组中是否包含特定值');
console.log('- 查找字符串在数组中的位置');
console.log('- 简单的值查找');

// 示例：检查权限
const permissions = ['read', 'write', 'delete'];
const hasWritePermission = permissions.indexOf('write') !== -1;
console.log('是否有写权限:', hasWritePermission);

// findIndex 使用场景
console.log('\nfindIndex 适用场景:');
console.log('- 查找满足复杂条件的对象');
console.log('- 条件查找');
console.log('- 对象数组操作');

// 示例：查找待审核的订单
const orders = [
  { id: 1, status: 'completed', amount: 100 },
  { id: 2, status: 'pending', amount: 200 },
  { id: 3, status: 'shipped', amount: 150 }
];

const pendingOrderIndex = orders.findIndex(order => order.status === 'pending');
console.log('待审核订单索引:', pendingOrderIndex);

// 7. 返回值比较
console.log('\n7. 返回值:');
console.log('两者都返回索引（number类型）');
console.log('找到时：返回第一个匹配项的索引（0-based）');
console.log('未找到时：都返回 -1');

// 8. 完整比较表格
console.log('\n8. 完整对比:');
console.log('┌─────────────┬──────────────────┬──────────────────┐');
console.log('│   特性      │     indexOf      │    findIndex     │');
console.log('├─────────────┼──────────────────┼──────────────────┤');
console.log('│ 参数类型    │ 要查找的值       │ 回调函数         │');
console.log('│ 适用场景    │ 基本类型值查找   │ 复杂条件查找     │');
console.log('│ 性能        │ 较高             │ 较低             │');
console.log('│ 灵活性      │ 较低             │ 较高             │');
console.log('│ 返回值      │ 索引或-1         │ 索引或-1         │');
console.log('│ ES版本      │ ES5              │ ES6+             │');
console.log('└─────────────┴──────────────────┴──────────────────┘');

// 9. 最佳实践建议
console.log('\n9. 最佳实践建议:');
console.log('✅ 查找基本类型值时使用 indexOf');
console.log('✅ 查找对象或需要复杂条件时使用 findIndex');
console.log('✅ 简单检查元素是否存在时使用 includes()');
console.log('✅ 需要获取元素本身而不是索引时使用 find()');

// 示例：选择合适的方法
const fruits = ['apple', 'banana', 'orange'];
const products = [
  { name: 'iPhone', price: 999 },
  { name: 'iPad', price: 599 },
  { name: 'MacBook', price: 1299 }
];

console.log('\n实际选择示例:');
console.log('检查水果是否存在:', fruits.includes('banana')); // 推荐用 includes
console.log('获取水果索引:', fruits.indexOf('banana')); // 推荐用 indexOf
console.log('查找价格>1000的产品索引:', products.findIndex(p => p.price > 1000)); // 推荐用 findIndex
console.log('获取价格>1000的产品:', products.find(p => p.price > 1000)); // 推荐用 find