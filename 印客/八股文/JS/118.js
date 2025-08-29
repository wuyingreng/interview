const loadImage=(src)=>{
	return new Promise((resolve,reject)=>{
		const img=new Image();
		img.onload=()=>{
			resolve(img)
		};
		img.onerror=()=>{
			reject('报错了')
		}
		img.src=url;
	})
};

loadImage('http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960').then((res)=>{

}.catch(()=>{

}));



console.log(1)
const img=new Image();
img.src='http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960';
console.log(2)