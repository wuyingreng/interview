/**
 * 扁平化嵌套数组 - 解法分析与对比
 * LeetCode 2625. 扁平化嵌套数组
 */

// 🔴 用户的原始解法（存在问题）
function flat_original(array, n) {
  if (n === 0) {
    return array;
  };
  const newArray = [];
  const flatArray = (array, depth) => {
    if (depth > n) {
      // ❌ 问题：这里会把整个数组作为一个元素push进去！
      return newArray.push(array);
    }
    for (let i = 0; i < array.length; i++) {
      const ele = array[i]
      if (!Array.isArray(ele)) {
        newArray.push(ele);
      } else {
        flatArray(ele, depth + 1)
      }
    }
  }

  flatArray(array, 0)
  return newArray
}

// 🔧 修正版本1：修复用户解法的问题
function flat_fixed_v1(array, n) {
  if (n === 0) {
    return array;
  };
  const newArray = [];
  const flatArray = (array, depth) => {
    for (let i = 0; i < array.length; i++) {
      const ele = array[i]
      if (!Array.isArray(ele)) {
        // 非数组元素直接push
        newArray.push(ele);
      } else if (depth >= n) {
        // ✅ 修正：达到最大深度时，直接push数组（而不是递归）
        newArray.push(ele);
      } else {
        // 继续递归
        flatArray(ele, depth + 1)
      }
    }
  }

  flatArray(array, 0)
  return newArray
}

// 🔧 修正版本2：更清晰的逻辑
function flat_fixed_v2(array, n) {
  if (n === 0) {
    return array;
  };
  const newArray = [];
  const flatArray = (array, currentDepth) => {
    for (let i = 0; i < array.length; i++) {
      const ele = array[i]
      if (!Array.isArray(ele) || currentDepth >= n) {
        // 非数组 或 已达最大深度，直接push
        newArray.push(ele);
      } else {
        // 是数组且未达最大深度，继续递归
        flatArray(ele, currentDepth + 1)
      }
    }
  }

  flatArray(array, 0)
  return newArray
}

// 🚀 LeetCode的解法
var flat_leetcode = function (arr, n) {
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
};

// 🔄 迭代版本（额外提供）
function flat_iterative(arr, n) {
  if (n === 0) return arr;

  // 使用队列存储 [元素, 当前深度]
  const queue = arr.map(item => [item, 0]);
  const result = [];

  while (queue.length > 0) {
    const [element, depth] = queue.shift();

    if (Array.isArray(element) && depth < n) {
      // 是数组且未达最大深度，展开并加入队列
      element.forEach(item => queue.push([item, depth + 1]));
    } else {
      // 非数组或已达最大深度，直接加入结果
      result.push(element);
    }
  }

  return result;
}

