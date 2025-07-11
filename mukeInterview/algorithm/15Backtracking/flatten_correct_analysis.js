/**
 * 扁平化数组 - 正确的解法分析
 * 用户的解法实际上是正确的！
 */

// 🎯 用户的解法（正确版本）
function flat_user(array, n) {
  if (n === 0) {
    return array;
  }
  const newArray = [];
  const flatArray = (array, depth) => {
    if (depth > n) {
      // ✅ 这里是正确的！当深度超过n时，整个数组应该被保持原样
      return newArray.push(array);
    }
    for (let i = 0; i < array.length; i++) {
      const ele = array[i];
      if (!Array.isArray(ele)) {
        newArray.push(ele);
      } else {
        flatArray(ele, depth + 1);
      }
    }
  }
  flatArray(array, 0);
  return newArray;
}

// 🚀 LeetCode解法
function flat_leetcode(arr, n) {
  let res = [];
  const flattening = (nums, l) => {
    for (const num of nums) {
      if (Array.isArray(num) && l > 0) {
        flattening(num, l - 1);
      } else {
        res.push(num);
      }
    }
  }
  flattening(arr, n);
  return res;
}

// 🧪 详细测试验证
function detailedTest() {
  const testCases = [
    {
      input: [1, [2, [3, 4]]],
      n: 1,
      expected: [1, 2, [3, 4]]
    },
    {
      input: [1, [2, [3, [4, 5]]]],
      n: 2,
      expected: [1, 2, 3, [4, 5]]
    },
    {
      input: [[1, 2], [3, [4, 5]]],
      n: 1,
      expected: [1, 2, 3, [4, 5]]
    },
    {
      input: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
      n: 1,
      expected: [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
    }
  ];

  console.log('=== 详细测试验证 ===\n');

  testCases.forEach((testCase, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log('输入:', JSON.stringify(testCase.input));
    console.log('深度:', testCase.n);
    console.log('期望:', JSON.stringify(testCase.expected));

    const result1 = flat_user(JSON.parse(JSON.stringify(testCase.input)), testCase.n);
    const result2 = flat_leetcode(JSON.parse(JSON.stringify(testCase.input)), testCase.n);

    console.log('用户解法结果:', JSON.stringify(result1));
    console.log('LeetCode解法结果:', JSON.stringify(result2));

    const isCorrect1 = JSON.stringify(result1) === JSON.stringify(testCase.expected);
    const isCorrect2 = JSON.stringify(result2) === JSON.stringify(testCase.expected);

    console.log('用户解法正确:', isCorrect1 ? '✅' : '❌');
    console.log('LeetCode解法正确:', isCorrect2 ? '✅' : '❌');
    console.log('---\n');
  });
}

// 🔍 执行过程追踪
function traceExecution() {
  console.log('=== 执行过程追踪 ===\n');

  const input = [1, [2, [3, 4]]];
  const n = 1;

  console.log(`追踪用户解法处理 ${JSON.stringify(input)}, n=${n} 的过程：\n`);

  let step = 0;
  const newArray = [];

  function flatArray(array, depth, indent = '') {
    step++;
    console.log(`${indent}步骤${step}: flatArray(${JSON.stringify(array)}, ${depth})`);

    if (depth > n) {
      console.log(`${indent}  depth(${depth}) > n(${n}), 直接push整个数组`);
      newArray.push(array);
      console.log(`${indent}  newArray变成: ${JSON.stringify(newArray)}`);
      return;
    }

    console.log(`${indent}  depth(${depth}) <= n(${n}), 遍历元素`);

    for (let i = 0; i < array.length; i++) {
      const ele = array[i];
      console.log(`${indent}  处理元素[${i}]: ${JSON.stringify(ele)}`);

      if (!Array.isArray(ele)) {
        console.log(`${indent}    非数组，直接push`);
        newArray.push(ele);
        console.log(`${indent}    newArray变成: ${JSON.stringify(newArray)}`);
      } else {
        console.log(`${indent}    是数组，递归调用`);
        flatArray(ele, depth + 1, indent + '  ');
      }
    }
  }

  flatArray(input, 0);
  console.log(`\n最终结果: ${JSON.stringify(newArray)}`);
}

// 📊 两种解法的优缺点对比
function compareApproaches() {
  console.log('\n=== 两种解法对比 ===\n');

  console.log('🎯 用户解法（深度递增）:');
  console.log('优点：');
  console.log('  ✅ 思路直观：记录当前递归深度');
  console.log('  ✅ 边界条件清晰：depth > n 时停止扁平化');
  console.log('  ✅ 代码逻辑清晰，容易理解');
  console.log('  ✅ 实际上是正确的！');
  console.log('缺点：');
  console.log('  ⚠️  需要额外的 depth 参数');
  console.log('  ⚠️  可能让人误解边界条件的处理\n');

  console.log('🚀 LeetCode解法（层数递减）:');
  console.log('优点：');
  console.log('  ✅ 逻辑简洁：用剩余层数控制');
  console.log('  ✅ 代码更短，条件判断更直接');
  console.log('  ✅ 不容易被误解');
  console.log('缺点：');
  console.log('  ⚠️  需要理解"剩余层数"的概念');
  console.log('  ⚠️  对初学者可能不够直观\n');

  console.log('🎯 结论：');
  console.log('  两种解法都是正确的！');
  console.log('  用户解法：更直观，适合理解递归过程');
  console.log('  LeetCode解法：更简洁，适合实际编码');
}

// 🎨 可视化递归过程
function visualizeRecursion() {
  console.log('\n=== 可视化递归过程 ===\n');

  console.log('输入: [1, [2, [3, 4]]], n=1');
  console.log('');
  console.log('用户解法的递归树：');
  console.log('');
  console.log('flatArray([1, [2, [3, 4]]], 0)');
  console.log('├── 元素 1 (非数组) → push(1)');
  console.log('└── 元素 [2, [3, 4]] (数组) → 递归');
  console.log('    └── flatArray([2, [3, 4]], 1)');
  console.log('        ├── 元素 2 (非数组) → push(2)');
  console.log('        └── 元素 [3, 4] (数组) → 递归');
  console.log('            └── flatArray([3, 4], 2)');
  console.log('                └── depth(2) > n(1) → push([3, 4])');
  console.log('');
  console.log('结果: [1, 2, [3, 4]] ✅');
  console.log('');
  console.log('🎯 关键发现：');
  console.log('  当 depth > n 时，push(array) 中的 array 正好是');
  console.log('  应该保持原样的嵌套数组，这是完全正确的！');
}

// 执行所有测试
if (typeof window === 'undefined') {
  detailedTest();
  traceExecution();
  compareApproaches();
  visualizeRecursion();
}

module.exports = { flat_user, flat_leetcode }; 