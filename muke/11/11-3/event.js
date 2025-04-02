/** ------------  事件绑定   ------------*/

/***
 * bindEvent:通用的绑定函数
 * elem:元素类型
 * type:事件类型，onClick等
 * fn:函数
 */

const bindEvent = (elem, type, fn) => {
  elem.addEventListener(type, fn)
}


/** ------------  普通绑定   ------------*/
const btn1 = document.getElementById('btn1');
bindEvent(btn1, 'click', e => {
  // 这块在做代理的时候会用到
  // 获取触发的元素
  console.log('e.target==>', e.target)
  e.preventDefault() // 阻止默认行为。阻止a标签跳转。好像只有a标签跳转这一个
  alert('clicked')
})


/** ------------  事件代理   ------------*/

const div3 = document.getElementById('div3');
bindEvent(div3, 'click', e => {
  // a标签要阻止默认行为。去掉这些会发现url会多加一个#。页面会回到顶部
  e.preventDefault()
  if (e.target.nodeName === 'A') {
    alert(e.target.innerHtml)
  }
  console.log('e.target==>', e.target)
})
