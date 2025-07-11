/**
 * 从递归基层分析时间复杂度
 * 详细统计每次递归调用
 */

// 添加计数器的版本
var subsets_with_counter = function (nums) {
  const res = [];
  let callCount = 0;  // 统计递归调用次数
  let baseCount = 0;  // 统计到达基层的次数

  const backTracking = (path, l, start, depth = 0) => {
    callCount++;
    console.log(`${'  '.repeat(depth)}调用 ${callCount}: backTracking(${JSON.stringify(path)}, ${l}, ${start})`);

    if (path.length === l) {
      baseCount++;
      console.log(`${'  '.repeat(depth)}✅ 到达基层 ${baseCount}: 找到子集 ${JSON.stringify(path)}`);
      res.push([...path]);
      return;
    }

    for (let i = start; i < nums.length; i++) {
      console.log(`${'  '.repeat(depth)}选择元素 ${nums[i]}`);
      backTracking(path.concat(nums[i]), l, i + 1, depth + 1);
    }
  }

  console.log('=== 开始递归调用分析 ===');
  for (let i = 0; i <= nums.length; i++) {
    console.log(`\n--- 生成长度为 ${i} 的子集 ---`);
    const beforeCall = callCount;
    const beforeBase = baseCount;

    backTracking([], i, 0);

    console.log(`长度为 ${i} 的子集：递归调用 ${callCount - beforeCall} 次，基层调用 ${baseCount - beforeBase} 次`);
  }

  console.log(`\n=== 总结 ===`);
  console.log(`总递归调用次数：${callCount}`);
  console.log(`总基层调用次数：${baseCount}`);
  console.log(`生成的子集数量：${res.length}`);
  console.log(`验证：基层调用次数 = 子集数量 = 2^${nums.length} = ${Math.pow(2, nums.length)}`);

  return res;
};

// 理论分析函数
function theoreticalAnalysis(n) {
  console.log(`\n=== 理论分析：n = ${n} ===`);

  let totalCalls = 0;
  let baseCalls = 0;

  for (let k = 0; k <= n; k++) {
    // 计算C(n,k)
    const combinations = combination(n, k);
    baseCalls += combinations;

    // 计算这个长度的总递归调用次数
    // 对于长度为k的子集，递归树的内部节点数约为 C(n,k) * k
    // 但这是一个近似，精确计算比较复杂

    console.log(`长度为 ${k} 的子集：C(${n},${k}) = ${combinations}`);
  }

  console.log(`\n基层调用总数：${baseCalls}`);
  console.log(`验证：2^${n} = ${Math.pow(2, n)}`);
  console.log(`匹配：${baseCalls === Math.pow(2, n)}`);
}

// 计算组合数 C(n,k)
function combination(n, k) {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;

  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return Math.floor(result);
}

// 递归调用模式分析
function analyzeRecursionPattern() {
  console.log('\n=== 递归调用模式分析 ===');
  console.log('对于nums=[1,2,3]，n=3的情况：');
  console.log('');

  console.log('1. 长度为0的子集：');
  console.log('   backTracking([],0,0) → 直接返回');
  console.log('   递归调用：1次，基层调用：1次');
  console.log('');

  console.log('2. 长度为1的子集：');
  console.log('   backTracking([],1,0)');
  console.log('   ├── backTracking([1],1,1) → 基层');
  console.log('   ├── backTracking([2],1,2) → 基层');
  console.log('   └── backTracking([3],1,3) → 基层');
  console.log('   递归调用：1+3=4次，基层调用：3次');
  console.log('');

  console.log('3. 长度为2的子集：');
  console.log('   backTracking([],2,0)');
  console.log('   ├── backTracking([1],2,1)');
  console.log('   │   ├── backTracking([1,2],2,2) → 基层');
  console.log('   │   └── backTracking([1,3],2,3) → 基层');
  console.log('   ├── backTracking([2],2,2)');
  console.log('   │   └── backTracking([2,3],2,3) → 基层');
  console.log('   └── backTracking([3],2,3) → 无子调用');
  console.log('   递归调用：1+3+3=7次，基层调用：3次');
  console.log('');

  console.log('4. 长度为3的子集：');
  console.log('   backTracking([],3,0)');
  console.log('   ├── backTracking([1],3,1)');
  console.log('   │   ├── backTracking([1,2],3,2)');
  console.log('   │   │   └── backTracking([1,2,3],3,3) → 基层');
  console.log('   │   └── backTracking([1,3],3,3) → 无子调用');
  console.log('   ├── backTracking([2],3,2)');
  console.log('   │   └── backTracking([2,3],3,3) → 无子调用');
  console.log('   └── backTracking([3],3,3) → 无子调用');
  console.log('   递归调用：1+3+2+1=7次，基层调用：1次');
  console.log('');

  console.log('总计：');
  console.log('递归调用：1+4+7+7=19次');
  console.log('基层调用：1+3+3+1=8次 = 2^3');
  console.log('');

  console.log('🎯 关键发现：');
  console.log('- 基层调用次数 = 生成的子集数量 = 2^n');
  console.log('- 总递归调用次数 > 2^n（包含中间节点）');
  console.log('- 时间复杂度主要由 2^n 决定');
}

// 测试函数
function testRecursionAnalysis() {
  console.log('=== 实际运行测试 ===');

  // 测试小规模数据
  const nums = [1, 2, 3];
  console.log(`测试数组：[${nums.join(', ')}]`);

  const result = subsets_with_counter(nums);
  console.log(`\n最终结果：`, result);

  // 理论分析
  theoreticalAnalysis(nums.length);

  // 模式分析
  analyzeRecursionPattern();
}

// 执行测试
if (typeof window === 'undefined') {
  testRecursionAnalysis();
}

module.exports = {
  subsets_with_counter,
  theoreticalAnalysis,
  analyzeRecursionPattern
}; 