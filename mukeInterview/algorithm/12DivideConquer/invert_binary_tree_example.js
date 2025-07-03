/**
 * 翻转二叉树 - 递归解法
 * 时间复杂度：O(N) - 访问每个节点一次
 * 空间复杂度：O(N) - 递归调用栈深度
 */

// 二叉树节点定义
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 递归解法
var invertTree = function (root) {
  if (root === null) return null;

  // 交换左右子树
  [root.left, root.right] = [root.right, root.left];

  // 递归翻转左右子树
  invertTree(root.left);
  invertTree(root.right);

  return root;
};

// 迭代解法（使用队列）
var invertTreeIterative = function (root) {
  if (root === null) return null;

  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();

    // 交换左右子树
    [current.left, current.right] = [current.right, current.left];

    // 将非空子节点加入队列
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return root;
};

// 测试用例
const root = new TreeNode(4,
  new TreeNode(2,
    new TreeNode(1),
    new TreeNode(3)
  ),
  new TreeNode(7,
    new TreeNode(6),
    new TreeNode(9)
  )
);

console.log("原始二叉树:");
console.log(root);

console.log("\n翻转后的二叉树:");
const inverted = invertTree(root);
console.log(inverted); 