class JQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    console.log('result==>', result)
    const length = result.length
    for (let i = 0; i < length; i++) {
      this[i] = result[i]
    }
    this.length = length
    this.selector = selector
  }
  get(index) {
    return this[index]
  }
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i]
      fn(elem)
    }
  }
  // 这个方法是给每一个selector添加事件
  /**
   * on方法是调用each方法，pass给this.each方法一个函数，这个方法是让elem
   * 绑定事件监听器
  */
  on(type, fn) {
    return this.each(elem => {
      elem.addEventListener(type, fn, false)
    })
  }
  // 扩展很多 DOM API
}

// 插件。用的还是JQuery
JQuery.prototype.dialog = function (info) {
  alert(info)
}

// “造轮子” 用的是我自己的
class MyJQuery extends JQuery {
  constructor(selector) {
    super(selector)
  }
  // 拓展自己的方法
  addClass(className) {

  }
  style(data) {

  }
}

const $p = new JQuery('p')
console.log('$p==>', $p)
$p.get(1)
$p.each((elem) => console.log(elem.nodeName))
$p.on('click', () => alert('clicked'))

console.log('$p.diaglog==>', $p.dialog('hello'))