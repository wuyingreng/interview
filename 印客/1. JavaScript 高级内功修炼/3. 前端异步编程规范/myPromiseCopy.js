class MyPromise {
  constructor(callback) {
    this.state = 'pending';
    this.result = null;
    this.resolveCallbacks = [];
    this.rejectedCallbacks = [];
    const resolveCallback = (result) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.result = result;
        this.resolveCallbacks.forEach((callback) => {
          callback(this.result)
        })
      }
    }
    const rejectCallback = (err) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.rejectedCallbacks.forEach((callback) => {
          callback(this.result)
        })
      }
    }
    try {
      callback(resolveCallback, rejectCallback)
    } catch (err) {
      rejectCallback(err)
    }

  }

  // 1. then 里面的promise要改变状态给后面的promise使用。
  then(resolveCallback, rejectedCallback) {
    // 1. (res)=>res; 这里接收的只是个形参，所以用res,eror更加语义化一点
    const resolveCallback = typeof resolveCallback === 'function' ? resolveCallback : (res) => res;
    const rejectedCallback = typeof rejectedCallback === 'function' ? rejectedCallback : (err) => { throw err };

    // resolve,reject

    return new MyPromise((resolve, reject) => {
      const myPromiseCallback = (callback) => {
        try {
          const result = callback(this.result);
          if (result instanceof MyPromise) {
            return callback.then(resolve, reject)
          }
          return resolve(result)
        } catch (err) {
          reject(err);
        }

      }
      if (this.state === 'fulfilled') {
        return myPromiseCallback(resolveCallback)
      } else if (this.state === 'rejected') {
        return myPromiseCallback(rejectedCallbacks)

      } else if (this.state === 'pending') {
        this.resolveCallbacks.push(resolveCallback);
        this.rejectedCallbacks.push(rejectedCallback);
      }
    })
  }

  // ？？？？ 当有一个错误就返回。如果用forEach。如何做到有一个就返回呢。用return new Promise做到

  static all(promiseList) {
    const reulst = [];
    return new Promise((resolve, reject) => {

    })
  }
}