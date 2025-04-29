// 第一题
Promise.resolve().then(() => {
  console.log(1)
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})

// 第二题
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('erro1')
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)

})
//  第三题
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('frro1')
}).catch(() => {
  console.log(2)
}).catch(() => {
  // 这里是 catch
  console.log(3)
})