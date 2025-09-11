const RULE_NAME='no-http-url';


module.exports={
	name: RULE_NAME,
	meta:{
		type:'suggestion',
		fixable:null,
		message:'Recommended "{{url}}" switch to HTTPS',
	},
	create(context){
		Literal:function handleRequires(node){
			if(node.value==='string'&&node.value.indexOf('http:')===0){
				context.report({
					node,
					messageId:'noHttpUrl',
					data: {
			              url: node.value,
			            },

				})
			}

		}
	}
}