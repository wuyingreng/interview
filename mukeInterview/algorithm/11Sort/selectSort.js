Array.prototype.select = function () {
  console.log('this==>', this)
  // 一共要进行n-1轮排序
  for (let i = 0; i < this.length - 1; i++) {
    let minIndex = i;
    for (let j = i; j < this.length; j++) {
      if (this[j] < this[minIndex]) {
        minIndex = j
      }
    }
    if (this[minIndex] !== this[i]) {
      const temp = this[i]
      this[i] = this[minIndex]
      this[minIndex] = temp
    }
  }
}
const arr = [7, 8, 3, 4];// 这里记得加分号
arr.select()
console.log('result==>', arr)