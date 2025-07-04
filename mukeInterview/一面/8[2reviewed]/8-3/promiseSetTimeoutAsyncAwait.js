async function async1() {
  console.log('async1 start');// 同步任务
  await async2()// 同步任务
  console.log('async1 end')// 微任务
}
async function async2() {
  console.log('async2')// 同步任务
}
console.log('script start')// 同步任务
setTimeout(function () {
  console.log('setTimeout')// 宏任务
}, 0)
// 连接左侧代码，一起阅读
async1()


new Promise(function (resolve) {
  console.log('promise1')// 同步任务
  resolve()
}).then(function () {
  console.log('promise2') // 微任务

})
console.log('script end')