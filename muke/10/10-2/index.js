/**
 * navigator
 * 可以网上去搜各个浏览器的UA检测方案
*/
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
console.log(isChrome)
// screen
console.log(screen.width)
console.log(screen.height)


// location
/**
 * location.href:https://coding.imooc.com/class/chapter/115.html'
 * location.protocol:https
 * location.pathname:/class/chapter/115.html
 * location.search:?xxx
 * location.hash:#xx
*/
console.log(location.href)
console.log(location.protocol)
console.log(location.pathname)
console.log(location.port)
console.log(location.search)
console.log(location.hash)
/**
 * history
 * 相当于浏览器的前进后退按钮
*/

history.back()
history.forward()
