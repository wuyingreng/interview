async function async1() {
  console.log('async1')// 同步2
  await async2()
  // 异步后面再来看
  console.log('async2 end'); // 异步里面同步1
  await async3()
  // 异步里面的异步,后面再来看
  console.log('async1 end');// 异步里面异步1
}
async function async2() {
  console.log('async2') // 同步3
}

async function async3() {
  console.log('async3') // 异步里面同步2
}

console.log('script start') // 同步1
async1()

console.log('script end')// 同步4

// 执行顺序 同步1,2,3,4， 异步里面同步1,异步里面同步2,异步里面异步1