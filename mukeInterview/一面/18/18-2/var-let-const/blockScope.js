/** -----------  块级作用域   -----------  */
for (var i = 0; i < 10; i++) {
  var j = i + 1

}

console.log('j==>', j, 'i', i) // 10 10

// 相当于
var i;
var j;

for (i = 0; i < 10; i++) {
  j = i + 1

}

console.log('j==>', j, 'i', i) // 10 10(注意虽然for循环里面i<10;但最后也是执行了i++,所以最后i和j一样大)



for (let i = 0; i < 10; i++) {
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