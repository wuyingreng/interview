const input1 = document.getElementById('input1');
let timer = null;
/**
 * 当你暂停超过了1秒才会触发
 */
input1.addEventListener('keyup', function () {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    // 模拟change事件
    console.log(input1.value);

    // 清空定时器
    timer = null
  }, 1000)

})
