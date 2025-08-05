class MyPromise {
  constructor(callback) {
    this.state = 'pending';
    this.result = null;
    this.error = null;
    const resolveCallback = (result) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.result = result
      }
    }
    const rejectCallback = (err) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.result = result
      }
    }
  }
}