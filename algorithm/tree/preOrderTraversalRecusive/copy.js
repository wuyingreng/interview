class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}


const preorderTraversalRecursive = (root) => {
	const result = [];
	const traverse = (node) => {
		if (node === null) {
			return;
		}
		result.push(node.value);  // 访问节点
		traverse(node.left);      // 遍历左子树
		traverse(node.right);     // 遍历右子树
	};
	traverse(root);
	return result;
};



// 创建一棵二叉树
//     1
//    / \
//   2   3
//  / \
// 4   5

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// 输出结果

const result = preorderTraversalRecursive(root);
console.log(result); // 应该打印出: [1, 2, 4, 5, 3]