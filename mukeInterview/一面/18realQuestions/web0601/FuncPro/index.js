
// 立即执行函数 Immediately Invoked Function Expression
(function IIFE() {
  // 相当于原生的对应数组的方法
  console.log(this, arguments)
})()

// 箭头函数
const arr = (name) => {
  // 箭头函数是没有自带的arguments的，打印arguments是会报错的
  // console.log(arguments)
  console.log('箭头函数', this)
};
arr('test')

// 这是个函数表达式。new Function('name')是个匿名函数，赋值给了fn
const fn = new Function('name')


// 完全调用
const addThree = (a, b, c) => a + b + c;
// 这个就是函数柯里化，闭包了。不完全调用
const addThree2 = a => b => c => a + b + c;
console.log(addThree2(1)(2)(3))


