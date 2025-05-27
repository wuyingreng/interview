class ConcurrencyControl {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent; // 最大并发数
    this.queue = []; // 待执行队列
    this.activeCount = 0; // 当前活跃请求数
  }

  // 执行下一个任务
  next() {
    if (this.queue.length > 0 && this.activeCount < this.maxConcurrent) {
      /***
       * 去掉数组中的第一个元素,返回被删除的元素，改变原数组.
       * 从队列头部取出任务执行，确保先进先出
       */


      const task = this.queue.shift();
      task(); // 执行队列中的任务（即runTask）。这种“嵌套”调用是实现并发控制的核心设计
    }
  }
  /**
   * 添加请求到队列
   * add方法里面要返回promose,不然后面的add(mockRequest()).then 没有办法调用
  */

  add(task) {
    return new Promise((resolve, reject) => {
      const runTask = () => {
        this.activeCount++;
        /**
         * task().then(resolve, reject) 就是把task的值返回给外层的promise。记得是2个参数
         * 相当于task().then((res)=>{resolve(res)}).tach((err)=>{reject(err)})
        */
        task().then(resolve, reject).finally(() => {
          /**
         * activeCount--`放在`finally`中是为了确保在任何情况下（成功、失败、异常）都能正确释放并发额度，
         * 从而允许后续任务继续执行，保持并发控制的正确性
        */
          this.activeCount--;
          /**
           * runTask和next是链式触发机制。runTask里面执行next,next里面的task又是runTask
          */
          this.next();
        });
      };

      if (this.activeCount < this.maxConcurrent) {
        runTask();
      } else {
        // push的是runTask。这样runTask和next才能形成链式调用
        this.queue.push(runTask);
      }
    });
  }


}


// 模拟异步请求
function mockRequest(id, delay) {
  // 这里要return promise。不然没有办法把内层的promise状态返回给外层
  return () => new Promise(resolve => {
    setTimeout(() => {
      console.log(`请求 ${id} 完成`);
      resolve(`结果 ${id}`);
    }, delay);
  });
}

// 创建并发控制器（最大并发数为2）
const controller = new ConcurrencyControl(2);

// 添加多个请求
for (let i = 1; i <= 5; i++) {
  controller.add(mockRequest(i, Math.random() * 2000))
    .then(res => console.log(res));
}
