  

const nums =[-10,-3,0,5,9];


function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}


var sortedArrayToBST = function(nums) {

	const buildBST=function(left,right){
		if(left>right) return null;
		const mid=Math.floor((right+left)/2);
		const tree=new TreeNode(nums[mid]);
		tree.left=buildBST(left,mid-1);
			tree.right=buildBST(mid+1,right)
		return tree;
	}

	return buildBST(0,nums.length-1);

}

console.log('sortedArrayToBST==>',sortedArrayToBST(nums))