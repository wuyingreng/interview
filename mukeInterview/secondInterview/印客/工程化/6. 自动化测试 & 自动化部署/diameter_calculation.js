// 直径计算的正确理解

console.log('=== 直径计算的正确理解 ===');

console.log(`
示例二叉树：
       1
      / \\
     2   3
    / \\
   4   5

分析节点1的直径路径：4 -> 2 -> 1 -> 3

路径上的节点：4, 2, 1, 3 (共4个节点)
路径上的边：4-2, 2-1, 1-3 (共3条边)

验证公式：直径 = 节点数 - 1 = 4 - 1 = 3 ✓

现在用代码逻辑验证：

节点1的计算：
- leftSonNodes = dfs(node.left) = dfs(节点2) = 2
- rightSonNodes = dfs(node.right) = dfs(节点3) = 1
- currentDiameter = leftSonNodes + rightSonNodes = 2 + 1 = 3

为什么 leftSonNodes + rightSonNodes = 直径？

左子树路径：4 -> 2 (2个节点，1条边)
右子树路径：1 -> 3 (2个节点，1条边)
总路径：4 -> 2 -> 1 -> 3 (4个节点，3条边)

关键理解：
- leftSonNodes 包含了从当前节点到最左叶子的所有节点
- rightSonNodes 包含了从当前节点到最右叶子的所有节点
- 但是！当前节点被计算了两次（在左路径和右路径中都被包含）
- 所以实际路径节点数 = leftSonNodes + rightSonNodes - 1
- 直径（边数）= 节点数 - 1 = (leftSonNodes + rightSonNodes - 1) - 1 = leftSonNodes + rightSonNodes - 2

等等！这里有个问题...
`);

console.log('\n=== 重新分析 ===');

console.log(`
让我重新分析代码逻辑：

const leftSonNodes = dfs(node.left);    // 左子树深度
const rightSonNodes = dfs(node.right);  // 右子树深度
const currentDiameter = leftSonNodes + rightSonNodes;

这里的 leftSonNodes 和 rightSonNodes 是什么？

1. leftSonNodes = 从节点2到最远叶子的节点数 = 2 (路径：2->4 或 2->5)
2. rightSonNodes = 从节点3到最远叶子的节点数 = 1 (路径：3)

但是！直径路径是：4 -> 2 -> 1 -> 3

路径节点分析：
- 4 -> 2：leftSonNodes 个节点
- 2 -> 1：1个节点（当前节点）
- 1 -> 3：rightSonNodes 个节点

总节点数 = leftSonNodes + 1 + rightSonNodes
直径（边数）= 总节点数 - 1 = (leftSonNodes + 1 + rightSonNodes) - 1 = leftSonNodes + rightSonNodes

所以代码是正确的！
`);

console.log('\n=== 最终理解 ===');

console.log(`
正确的理解：

1. 直径路径：最左叶子 -> 当前节点 -> 最右叶子

2. 路径节点组成：
   - 左子树路径：leftSonNodes 个节点
   - 当前节点：1 个节点
   - 右子树路径：rightSonNodes 个节点
   - 总节点数：leftSonNodes + 1 + rightSonNodes

3. 直径计算：
   - 直径（边数）= 总节点数 - 1
   - 直径 = (leftSonNodes + 1 + rightSonNodes) - 1
   - 直径 = leftSonNodes + rightSonNodes

4. 为什么代码中直接相加？
   - 因为 leftSonNodes 和 rightSonNodes 已经包含了从当前节点到叶子的节点数
   - 当前节点在左路径和右路径中都被计算了
   - 所以总节点数 = leftSonNodes + rightSonNodes
   - 直径 = 总节点数 - 1 = leftSonNodes + rightSonNodes

您的理解完全正确！
`); 