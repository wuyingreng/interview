/**
 * 问题1：
 * 为什么这里只有function curried需要用普通函数，其他都用箭头函数。
 * 这里面的this是如何指定的呢
 * 问题2：为什么fn.length是普通的长度呢，很奇怪
 * 刚测试了下，好像默认就是这么规定的
 * 问题3：为什么能一直技术args的呢，是谁记住了谁
*/


const curry = (fn) => {
  return function curried(...args) {
    console.log('args==>', args, fn.length, args >= fn.length, 'this==>', this)
    if (args.length >= fn.length) {
      console.log('return value==>', fn.apply(this, args))
      return fn.apply(this, args)
    }
    // 用箭头函数。锁定 this 值，避免后续调用改变上下文
    return (...nextArgs) => {
      curried.apply(this, args.concat(nextArgs))
    }
  }
}
function sum(a, b, c) {
  return a + b + c;
}
const curriedSum = curry(sum);
console.log(curriedSum(1)(2, 3));


// 1. 先前的去哪里找呢

function curry(fn) {
  return function curried(...args) {
    if (args.length === fn.length) {
      return fn.apply(this, args)
    }
    return (...nextArgs) => {
      curried.apply(this, ...nextArgs.concat(args))
    }
  }
}