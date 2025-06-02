/**
 * 属性：
 * state,value,reason,resolvedCallbacks,rejectedCallbacks
 * consturctor:构造函数，两个handler,
 * then方法
 * 返回一个promise，上一个promise三种状态的判断
 * 
 * 
 * catch方法，then方法的语法糖
 * 
 * 
 * 类方法，resolve,reject,all,race
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
  // all方法所有的都成功才返回，有一个失败了就直接reject
  static all(promiseList = []) {
    return new Promise((resolve, reject) => {
      const results = [];
      let resolvedCount = 0
      promiseList.forEach((promise) => {
        promise.then((res) => {
          results.push(res);
          resolvedCount++;
          if (resolvedCount === promiseList.length) {
            resolve(results)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    })
  }
  // race方法所有的都成功才返回，有一个失败了就直接reject
  static race(promiseList = []) {
    return new MyPromise((resolve, reject) => {
      let resolved = false;
      promiseList.forEach((promise) => {
        promise.then((res) => {
          if (!resolved) {
            resolve(res);
            resolved = true
          }
        }).catch((err) => {
          reject(err)
        })
      })
    })
  }
}