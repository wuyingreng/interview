const binaryTree={
	val:1,
	left:{
		val:2,
		left:{
			val:3,
			left:null,
			right:null,
		},
		right:{
			val:4,
			left:null,
			right:null,
		}
	},
	right:{
		val:5,
		left:null,
		right:null
	}
}

// /depθ/ 
const maxDepth=function(root){
	if(!root)return 0;
	let res=0;
	const dfs=function(root,l){
		// 递归终止条件
		if(!root)return ;
		// 当前节点就是叶子节点了
		if(!root.left&&!root.right){
			res=Math.max(res,l)
		}
		// 往下搜索
		dfs(root.left,l+1);
		dfs(root.right,l+1);
	}

	dfs(root,1);
	return res;
}
console.log('maxDepth==>',maxDepth(binaryTree))