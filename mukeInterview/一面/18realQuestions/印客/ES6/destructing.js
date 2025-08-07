/**------- 数组解构 -------*/
let [foo, [bar, [baz]]] = [1, [2, [3]]];

let [head1, ...rest1] = [1, 2, 3, 4]
let [head, , ...rest] = [1, 2, 3, 4]
let [head2, tail = 2] = [1];

/**------- 对象解构 -------*/
let { x, y, z } = { x: 2, y: 4 }
let obj = {
  name: ['Hello', {
    age: 18,
  }]
}
const { name: [nameSayHi, { age }] } = obj

let { testx = 3 } = {};

/**------- 字符串的解构 -------*/

// 把字符串转换为数组
let [a, b, c, d] = 'sujianbin';

// 类数组的都有个length属性
const { length } = 'sujianbin';

/**------- 数字的解构 -------*/
const { toString } = 233;
toString === Number.prototype.toString; //true
/**------- boolean 的解构-------*/
const { toString: toStringB } = true;
toStringB === Number.prototype.toString; //true

/**------- 函数参数的解构 -------*/

function add({ x, y } = { x: 1, y: 2 }) {
  return x + y
}

function add1({ x = 1, y = 2 }) {
  return x + y
}

({ x } = { x: 1 })