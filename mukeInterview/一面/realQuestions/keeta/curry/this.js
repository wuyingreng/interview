/**版本一：使用箭头函数锁死this */
const curry = (fn) => {
  return function curried(...args) {
    console.log('this==>', this)
    if (args.length >= fn.length) {
      console.log('return value==>', fn.apply(this, args))
      return fn.apply(this, args)
    }
    // 用箭头函数。锁定 this 值，避免后续调用改变上下文
    return (...nextArgs) => {
      console.log('inner this==>', this)
      curried.apply(this, args.concat(nextArgs))
    }
  }
}



const obj = {
  value: 10,
  add: curry(function (a, b) {
    return this.value + a + b
  })
};

obj.add(1)(2); // 此时 curried 内的 this = obj



/**版本二：危险，不用箭头函数锁死this
 * 箭头函数在此用于维持初始 this 的稳定性，确保多次调用间上下文一致。
 */

const curryDangerous = (fn) => {
  return function curried(...args) {
    console.log('curryDangerous this==>', this)
    if (args.length >= fn.length) {
      console.log('return value==>', fn.apply(this, args))
      return fn.apply(this, args)
    }
    // 用箭头函数。锁定 this 值，避免后续调用改变上下文
    return function (...nextArgs) {
      console.log('curryDangerous inner this==>', this)
      curried.apply(this, args.concat(nextArgs))
    }
  }
}

const objDangerous = {
  value: 10,
  add: curryDangerous(function (a, b) {
    return this.value + a + b
  })
};

const temp = objDangerous.add(1);  // 第一次调用this=obj。还在curried函数，还没有调用return function (...nextArgs) { 这个函数
const func = temp;       // 转移函数引用 
func(2); // function (...nextArgs) { this变成了window