// const promiseList = [
//   new Promise((resolve) => {
//     setTimeout(resolve, 1000)
//   }),
//   new Promise((resolve) => {
//     setTimeout(resolve, 2000)
//   }),
//   new Promise((resolve) => {
//     setTimeout(resolve, 3000)
//   }),
//   new Promise((resolve) => {
//     setTimeout(resolve, 1500)
//   })
// ];


// fn(promiseList);




function processRequests(urls) {
  const results = [];

  // 并发请求数量
  const concurrentLimit = 5;

  // 创建⼀个队列来存储请求
  const queue = urls.slice();
  // 递归函数 ，依次处理队列中的请求
  async function sendRequest() {
    if (queue.length === 0) {
      // 队列为空 ，所有请求已完成 ，输出结果
      console.log(results);
      return;
    }

    // 取出队列中的下⼀个请求
    const url = queue.shift();
    try {
      //发起异步请求
      const response = await fetch(url);
      // 处理请求结果，这里假设返回的是文本
      const result = await response.text();
      // 将结果存入数组中
      results.push(result);
      // 递归调用自身，继续处理下一个请求
      sendRequest();
    } catch (err) {
      results.push(err);
      // 处理请求错误
      console.error(`Request failed for ${url}:`, err);
      //递归调用自身，继续处理下一个请求
      sendRequest();
    }
  }
  //控制并发请求数量，同时发送多个请求
  for (let i = 0; i < concurrentLimit; i++) { sendRequest() };

  return results;
}

