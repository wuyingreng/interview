
class Scheduler{
	constructor(n){
		this.queue=[];
		this.count=0;
		this.maxCount=n;
	};
	async addTask(promiseCreator){
		if(this.count>=this.maxCount){
			await new Promise((resolve,reject)=>this.queue.push(resolve));
		}
		this.count++;
		const res=await promiseCreator();
		this.count--;
		if(this.queue.length>0){
			this.queue.shift()()
		};
		return res;
	}
}










const timeout=(timer)=>{
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(timer)
		},timer)
	})
};

const scheduler=new Scheduler(2)

const addTaskOrder=(timer,order)=>{
	// 这里要传()=>timeout(timer) 否则就直接调用了
	return scheduler.addTask(()=>timeout(timer)).then((res)=>{
		console.log('order==>',`time:${res}-order${order}`)
	})
};

addTaskOrder(1000,'1');
addTaskOrder(500,'2')
addTaskOrder(300,'3');
addTaskOrder(400,'4');