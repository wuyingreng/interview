// BST 验证中边界设置的原理

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// BST 验证函数
function isValidBST(root) {
  return validate(root, -Infinity, Infinity);
}

function validate(node, min, max) {
  if (!node) return true;

  // 检查当前节点的值是否在合理范围内
  if (node.val <= min || node.val >= max) {
    return false;
  }

  // 关键：设置子树的边界
  return validate(node.left, min, node.val) &&
    validate(node.right, node.val, max);
}

// 创建测试树
function createTestTree() {
  //       8
  //      / \
  //     3   10
  //    / \    \
  //   1   6    14
  //      / \   /
  //     4   7 13

  const root = new TreeNode(8);
  root.left = new TreeNode(3);
  root.right = new TreeNode(10);
  root.left.left = new TreeNode(1);
  root.left.right = new TreeNode(6);
  root.right.right = new TreeNode(14);
  root.left.right.left = new TreeNode(4);
  root.left.right.right = new TreeNode(7);
  root.right.right.left = new TreeNode(13);

  return root;
}

// 详细演示边界设置过程
function demonstrateBoundarySetting() {
  const root = createTestTree();

  console.log('=== BST 边界设置演示 ===');
  console.log('       8');
  console.log('      / \\');
  console.log('     3   10');
  console.log('    / \\    \\');
  console.log('   1   6    14');
  console.log('      / \\   /');
  console.log('     4   7 13');

  console.log('\n=== 边界设置过程 ===');

  // 模拟验证过程
  console.log('1. 根节点 8:');
  console.log('   - 当前值: 8');
  console.log('   - 边界: (-∞, +∞)');
  console.log('   - 检查: 8 是否在 (-∞, +∞) 范围内 ✓');
  console.log('   - 左子树边界: (-∞, 8)');
  console.log('   - 右子树边界: (8, +∞)');

  console.log('\n2. 节点 3 (左子树):');
  console.log('   - 当前值: 3');
  console.log('   - 边界: (-∞, 8)');
  console.log('   - 检查: 3 是否在 (-∞, 8) 范围内 ✓');
  console.log('   - 左子树边界: (-∞, 3)');
  console.log('   - 右子树边界: (3, 8)');

  console.log('\n3. 节点 10 (右子树):');
  console.log('   - 当前值: 10');
  console.log('   - 边界: (8, +∞)');
  console.log('   - 检查: 10 是否在 (8, +∞) 范围内 ✓');
  console.log('   - 左子树边界: (8, 10)');
  console.log('   - 右子树边界: (10, +∞)');

  console.log('\n4. 节点 1 (3的左子树):');
  console.log('   - 当前值: 1');
  console.log('   - 边界: (-∞, 3)');
  console.log('   - 检查: 1 是否在 (-∞, 3) 范围内 ✓');

  console.log('\n5. 节点 6 (3的右子树):');
  console.log('   - 当前值: 6');
  console.log('   - 边界: (3, 8)');
  console.log('   - 检查: 6 是否在 (3, 8) 范围内 ✓');
  console.log('   - 左子树边界: (3, 6)');
  console.log('   - 右子树边界: (6, 8)');

  console.log('\n6. 节点 4 (6的左子树):');
  console.log('   - 当前值: 4');
  console.log('   - 边界: (3, 6)');
  console.log('   - 检查: 4 是否在 (3, 6) 范围内 ✓');

  console.log('\n7. 节点 7 (6的右子树):');
  console.log('   - 当前值: 7');
  console.log('   - 边界: (6, 8)');
  console.log('   - 检查: 7 是否在 (6, 8) 范围内 ✓');
}

// 为什么这样设置边界的原理
function explainBoundaryLogic() {
  console.log('\n=== 边界设置原理 ===');

  console.log('BST 性质:');
  console.log('1. 左子树的所有节点值 < 当前节点值');
  console.log('2. 右子树的所有节点值 > 当前节点值');

  console.log('\n边界设置逻辑:');
  console.log('对于节点值为 val 的节点:');
  console.log('- 左子树: 所有节点值 < val');
  console.log('  因此左子树边界: (min, val)');
  console.log('  继承父节点的 min，使用当前节点值作为 max');

  console.log('- 右子树: 所有节点值 > val');
  console.log('  因此右子树边界: (val, max)');
  console.log('  继承父节点的 max，使用当前节点值作为 min');

  console.log('\n具体例子:');
  console.log('节点 8:');
  console.log('- 左子树边界: (-∞, 8) 因为左子树所有值 < 8');
  console.log('- 右子树边界: (8, +∞) 因为右子树所有值 > 8');

  console.log('\n节点 3 (8的左子树):');
  console.log('- 左子树边界: (-∞, 3) 因为左子树所有值 < 3');
  console.log('- 右子树边界: (3, 8) 因为右子树所有值 > 3 且 < 8');
}

// 错误示例：如果边界设置错误会发生什么
function demonstrateWrongBoundaries() {
  console.log('\n=== 错误边界设置示例 ===');

  console.log('假设我们错误地设置边界:');
  console.log('- 左子树边界: (node.val, max) ❌');
  console.log('- 右子树边界: (min, node.val) ❌');

  console.log('\n这样会导致的问题:');
  console.log('1. 左子树被要求所有值 > 当前节点值');
  console.log('2. 右子树被要求所有值 < 当前节点值');
  console.log('3. 这与 BST 的基本性质完全相反！');

  console.log('\n正确的方式:');
  console.log('- 左子树边界: (min, node.val) ✓');
  console.log('- 右子树边界: (node.val, max) ✓');
  console.log('这样确保:');
  console.log('1. 左子树所有值 < 当前节点值');
  console.log('2. 右子树所有值 > 当前节点值');
}

// 可视化边界传递
function visualizeBoundaryPassing() {
  console.log('\n=== 边界传递可视化 ===');

  const tree = createTestTree();

  function visualize(node, min, max, depth = 0) {
    if (!node) return;

    const indent = '  '.repeat(depth);
    console.log(`${indent}节点 ${node.val}: 边界 (${min}, ${max})`);

    if (node.left) {
      console.log(`${indent}├─ 左子树边界: (${min}, ${node.val})`);
      visualize(node.left, min, node.val, depth + 1);
    }

    if (node.right) {
      console.log(`${indent}└─ 右子树边界: (${node.val}, ${max})`);
      visualize(node.right, node.val, max, depth + 1);
    }
  }

  visualize(tree, -Infinity, Infinity);
}

// 运行演示
demonstrateBoundarySetting();
explainBoundaryLogic();
demonstrateWrongBoundaries();
visualizeBoundaryPassing(); 