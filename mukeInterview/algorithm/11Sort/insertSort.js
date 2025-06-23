Array.prototype.insert = function () {

  for (let i = 1; i < this.length; i++) {
    let j = i;
    // 用this[i] 更语义化一点。第几轮遍历第几个元素。
    let temp = this[i];
    /**
     * 这里用while是可以提前退出整个while体。如果用for的话，
     * 只可以退出当前的for循环中的某一次循环，当前for循环的下一次循环
     * 还是会进入的。
    */
    while (j > 0) {
      // 如果前面的数字比它大，就往后移动。就是两个人相互换值
      if (this[j - 1] > this[j]) {
        this[j] = this[j - 1];
        this[j - 1] = temp;
        /**
         * 要一直往前移动，直到找到第一个比它小的数。
         * 比如[26,29,14,17,18] 当移动14的时候，要移动29,26
        */
        j--
      } else {
        break
      }
    }
    // 退出这个循环的时候再把temp放到合适的位置
    this[j] = temp
  }
}
const arr = [7, 8, 3, 4];// 这里记得加分号
arr.insert()
console.log('result==>', arr)