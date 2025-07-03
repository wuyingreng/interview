Array.prototype.binarySearch = function (target) {

  let left = 0;
  let right = this.length - 1;

  console.log('left', left, 'right', right, 'mid', mid)
  // 为什么这里是left<=right,是不是在二分搜索里面都是这么写的
  while (left <= right) {
    // 这个mid要放在循环里面，因为每次改变都要重新计算
    let mid = Math.floor(left + (right - left) / 2);
    if (this[mid] === target) {
      return mid
    } else if (this[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1
    }
  }

  return -1;
};

console.log([1, 2, 4, 6, 8].binarySearch(6))