/**
 * 1. 所有的地方都需要用普通函数，但是setTimeout这里需要用箭头函数
 * * setTimeout这里需要用箭头函数。它没有this,会继承定义时所在作用域的this,就是继承返回函数的this
 * * 返回函数是在执行throttle的时候被返回，被div1调用。所以它的this是div1
 * * 如果把setTimeout函数改成普通函数，setTimeout 的回调默认 this 是 window（严格模式下是 undefined）。
 * 2. 这个arguments是哪里来的呢
*/

function throttle(fn, delay = 100) {
    let timer = null

    return function () {
        if (timer) {
            console.log('timer')
            return
        }
        timer = setTimeout(() => {
            console.log('settimeout')
            console.log('this==>',this,'arguments==>',arguments)
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

div1.addEventListener('drag', throttle(function (e) {
    console.log(e.offsetX, e.offsetY)
}),5000)