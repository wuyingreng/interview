/**
 * 
*/

// 第一题
Promise.resolve().then(() => {
  console.log('题目1=>1')
}).catch(() => {// 中间catch不会执行，因为上面的是resolved的promise
  console.log('题目1=>2')
}).then(() => {
  console.log('题目1=>3')
})

// 第二题
Promise.resolve().then(() => {
  console.log('题目2=>1')
  throw new Error('erro1')
}).catch(() => {
  console.log('题目2=>2')
}).then(() => {
  console.log('题目2=>3')

})
//  第三题
Promise.resolve().then(() => {
  console.log('题目3=>1')
  throw new Error('frro1')
}).catch(() => {
  console.log('题目3=>2')
}).catch(() => {// 这里不会执行，因为上面是resolved的promise
  // 这里是 catch
  console.log(3)
})