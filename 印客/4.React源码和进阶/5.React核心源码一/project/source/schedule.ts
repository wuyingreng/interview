// @ts-nocheck
const unstable_scheduleCallback = (priorityLevel, callback, options) => {
  // 1. 计算开始时间（额外计算）
  const currentTime = getCurrentTime();
  let startTime;
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay;
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
  } else {
    startTime = currentTime;
  }
  
  // 2. 创建任务节点（内存分配）
  const newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  };
  
  // 3. 任务队列管理（额外操作）
  if (startTime > currentTime) {
    // 添加到定时队列
    push(timerQueue, newTask);
  } else {
    // 添加到任务队列
    push(taskQueue, newTask);
    // 请求主机回调（额外系统调用）
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }
  
  return newTask;
}
