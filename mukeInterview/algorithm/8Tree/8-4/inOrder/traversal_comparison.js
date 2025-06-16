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

// 前序遍历：根 → 左 → 右
console.log('=== 前序遍历执行过程 ===');
const preOrder = (root) => {
  if (!root) return;
  const stack = [root];
  let step = 1;

  while (stack.length > 0) {
    const n = stack.pop();
    console.log(`步骤${step++}: 访问节点${n.val} → 立即输出${n.val}`);

    if (n.right) {
      stack.push(n.right);
      console.log(`  压入右子节点: ${n.right.val}`);
    }
    if (n.left) {
      stack.push(n.left);
      console.log(`  压入左子节点: ${n.left.val}`);
    }
    console.log(`  当前栈状态: [${stack.map(node => node.val).join(', ')}]`);
    console.log('');
  }
};

preOrder(binaryTree);

// 中序遍历：左 → 根 → 右  
console.log('=== 中序遍历执行过程 ===');
const inOrder = (root) => {
  if (!root) return;
  const stack = [];
  let p = root;
  let step = 1;

  while (stack.length || p) {
    // 内层while：一直往左走
    while (p) {
      console.log(`步骤${step++}: 访问节点${p.val} → 暂不输出，压栈等待`);
      stack.push(p);
      console.log(`  当前栈状态: [${stack.map(node => node.val).join(', ')}]`);
      p = p.left;
    }

    // 弹出并输出
    const n = stack.pop();
    console.log(`步骤${step++}: 弹出节点${n.val} → 现在输出${n.val}`);
    console.log(`  当前栈状态: [${stack.map(node => node.val).join(', ')}]`);
    p = n.right;
    if (p) {
      console.log(`  转向右子树: ${p.val}`);
    }
    console.log('');
  }
};

inOrder(binaryTree);

// 结果对比
console.log('=== 结果对比 ===');
console.log('前序遍历结果: 1 → 2 → 4 → 5 → 3');
console.log('中序遍历结果: 4 → 2 → 5 → 1 → 3'); 