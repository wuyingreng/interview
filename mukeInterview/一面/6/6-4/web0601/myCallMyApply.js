const foo = {
  val: 1
}

function bar(name) {
  console.log(this, 'test', this.val, name)
}

//step:1
const foo2 = {
  val: 1,
  bar: function () {
    console.log(this.val)
  }
}
// foo2.bar()

Function.prototype.myCall = function (ctx = window, ...args) {
  // foo.fn = bar
  // foo.fn()
  // delete foo.fn
  // 这里的this是指bar，因为调用myCall的是前面的函数。fn这里用的是相当于字符串'fn'

  const symbol = Symbol()
  ctx[symbol] = this;
  // slice切片不改变原数组
  // const fnArgs = [...arguments].slice(1);

  // 这个方式不太好
  // const fnArgs = []
  // for (let i = 1; i < arguments.length; i++) {
  //   fnArgs.push(arguments[i])
  // }
  // 这里的写法是把数组展开，一个个放入到函数的参数中
  ctx[symbol](...args);
  console.log('ctx==>', ctx)
  delete ctx[symbol]
}
bar.myCall(foo, 'Emily');




Function.prototype.myApply = function (ctx = window, args) {
  // foo.fn = bar
  // foo.fn()
  // delete foo.fn
  // 这里的this是指bar，因为调用myCall的是前面的函数。fn这里用的是相当于字符串'fn'

  const symbol = Symbol()
  ctx[symbol] = this;
  // slice切片不改变原数组
  // const fnArgs = [...arguments].slice(1);

  // 这个方式不太好
  // const fnArgs = []
  // for (let i = 1; i < arguments.length; i++) {
  //   fnArgs.push(arguments[i])
  // }
  // 这里的写法是把数组展开，一个个放入到函数的参数中
  ctx[symbol](...args);
  console.log('ctx==>', ctx)
  delete ctx[symbol]
}
bar.myApply(foo, ['Emily2']);