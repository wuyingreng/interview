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

// ❌ 错误尝试：用前序遍历的方式实现中序遍历
console.log('=== 错误的中序遍历尝试 ===');
const wrongInOrder = (root) => {
  if (!root) return;
  const stack = [root];

  while (stack.length > 0) {
    const n = stack.pop();
    console.log('错误版本输出:', n.val);  // 这里输出的顺序是错的！

    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
};

wrongInOrder(binaryTree);

console.log('\n期望的中序遍历结果: 4 → 2 → 5 → 1 → 3');
console.log('错误版本实际输出: 1 → 2 → 4 → 5 → 3 (这其实是前序遍历！)');

// ✅ 正确的中序遍历
console.log('\n=== 正确的中序遍历 ===');
const correctInOrder = (root) => {
  if (!root) return;
  const stack = [];
  let p = root;

  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log('正确版本输出:', n.val);
    p = n.right;
  }
};

correctInOrder(binaryTree); 