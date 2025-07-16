

function asyncFun(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 2)
    })
  })
}

function* gen() {
  const num1 = yield asyncFun(1);
  const num2 = yield asyncFun(num1)
  const num3 = yield asyncFun(num2);
  return num3
}

// 普通版本。
function generatorToAsync(generatorFn) {
  return function () {
    return new Promise((resolve, reject) => {
      /**
       * const next2 = g.next(res1) // 传入上次的res1
  *next2.value.then(res2 => {
   * console.log(next2) // 2秒后同时输出 { value: Promise { 4 }, done: false }
   * console.log(res2) // 2秒后同时输出 4

    *const next3 = g.next(res2) // 传入上次的res2
      */
      const g = generatorFn();
      // 这里可以写一个递归，自己可以试试
      const next1 = g.next();
      next1.value.then((res1) => {
        const next2 = g.next(res1)
        next2.value.then((res2) => {
          const next3 = g.next(res2)
          next3.value.then((res3) => {
            resolve(g.next(res3).value)
          })
        })
      })
    })
  }
}

// 优化版本
function generatorToAsyncRecursive(generatorFn) {
  return function () {
    return new Promise((resolve, reject) => {
      const gen = generatorFn.apply(this, arguments);
      // 递归的执行
      function step(key, arg) {
        console.log('arg=>', arg)
        let res = '';
        try {
          res = gen[key](arg)
        } catch (err) {
          reject(err)
        }
        const { value, done } = res;
        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then((res) => step('next', res), err => { throw err })
        }
      }
      step('next')
    })
  }
}


// generatorToAsync(gen)().then((res) => console.log(res));
generatorToAsyncRecursive(gen)().then((res) => console.log(res));

async function asyncFunT() {
  const num1 = await asyncFun(1);
  const num2 = await asyncFun(num1);
  const num3 = await asyncFun(num2);
  return num3
}
// asyncFunT().then((res) => console.log(res));