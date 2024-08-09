class EventEmitter {
  constructor() {
    this.listeners = {}
  }
  on(event, listener) {
    console.log('on')
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
  }
  // 取消注册事件
  off(event, listener) {
    // 没有进入off这个阶段
    console.log('off')
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
  }
  // 发布事件
  emit(event, ...args) {
    console.log('emit')
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

const stateEmitter = new EventEmitter();

let state;
function useState(initialValue) {
  state = initialValue;
  const listeners = [];
  const setState = (newState) => {
    state = newState;
    console.log('newState==>', newState)
    listeners.forEach((listener) => listener(newState));
    // envent name, args
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
  // 
  // dep 对应useState的第一个参数
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
// 执行上面的函数
subscribeToCount((newCount) => {
  console.log(`Count updated to: ${newCount}`);
});
useEffect(() => {
  console.log("Effect: Count is: ", getCount());
}, [getCount]);

// 更新状态
setCount(1); // 触发 effect
setCount(2); // 触发 effect
setCount(3); // 触发 effect