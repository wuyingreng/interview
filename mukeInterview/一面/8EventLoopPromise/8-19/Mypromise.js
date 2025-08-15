/**
 * 看完全没有看懂，多写几遍吧。
 * @description MyPromise
 * @author 双越
 * 要自己多写几遍 2-3遍
 * 问题集合：
 * 1. 
 */

class MyPromise {
  state = 'pending' // 状态，'pending' 'fulfilled' 'rejected'
  value = undefined // 成功后的值
  reason = undefined // 失败后的原因

  // resolveCallbacks 和rejectCallbacks 只有在promise是异步的或者换句话说是用setTimout的情况下才有的
  resolveCallbacks = [] // pending 状态下，存储成功的回调.
  rejectCallbacks = [] // pending 状态下，存储失败的回调

  constructor(fn) {
    const resolveHandler = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled' // 注意单词是filfilled
        this.value = value
        // 问题1:为什pass value就会是闭包。
        // 在resolveHandler中，当将回调函数推入resolveCallbacks数组时，这些函数会保留对当前作用域中变量的引用
        this.resolveCallbacks.forEach(fn => fn(this.value))
      }
    }

    const rejectHandler = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.rejectCallbacks.forEach(fn => fn(this.reason))
      }
    }
    /**
     * 这个是为了兼容：  const p3 = new Promise((resolve, reject) => {
     * throw new Error('error')
    })

    */
    try {
      fn(resolveHandler, rejectHandler)
    } catch (err) {
      rejectHandler(err)
    }
  }

  then(fn1, fn2) {
    // 这里是不是有个问题，这么写会不会直接赋值了fn1
    // 下面不要加constant
    fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
    // 这里是错误的
    fn2 = typeof fn2 === 'function' ? fn2 : (e) => e;

    if (this.state === 'pending') {
      // 不知道是该执行resolve还是reject，只有先存储起来
      const p1 = new MyPromise((resolve, reject) => {

        this.resolveCallbacks.push(() => {
          try {
            const newValue = fn1(this.value)
            resolve(newValue)
          } catch (err) {
            reject(err)
          }
        })
        this.rejectCallbacks.push(() => {
          try {
            const newReason = fn2(this.value)
            reject(newReason)
          } catch (err) {
            reject(err)
          }
        })
      })
      console.log('this.resolveCallbacks', this.resolveCallbacks, this.rejectCallbacks)
      return p1
    }
    // then返回个新的promise
    if (this.state === 'fulfilled') {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          const newValue = fn1(this.value);
          resolve(newValue)
        } catch (err) {
          reject(err)
        }
      })
      return p1
    }

    if (this.state === 'rejected') {
      const p1 = new MyPromise((resolve, reject) => {
        try {
          // 问题2:如何在源码中得到.catch 后续可以进入.then
          const newReason = fn2(this.reason)
          /**
           * ???? 这里需要测试下是不是应该用resolve(newReason)。可以试下es promise catch捕抓后是不是进入then
          */
          reject(newReason) // 赋值给了p1.reson
        } catch (err) {
          reject(err)
        }
      })
      return p1
    }

  }

  // 就是 then 的一个语法糖，简单模式
  catch(fn) {
    return this.then(null, fn)
  }
}


MyPromise.resolve = function (value) {

  return new Promise((resolve, reject) => resolve(value))
}

MyPromise.reject = function (reson) {
  return new MyPromise((resolve, reject) => reject(reson))
}

MyPromise.all = function (promiseList = []) {
  const p1 = new MyPromise((resolve, reject) => {
    const result = [];
    const length = promiseList.length;
    let resolvedCount = 0;
    /**
     * 不能用index===length-1 判断是不是走到最后一个promise.
     * 因为index是同步的，是forEach定义的，而then可能是异步，index跑完的时候，then可能还没有执行
    */
    promiseList.forEach((p, index) => {
      p.then(data => {
        result.push(data);
        // resolvedCount 必须在then里面做加加，只有then执行的时候
        resolvedCount++;
        if (resolvedCount === length) {
          // 已经遍历到最后一个promise
          console.log('index==>', index, 'resolvedCount==>', resolvedCount)
          resolve(result)
        }

      }).catch(err => {
        reject(err)
      })
    })
  })
  return p1
}

MyPromise.race = function (promiseList = []) {
  let resolved = false
  const p1 = new MyPromise((resolve, reject) => {

    promiseList.forEach((p, index) => {
      p.then(data => {
        if (!resolved) {
          resolved = true
          resolve(data)
        }

      }).catch(err => {
        reject(err)
      })
    })
  })
  return p1
}