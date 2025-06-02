function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log('this==>', this, arguments)
      fn.apply(this, arguments);
      timer = null;
    }, delay)

  }
}

const element = document.getElementById('input1')
element.addEventListener('keyup', debounce(function (e) {
  console.log(element.value)
}, 500))