(async function () {
  console.log('start')
  const a = await 100
  console.log('a', a)
  const b = await Promise.resolve(200)
  console.log('b', b)
  const c = await Promise.reject(300)
  // 后续的都不会答应了，因为报错了
  console.log('c', c)
  console.log('end')
})()