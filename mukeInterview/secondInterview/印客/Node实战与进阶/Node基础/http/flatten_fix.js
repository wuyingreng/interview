// 定义TreeNode类
class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }
}

// 你的原始代码（有问题）
var flatten_wrong = function (root) {
  const res = [];
  const preOrder = function (root) {
    if (!root) return
    res.push(root.val);
    preOrder(root.left);
    preOrder(root.right);
  }
  preOrder(root);
  let tree = new TreeNode(res[0])
  res.forEach((val, index) => {
    if (index === res.length - 1) {
      tree.right = null;
      tree.left = null;
      return tree  // 这个return不会返回整个函数
    }
    const nextTree = new TreeNode(res[index + 1]);
    tree.right = nextTree;
    tree.left = null;
    tree = tree.right;
  })
  // 问题：没有修改root，只是创建了新的tree
};

// 修复后的代码
var flatten = function (root) {
  if (!root) return;

  const res = [];
  const preOrder = function (node) {
    if (!node) return;
    res.push(node.val);
    preOrder(node.left);
    preOrder(node.right);
  }

  // 收集前序遍历结果
  preOrder(root);

  // 原地修改原树
  let current = root;
  for (let i = 1; i < res.length; i++) {
    current.left = null;  // 清空左指针
    current.right = new TreeNode(res[i]);  // 设置右指针
    current = current.right;  // 移动到下一个节点
  }

  // 处理最后一个节点
  if (current) {
    current.left = null;
    current.right = null;
  }
};

// 更简洁的修复版本（推荐）
var flatten_simple = function (root) {
  if (!root) return;

  const res = [];
  const preOrder = function (node) {
    if (!node) return;
    res.push(node.val);
    preOrder(node.left);
    preOrder(node.right);
  }

  preOrder(root);

  // 原地修改原树
  let current = root;
  for (let i = 1; i < res.length; i++) {
    current.left = null;
    current.right = new TreeNode(res[i]);
    current = current.right;
  }

  // 确保最后一个节点的左右指针都为null
  if (current) {
    current.left = null;
    current.right = null;
  }
};

// 测试代码
function createTestTree() {
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(5);
  root.left.left = new TreeNode(3);
  root.left.right = new TreeNode(4);
  root.right.right = new TreeNode(6);
  return root;
}

function printLinkedList(root) {
  const result = [];
  let current = root;
  while (current) {
    result.push(current.val);
    current = current.right;
  }
  return result;
}

// 测试
console.log('=== 测试修复后的代码 ===');

const testTree = createTestTree();
console.log('原始树的前序遍历结果:', [1, 2, 3, 4, 5, 6]);

flatten(testTree);
console.log('展开后的链表:', printLinkedList(testTree));

// 验证结果
console.log('期望输出: [1, 2, 3, 4, 5, 6]');
console.log('实际输出:', printLinkedList(testTree));
console.log('结果正确:', JSON.stringify(printLinkedList(testTree)) === JSON.stringify([1, 2, 3, 4, 5, 6])); 