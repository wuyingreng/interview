/** ------------  事件绑定   ------------*/


/***
 * bindEvent:通用的绑定函数高阶版
 * elem:元素类型
 * type:事件类型，onClick等
 * fn:函数
 */

const bindEvent = (elem, type, selector, fn) => {
  // fn==null 相当于fn===null||fn===undefined
  if (fn == null) {
    fn = selector;
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target;
    // 代理绑定
    if (selector) {
      // 一个元素是不是符合一个css选择器
      if (target.matches(selector)) {
        // target的this的指向，event的函数的参数
        fn.call(target, event)
      }
    } else {
      // 普通绑定
      fn.call(target, event)
    }
  })
}


/** ------------  普通绑定   ------------*/
const btn1 = document.getElementById('btn1');
/**
 * 问题1：为什么这里用普通的函数this就是btn1,用箭头函数this就是windows 。
 * this取的是上级作用域的，上级作用域的this就是window
* 问题2：是不是call,bind,apply这种改变this指向的都要用普通的函数
* 问题3：做个思维导图吧，记录下
 */


bindEvent(btn1, 'click', function (e) {
  // 这块在做代理的时候会用到
  // 获取触发的元素
  console.log('e.target==>', e.target, 'this', this)
  e.preventDefault() // 阻止默认行为。阻止a标签跳转。好像只有a标签跳转这一个
  alert(this.innerHTML)
})


/** ------------  事件代理   ------------*/

const div3 = document.getElementById('div3');
bindEvent(div3, 'click', function (e) {
  // a标签要阻止默认行为。去掉这些会发现url会多加一个#。页面会回到顶部
  e.preventDefault()
  if (e.target.nodeName === 'A') {
    alert(this.innerHTML)
  }
  console.log('e.target==>', e.target)
})