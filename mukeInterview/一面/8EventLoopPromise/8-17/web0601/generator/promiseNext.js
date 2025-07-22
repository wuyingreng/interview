function fn(nums) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(nums * 2)
    }, 3000)
  })
}
function* gen() {
  const num1 = yield fn(1)
  console.log('num1', num1); // 2 。是因为有这行代码：const next2 = g.next(res1) // 传入上次的res1
  const num2 = yield fn(num1)
  console.log('num2', num2);
  const num3 = yield fn(num2)
  console.log('num3', num3);
  return num3
}
const g = gen()
const next1 = g.next()
next1.value.then(res1 => {
  console.log('next1==>', next1) // 1秒后同时输出 { value: Promise { 2 }, done: false }
  console.log('res1==>', res1) // 1秒后同时输出 2

  const next2 = g.next(res1) // 传入上次的res1
  next2.value.then(res2 => {
    console.log('next2==>', next2) // 2秒后同时输出 { value: Promise { 4 }, done: false }
    console.log('res2==>', res2) // 2秒后同时输出 4

    const next3 = g.next(res2) // 传入上次的res2
    next3.value.then(res3 => {
      console.log(next3) // 3秒后同时输出 { value: Promise { 8 }, done: false }
      console.log(res3) // 3秒后同时输出 8

      // 传入上次的res3
      console.log(g.next(res3)) // 3秒后同时输出 { value: 8, done: true }
    })
  })
})