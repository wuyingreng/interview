/**
 * 我觉得应该是100 400 300 200
*/

console.log(100);
setTimeout(() => {
  console.log(200)
})
Promise.resolve().then(() => {
  console.log(300)
})
console.log(400)