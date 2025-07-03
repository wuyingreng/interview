/** -----------  块级作用域   -----------  */
for (var i = 0; i <= 10; i++) {
  var j = i + 1

}

console.log('j==>', j)

for (let i = 0; i <= 10; i++) {
  let letj = i + 1

}
/**
 * 块级作用域.js:13 Uncaught ReferenceError: letj is not defined
 * at 块级作用域.js:13:24
 */
// console.log('letj==>', letj, 'i', i)

for (var i = 0; i < 5; i++) {
  setTimeout(console.log(i), 0)

}

for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0)

}

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0)
}