/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
	if(!root) return 0;

	let minDepth=Infinity;
	const dfs=function(root,l){
		if(!root.left&&!root.right){
			Math.min(minDepth,l)
		}
		if(root.left) dfs(root.left,l+1);
		if(root.right) dfs(root.right,l+1);
	}
	dfs(root,1)
	return minDepth;
}
