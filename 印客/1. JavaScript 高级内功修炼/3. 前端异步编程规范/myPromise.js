class MyPromise {
  constructor(executor) {
    // 1. 设置初始值
    this.initValue();
    // 2. 绑定this
    this.initBind();
    // 3. 执行器函数的执行
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
    // 4. 如果上一个promise是异步的话，把当前的then先放到数组中。
    this.onFulfilledCallbacks = [];
    this.onRjectedCallbacks = []
  }
  initValue() {
    this.promiseReuslt = null;
    this.promiseState = 'pending'
  }
  initBind() {
    //  这里不懂为什么这么写？？？不这么写会怎么样
    /**
     * 如果不写绑定this,实际上调用resolve，reject是在executor的时候调用
     * 没有this了，在严格模式下是undefined
    // */
    // this.resolve = this.resolve.bind(this);
    // this.reject = this.reject.bind(this)
  }
  resolve(value) {
    // 状态不可以逆
    console.log('this==>', this)
    if (this.promiseState !== 'pending') return
    this.promiseState = 'fulfilled';
    this.promiseReuslt = value;
    while (this.onFulfilledCallbacks.length > 0) {
      this.onFulfilledCallbacks.shift()(this.promiseReuslt)
    }
  }
  reject(reason) {
    if (this.promiseState !== 'pending') return
    this.promiseState = 'rejected';
    this.promiseReuslt = reason;
    while (this.onFulfilledCallbacks.length > 0) {
      this.onFulfilledCallbacks.shift()(this.promiseReuslt)
    }
  }
  // ? 有个问题，为什么这里都是上一次的promise的结构:因为then Promise中的函数是箭头函数
  then(onFulfilled, onReject) {

    // 拿着当前的东西去处理的
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // throw是语句，不是表达式，所以需要花括号包裹
    onReject = typeof onReject === 'function' ? onReject : (err) => { throw err; }

    const thenPromise = new Promise((resolve, reject) => {
      const resolvedPromise = (cb) => {
        try {
          const result = cb(this.promiseReuslt);
          if (result instanceof MyPromise) {
            return result.then(resolve, reject)
          }
          return resolve(result)
        } catch (err) {
          reject(err);
          // 这个有点多余了
          // throw new Error(err)
        }
      }
      if (this.promiseState === 'fulfilled') {
        return resolvedPromise(onFulfilled)

      } else if (this.promiseState === 'rejected') {
        return resolvedPromise(onReject)
      } else {
        // 异步任务的处理。存储回调函数。这里的this都要研究下
        this.onFulfilledCallbacks.push(resolvedPromise.bind(this, onFulfilled));
        this.onRjectedCallbacks.push(resolvedPromise.bind(this, onReject));
      }
    })
    return thenPromise;

  }
  static all(promiseList) {
    const results = [];
    const count = 0;
    const addData = (index, data) => {
      results[index] = data;
      count++;
      // 这里可以用index吗？不能。then是微任务
      if (count === promiseList.length) {
        resolve(results)
      }
    }
    return new MyPromise((resolve, reject) => {
      promiseList.forEach(promise => {
        if (promise instanceof MyPromise) {
          promise.then((res) => {
            addData(index, res)
          }).catch((err) => {
            reject(err)
          });
        } else {
          addData(index, promise)
        }

      });
    })

  }
  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then((res) => {
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
        } else {
          resolve(promise)
        }
      })
    })
  }
  static allSettle(promiseList) {
    const results = [];
    const count = 0;
    const addData = ({ status, index, value }) => {
      results[index] = {
        status,
        value
      };
      if (count === promiseList.length) {
        resolve(results)
      }
    }
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then((res) => {
            addData({ status: 'fulfilled', value: res, index })

          }).catch((err) => {
            addData({ status: 'rejected', value: err, index })
          })
        } else {
          addData({ status: 'fulfilled', value: promise, index })

        }
      })
    })
  }
  static any(promiseList) {
    //找到第一个成功的回调，有的话就返回出去。否则收集所有失败的回调
    const count = 0;

    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then((res) => {
            resolve(res)
          }).catch((err) => {
            count++
            if (count === promiseList) {
              reject(new AggregateError('All promises were rejected'))
            }
          })
        } else {
          resolve(promise)
        }
      })
    })
  }
}

// request(1).then(
//   res1 => {
//     console.log(res1)//1秒后输出2
//     request(2).then(res2 => {
//       console.log(res2)//2秒后 输出 4
//     })
//   })

