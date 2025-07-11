/**
 * 子集问题的多种解法及时间复杂度分析
 * 为什么时间复杂度是 O(2^n) ？
 */

// 🔧 修正版本1：修复你的原始代码
var subsets1 = function (nums) {
  const res = [];
  const backTracking = (path, l, start) => {
    if (path.length === l) {
      // ✅ 关键修复：推入数组副本
      res.push([...path]);  // 而不是 res.push(path)
      return;
    }
    // 只能1,2,1,3 不能2,1
    for (let i = start; i < nums.length; i++) {
      backTracking(path.concat(nums[i]), l, i + 1);
    }
  }

  for (let i = 0; i <= nums.length; i++) {
    // 枚举每种长度的子集
    backTracking([], i, 0);
  }
  return res;
};

// 🚀 标准版本2：经典回溯法
var subsets2 = function (nums) {
  const res = [];

  const backtrack = (path, start) => {
    // 每个状态都是一个有效的子集
    res.push([...path]);

    // 从start开始，避免重复
    for (let i = start; i < nums.length; i++) {
      // 选择当前元素
      path.push(nums[i]);

      // 递归处理剩余元素
      backtrack(path, i + 1);

      // 回溯：撤销选择
      path.pop();
    }
  };

  backtrack([], 0);
  return res;
};

// ⚡ 优化版本3：位运算法（最直观展示2^n）
var subsets3 = function (nums) {
  const res = [];
  const n = nums.length;

  // 遍历所有可能的位掩码：0 到 2^n - 1
  for (let mask = 0; mask < (1 << n); mask++) {
    const subset = [];

    // 检查每一位
    for (let i = 0; i < n; i++) {
      // 如果第i位为1，则包含nums[i]
      if (mask & (1 << i)) {
        subset.push(nums[i]);
      }
    }

    res.push(subset);
  }

  return res;
};

// 🔥 递归版本4：直观的选择/不选择
var subsets4 = function (nums) {
  const res = [];

  const dfs = (index, currentSubset) => {
    // 基础情况：处理完所有元素
    if (index === nums.length) {
      res.push([...currentSubset]);
      return;
    }

    // 选择1：不包含当前元素
    dfs(index + 1, currentSubset);

    // 选择2：包含当前元素
    currentSubset.push(nums[index]);
    dfs(index + 1, currentSubset);
    currentSubset.pop(); // 回溯
  };

  dfs(0, []);
  return res;
};

// 📊 时间复杂度分析函数
function analyzeTimeComplexity() {
  console.log('=== 时间复杂度分析：为什么是 O(2^n) ===\n');

  console.log('1. 数学角度：');
  console.log('   - 每个元素有2种选择：选择 或 不选择');
  console.log('   - n个元素 = 2^n 种组合');
  console.log('   - 组合数学：C(n,0) + C(n,1) + ... + C(n,n) = 2^n\n');

  console.log('2. 递归角度：');
  console.log('   - 递归树的深度：n');
  console.log('   - 每层有2个分支：选择/不选择');
  console.log('   - 叶子节点数：2^n\n');

  console.log('3. 位运算角度：');
  console.log('   - n位二进制数的所有可能：2^n');
  console.log('   - 每个二进制数对应一个子集');
  console.log('   - 例如：[1,2,3] → 000,001,010,011,100,101,110,111\n');
}

// 🧪 测试函数
function testAllVersions() {
  const testCases = [
    [1, 2, 3],
    [0],
    [1, 2],
    []
  ];

  console.log('=== 子集问题测试 ===\n');
  analyzeTimeComplexity();

  testCases.forEach((nums, index) => {
    console.log(`测试用例 ${index + 1}: [${nums.join(', ')}]`);
    console.log('期望子集数量:', Math.pow(2, nums.length));

    const result1 = subsets1(nums);
    const result2 = subsets2(nums);
    const result3 = subsets3(nums);
    const result4 = subsets4(nums);

    console.log('方法1结果:', result1);
    console.log('方法2结果:', result2);
    console.log('方法3结果:', result3);
    console.log('方法4结果:', result4);

    console.log('实际数量:', result1.length);
    console.log('验证通过:', result1.length === Math.pow(2, nums.length));
    console.log('---\n');
  });
}

// 🎯 性能测试
function performanceTest() {
  const nums = [1, 2, 3, 4, 5];
  console.log('=== 性能测试 ===');
  console.log('测试数组:', nums);
  console.log('预期子集数量:', Math.pow(2, nums.length));

  console.time('方法1-枚举长度');
  subsets1(nums);
  console.timeEnd('方法1-枚举长度');

  console.time('方法2-标准回溯');
  subsets2(nums);
  console.timeEnd('方法2-标准回溯');

  console.time('方法3-位运算');
  subsets3(nums);
  console.timeEnd('方法3-位运算');

  console.time('方法4-递归选择');
  subsets4(nums);
  console.timeEnd('方法4-递归选择');
}

// 🎨 可视化递归过程
function visualizeRecursion() {
  console.log('=== 递归过程可视化 ===');
  console.log('以 [1,2] 为例：');
  console.log('');
  console.log('       开始');
  console.log('      /     \\');
  console.log('   不选1    选1');
  console.log('    /\\      /\\');
  console.log(' 不选2 选2 不选2 选2');
  console.log('  []  [2]  [1]  [1,2]');
  console.log('');
  console.log('总共4个叶子节点 = 2^2');
}

// 执行测试
if (typeof window === 'undefined') {
  testAllVersions();
  performanceTest();
  visualizeRecursion();
}

module.exports = {
  subsets1,
  subsets2,
  subsets3,
  subsets4,
  analyzeTimeComplexity
}; 