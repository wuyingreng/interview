class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  // 注册事件
  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }
  // 取消注册事件
  off(event, listener) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
  }
  // 发布事件
  emit(event, ...args) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
// 使用示例
const stateEmitter = new EventEmitter();
let state;
function useState(initialValue) {
  state = initialValue;
  const listeners = [];
  const setState = (newState) => {
    state = newState;
    listeners.forEach((listener) => listener(newState));
    stateEmitter.emit("stateChange", newState);
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    // 返回一个取消订阅的函数
    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  };
  return [state, setState, subscribe];
}
function useEffect(effect, dependencies) {
  // 依赖数组的脏检查，可以进一步优化
  const currentDependencies = [];
  const runEffect = () => {
    const cleanup = effect();
    return cleanup;
  };
  stateEmitter.on("stateChange", (newState) => {
    if (
      !dependencies ||
      dependencies.some((dep, index) => dep !== currentDependencies[index])
    ) {
      if (currentDependencies.length) {
        currentDependencies.length = 0; // 清空
      }
      currentDependencies.push(...dependencies);
      runEffect();
    }
  });
  // 运行副作用
  runEffect();
}
// 示例
const [count, setCount, subscribeToCount] = useState(0);
subscribeToCount((newCount) => {
  console.log(`Count updated to: ${newCount}`);
});
useEffect(() => {
  console.log("Effect: Count is: ", count);
}, [count]);
// 更新状态
setCount(1); // 触发 effect
setCount(2); // 触发 effect
