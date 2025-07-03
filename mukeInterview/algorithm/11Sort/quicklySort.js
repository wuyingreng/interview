Array.prototype.quickSort = function () {
  console.log(arr)
  const rec = (arr) => {
    // 这里要注意arr为空的情况，如果写成arr.length===1,会导致死循环
    if (arr.length <= 1) { return arr };
    const mid = arr[0];
    const left = [];
    const right = [];
    // 要调过mid元素，否则会死循环。后面还要拼接mid也有重复元素
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > mid) {
        right.push(arr[i])
      } else {
        left.push(arr[i])
      }
    }
    const leftSort = rec(left);
    const rightSort = rec(right);
    return [...leftSort, mid, ...rightSort]
  }
  rec(this).forEach((n, i) => this[i] = n)
}
const arr = [7, 8, 3, 4];// 这里记得加分号
arr.quickSort()
