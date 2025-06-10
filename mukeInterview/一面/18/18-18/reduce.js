/**
 * 普通的求和函数：
 * 优点：简单易理解
 * 缺点：需要新定义一个变量
*/


const sum = (arr) => {
  let res = 0;
  arr.forEach((item) => {
    res += item;
  })
  return res
}

const arr = [10, 20, 30, 40, 50]
sum(arr)
// console.log('sum==>', sum(arr))

/**
 * reduce函数用法一：求和
 * 第一次acc的值:reduce的第二个参数初始值
 * 后续acc的值:上一次执行reduce函数的返回值
 * 最后一次执行:就是整个函数的返回值
*/
const sumByReduced = arr.reduce((acc, curValue, index, array) => {
  console.log('acc==>', acc);
  console.log('curValue==>', curValue);
  console.log('index==>', index);
  console.log('array==>', array);
  return acc + curValue // 这个返回值会作为下一次执行的时候的第一个参数的值就是acc的值
}, 10000)

console.log('sumByReduced==>', sumByReduced)

/**
 * reduce函数用法二：计数
 * 注意acc要想被用作下次的值，得每次都return一个值出去。
*/
const duplicatedArray = [10, 20, 30, 40, 50, 10, 20, 30, 20];
const n = 20
const count = arr.reduce((count, curValue) => {
  console.log('count==>', count)
  return count === 20 ? count + 1 : count
}, 0)

console.log('count==>', count)


/**
 * reduce函数用法三：输出字符串
 
*/
const stringArr = [10, 20, 30, 40, 50];
let stringInt = ''
const strResultNormal = stringArr.forEach((value) => stringInt + value);
console.log('strResultNormal==>')
const stringResult = arr.reduce((count, curValue) => {
  console.log('count==>', count)
  return count === 20 ? count + 1 : count
}, 0)

console.log('count==>', count)

const complexArray = [{ name: '张三', age: 20 }, { name: '李四', age: 21 }, { name: '小明', age: 22 }];

// map返回的是一个数组，所以需要用join的形式去连接
const mapResult = complexArray.map((item) => `${item.name}-${item.age}`).join('\n');
console.log('mapResult==>', mapResult)

const reduceStrResult = complexArray.reduce((acc, curItem) => {
  return `${acc}${curItem.name}-${curItem.age}\n`
}, '')

console.log('reduceStrResult==>', reduceStrResult)

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