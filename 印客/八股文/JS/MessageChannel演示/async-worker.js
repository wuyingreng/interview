// 异步任务 Worker
let port = null;

// 监听来自主线程的消息
self.onmessage = function (event) {
  if (event.data.type === 'start') {
    // 接收到 MessageChannel 的 port
    port = event.data.port;

    // 开始执行异步任务
    executeAsyncTask();

  } else {
    console.log('Worker 收到其他消息:', event.data);
  }
};

// 执行异步任务
async function executeAsyncTask() {
  try {
    // 模拟长时间运行的任务
    for (let i = 0; i <= 100; i += 10) {
      // 发送进度更新
      port.postMessage({
        type: 'progress',
        progress: i,
        data: `处理中... ${i}%`
      });

      // 模拟工作延迟
      await sleep(500);
    }

    // 任务完成
    port.postMessage({
      type: 'complete',
      data: '异步任务执行完成！',
      progress: 100
    });

  } catch (error) {
    // 任务出错
    port.postMessage({
      type: 'error',
      data: `任务执行失败: ${error.message}`,
      progress: 0
    });
  }
}

// 睡眠函数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Worker 启动时的日志
console.log('异步任务 Worker 已启动'); 