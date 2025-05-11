"use strict"; // 启用严格模式
class Demo {
  state = { count: 0 };

  handleClick() {
    // 严格模式下，this 是 undefined
    console.log('this==>', this)
    this.setState({ count: this.state.count + 1 }); // ❌ 报错：Cannot read properties of undefined

  }



  render() {
    // 
    /**
     * this丢失的方式一
     *  methodB 中将 this.methodA 赋值给变量 callback，此时 callback 只是一个普通函数引用。
     * 直接调用 callback() 时，相当于以普通函数方式调用 methodA，导致 this 丢失绑定。
     * */

    // const methodb = this.handleClick
    // methodb();


    // this丢失的方式二
    setTimeout(this.handleClick, 1000); // 这里的this.functionA被作为回调传递，this会丢失

    // 不会丢失的情况
    this.handleClick()
  }
}

const demo = new Demo()
console.log('demo==>', demo.render())