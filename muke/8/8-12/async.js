// async3.js -> async1

async function async1() {
  console.log('async1 start') // 2 重要
  await async2() // undefined
  // await 的后面，都可以看做是 callback 里的内容，即异步
  // 类似, event loop , setTimeout(cb1)
  // setTimeout(function () { console.log('async1 end') })
  // Promise.resolve().then(() => { console.log('async1 end') // 宏任务/微任务
  console.log('async1 end') // 5
}


async function async2() {
  console.log('async2') // 3 重要
}

console.log('script start') // 1
async1()
console.log('script end') // 4
// 同步代码已经执行完 (event loop)
