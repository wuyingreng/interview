const curry = (fn) => {
  console.log('fn.length==>', fn.length)
  return function curried(...args) {
    // fn.length`是函数`fn`定义时的形式参数个数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => {
      console.log('args==>', args, 'nextArgs==>', nextArgs, 'this==>', this)
      curried.apply(this, args.concat(nextArgs));
    }
  };
};
// 使用示例
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6




