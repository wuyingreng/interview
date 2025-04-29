const input1 = document.getElementById('input1')

const debounce=(fn,delay=500)=>{
	/**
	 * timer是在闭包中。
	 * 闭包的两种使用场景。
	 * 场景一：函数作为返回值。
	 * 场景二：函数作为入参
	 * 简化版 直接用箭头函数fn
	*/
	let timer=null;
	return ()=>{
		if(timer){
			clearTimeout(timer)
		}
		timer=setTimeout(()=>{
			fn()
		},delay)
	}
}

input1.addEventListener('keyup',debounce(()=>{
	console.log(input1.value)
},500))


