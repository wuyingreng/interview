async function concurrentRequest(urls, maxConcurrent) {
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

    add(task, index) {
      return new Promise((resolve, reject) => {
        const runTask = () => {
          this.activeCount++;
          /**
           * task().then(resolve, reject) 就是把task的值返回给外层的promise。记得是2个参数
           * 相当于task().then((res)=>{resolve(res)}).tach((err)=>{reject(err)})
          */
          task().then((res) => {
            resolve({ status: 'success', data: res })
          }, (err) => {
            resolve({ status: 'failure', data: err })
          }).finally(() => {
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
  const mockRequest = (url) => {
    return () =>
      new Promise((resolve, reject) => {
        const delay = 500 + Math.random() * 1500;
        setTimeout(() => {
          // 模拟10%的失败率
          if (Math.random() < 0.1) {
            reject(`请求失败: ${url}`);
          } else {
            resolve(`${url} 的响应数据`);
          }
        }, delay);
      });
  };
  // 创建并发控制器（最大并发数为2）
  const controller = new ConcurrencyControl(maxConcurrent);
  // 创建所有请求的Promise数组
  const allPromises = urls.map((url, index) =>
    controller.add(mockRequest(url), index)
  );

  return await Promise.all(allPromises).then((res) => {
    console.log('res==>', res);
    return res
  })

}

const urls = ["url1", "url2", "url3", "url4", "url5", "url6", "url7", "url8"];
const maxConcurrent = 3;
concurrentRequest(urls, maxConcurrent)
  .then(results => {
    console.log("所有请求完成！");
    console.log("API 结果（按原始顺序）:");
    results.forEach((result, index) => {
      console.log(`[${index}] ${urls[index]}: ${result.status}`, result.data);
    });
  })
  .catch(error => {
    console.error("发生错误:", error);
  });