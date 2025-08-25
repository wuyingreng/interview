// @ts-nocheck
// ReactFiberWorkLoop.js

function renderRootSync(root: FiberRoot, lanes: Lanes) {
  const prevExecutionContext = executionContext;
  executionContext |= RenderContext;
  
  // 如果根节点或车道发生变化，准备新的栈
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) {
    prepareFreshStack(root, lanes);
  }
  
  do {
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  } while (true);
  
  executionContext = prevExecutionContext;
  workInProgressRoot = null;
  workInProgressRootRenderLanes = NoLanes;
  
  return workInProgressRootExitStatus;
}
