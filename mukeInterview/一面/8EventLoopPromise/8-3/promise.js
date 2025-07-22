// 第一题
/**
 * 我理解的应该是1 3
*/
Promise.resolve().then(() => {
  console.log('第一题 1')
}).catch(() => {
  console.log('第一题 2')
}).then(() => {
  console.log('第一题 3')
})

// 第二题
/**
 * 我理解的应该是1 2 3
*/
Promise.resolve().then(() => {
  console.log('第二题 1')
  throw new Error('erro1') // 抛出了错误，后面的代码就不执行了
  console.log('试试报错后会不会答应')
}).catch(() => {
  console.log('第二题 2')
}).then(() => {
  console.log('第二题 3')

})
/**
 * 我理解的应该是1 2
*/
//  第三题
Promise.resolve().then(() => {
  console.log('第三题 1')
  throw new Error('frro1')
}).catch(() => {
  console.log('第三题 2')
}).catch(() => {
  // 这里是 catch
  console.log('第三题 3')
})

try {
  throw new Error('frro1')
  console.log('i am error')
} catch (err) {
  console.log('err', err) // 会执行
}

console.log('i am out error')