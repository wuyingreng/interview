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
// iteratively
const inorderTraversal=(root)=>{
	if(root) return []
	let res=[];
	const stack=[];
	let p=root;
	while(stack.length>0||p){
		
		while(p){
			stack.push(p);
			p=p.left
		}
		const node=stack.pop();
		res.push(node.val);
		p=node.right;
	}
	return res;
}


console.log('inorderDfs==>',inOrder(binaryTree))