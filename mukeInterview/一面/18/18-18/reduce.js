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