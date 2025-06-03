/**
 * 
*/

// 第一题
Promise.resolve().then(() => {
  console.log('题目1=>1')
}).catch(() => {
  /**
   * 中间catch不会执行，因为上面的是resolved的promise
   * 对应源码就是这一块。
   *  const newFn1 = typeof fn1 === 'function' ? fn1 : (value) => value;
   * fn1没有传入，用默认的(v)=>v。还是返回一个promise，所以后面还可以.then调用。
   * 只是fn2不执行。因为fn2执行的前提条件是this.state==='rejected'
  */

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