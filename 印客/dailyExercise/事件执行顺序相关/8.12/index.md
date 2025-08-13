1. 画个图表示下整个过程
2. 手写下整个promise函数 resolve,reject
async await函数


1. generatorFn是
 await async2();
  console.log('async1');
  return 'async1 success'

  整个报错的函数

2. res = gen[key](arg) // 这里有可能会执行返回reject状态的Promise
是在执行 await async2();
async2() 是个async函数
``` javascript
  try {
          res = gen[key](arg) // 这里有可能会执行返回reject状态的Promise
        } catch (error) {
          return reject(error) // 报错的话会走catch，直接reject
        }
```
try catch可以捕获async 函数的报错，所以进入到了return reject(error) 里面。直接return出去了。
3. 后续的函数不会在继续执行了。
``` javascript

// 解构获得value和done
const { value, done } = res
if (done) {
  // 如果done为true，说明走完了，进行resolve(value)
  return resolve(value)
} else {
  // 如果done为false，说明没走完，还得继续走

  // value有可能是：常量，Promise，Promise有可能是成功或者失败
  return Promise.resolve(value).then(val => go('next', val), err => go('throw', err))
}
      
```