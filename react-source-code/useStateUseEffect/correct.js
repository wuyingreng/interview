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
  return [() => state, setState, subscribe]; // 返回获取状态的函数
}

function useEffect(effect, dependencies) {
  // 获取当前依赖的状态
  let currentDependencies = dependencies.map((dep) => dep());
  const runEffect = () => {
    const cleanup = effect();
    return cleanup;
  };

  const stateChangeHandler = () => {
    const newDependencies = dependencies.map((dep) => dep());
    if (
      !newDependencies ||
      newDependencies.some((dep, index) => dep !== currentDependencies[index])
    ) {
      currentDependencies = newDependencies;
      runEffect();
    }
  };

  stateEmitter.on("stateChange", stateChangeHandler);

  runEffect(); // 运行第一次副作用
}

// 示例
const [getCount, setCount, subscribeToCount] = useState(0);
subscribeToCount((newCount) => {
  console.log(`Count updated to: ${newCount}`);
});
useEffect(() => {
  console.log("Effect: Count is: ", getCount());
}, [getCount]);

// 更新状态
setCount(1); // 触发 effect
setCount(2); // 触发 effect
