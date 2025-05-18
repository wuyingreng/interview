/**
 * 1. 所有的地方都需要用普通函数，但是setTimeout这里需要用箭头函数
 * * setTimeout这里需要用箭头函数。它没有this,会继承定义时所在作用域的this,就是继承返回函数的this
 * * 返回函数是在执行throttle的时候被返回，被div1调用。所以它的this是div1
 * * 如果把setTimeout函数改成普通函数，setTimeout 的回调默认 this 是 window（严格模式下是 undefined）。
 * 2. 这个arguments
 * 事件箭头会默认的把event pass给throttleFn
 * const throttleFn=throttle(function (e) {
  *  console.log(e.offsetX, e.offsetY)
*}
就是pass 给return的函数
*/

function throttle(fn, delay = 100) {
    let timer = null

    return function () {
        if (timer) {
            console.log('timer')
            return
        }
        // 定时器一定会在固定的时间内执行，所以不需要clearTimeout
        timer = setTimeout(() => {
            console.log('settimeout')
            console.log('this==>', this, 'arguments==>', arguments)
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

div1.addEventListener('drag', throttle(function (e) {
    /**
     * e的来源是参数传递，而不是全局变量或其他作用域
     * 传递过程：addEventListener 把e pass给了上面return回来的匿名函数
     * setTimeout 继承了匿名函数的arguments
     * 通过fn.apply(this, arguments)，把arguments中的e pass给了fn
     * 如果这里不在函数里面声明参数e，会报错会引用未定义的变量。
    */

    console.log(e.offsetX, e.offsetY)
}), 5000)


