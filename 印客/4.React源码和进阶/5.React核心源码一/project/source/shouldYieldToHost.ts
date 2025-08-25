// @ts-nocheck
function workLoopConcurrent() {
  // 每次迭代都检查是否需要让步
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

// Scheduler.js中的shouldYield实现
function shouldYieldToHost() {
  // 计算已经使用的时间
  const timeElapsed = getCurrentTime() - startTime;
  
  // 检查是否超过帧时间限制（通常是5ms）
  if (timeElapsed < frameInterval) {
    // 还有时间，继续工作
    return false;
  }
  
  // 时间片用完，需要让步给主线程
  return true;
}