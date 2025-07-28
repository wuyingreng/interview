// 名称: JSBridge 挂在 window上的一个属性
window.JSBridge = {
  // ...其他属性，比如：版本、app基础信息
  // 回调函数集合
  _cbMap: {},
  // h5 调用native方法，调用时会将回调 id 存放到本地变量cbList中
  send(method, data, callback) {
    // 检测合法性
    this.checkMethod(data);

    const params = {
      method, // 和客户端约定好定为method字段，即bridge名称
      callback: callbackId,
      data: {} // 业务参数
    }
    // 调用native将参数传递进去
    callNative(JSON.Stringify(params))

    // 回调
    let callbackId
    if (callback) {
      callbackId = this.createCallbackId();
      this.register(callbackId, callback);
    }
  },
  // js注册方法，native主动发起调用
  register(id, callback) {
    this._cbMap[id] = callback
  },
  // native回调js的方法 obj: { 回调id, 回调数据 }
  // 相当于native只调用此方法，参数为json字符串
  handler(obj) {
    const { callbackId, data } = JSON.parse(obj)
    // 执行对应的回调函数即send传进来的callback，如果要返回值，可再发一个send
    this._cbMap[callbackId] && this._cbMap[callbackId](data)
  },
  // 构造函数id
  createCallbackId(params) {
    return `${params.method}_${Date.now()}`;
  }
    // 检测API合法性
    checkMethod(params) {
    // 白名单
    const WHITE_LIST = [];
    // WHITE_LIST.includes(params.method)
    // 参数
    this.checkParams()

    return true;
  }
    // 检测参数合法性
    checkParams(params) {
    // 那些参数是必填的。
    return true;
  }
}

// 调用示例
// 主动发消息
JSBridge.send('ui.callNative', {}, (data) => data)
// 注册在本地，被动接受客户端调用
JSBridge.register("ui.datatabupdate", (data) => data);

if (arr[left] === arr[right]) {
  left++;
  right--;
} else {
  return false
}