

var subsets = function (nums) {
  const res = [];
  const backtrack = (path, l, start) => {
    // 如果路径的长度等于要到达终点的长度，就方进入
    if (path.length === l) {
      res.push(path);
      return;
    }
    // 从当前位置的下标作为起始下标
    for (let i = start; i < nums.length; i += 1) {
      backtrack(path.concat(nums[i]), l, i + 1);
    }
  }
  // 输出元素的长度在0 到n 
  for (let i = 0; i <= nums.length; i += 1) {
    backtrack([], i, 0);

  };

  return res;
}
nums = [1, 2, 3]
console.log(subsets(nums))

/**
 * 这些问题没有看懂
 * 为什么时间复杂度是2的n次方
 * 空间复杂度O（N）递归堆栈上存的中间变量为O(N)的级别
 * 递归的深度
*/