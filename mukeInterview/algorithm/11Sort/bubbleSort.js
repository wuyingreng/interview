Array.prototype.bubble = function () {
  console.log('this==>', this)
  // 一共要进行n-1轮排序
  for (let i = 0; i < this.length - 1; i++) {
    /**
     * 因为要交换this[j],this.[j+1],所以j的长度应该是this.length-2,如果是
     * length-1。 this.[j+1] 就会是this.[this.length]。索引就会溢出
     * 
     * 每次排完一轮，要排序的元素就会减少一个
    */
    for (let j = 0; j < this.length - 1 - i; j++) {
      if (this[j] > this[j + 1]) {
        const temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
    }
  }
}
const arr = [7, 8, 3, 4];// 这里记得加分号
arr.bubble()