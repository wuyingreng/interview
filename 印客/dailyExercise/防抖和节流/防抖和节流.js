


/***
 * 第一版在：一面 16-8，16-9
 * Todo:
 * 1. 后期加个立即执行
 * 2. 节流加一个时间戳的方式。在语雀文档里面有答案
 * 做错的地方：
 * 1. addEventListener绑定的是debounceFn=debounce(fn,500),throttleFn=throttle(fn,500)
 * 2. timeout没有设置第二个参数。
 * 3. 箭头函数没有自己的arguments，在某些JS环境中也不会继承外层函数的arguments，虽然某些环境下会。让不应该依赖。要显示
 * 对外层函数用...args的写法
 */


// 防抖
const debounce = function (fn, timeout) {
	let timer = null;
	return function (...args) {
		if (timer) {
			// 清空之后要新建所以不能加return
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			console.log('args==>', args,'this', this)
			fn.apply(this, args);
			timer = null;
		}, timeout)
	}
}

const getEleContent = function (event) {
	console.log('event.target.val==>', event.target.value)
}
const debounceFn = debounce(getEleContent, 500);


document.getElementById('input').addEventListener('keyup', debounceFn);


// 节流
const throttle = function (fn, timetout) {
	let timer = null;
	return function (...args) {
		if (timer) {
			return
		}
		timer = setTimeout(() => {
			console.log('args==>', args,  'this', this)
			fn.apply(this, args);
			timer = null;
		}, timetout)
	}
}

const getEleScrollHeight = function (event) {
	console.log('event.offsetX==>', event.offsetX)
}
const throttleFn = throttle(getEleScrollHeight, 500)
document.getElementById('div').addEventListener('drag', throttleFn);