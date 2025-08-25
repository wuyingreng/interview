// @ts-nocheck
// 位于 packages/react-reconciler/src/ReactFiberWorkLoop.new.js

function workLoopSync() {
  // 同步工作循环：一直工作直到没有更多任务
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function workLoopConcurrent() {
  // 并发工作循环：可中断的工作循环
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}