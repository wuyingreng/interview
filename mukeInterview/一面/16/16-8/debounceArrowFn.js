const input1 = document.getElementById('input1')

const debounce = (fn, delay = 500) => {
	/**
	 * timer是在闭包中。
	 * 闭包的两种使用场景。
	 * 场景一：函数作为返回值。
	 * 场景二：函数作为入参
	 * 简化版 直接用箭头函数fn
	*/
	let timer = null;
	return () => {
		if (timer) {
			clearTimeout(timer)
		}
		// 整个函数没有return回去，下面的timer赋值还是会继续执行的，重新赋值为一个定时器
		timer = setTimeout(() => {
			fn();
			/**
			* 1. 如果不加这个代码，定时器执行完成了，但	if (timer) {
			* clearTimeout(timer)
			*  }
			* 还会执行，清空一个已经执行完成的定时器是无意义的
			* 2. 进行良好的变量管理，避免潜在的bug。未清理的引用可能积累导致内存占用增加。
			*/
			timer = null
		}, delay)
	}
}

input1.addEventListener('keyup', debounce(() => {
	console.log(input1.value)
}, 500))


