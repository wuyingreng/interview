// async1 有嵌套的异步回调
async function async1() {
  console.log('async1 start') // 2
  console.log(await async2())
  // 下面三行都是异步回调 callback的内容
  console.log('async1 end')  // 5
  await async3()
  // 下面一行是异步回调 callback的内容
  console.log('async1 end2')  // 7
}

async function async3() {
  console.log('async3')  // 6
}

async function async2() {
  console.log('async2')  // 3
}

console.log('script start')   // 1
async1()
console.log('script end') // 4

