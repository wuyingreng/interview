/**
 * 数组切片公式推导 - 通过实例和表格推导精确公式
 * 以 LeetCode 105 为例：从前序与中序遍历序列构造二叉树
 */

console.log('=== 数组切片公式推导：避免边界错误的系统方法 ===\n');

// 测试数据
const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];

console.log('原始数据:');
console.log('preorder =', preorder);
console.log('inorder  =', inorder);
console.log('');

/**
 * 第一步：建立索引表格，明确每个元素的位置
 */
console.log('步骤1: 建立索引表格');
console.log('┌─────────┬─────┬─────┬─────┬─────┬─────┐');
console.log('│  索引   │  0  │  1  │  2  │  3  │  4  │');
console.log('├─────────┼─────┼─────┼─────┼─────┼─────┤');
console.log('│preorder │  3  │  9  │ 20  │ 15  │  7  │');
console.log('│ inorder │  9  │  3  │ 15  │ 20  │  7  │');
console.log('└─────────┴─────┴─────┴─────┴─────┴─────┘');
console.log('');

/**
 * 第二步：确定根节点和分割点
 */
const rootVal = preorder[0]; // 3
const rootIndex = inorder.indexOf(rootVal); // 1

console.log('步骤2: 确定分割点');
console.log(`根节点值: ${rootVal}`);
console.log(`根节点在inorder中的索引: ${rootIndex}`);
console.log('');

/**
 * 第三步：通过表格分析inorder的左右划分
 */
console.log('步骤3: inorder数组划分分析');
console.log('┌─────────────┬─────┬─────┬─────┬─────┬─────┐');
console.log('│    索引     │  0  │  1  │  2  │  3  │  4  │');
console.log('├─────────────┼─────┼─────┼─────┼─────┼─────┤');
console.log('│   inorder   │  9  │  3  │ 15  │ 20  │  7  │');
console.log('├─────────────┼─────┼─────┼─────┼─────┼─────┤');
console.log('│    区域     │左子树│ 根  │    右子树       │');
console.log('└─────────────┴─────┴─────┴─────┴─────┴─────┘');

// 计算左右子树的范围
const leftInorderStart = 0;
const leftInorderEnd = rootIndex - 1;  // rootIndex - 1
const rightInorderStart = rootIndex + 1;
const rightInorderEnd = inorder.length - 1;

console.log('');
console.log('inorder划分结果:');
console.log(`leftInorder范围:  [${leftInorderStart}, ${leftInorderEnd}]`);
console.log(`rightInorder范围: [${rightInorderStart}, ${rightInorderEnd}]`);

const leftInorder = inorder.slice(leftInorderStart, leftInorderEnd + 1);
const rightInorder = inorder.slice(rightInorderStart, rightInorderEnd + 1);

console.log(`leftInorder = [${leftInorder.join(', ')}], 长度 = ${leftInorder.length}`);
console.log(`rightInorder = [${rightInorder.join(', ')}], 长度 = ${rightInorder.length}`);
console.log('');

/**
 * 第四步：关键！推导preorder划分公式
 */
console.log('步骤4: 推导preorder划分公式');
console.log('┌─────────────┬─────┬─────┬─────┬─────┬─────┐');
console.log('│    索引     │  0  │  1  │  2  │  3  │  4  │');
console.log('├─────────────┼─────┼─────┼─────┼─────┼─────┤');
console.log('│  preorder   │  3  │  9  │ 20  │ 15  │  7  │');
console.log('├─────────────┼─────┼─────┼─────┼─────┼─────┤');
console.log('│    区域     │ 根  │左子树│    右子树       │');
console.log('└─────────────┴─────┴─────┴─────┴─────┴─────┘');

console.log('');
console.log('🔑 关键推导过程:');
console.log('已知: leftInorder.length =', leftInorder.length);
console.log('');

console.log('preorder结构分析:');
console.log('- 索引0: 根节点');
console.log('- 索引1到?: 左子树 (长度 = leftInorder.length)');
console.log('- 索引?到末尾: 右子树');
console.log('');

/**
 * 第五步：通过表格验证公式
 */
console.log('步骤5: 公式推导表格');
console.log('┌─────────────────┬─────────────┬─────────────────┐');
console.log('│     区域        │   起始索引  │    结束索引     │');
console.log('├─────────────────┼─────────────┼─────────────────┤');
console.log('│ leftPreorder    │      1      │ 1 + leftLen - 1 │');
console.log('│ rightPreorder   │ 1 + leftLen │   length - 1    │');
console.log('└─────────────────┴─────────────┴─────────────────┘');
console.log('');

const leftLen = leftInorder.length;
console.log(`其中 leftLen = ${leftLen}`);
console.log('');

// 应用公式
const leftPreorderStart = 1;
const leftPreorderEnd = 1 + leftLen - 1;
const rightPreorderStart = 1 + leftLen;
const rightPreorderEnd = preorder.length - 1;

