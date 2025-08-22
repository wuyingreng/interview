class Scheduler {
	constructor(max) {
		this.max = max;
		this.count = 0; // 用来记录当前正在执行的异步函数
		this.queue = new Array(); // 表示等待队列
	}
	async add(promiseCreator) {
		console.log('promiseCreator==>', promiseCreator)
		/*
			此时count已经满了，不能执行本次add需要阻塞在这里，将resolve放入队列中等待唤醒,
			等到count<max时，从队列中取出执行resolve,执行，await执行完毕，本次add继续
			*/
		if (this.count >= this.max) {
			await new Promise((resolve, reject) => this.queue.push(resolve));
		}

		this.count++;
		let res = await promiseCreator();
		this.count--;
		if (this.queue.length) {
			// 依次唤醒add
			// 若队列中有值，将其resolve弹出，并执行
			// 以便阻塞的任务，可以正常执行
			this.queue.shift()();
		}
		return res;
	}
}

const timeout = time => {
	console.log(time)
	return new Promise(resolve => {
		setTimeout(resolve, time);
	});
}


const scheduler = new Scheduler(2);

const addTask = (time, order) => {
	//add返回一个promise，参数也是一个promise
	scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// output: 2 3 1 4