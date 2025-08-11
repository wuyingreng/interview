/**
 * LeetCode 105. 从前序与中序遍历序列构造二叉树
 * 
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历，
 * inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 */

// 定义二叉树节点
class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

/**
 * 递归构造二叉树
 * @param {number[]} preorder - 前序遍历数组
 * @param {number[]} inorder - 中序遍历数组
 * @return {TreeNode} - 构造的二叉树根节点
 */
function buildTree(preorder, inorder) {
  // 递归的终止条件：数组为空??为什么一个为空，就不递归下去了，不应该两个都为空才递归下去吗
  if (preorder.length === 0 || inorder.length === 0) {
    return null;
  }

  // 1. 前序遍历的第一个元素就是根节点
  const rootVal = preorder[0];
  const root = new TreeNode(rootVal);

  // 2. 在中序遍历中找到根节点的位置
  const rootIndex = inorder.indexOf(rootVal);

  // 3. 根据根节点位置，划分左右子树
  // 中序遍历中，根节点左边的是左子树，右边的是右子树
  const leftInorder = inorder.slice(0, rootIndex);
  const rightInorder = inorder.slice(rootIndex + 1);

  // 4. 前序遍历中，除了第一个根节点，前面leftInorder.length个是左子树，后面的是右子树
  const leftPreorder = preorder.slice(1, 1 + leftInorder.length);
  const rightPreorder = preorder.slice(1 + leftInorder.length);

  // 5. 递归构造左右子树
  root.left = buildTree(leftPreorder, leftInorder);
  root.right = buildTree(rightPreorder, rightInorder);

  return root;
}



// 辅助函数：前序遍历打印树（用于验证结果）
function preorderTraversal(root) {
  if (!root) return [];
  const result = [];
  result.push(root.val);
  result.push(...preorderTraversal(root.left));
  result.push(...preorderTraversal(root.right));
  return result;
}

// 辅助函数：中序遍历打印树（用于验证结果）
function inorderTraversal(root) {
  if (!root) return [];
  const result = [];
  result.push(...inorderTraversal(root.left));
  result.push(root.val);
  result.push(...inorderTraversal(root.right));
  return result;
}

// 测试案例
console.log('=== LeetCode 105: 从前序与中序遍历序列构造二叉树 ===\n');

// 测试案例1
const preorder1 = [3, 9, 20, 15, 7];
const inorder1 = [9, 3, 15, 20, 7];
console.log('测试案例1:');
console.log('前序遍历:', preorder1);
console.log('中序遍历:', inorder1);

const tree1 = buildTree(preorder1, inorder1);
console.log('构造结果验证:');
console.log('前序遍历:', preorderTraversal(tree1));
console.log('中序遍历:', inorderTraversal(tree1));
console.log('');

// 测试案例2
const preorder2 = [-1];
const inorder2 = [-1];
console.log('测试案例2:');
console.log('前序遍历:', preorder2);
console.log('中序遍历:', inorder2);

const tree2 = buildTree(preorder2, inorder2);
console.log('构造结果验证:');
console.log('前序遍历:', preorderTraversal(tree2));
console.log('中序遍历:', inorderTraversal(tree2));
console.log('');

// 测试优化版本
console.log('=== 优化版本测试 ===');
const tree1Optimized = buildTreeOptimized(preorder1, inorder1);
console.log('优化版本 - 前序遍历:', preorderTraversal(tree1Optimized));
console.log('优化版本 - 中序遍历:', inorderTraversal(tree1Optimized));

/**
 * 算法复杂度分析：
 * 
 * 基础版本：
 * - 时间复杂度：O(n²) - 每次递归都要在中序数组中查找根节点位置
 * - 空间复杂度：O(n) - 递归栈深度 + 创建的新数组
 * 
 * 优化版本：
 * - 时间复杂度：O(n) - 使用Map预处理，查找时间为O(1)
 * - 空间复杂度：O(n) - Map存储 + 递归栈深度
 * 
 * 核心思路：
 * 1. 前序遍历的第一个节点总是根节点
 * 2. 在中序遍历中找到根节点，左边是左子树，右边是右子树
 * 3. 递归处理左右子树
 */