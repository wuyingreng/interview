class TreeNode {
	constructor(value) {
		this.value = value;   // 节点的值
		this.left = null;     // 指向左子节点的指针
		this.right = null;    // 指向右子节点的指针
	}
}

// 使用方法示例
// 创建一个根节点
let root = new TreeNode(1);

// 添加左子节点和右子节点
root.left = new TreeNode(2);
root.right = new TreeNode(3);

// 继续添加子节点
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// algorithm/list/sort/mergeSort/index.js 这个位置也有差不多的写法。看你最终喜欢哪种写法。不需要会两种写法
console.log('root==>', root);