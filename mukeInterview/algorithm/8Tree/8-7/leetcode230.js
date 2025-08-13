/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    const res=[];
    // 迭代中序遍历整棵树
    const stack=[];
    let p=root;

    while(stack.length>0||p){
    	while(p){
	    	stack.push(p);
	    	p=p.left;
    	}

    	const node=stack.pop();
    res.push(node.val);
    if(res.length===k) return res[length-1]
    p=node.right;

    }

};