const $p1 = $('<p>一段文字</p>');
const $p2 = $('<p>一段文字</p>');
const $p3 = $('<p>一段文字</p>');
$('#container')
  .append($p1)
  .append($p2)
  .append($p3)

console.log('length', $('#container').children().length);

// 微任务：DOM渲染之前执行
Promise.resolve().then().then(() => {
  console.log('length promise.then', $('#container').children().length);
  alert('promise.then')
})

setTimeout(() => {
  console.log('length setTimeout', $('#container').children().length);
  alert('promise.then')
})