// 1.封装事件的监听
function listen(el, type, cb) {
  const dom = document.querySelector(el)
  if (!dom) {
    return
  }
  dom.addEventListener(type, cb)
  //返回的是一个函数，函数的返回是取消副作用的操作
  return () => dom.removeEventListener(type, cb)
}


// 2.参数进行反转
// const listenInput =(el,type,cb)=>listen(cb, type, el);
const reverseListen = reverse(listen);

//2.监听输入框的input的执行
const listenInput = (cb) => curry(reverseListen, cb, 'input');

//3. debounce
const cb = debounce(e => fetch('/api/xxx', { method: 'PosT', body: e.target.value }), 200)
//4、监听输入框的执行
const subscribe = listenInput(cb);
const unsubscribe = subscribe('input');
// 5. 取消监听
unsubscribe()
