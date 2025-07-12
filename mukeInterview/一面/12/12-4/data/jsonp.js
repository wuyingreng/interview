// 获取URL参数中的callback名称
const urlParams = new URLSearchParams(window.location.search);
const callbackName = urlParams.get('callback') || 'callback'; // 默认为'callback'

// 要返回的数据
const data = {
  name: 'zhangsan'
};

// 动态调用回调函数
if (typeof window[callbackName] === 'function') {
  window[callbackName](data);
} else {
  // 如果回调函数不存在，直接执行（兼容性处理）
  eval(`${callbackName}(${JSON.stringify(data)})`);
}
