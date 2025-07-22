async function async1() {
  console.log('async1 start') // 同步任务2
  await async2().then(() =>   // 外层微任务
    console.log('async1 end'))

}

async function async2() {
  console.log('async2') // 同步任务3
  await async3();
  // 内层微任务
  console.log('async2 end')
}

async function async3() {
  console.log('async3 end') // 同步任务4
}

console.log('script start') // 同步任务1


setTimeout(() => {
  console.log('setTimeout') // 宏任务1
}, 0);


async1()


new Promise(function (resolve) {
  console.log('promise 1') // 同步任务4
  resolve()
}).then(() => {

  console.log('promise 2')
}).then(() => {

  console.log('promise 3')
}).then(() => {

  console.log('promise 4')
})

console.log('script end') // 同步任务5