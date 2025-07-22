/**
 * 每一个函数都要搞个try catch，避免错误
 * 1. consturctor 类，接收一个函数。
 * 函数接收2个参数。2个参数为函数，改变promise的状态
 * 这两个函数又分别接收value,reaon参数，改变promise的value,reason
 * 顺便在promise异步的时候把对应callback数组中的函数执行下
 * 
 * 
 * 2. then 方法
 * 入参:fn1,fn2.这步要做类型判断
 * 返回一个新的promise。
 * 上一个promise是fulfilled状态，拿原来的value算新的value。执行自己的resolve函数
* 上一个promise是rejected状态，拿原来的reason算新的reason。执行自己的resolve函数
* 上一个promise是pending状态，放到对应的callbacks数组中
* 被catch捕获的统一都用resolve。后面可以进入到.then。要改2处地方
 * 3. catch方法是then方法的语法糖
*/

class MyPromise {
  state = 'pending';
  value = undefined;
  reason = undefined;

  // 异步调用的callbacks。当promise的实例化里面的函数是异步的时候
  resolvedCallbacks = []
  rejectedCallbacks = [];


  constructor(fn) {
    // 这里要用箭头函数，通过闭包的形式访问实例的this
    const resolveHandler = (value) => {
      if (this.state === 'pending') {
        this.value = value;
        this.state = 'fulfilled';
        this.resolvedCallbacks.forEach(resolvedCallback => resolvedCallback())
      }

    }
    const rejectedHandler = (reason) => {
      if (this.state === 'pending') {
        this.reason = reason;
        this.state = 'rejected';
        this.rejectedCallbacks.forEach(rejectedCallback => rejectedCallback())
      }

    }
    try {
      fn(resolveHandler, rejectedHandler)
    } catch (err) {
      rejectedHandler(err)
    }

  }
  then(fn1, fn2) {
    /**
     * 对应这种情况
     *  const p6 = new MyPromise((resolve, reject) => {
     * resolve(200)
    *}).then(400).then((res) => {
    *  console.log('res==>', res) // 这里的res是200
    *})
     * Promise.resolve().catch(() => {
     }.then((res)=>{console.log('res==>',res)})
  */
    const newFn1 = typeof fn1 === 'function' ? fn1 : (value) => value;
    /**
 * 对应这种情况
 * 这样当没有提供错误处理函数时，错误会继续向下传递（值穿透），而不是被吞掉
 * Promise.reject().then(() => {
 }.catch((res)=>{console.log('res==>',res)})
*/
    const newFn2 = typeof fn2 === 'function' ? fn2 : (error) => { throw error; };
    // 这里要用箭头函数，通过闭包的形式访问上一个实例的this
    return new MyPromise((resolve, reject) => {
      if (this.state === 'pending') {
        this.resolvedCallbacks.push(() => {
          try {
            const newValue = newFn1(this.value);
            resolve(newValue)
          } catch (err) {
            reject(err)
          }
        })
        this.rejectedCallbacks.push(() => {
          try {
            const newReason = newFn2(this.reason);
            resolve(newReason)
          } catch (err) {
            reject(err)
          }
        })
      }


      /**
       * 当前一个promise是成功的状态。进入到.then的第一个回调 -- fulfilled状态触发.then回调
       * 要用try catch，因为用户可能在then,catch里面抛出错误。比如代码
       * Promise.resolve().then(() => {
      * throw new Error('then error')
      * console.log('err')
    }).
      */
      if (this.state === 'fulfilled') {
        try {
          const newValue = newFn1(this.value);
          // 返回的是fulfilled状态的promise，
          resolve(newValue)
        } catch (err) {
          // 抛出错误才返回rejected状态的promise
          reject(err)
        }

      }

      /**
       * 当前一个promise是失败的状态。进入到.catch
       * rejected状态的promise触发.catch回调。
       * const p2 = Promise.resolve().then(() => {
        *throw new Error('then error')
        *console.log('err')
      *}).then(() => {
        *console.log('p2 then after throw error==>', p2)
      *}).catch(() => {
        *console.log('p2 then catch throw error==>', p2)
      *})
      */
      // 
      if (this.state === 'rejected') {
        try {
          const newReason = newFn2(this.reason);
          // 返回的是fulfilled状态的promise，
          resolve(newReason)
        } catch (err) {
          // 抛出错误才返回rejected状态的promise
          reject(err)
        }
      }

    })
  }
  // .cath是.then的语法糖
  catch(fn) {
    return this.then(null, fn)
  }

  // static的方法都会体现在实例对应的原型的constructor里面
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  // all方法所有的都成功才返回，有一个失败了就结束了
  static all(promiseList = []) {
    return new MyPromise((resolve, reject) => {
      // 创建固定长度的结果数组
      const results = new Array(promiseList.length);
      const length = promiseList.length;
      let resolvedCount = 0;

      if (promiseList.length === 0) return resolve([]);
      promiseList.forEach((promise, index) => {
        promise.then((res) => {
          /**
           * forEach：为每次迭代创建新的作用域
           * index是每一次迭代的而不是最终的
          */
          // 因为promise是异步代码，所以相关的操作都要放到.then里面去做
          results[index] = res;
          resolvedCount++;
          if (resolvedCount === length) {
            resolve(results)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    })
  }
  /**
   * race方法有一个成功或者失败了就结束了
   * 然而，在原生 Promise 中，一旦给 promise 注册了 then 回调，就无法取消。所以通常的做法是不处理，让它们自然完成，
   * 只是忽略它们的结果。所以我们的实现是符合常规的。
  */

  static race(promiseList = []) {
    return new MyPromise((resolve, reject) => {
      let resolved = false;
      promiseList.forEach((promise) => {
        promise.then((data) => {
          if (!resolved) {
            resolve(data);
            resolved = true
          }
        }).catch((err) => {
          if (!resolved) {
            resolved = true;
            reject(err)
          }

        })
      })
    })
  }
}