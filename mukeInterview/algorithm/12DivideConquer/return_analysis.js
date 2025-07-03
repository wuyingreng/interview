// 递归返回值的作用分析

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 创建测试树
const createTree = () => {
  const root = new TreeNode(4);
  root.left = new TreeNode(2);
  root.right = new TreeNode(7);
  root.left.left = new TreeNode(1);
  root.left.right = new TreeNode(3);
  root.right.left = new TreeNode(6);
  root.right.right = new TreeNode(9);
  return root;
};

console.log('=== 递归返回值分析 ===\n');

// 方法1：有返回值的版本（您的代码）
var invertTree1 = function (root) {
  if (!root) { return null; }

  // 交换左右子树
  [root.left, root.right] = [root.right, root.left];

  // 递归处理子树
  invertTree1(root.left);   // 这里的返回值确实没有被使用
  invertTree1(root.right);  // 这里的返回值确实没有被使用

  console.log(`处理节点 ${root.val}, 左子树: ${root.left?.val || 'null'}, 右子树: ${root.right?.val || 'null'}`);

  return root;  // 只有最外层调用会用到这个返回值
};

// 方法2：无返回值的版本（更直观）
var invertTree2 = function (root) {
  if (!root) { return; }  // 或者直接不写return

  // 交换左右子树
  [root.left, root.right] = [root.right, root.left];

  // 递归处理子树
  invertTree2(root.left);
  invertTree2(root.right);

  // 不需要返回值，因为我们直接修改了原树
};

// 方法3：函数式风格（返回值有实际意义）
var invertTree3 = function (root) {
  if (!root) { return null; }

  // 创建新节点，而不是修改原节点
  const newRoot = new TreeNode(root.val);

  // 递归处理并赋值（这里返回值是有意义的）
  newRoot.left = invertTree3(root.right);   // 返回值被使用了！
  newRoot.right = invertTree3(root.left);   // 返回值被使用了！

  return newRoot;
};

// 辅助函数：打印树结构
function printTree(node, prefix = '', isLast = true) {
  if (!node) return '';

  let result = prefix + (isLast ? '└── ' : '├── ') + node.val + '\n';

  const children = [node.left, node.right].filter(Boolean);
  children.forEach((child, index) => {
    const isLastChild = index === children.length - 1;
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    result += printTree(child, newPrefix, isLastChild);
  });

  return result;
}

// 测试方法1：原地修改，有返回值
console.log('=== 方法1：原地修改 + 返回值 ===');
const tree1 = createTree();
console.log('原始树：');
console.log(printTree(tree1));

console.log('递归过程：');
const result1 = invertTree1(tree1);  // 只有这里用到了返回值
console.log('返回的树和原树是同一个对象:', result1 === tree1);
console.log('翻转后：');
console.log(printTree(result1));

// 测试方法2：原地修改，无返回值
console.log('\n=== 方法2：原地修改 + 无返回值 ===');
const tree2 = createTree();
console.log('原始树：');
console.log(printTree(tree2));

invertTree2(tree2);  // 没有返回值，直接修改原树
console.log('翻转后：');
console.log(printTree(tree2));

// 测试方法3：函数式风格，返回值有意义
console.log('\n=== 方法3：函数式风格 ===');
const tree3 = createTree();
console.log('原始树：');
console.log(printTree(tree3));

const newTree = invertTree3(tree3);  // 返回新树
console.log('原树不变:', printTree(tree3));
console.log('新树翻转:', printTree(newTree));
console.log('是不同的对象:', newTree !== tree3);

// 递归调用栈分析
console.log('\n=== 递归调用栈分析 ===');
var invertTreeWithTrace = function (root, depth = 0) {
  const indent = '  '.repeat(depth);
  console.log(`${indent}进入: 节点 ${root?.val || 'null'}`);

  if (!root) {
    console.log(`${indent}返回: null`);
    return null;
  }

  // 交换前记录
  const oldLeft = root.left?.val || 'null';
  const oldRight = root.right?.val || 'null';

  // 交换左右子树
  [root.left, root.right] = [root.right, root.left];

  console.log(`${indent}交换: ${oldLeft} <-> ${oldRight}`);

  // 递归处理子树
  console.log(`${indent}递归左子树:`);
  const leftResult = invertTreeWithTrace(root.left, depth + 1);  // 返回值未使用

  console.log(`${indent}递归右子树:`);
  const rightResult = invertTreeWithTrace(root.right, depth + 1); // 返回值未使用

  console.log(`${indent}返回: 节点 ${root.val}`);
  return root;  // 只有最外层会真正使用这个返回值
};

console.log('递归调用追踪：');
const tree4 = createTree();
invertTreeWithTrace(tree4);

// 总结
console.log('\n=== 总结 ===');
console.log('✅ 您的理解完全正确：');
console.log('1. 在原地修改的递归中，return root 只在最外层调用有意义');
console.log('2. 递归过程中的返回值确实没有被使用');
console.log('3. 可以改为 void 函数，不返回任何值');
console.log('4. 返回值主要是为了符合 LeetCode 的函数签名要求');
console.log('');
console.log('🤔 什么时候返回值有意义？');
console.log('- 函数式编程风格（创建新对象）');
console.log('- 需要链式调用');
console.log('- 函数签名要求（如 LeetCode）'); 