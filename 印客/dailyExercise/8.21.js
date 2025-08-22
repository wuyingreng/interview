/**
 * 今日题目
 * 手写用 ES6proxy 如何实现 arr[-1] 的访问
 * */


const handler={
	set:function(target,property,value,receiver){
		
		const numberIndex=Number(property);
		const positiveIndex=numberIndex+target.length;
		if(numberIndex<0&&positiveIndex<target.length&&positiveIndex>=0){
			 target[positiveIndex]=value;
			 return true
		}else if(numberIndex<target.length&&numberIndex>=0){
			 target[numberIndex]=value;
			 return true
		}
		return false;
	},
	get:function(target,property,receiver){
		console.log('receiver==>',receiver===result)
		const numberIndex=Number(property);
		const positiveIndex=(numberIndex%target.length)+target.length;
		if(numberIndex<0&&positiveIndex<target.length&&positiveIndex>=0){
			return target[positiveIndex];
		}else if(numberIndex<target.length&&numberIndex>=0){
			return target[numberIndex];
		}
		return undefined;
	}
}
const arr=[1,2,3];
const result=new Proxy(arr,handler);
console.log(result[-5])



// const handler={
// 	set:function(target,property,value,receiver){
		
		
// 	},
// 	get:function(target,property,receiver){
// 		const numberIndex=Number(property);
// 		const positiveIndex=numberIndex+target.length;
// 		if(numberIndex<0&&positiveIndex<target.length&&positiveIndex>=0){
// 			return target[positiveIndex];
// 		}else if(numberIndex<target.length&&numberIndex>=0){
// 			return target[numberIndex];
// 		}
// 		return undefined;
// 	}
// }
// const arr=[1,2,3];
// const result=new Proxy(arr,handler);
// console.log(result[-1])