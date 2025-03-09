// ES6 块级作用域
if (true) {
  let x = 100
}
console.log(x) // 会报错 ReferenceError: x is not defined