console.log('公式应用结果:');
console.log(`leftPreorder起始:  1`);
console.log(`leftPreorder结束:  1 + ${leftLen} - 1 = ${leftPreorderEnd}`);
console.log(`rightPreorder起始: 1 + ${leftLen} = ${rightPreorderStart}`);
console.log(`rightPreorder结束: ${preorder.length} - 1 = ${rightPreorderEnd}`);
console.log('');

/**
 * 第六步：slice()语法转换
 */
console.log('步骤6: 转换为slice()语法');
console.log('⚠️  注意: slice(start, end) 中 end 是不包含的!');
console.log('');

console.log('数组切片对应关系:');
console.log('┌─────────────────┬─────────────┬─────────────────┬──────────────────┐');
console.log('│     目标        │   起始索引  │  结束索引(含)   │   slice()语法    │');
console.log('├─────────────────┼─────────────┼─────────────────┼──────────────────┤');
console.log(`│ leftPreorder    │      1      │        ${leftPreorderEnd}        │ slice(1, ${leftPreorderEnd + 1})    │`);
console.log(`│ rightPreorder   │      ${rightPreorderStart}      │        ${rightPreorderEnd}        │ slice(${rightPreorderStart}, ${rightPreorderEnd + 1})   │`);
console.log('└─────────────────┴─────────────┴─────────────────┴──────────────────┘');
console.log('');

// 实际执行切片
const leftPreorder = preorder.slice(1, 1 + leftLen);
const rightPreorder = preorder.slice(1 + leftLen);

console.log('切片结果验证:');
console.log(`leftPreorder = preorder.slice(1, ${1 + leftLen}) = [${leftPreorder.join(', ')}]`);
console.log(`rightPreorder = preorder.slice(${1 + leftLen}) = [${rightPreorder.join(', ')}]`);
console.log('');

/**
 * 第七步：通用公式总结
 */
console.log('步骤7: 通用公式总结');
console.log('');
console.log('🎯 终极公式（适用于所有类似题目）:');
console.log('');
console.log('给定:');
console.log('- rootIndex: 根节点在inorder中的索引');
console.log('- leftLen = rootIndex - leftStart (左子树长度)');
console.log('');
console.log('则有:');
console.log('┌─────────────────┬─────────────────────────────┐');
console.log('│   左子树切片    │ preorder.slice(preStart + 1, │');
console.log('│                 │         preStart + 1 + leftLen) │');
console.log('├─────────────────┼─────────────────────────────┤');
console.log('│   右子树切片    │ preorder.slice(preStart + 1 + │');
console.log('│                 │         leftLen, preEnd + 1)    │');
console.log('└─────────────────┴─────────────────────────────┘');
console.log('');

/**
 * 第八步：防错检查清单
 */
console.log('步骤8: 面试防错检查清单');
console.log('');
console.log('✅ 检查清单:');
console.log('1. 确认数组长度计算正确');
console.log('2. 确认slice的end参数是不包含的');
console.log('3. 确认左子树长度 = rootIndex - leftStart');
console.log('4. 确认右子树起始 = preStart + 1 + leftLen');
console.log('5. 边界情况：空数组处理');
console.log('');

/**
 * 第九步：边界情况测试
 */
console.log('步骤9: 边界情况测试');
console.log('');

// 测试边界情况
function testBoundary() {
    console.log('边界测试 1: 只有根节点');
    const pre1 = [1];
    const in1 = [1];
    const root1 = pre1[0];
    const rootIdx1 = in1.indexOf(root1);
    const leftLen1 = rootIdx1;
    console.log(`leftLen = ${leftLen1}, leftPreorder = pre1.slice(1, ${1 + leftLen1}) = [${pre1.slice(1, 1 + leftLen1).join(', ')}]`);
    console.log('');

    console.log('边界测试 2: 只有左子树');
    const pre2 = [2, 1];
    const in2 = [1, 2];
    const root2 = pre2[0];
    const rootIdx2 = in2.indexOf(root2);
    const leftLen2 = rootIdx2;
    console.log(`leftLen = ${leftLen2}, leftPreorder = pre2.slice(1, ${1 + leftLen2}) = [${pre2.slice(1, 1 + leftLen2).join(', ')}]`);
    console.log('');

    console.log('边界测试 3: 只有右子树');
    const pre3 = [1, 2];
    const in3 = [1, 2];
    const root3 = pre3[0];
    const rootIdx3 = in3.indexOf(root3);
    const leftLen3 = rootIdx3;
    console.log(`leftLen = ${leftLen3}, rightPreorder = pre3.slice(${1 + leftLen3}) = [${pre3.slice(1 + leftLen3).join(', ')}]`);
}

testBoundary();

console.log('');
console.log('🎯 记忆口诀:');
console.log('1. 左子树长度 = 根在中序的位置');
console.log('2. 前序左子树 = slice(1, 1 + 左长度)');
console.log('3. 前序右子树 = slice(1 + 左长度)');
console.log('4. slice的第二个参数记得+1（因为不包含）');