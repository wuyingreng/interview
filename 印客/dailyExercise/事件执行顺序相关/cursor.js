/*
* 使用递归完成 1 到 100 的累加
* 尾递归
**/ 

const sum1=(start,end)=>{
	if(start===end)return start;
	return end+sum1(start,end-1);
};




const sum2=(start,end,acc=start)=>{
	console.log(start,end,acc)
	if(start===end)return acc;
	return sum2(start,end-1,end+acc)
};


// console.log(sum1(1,3));
console.log(sum2(1,3))


const functoris=(n)=>{
	if(n<2){
		return 1
	}
	return n*functoris(n-1)
}

console.log(functoris(3))
