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
const btn1 = document.getElementById('btn1');
bindEvent(btn1, 'click', e => {
  // 这块在做代理的时候会用到
  // 获取触发的元素
  console.log('e.target==>', e.target)
  e.preventDefault() // 阻止默认行为。阻止a标签跳转。好像只有a标签跳转这一个
  alert('clicked')
})


/** ------------  事件冒泡   ------------*/
/**
 * e.target获取的是当前触发事件的元素。e.currentTarget获取的是绑定事件的元素
 */
const body = document.body;
bindEvent(body, 'click', e => {
  console.log('body click==>', 'e.target==>', e.target, 'e.currentTarget==>', e.currentTarget)
})

const div2 = document.getElementById('div2');
bindEvent(div2, 'click', e => {
  console.log('div2 click==>', 'e.target==>', e.target, 'e.currentTarget==>', e.currentTarget)
})

/**
 * 需要阻止冒泡的场景
 */
const div1 = document.getElementById('div1');
bindEvent(div1, 'click', e => {
  console.log('div1 click 取消==>')
})

const p1 = document.getElementById('p1');
bindEvent(p1, 'click', e => {
  console.log('p1 click 激活==>')
  // 如果不加这行，会冒泡到div1，执行取消操作
  e.stopPropagation()
})