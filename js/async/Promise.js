function SimplePromise(executor) {
  let onResolve, onReject;
  let fulfilled = false;
  let rejected = false;
  let value;
  let error;

  function resolve(val) {
    fulfilled = true;
    value = val;
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
    onResolve = callback;
    if (fulfilled) {
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (rejected) {
      onReject(error);
    }
    return this;
  };

  // Execute the executor function with `resolve` and `reject` methods
  executor(resolve, reject);
}

// Demo 使用 SimplePromise
const mySimplePromise = new SimplePromise((resolve, reject) => {
  setTimeout(() => {
    resolve('SimplePromise resolved!');
  }, 1000);
});

mySimplePromise.then(value => {
  console.log(value);
}).catch(error => {
  console.log(error);
});
