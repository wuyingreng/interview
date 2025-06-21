class AbortController {
  constructor() {
    // 创建 AbortSignal 实例
    this.signal = new AbortSignal();
  }
  abort(reason) {
    // 触发 signal 的 abort 事件
    this.signal.dispatchEvent(new Event('abort'));
    // 存储取消原因
    this.signal.reason = reason || new DOMException('Aborted', 'AbortError');
    // 标记已取消状态
    this.signal.aborted = true;
  }
}

// 注意这里有EventTarget
class AbortSignal extends EventTarget {
  constructor() {
    super();
    this.aborted = false;    // 是否已取消
    this.reason = undefined; // 取消原因
  }

  // 添加事件监听（继承自 EventTarget）
  addEventListener(type, listener) {
    super.addEventListener(type, listener);
  }
}

