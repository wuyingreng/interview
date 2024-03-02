function search(nums, target) {
  // 初始化边界
  let left = 0, right = nums.length - 1;
  // 循环条件：在 left 和 right 指针没有相遇的情况下循环（即 left <= right）
  while (left <= right) {
    // 计算中点：计算中点 mid 的位置，一般为 (left + right) / 2。
    let mid = Math.floor((left + right) / 2);
    // 比较目标值和中点值：
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// 示例用法
console.log(search([-1, 0, 3, 5, 9, 12], 9)); // 输出: 4
console.log(search([-1, 0, 3, 5, 9, 12], 2)); // 输出: -1