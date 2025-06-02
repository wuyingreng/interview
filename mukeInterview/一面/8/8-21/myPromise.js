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

  // 异步调用的callbacks
  resolvedCallbacks = []
  rejectedCallbacks = [];


  constructor(fn) {
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
    const newFn1 = typeof fn1 === 'function' ? fn1 : (value) => value;
    // 这样当没有提供错误处理函数时，错误会继续向下传递（值穿透），而不是被吞掉
    const newFn2 = typeof fn2 === 'function' ? fn2 : (error) => { throw error; };
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

      // 当前一个promise是成功的状态
      if (this.state === 'fulfilled') {
        try {
          const newValue = newFn1(this.value);
          resolve(newValue)
        } catch (err) {
          reject(err)
        }

      }

      // 当前一个promise是失败的状态
      if (this.state === 'rejected') {
        try {
          const newReason = newFn2(this.reason);
          resolve(newReason)
        } catch (err) {
          reject(err)
        }
      }

    })
  }
  // .cath是.then的语法糖
  catch(fn) {
    return this.then(null, fn)
  }

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
      const results = []; // 存储promiselist的所有结果
      const length = promiseList.length;
      let resolvedCount = 0;
      promiseList.forEach((promise) => {
        promise.then((res) => {
          // 因为promise是异步代码，所以相关的操作都要放到.then里面去做
          results.push(res);
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
  // race方法有一个成功或者失败了就结束了
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
          reject(err)
        })
      })
    })
  }
}