// 🧪 测试用例
function runTests() {
  const testCases = [
    {
      input: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
      n: 0,
      expected: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
    },
    {
      input: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
      n: 1,
      expected: [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
    },
    {
      input: [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
      n: 2,
      expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
    {
      input: [1, [2, [3, 4]]],
      n: 1,
      expected: [1, 2, [3, 4]]
    },
    {
      input: [1, [2, [3, 4]]],
      n: 2,
      expected: [1, 2, 3, 4]
    }
  ];

  console.log('=== 扁平化数组测试 ===\n');

  testCases.forEach((testCase, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log('输入:', JSON.stringify(testCase.input));
    console.log('深度:', testCase.n);
    console.log('期望:', JSON.stringify(testCase.expected));

    try {
      const result1 = flat_original(JSON.parse(JSON.stringify(testCase.input)), testCase.n);
      const result2 = flat_fixed_v1(JSON.parse(JSON.stringify(testCase.input)), testCase.n);
      const result3 = flat_fixed_v2(JSON.parse(JSON.stringify(testCase.input)), testCase.n);
      const result4 = flat_leetcode(JSON.parse(JSON.stringify(testCase.input)), testCase.n);
      const result5 = flat_iterative(JSON.parse(JSON.stringify(testCase.input)), testCase.n);

      console.log('原始版本:', JSON.stringify(result1));
      console.log('修正版本1:', JSON.stringify(result2));
      console.log('修正版本2:', JSON.stringify(result3));
      console.log('LeetCode版本:', JSON.stringify(result4));
      console.log('迭代版本:', JSON.stringify(result5));

      const isCorrect2 = JSON.stringify(result2) === JSON.stringify(testCase.expected);
      const isCorrect3 = JSON.stringify(result3) === JSON.stringify(testCase.expected);
      const isCorrect4 = JSON.stringify(result4) === JSON.stringify(testCase.expected);
      const isCorrect5 = JSON.stringify(result5) === JSON.stringify(testCase.expected);

      console.log('修正版本1正确:', isCorrect2);
      console.log('修正版本2正确:', isCorrect3);
      console.log('LeetCode版本正确:', isCorrect4);
      console.log('迭代版本正确:', isCorrect5);

    } catch (error) {
      console.log('执行错误:', error.message);
    }

    console.log('---\n');
  });
}

// 📊 解法对比分析
function analyzeApproaches() {
  console.log('=== 解法对比分析 ===\n');

  console.log('1. 用户原始解法（存在问题）:');
  console.log('   优点：思路清晰，用depth记录深度');
  console.log('   缺点：边界条件处理错误，会把整个数组push进结果');
  console.log('   时间复杂度：O(n)，n为所有元素总数');
  console.log('   空间复杂度：O(d)，d为最大递归深度\n');

  console.log('2. LeetCode解法:');
  console.log('   优点：逻辑简洁，用剩余层数控制');
  console.log('   优点：边界条件处理正确');
  console.log('   优点：代码更简洁，易于理解');
  console.log('   时间复杂度：O(n)，n为所有元素总数');
  console.log('   空间复杂度：O(d)，d为最大递归深度\n');

  console.log('3. 修正版本:');
  console.log('   优点：保持了用户的思路，修正了bug');
  console.log('   优点：逻辑清晰，容易理解');
  console.log('   缺点：代码稍微复杂一些');
  console.log('   时间复杂度：O(n)，n为所有元素总数');
  console.log('   空间复杂度：O(d)，d为最大递归深度\n');

  console.log('4. 迭代版本:');
  console.log('   优点：避免了递归，不会栈溢出');
  console.log('   优点：对于深度很大的情况更安全');
  console.log('   缺点：代码复杂度稍高');
  console.log('   时间复杂度：O(n)，n为所有元素总数');
  console.log('   空间复杂度：O(n)，需要额外的队列空间\n');
}

// 🎯 关键问题分析
function analyzeKeyIssues() {
  console.log('=== 关键问题分析 ===\n');

  console.log('🔴 用户原始解法的问题：');
  console.log('   if (depth > n) { return newArray.push(array); }');
  console.log('   这行代码会把整个数组作为一个元素push进去\n');

  console.log('🔧 正确的处理方式：');
  console.log('   应该在遍历时检查深度限制');
  console.log('   达到最大深度时，不再递归，直接push当前元素\n');

  console.log('💡 LeetCode解法的优势：');
  console.log('   用剩余层数 l 来控制，更直观');
  console.log('   l > 0 且是数组时才递归');
  console.log('   逻辑更简洁，不容易出错\n');

  console.log('🎯 推荐的思考方式：');
  console.log('   方法1：正向思维 - 记录当前深度');
  console.log('   方法2：逆向思维 - 记录剩余层数（推荐）');
  console.log('   方法3：迭代思维 - 使用队列BFS');
}

// 执行测试
if (typeof window === 'undefined') {
  runTests();
  analyzeApproaches();
  analyzeKeyIssues();
}

module.exports = {
  flat_original,
  flat_fixed_v1,
  flat_fixed_v2,
  flat_leetcode,
  flat_iterative
}; 