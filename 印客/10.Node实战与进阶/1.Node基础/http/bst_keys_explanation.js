// 二叉搜索树中 keys 的含义

class TreeNode {
  constructor(key) {  // 这里的 key 就是节点的值
    this.key = key;    // 节点的键值/值
    this.left = null;
    this.right = null;
  }
}

// 创建二叉搜索树示例
function createBST() {
  //       8
  //      / \
  //     3   10
  //    / \    \
  //   1   6    14
  //      / \   /
  //     4   7 13

  const root = new TreeNode(8);   // key = 8
  root.left = new TreeNode(3);    // key = 3
  root.right = new TreeNode(10);  // key = 10
  root.left.left = new TreeNode(1);   // key = 1
  root.left.right = new TreeNode(6);  // key = 6
  root.right.right = new TreeNode(14); // key = 14
  root.left.right.left = new TreeNode(4);  // key = 4
  root.left.right.right = new TreeNode(7); // key = 7
  root.right.right.left = new TreeNode(13); // key = 13

  return root;
}

// 验证二叉搜索树性质
function isValidBST(root) {
  return validateBST(root, -Infinity, Infinity);
}

function validateBST(node, min, max) {
  if (!node) return true;

  // 检查当前节点的 key 是否在合理范围内
  if (node.key <= min || node.key >= max) {
    return false;
  }

  // 递归检查左右子树
  return validateBST(node.left, min, node.key) &&
    validateBST(node.right, node.key, max);
}

// 演示 BST 性质
function demonstrateBSTProperties() {
  const bst = createBST();

  console.log('=== 二叉搜索树示例 ===');
  console.log('       8');
  console.log('      / \\');
  console.log('     3   10');
  console.log('    / \\    \\');
  console.log('   1   6    14');
  console.log('      / \\   /');
  console.log('     4   7 13');

  console.log('\n=== 验证 BST 性质 ===');

  // 验证根节点 8
  console.log('根节点 key = 8:');
  console.log('- 左子树所有节点的 keys < 8: [3, 1, 6, 4, 7] ✓');
  console.log('- 右子树所有节点的 keys > 8: [10, 14, 13] ✓');

  // 验证节点 3
  console.log('\n节点 key = 3:');
  console.log('- 左子树所有节点的 keys < 3: [1] ✓');
  console.log('- 右子树所有节点的 keys > 3: [6, 4, 7] ✓');

  // 验证节点 10
  console.log('\n节点 key = 10:');
  console.log('- 左子树为空 ✓');
  console.log('- 右子树所有节点的 keys > 10: [14, 13] ✓');

  console.log('\n=== 验证结果 ===');
  console.log('是否为有效的二叉搜索树:', isValidBST(bst));
}

// 不同编程语言中的表示方式
console.log('=== 不同语言中的 keys 表示 ===');

// JavaScript 中常见的表示方式
const jsExamples = {
  // 方式1: key
  node1: { key: 5, left: null, right: null },

  // 方式2: val (LeetCode 常用)
  node2: { val: 5, left: null, right: null },

  // 方式3: data
  node3: { data: 5, left: null, right: null },

  // 方式4: value
  node4: { value: 5, left: null, right: null }
};

console.log('JavaScript 中的表示方式:');
console.log('- node.key:', jsExamples.node1.key);
console.log('- node.val:', jsExamples.node2.val);
console.log('- node.data:', jsExamples.node3.data);
console.log('- node.value:', jsExamples.node4.value);

// BST 性质的具体应用
function demonstrateBSTOperations() {
  const bst = createBST();

  console.log('\n=== BST 操作示例 ===');

  // 查找操作
  function search(root, key) {
    if (!root || root.key === key) {
      return root;
    }

    if (key < root.key) {
      return search(root.left, key);  // 在左子树中查找
    } else {
      return search(root.right, key); // 在右子树中查找
    }
  }

  // 测试查找
  console.log('查找 key = 6:', search(bst, 6) ? '找到' : '未找到');
  console.log('查找 key = 9:', search(bst, 9) ? '找到' : '未找到');

  // 插入操作
  function insert(root, key) {
    if (!root) {
      return new TreeNode(key);
    }

    if (key < root.key) {
      root.left = insert(root.left, key);  // 插入到左子树
    } else if (key > root.key) {
      root.right = insert(root.right, key); // 插入到右子树
    }

    return root;
  }

  console.log('\n插入 key = 9 后:');
  insert(bst, 9);
  console.log('查找 key = 9:', search(bst, 9) ? '找到' : '未找到');
}

// 运行演示
demonstrateBSTProperties();
demonstrateBSTOperations(); 