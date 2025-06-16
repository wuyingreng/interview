const binaryTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null
    },
    right: {
      val: 5,
      left: null,
      right: null
    }
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
};

// 递归版本
const preOrderRecursive = (root) => {
  if (!root) return;
  console.log('递归版本:', root.val);
  preOrderRecursive(root.left);
  preOrderRecursive(root.right);
}

// 错误的非递归版本（会报错）
const preOrderWrong = (root) => {
  if (!root) return;
  const stack = [root];
  while (stack.length > 0) {
    const n = stack.pop();
    console.log('错误版本:', n.val);
    stack.push(n.right);  // 问题：可能压入 null
    stack.push(n.left);   // 问题：可能压入 null
  }
}

// 正确的非递归版本
const preOrderCorrect = (root) => {
  if (!root) return;
  const stack = [root];
  while (stack.length > 0) {
    const n = stack.pop();
    console.log('正确版本:', n.val);

    // 关键：只有非空节点才压入栈
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
}

console.log('=== 递归版本测试 ===');
preOrderRecursive(binaryTree);

console.log('\n=== 正确的非递归版本测试 ===');
preOrderCorrect(binaryTree);

console.log('\n=== 错误的非递归版本测试（会报错）===');
try {
  preOrderWrong(binaryTree);
} catch (error) {
  console.log('捕获到错误:', error.message);
} 