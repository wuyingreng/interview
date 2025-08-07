/**
 * 1. Number函数是一元的函数。
 * Number('1')
 * Number('2')
 * 2. parseInt是一个二元的函数。
 * parseInt('1','2')=>1;
 * parseInt() NaN
 */
console.log(['1', '2'].map(Number));


// ['1', '2'].map(parseInt);

// 这个可能会有意外结果
console.log(['1', '2',].map(parseInt))

console.log(['1', '2',].map((...args) => {
  console.log('args==>', args)
  parseInt(...args)
}))
// 结果：[1, NaN, NaN]

// 为什么？因为 parseInt 接受两个参数：
// parseInt('1', 0) → 1
// parseInt('2', 1) → NaN (base 1 无效)
// parseInt('3', 2) → NaN (base 2 中没有数字 3)