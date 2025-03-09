/**
 * 创建 10 个`<a>`标签, 点击的时候弹出来对应的序号
 * i是全局变量,函数不会立马执行，点击的时候再执行。等点击的时候i早就变成10了。
*/
let i, a
for (i = 0; i < 10; i++) {
  a = document.createElement('a');
  a.innerHTML = i + '<br>';
  a.addEventListener('click', function (e) {
    e.preventDefault();
    alert(i)
  })
  document.body.appendChild(a)
}



/**
 * 解决方法一：不要让i变成全局变量
 * 每次for循环执行的时候都会形成一个新的块。
 * 不会立马执行的函数，要注意自由变量
*/
// 
let a1
for (let i = 0; i < 10; i++) {
  a1 = document.createElement('a');
  a1.innerHTML = i + '<br>';
  a1.addEventListener('click', function (e) {
    e.preventDefault();
    alert(i)
  })
  document.body.appendChild(a1)
}