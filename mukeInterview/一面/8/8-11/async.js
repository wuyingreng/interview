async function fn1() {
  return Promise.resolve(200)
}

/**----------  await相当于promise then  ----------*/
!(async function () {
  const p1 = Promise.resolve(300);
  const data = await p1 // await相当于promise then
  console.log('data', data)
})()


!(async function () {
  const data = await 200 // await相当于promise then
  console.log('data', data)
})()


!(async function () {
  const data = await fn1() // await相当于promise then
  console.log('data', data)
})();


/**----------  try catch 相当于promise catch then  ----------*/
!(async function () {
  // P4是异步代码
  const p4 = Promise.reject('error');
  console.log(999)
  try {
    const res = await p4;
    console.log(res)
  } catch (err) {
    console.log('error', err)
  }
})();


!(async function () {
  // P4是异步代码
  const p4 = Promise.reject('error');
  console.log(999)
  const res = await p4;
  /**
   * JS代码一行一行从上到下执行
   * 遇到错误停止执行
   * res不会执行，因为上面await p4已经报错了
  */
  console.log(res)
})();