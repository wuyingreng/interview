Array.prototype.merge = function () {
  const rec = (arr) => {
    // 这里要返回回去，因为orderLeft/orderRight要拿到这个值
    if (arr.length === 1) { return arr }
    const length = arr.length;
    const mid = Math.floor(length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, length);
    const orderLeft = rec(left);
    const orderRight = rec(right);

    // 用队列的形式
    const res = [];
    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        if (orderLeft[0] < orderRight[0]) {
          res.push(orderLeft.shift())
        } else {
          res.push(orderRight.shift())
        }
      } else if (orderLeft.length) {
        res.push(orderLeft.shift())
      } else {
        res.push(orderRight.shift())
      }

    }
    console.log('res=>', res)
    return res
  }
  rec(this).forEach((n, i) => this[i] = n)
}
const arr = [7, 8, 3, 4];// 这里记得加分号
arr.merge()
console.log(arr, arr.merge())