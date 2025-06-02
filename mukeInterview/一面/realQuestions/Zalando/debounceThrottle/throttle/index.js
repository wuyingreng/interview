/**
 * 1. return 直到上一个定时器完成才可以重设下一个定时器
*/

function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

const div1 = document.getElementById('div1');

div1.addEventListener('drag', throttle(function (e) {
  console.log('e==>', e.offsetX, e.offsetY)
}, 500))