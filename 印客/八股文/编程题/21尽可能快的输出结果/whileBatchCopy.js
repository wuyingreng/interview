const processRequestsConcurrent=async (urls,maxConcurrentCount)=>{
	const len=urls.length;
	let results=new Array(len);
	let nextIndex=0;
	let completedCount=0;

	const sendRequest=async ()=>{
		// 这里是控制发送请求
		while(nextIndex<len){

			let currentIndex=nextIndex++;
						console.log('currentIndex===>',currentIndex)
			let url=urls[currentIndex];
			try{
				const res=await fetch(url);
				const resJson=await res.json();
				results[currentIndex]={data:res,currentIndex,status:'success'}

			}catch(err){
				results[currentIndex]={data:err,currentIndex,status:'failure'}
			}
			completedCount++;
			console.log('completedCount==>',completedCount)
			if(completedCount===len){
				return;
			}
		}
	}


	const workers=new Array(maxConcurrentCount).fill().map(()=>sendRequest());
	await Promise.all(workers);
	return results;
}

const urls=new Array(20).fill('https://x.sujianbin.com/?name=test.json');

processRequestsConcurrent(urls,5);
