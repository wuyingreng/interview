function preorderTraversalIterative(root) {
	if (root === null) {
		return [];
	}

	const result = [];
	const stack = [root];

	while (stack.length > 0) {
		const currentNode = stack.pop();
		result.push(currentNode.value);  // 访问节点

		// 注意我们先压入右子节点，再压入左子节点
		if (currentNode.right !== null) {
			stack.push(currentNode.right);
		}
		if (currentNode.left !== null) {
			stack.push(currentNode.left);
		}
	}

	return result;
}


// 使用迭代方式前序遍历
const iterativeResult = preorderTraversalIterative(root);
console.log(iterativeResult); // [1, 2, 3]