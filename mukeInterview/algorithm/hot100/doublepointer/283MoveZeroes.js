var moveZeroes = function (nums) {
  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right]) {
      [nums[right], nums[left]] = [nums[left], nums[right]]
      left++
    }
    if (right === 2) {
      console.log('查看当npms[2]的时候，left移动到哪里了是否到3', left, right)
    }
    if (right === 5) {
      console.log('nums[5]=3的时候，left移动到哪里了是否到4', left, right)
    }
  }
  return nums

};
moveZeroes([1, 1, 2, 0, 0, 3, 0, 5])