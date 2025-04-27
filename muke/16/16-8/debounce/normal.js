const input1 = document.getElementById('input1');
input1.addEventListener('keyup', function () {
  // 会看到一直请求
  console.log(input1.value)
})
