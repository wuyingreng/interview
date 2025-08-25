// @ts-nocheck
// ReactFiberBeginWork.js
function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes,
) {
  if (current === null) {
    // 挂载阶段
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes,
    );
  } else {
    // 更新阶段
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes,
    );
  }
}

// ReactChildFiber.js
function reconcileChildFibers(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any,
  lanes: Lanes,
): Fiber | null {
  // 处理顶级片段
  const isUnkeyedTopLevelFragment =
    typeof newChild === 'object' &&
    newChild !== null &&
    newChild.type === REACT_FRAGMENT_TYPE &&
    newChild.key === null;
  
  if (isUnkeyedTopLevelFragment) {
    newChild = newChild.props.children;
  }

  // 处理对象类型的子元素
  if (typeof newChild === 'object' && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        return placeSingleChild(
          reconcileSingleElement(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes,
          ),
        );
      case REACT_PORTAL_TYPE:
        return placeSingleChild(
          reconcileSinglePortal(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes,
          ),
        );
      default:
        // 处理数组类型的子元素
        if (isArray(newChild)) {
          return reconcileChildrenArray(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes,
          );
        }
        // 其他可迭代对象
        if (getIteratorFn(newChild)) {
          return reconcileChildrenIterator(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes,
          );
        }
    }
  }
  
  // 其他情况...
  return deleteRemainingChildren(returnFiber, currentFirstChild);
}