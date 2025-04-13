function fn1(a, b, c) {
  console.log('this', this)
  console.log(a, b, c)
  return 'this is fn1'
}

const fn2 = fn1.bind({ x: 100 }, 10, 20, 30)
console.log('fn2==>', fn2())

// 模拟Bind
Function.prototype.bind1 = function () {
  const args = Array.from(arguments);
  // 获取this（数组第一项）；
  const t = args.shift();
  /**
   *  bind1相当于原型函数
   * fn1.bind(...) 中的fn1
  */
  const self = this;
  //返回一个函数
  return function () {
    return self.apply(t, args)
  }
}

const fnbind12 = fn1.bind1({ x: 200 }, 10, 20, 30);


console.log('fnbind12==>', fnbind12())