/***
 * 1. 等答案吧，和答案对比下。
 * 2. 搞个html看下跑的通跑不通
 * 3. 如果没有视频的话，把以前的视频再2倍数的看一遍
 */


// 防抖
const debounce = function (fn, timeout) {
	let timer = null;

	return function () {
		if (timer) {
			// 清空之后要新建所以不能加return
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		})
	}
}

const getEleContent = function (event) {
	console.log('event.target.val==>', event.target.value)
}
const debounceFn = debounce()
document.getElementById('input').addEventListener('keyup', getEleContent);


// 节流
const throttle = function (fn, timetout) {
	let timer = null;
	return function () {
		if (timer) {
			return
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		})
	}
}

const getEleScrollHeight = function (event) {
	console.log('event.offsetX==>', event.offsetX)
}
const throttleFn = throttle()
document.getElementById('div').addEventListener('scroll', throttleFn);