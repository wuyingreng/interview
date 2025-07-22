/**
 * @description MyPromise
 * @author Emiyl
*/


class MyPromise {
  state = 'pending' // 状态pending, fullfiled,rejected
  value = undefined;// 成功的值
  reason = undefined;// 失败的原因
  resolvecallbacks = [];
  rejectcallbacks = [];
  constructor(fn) {
    const resolvehandle = (value) => {
      if (this.state === 'pending') {
        this.state = 'fullfiled';
        this.value = value;
        this.resolvecallbacks.forEach(callback => {
          callback(this.value)
        });
      }
    }
    const rejecthandle = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.rejectcallbacks.forEach(callback => {
          callback(this.reason)
        });
      }
    }
    try {
      fn(resolvehandle, rejecthandle)
    } catch (err) {
      rejecthandle(err)
    }
  }
  then() {

  }
}