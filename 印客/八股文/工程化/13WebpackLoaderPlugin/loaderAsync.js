/**
 * 进阶版：使用loader-utils
 * 
 * */

const loaderUtils=require('loader-utils');

module.exports=function(source){
	const options=loaderUtils.getOptions(this);
	/**
	 * 注意这里要加()
	 * 注意这里的 this.async()，用官方的话来说就是 Tells the loader-runner that the loader
	 *intends to call back asynchronously. Returns this.callback.也就是让webpack知道这个loader
	 *是异步运行，返回的是和同步使用时一致的this.callback
	 * 
	 * */ 
	const asyncFunc=this.async();
	setTimoue(()=>{
		let finSource=source+'希望面试早日结束'；
		asyncFunc(null,finSource)
	},200)
}