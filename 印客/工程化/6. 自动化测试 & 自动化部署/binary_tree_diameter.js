// 543. 二叉树的直径 - 深度优先遍历递归解法

/**
 * 二叉树节点定义
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * 主函数：计算二叉树的直径
 * @param {TreeNode} root - 二叉树根节点
 * @return {number} - 直径长度
 */
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;  // 全局最大直径

  /**
   * 深度优先遍历递归函数
   * @param {TreeNode} node - 当前节点
   * @return {number} - 返回以当前节点为根的子树深度
   */
  function dfs(node) {
    // 边界条件：空节点深度为0
    if (!node) {
      return 0;
    }

    console.log(`访问节点: ${node.val}`);

    // 递归计算左右子树深度
    let leftDepth = dfs(node.left);
    let rightDepth = dfs(node.right);

    console.log(`节点 ${node.val}: 左子树深度=${leftDepth}, 右子树深度=${rightDepth}`);

    // 更新最大直径：左子树深度 + 右子树深度
    // 注意：这里不加1，因为直径是边的数量，不是节点数量
    let currentDiameter = leftDepth + rightDepth;
    maxDiameter = Math.max(maxDiameter, currentDiameter);

    console.log(`节点 ${node.val}: 当前直径=${currentDiameter}, 全局最大直径=${maxDiameter}`);

    // 返回当前节点的深度：左右子树最大深度 + 1
    let currentDepth = Math.max(leftDepth, rightDepth) + 1;
    console.log(`节点 ${node.val}: 返回深度=${currentDepth}`);

    return currentDepth;
  }

  dfs(root);
  return maxDiameter;
}

/**
 * 创建示例二叉树
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 */
function createExampleTree() {
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  return root;
}

/**
 * 创建更复杂的示例二叉树
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 *  /     \
 * 6       7
 */
function createComplexExampleTree() {
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  root.left.left.left = new TreeNode(6);
  root.left.right.right = new TreeNode(7);
  return root;
}

// 测试示例
console.log('=== 示例1：简单二叉树 ===');
const tree1 = createExampleTree();
console.log('二叉树结构:');
console.log('       1');
console.log('      / \\');
console.log('     2   3');
console.log('    / \\');
console.log('   4   5');
console.log('\n执行过程:');
const diameter1 = diameterOfBinaryTree(tree1);
console.log(`\n最终结果: 直径 = ${diameter1}`);

console.log('\n=== 示例2：复杂二叉树 ===');
const tree2 = createComplexExampleTree();
console.log('二叉树结构:');
console.log('       1');
console.log('      / \\');
console.log('     2   3');
console.log('    / \\');
console.log('   4   5');
console.log('  /     \\');
console.log(' 6       7');
console.log('\n执行过程:');
const diameter2 = diameterOfBinaryTree(tree2);
console.log(`\n最终结果: 直径 = ${diameter2}`);

// 可视化解释
console.log('\n=== 算法可视化解释 ===');
console.log(`
算法执行过程：

1. 递归遍历每个节点
2. 在每个节点计算：
   - 左子树深度
   - 右子树深度
   - 当前节点贡献的直径 = 左深度 + 右深度
   - 更新全局最大直径
   - 返回当前节点深度 = max(左深度, 右深度) + 1

关键理解：
- 直径是边的数量，不是节点数量
- 每个节点都可能成为直径路径的"转折点"
- 全局变量记录遍历过程中的最大直径

时间复杂度: O(n) - 每个节点访问一次
空间复杂度: O(h) - h是树的高度，递归调用栈深度
`); 