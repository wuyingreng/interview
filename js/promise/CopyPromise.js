/**
 * 1. then,catch 返回的this,没有value
 * 2. resolve 和reject是promise的内置函数，更改了函数内部this的fulfilled,rejected,
 * value,error
 * 3. 为什么调用了then之后,onResolve就变成了函数呢。调用的顺序是什么?这块没有看懂
 * 答：因为有这个 setTimeout(() => {
 *    resolve('SimplePromise resolved!');
 *  }, 1000);
 * then 先执行，再执行resolve('SimplePromise resolved!');
  *
*/


function SimplePromise(executor) {
  let onResolve, onReject;
  let fulfilled = false;
  let rejected = false;
  let value;
  let error;
  function resolve(val) {
    fulfilled = true;
    value = `${val}hahaha`;
    console.log('value==>', value, fulfilled, typeof onResolve)
    if (typeof onResolve === 'function') {
      onResolve(val);
    }
  }
  function reject(err) {
    rejected = true;
    error = err;
    if (typeof onReject === 'function') {
      onReject(err);
    }
  }

  this.then = function (callback) {
    // callback 赋值给了onResolve函数
    onResolve = callback;
    if (fulfilled) {
      onResolve(value);
    }
    return this;
  }
  this.catch = function (callback) {
    onReject = callback;
    if (rejected) {
      onReject(error);
    }
    return this;
  }

  // Execute the executor function with `resolve` and `reject` methods
  executor(resolve, reject);
}
const mySimplePromise = new SimplePromise((resolve, reject) => {
  // 1.  console.log('value==>', value, fulfilled, typeof onResolve),typeof onResolve 是function
  // setTimeout(() => {
  //   resolve('SimplePromise resolved!');
  // }, 1000);
  // 2.  console.log('value==>', value, fulfilled, typeof onResolve),typeof onResolve 是undefined
  resolve('SimplePromise resolved!');
});

mySimplePromise.then(value => {
  console.log('then value==>', value);
});