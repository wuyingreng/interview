// 打家劫舍问题 - 正确的动态规划解法

/**
 * 方法1：标准动态规划
 * dp[i] 表示到第i个房子时能偷到的最大金额
 */
var rob1 = function (nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let dp = new Array(nums.length);
  dp[0] = nums[0];                    // 只有第一个房子，必须偷
  dp[1] = Math.max(nums[0], nums[1]); // 前两个房子，选较大的

  for (let i = 2; i < nums.length; i++) {
    // 要么偷第i个房子（加上i-2的最大值），要么不偷（保持i-1的最大值）
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp[nums.length - 1];
};

/**
 * 方法2：空间优化版（滚动数组）
 * 只保留最近的两个状态
 */
var rob2 = function (nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];                    // dp[i-2]，前前个位置的最大值
  let prev1 = Math.max(nums[0], nums[1]); // dp[i-1]，前一个位置的最大值

  for (let i = 2; i < nums.length; i++) {
    let current = Math.max(prev2 + nums[i], prev1);
    prev2 = prev1;  // 更新prev2
    prev1 = current; // 更新prev1
  }

  return prev1;
};

/**
 * 方法3：修正您的代码逻辑
 * 解释为什么原代码有问题
 */
var rob3 = function (nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // 正确的初始化：
  let dp0 = nums[0];                      // 第0个房子的最大收益
  let dp1 = Math.max(nums[0], nums[1]);   // 前1个房子的最大收益

  // 注意：这里用 i < nums.length，因为我们处理的是nums[i]
  for (let i = 2; i < nums.length; i++) {
    let dp2 = Math.max(dp0 + nums[i], dp1);
    dp0 = dp1;
    dp1 = dp2;
  }

  return dp1;
};

// 测试用例
console.log("=== 测试结果 ===");
const test1 = [2, 7, 9, 3, 1];  // 期望结果: 12 (2+9+1)
const test2 = [2, 1, 1, 2];     // 期望结果: 4 (2+2)
const test3 = [1];              // 期望结果: 1
const test4 = [1, 2];           // 期望结果: 2

console.log("test1:", rob1(test1), rob2(test1), rob3(test1));
console.log("test2:", rob1(test2), rob2(test2), rob3(test2));
console.log("test3:", rob1(test3), rob2(test3), rob3(test3));
console.log("test4:", rob1(test4), rob2(test4), rob3(test4));

/**
 * 原代码问题总结：
 * 
 * 1. dp0=0 的问题：
 *    - dp0应该代表某个位置的最优解，初始化为0不合理
 *    - 正确的应该是dp0=nums[0]（第一个房子的收益）
 * 
 * 2. 循环条件 i<=nums.length 的问题：
 *    - 如果用nums[i-1]的方式访问，确实需要<=
 *    - 但更清晰的做法是直接用nums[i]，循环条件用<
 * 
 * 3. 边界条件处理：
 *    - 没有处理nums.length为0或1的情况
 *    - 没有处理nums.length为2的特殊情况
 */ 