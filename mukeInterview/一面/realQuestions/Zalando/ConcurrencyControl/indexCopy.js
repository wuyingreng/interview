/**
 * 1. 写一个ConCurrencyControl类。类要大写
 * 属性：maxConCurrencyCount,queue,activeCount
 * 方法：add,next add调用next
 * add方法：返回的是一个promise，后面的.then才能获取到res
 * 抽一个公共的runTask普通函数。
 * 判断：activeCount<maxConCurrencyCount 
 *     执行runTask方法
*         activeCount++
  *        finally之后:activeCount-- ,调用next
  *         next方法:queue>0&&this.activeCount<this.maxConcurrencyCount;拿出queue的元素继续执行
 * 否则：push 执行runTask方法到queue中。next中去执行
 * 2. 模拟一个并发请求 mockRequest
 * 函数：入参:id,delay。返回一个函数。返回的函数在add中的runTask和next中执行。
 * 
 * 
 * 3. 不停的添加并发请求
 * ConCurrencyControl.add(mockRequest(i,Math.random()))
*/

class ConcurrencyControl {
  constructor(maxConcurrencyCount) {
    this.maxConcurrencyCount = maxConcurrencyCount;
    this.queue = [];
    this.activeCount = 0;
  }
  next() {
    if (this.queue.length > 0 && this.activeCount < this.maxConcurrencyCount) {
      const task = this.queue.shift();
      task()
    }
  }
  add(task) {
    return new Promise((resolve, reject) => {
      const runTask = (() => {
        this.activeCount++
        task().then(resolve, reject).finally(() => {
          this.activeCount--;
          this.next()
        })
      })
      if (this.activeCount < this.maxConcurrencyCount) {
        runTask()
      } else {
        console.log('push方法==>')
        this.queue.push(runTask)
      }
    })

  }
}


const mockRequest = (id, delay) => {
  return () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(id)
    }, delay)
  })
}

const conCurrencyController = new ConcurrencyControl(3);

for (let i = 1; i <= 10; i++) {
  console.log('i=>', i)
  conCurrencyController.add(mockRequest(i, Math.random() * 200)).then((res) => {
    console.log('res=>', res)
  })
}