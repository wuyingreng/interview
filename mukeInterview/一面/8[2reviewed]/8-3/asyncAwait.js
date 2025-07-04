async function fn() {
  return 100
}
(async function () {
  const a = fn()// ?? a应该是个promise 
  const b = await fn()// ?? b是100
})();

/**
 * 我理解应该是start a b 
 * await Promise.reject(300) 抛出错误。
 * .catch是捕获错误。不要混淆了
*/
(async function () {
  console.log('start')
  const a = await 100
  console.log('a', a)
  const b = await Promise.resolve(200)
  console.log('b', b)
  const c = await Promise.reject(300)
  console.log('c', c)
  console.log('end')
})()
// 执行完毕，打印出那些内容?