// 爬楼梯问题 - 详细解释初始值 [1,1] 的含义

/**
 * 问题：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */

console.log("=== 理解初始值 dp=[1,1] ===\n");

// ====== 方法1：从数学角度理解 ======
console.log("📊 从数学角度理解：");
console.log("dp[0] = 1 → 到达第0个台阶（起点/地面）有1种方法：什么都不做");
console.log("dp[1] = 1 → 到达第1个台阶有1种方法：爬1步");
console.log("dp[2] = dp[1] + dp[0] = 1 + 1 = 2 → 到达第2个台阶有2种方法：");
console.log("        方法1：先到第1个台阶，再爬1步");
console.log("        方法2：直接从起点爬2步");
console.log();

// ====== 方法2：从递推公式角度理解 ======
console.log("🔄 从递推公式角度理解：");
console.log("为了让 dp[2] = dp[1] + dp[0] 成立，必须：");
console.log("dp[1] = 1 (爬到第1个台阶确实只有1种方法)");
console.log("dp[0] = 1 (这是为了数学上的一致性)");
console.log();

// ====== 手动验证小例子 ======
function manualCheck() {
  console.log("🔍 手动验证前几个台阶：");

  console.log("n=1: 只能爬1步 → 1种方法 ✓");
  console.log("n=2: 可以爬1+1或者2 → 2种方法 ✓");
  console.log("n=3: 可以从n=1爬2步(1种) + 从n=2爬1步(2种) = 3种方法");
  console.log("     具体: (1,1,1), (1,2), (2,1) → 3种方法 ✓");
  console.log("n=4: 可以从n=2爬2步(2种) + 从n=3爬1步(3种) = 5种方法");
  console.log("     具体: (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (2,2) → 5种方法 ✓");
  console.log();
}

manualCheck();

// ====== 标准实现 ======
var climbStairs = function (n) {
  if (n < 2) return 1;

  // 核心：dp[0]=1, dp[1]=1
  const dp = [1, 1];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  console.log(`n=${n} 的dp数组:`, dp);
  return dp[n];
};

// ====== 不同的初始值设定方式 ======
console.log("🎯 不同的初始值设定方式：\n");

// 方式1：标准方式 dp[0]=1, dp[1]=1
function climb1(n) {
  if (n < 2) return 1;
  const dp = [1, 1];  // dp[0]=1, dp[1]=1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 方式2：更直观的方式（但需要特殊处理）
function climb2(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  const dp = new Array(n + 1);
  dp[1] = 1;  // 第1个台阶1种方法
  dp[2] = 2;  // 第2个台阶2种方法

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 方式3：空间优化版
function climb3(n) {
  if (n < 2) return 1;

  let prev2 = 1;  // dp[i-2]
  let prev1 = 1;  // dp[i-1]

  for (let i = 2; i <= n; i++) {
    let current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// ====== 测试验证 ======
console.log("✅ 验证不同实现方式：");
for (let n = 1; n <= 6; n++) {
  const result1 = climb1(n);
  const result2 = climb2(n);
  const result3 = climb3(n);
  console.log(`n=${n}: 方式1=${result1}, 方式2=${result2}, 方式3=${result3}`);
}

console.log("\n=== 关键理解 ===");
console.log("🎯 dp[0]=1 的含义：");
console.log("   不是说'第0个台阶有意义'，而是为了让递推公式在数学上成立");
console.log("   这是一个'技巧性的边界条件'，让后续计算更简洁");

console.log("\n🎯 为什么不用 dp[0]=0？");
console.log("   如果dp[0]=0，那么dp[2] = dp[1] + dp[0] = 1 + 0 = 1");
console.log("   但实际上到第2个台阶有2种方法，所以dp[0]=0是错误的");

console.log("\n🎯 动态规划初始值的设定原则：");
console.log("   1. 必须让递推公式在边界情况下正确工作");
console.log("   2. 可能需要一些'数学技巧'来简化计算");
console.log("   3. 不一定要有直观的物理含义，数学一致性更重要"); 