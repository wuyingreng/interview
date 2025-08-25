//@ts-nocheck
/**
 * 这是调度器包的核心函数，负责在浏览器事件循环中执行任务
 * 它充当React调度器与浏览器之间的桥梁，实现时间切片功能
 */
const performWorkUntilDeadline = () => {
  // 步骤1: 检查是否有计划的任务回调
  if (scheduledHostCallback !== null) {
    // 步骤2: 获取当前精确时间，作为时间片起始点
    const currentTime = getCurrentTime();
    
    // 步骤3: 设置时间片截止时间(通常是当前时间 + 5ms)
    // 这确保了任务执行不会超过分配的时间预算
    deadline = currentTime + yieldInterval;
    
    // 步骤4: 标记是否有剩余时间(通常为true，具体由deadline判断)
    const hasTimeRemaining = true;
    
    // 变量用于跟踪是否还有更多工作需要执行
    let hasMoreWork = true;
    
    try {
      // 步骤5: 核心执行部分 - 调用计划的主回调函数(通常是flushWork)
      // 传入hasTimeRemaining和deadline参数，允许回调函数检查时间限制
      // scheduledHostCallback返回布尔值表示是否还有更多工作
      hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
    } finally {
      // 步骤6: 根据执行结果决定下一步操作
      if (hasMoreWork) {
        // 6a: 如果还有更多工作，安排新的宏任务继续执行
        // 这确保了长时间任务被分解成多个时间片
        schedulePerformWorkUntilDeadline();
      } else {
        // 6b: 如果所有工作已完成，清理状态
        isMessageLoopRunning = false;
        scheduledHostCallback = null;
      }
    }
  } else {
    // 没有计划的任务，标记消息循环为非运行状态
    isMessageLoopRunning = false;
  }
  
  // 步骤7: 重置状态，为可能的后续任务做准备
  needsPaint = false;
};