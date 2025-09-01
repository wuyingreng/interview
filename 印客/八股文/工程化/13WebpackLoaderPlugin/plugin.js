const plugnName='md-plugin'
class DemoPlugin{
	constructor(){

	}
	apply(complier){
		complier.hooks.emit.tapAsync(plugnName,(compilation,fn)=>{
			/**
			 * compilation.assets 中的每个资源都必须实现 Webpack 的 Asset 接口，这个接口要求
			 * */
			console.log('compliation==>',compliation)
			compilation.assets['index.md']={
				source:function(){
				 // 必须实现：返回文件内容
					return  'index.md'

				},
				size:function(){
		// 返回文件大小（字节数）
					 return this.source().length;
				}
			};
			fn();
		});
	}
};

