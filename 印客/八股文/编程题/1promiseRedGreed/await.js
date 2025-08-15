/**
 * 红灯3秒亮一次，绿灯2秒亮一次，黄灯1秒亮一次;如何让三个灯不断交替重复亮灯?
 * */

const red = () => {
	console.log('red', new Date());
};

const green = () => {
	console.log('green', new Date());
};


const yellow = () => {
	console.log('yellow', new Date());
};

const light = (cb, time) => {
	return new Promise((resolve, reject) => {
		cb();
		setTimeout(() => {
			resolve()
		}, time);
	})

};


const steps = () => new Promise(async (resolve, reject) => {
	await light(red, 3000);
	await light(green, 2000);
	await light(yellow, 1000);
	// 使用了async await 语法保证了，resolve是在三次await之后执行
	resolve();

}).then((res) => {
	steps()
})

steps()