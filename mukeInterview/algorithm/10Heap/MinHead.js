class MinHeap {
  constructor() {
    // 这里要加this
    this.heap = []
  }
  size() {
    return this.heap.length
  }
  peak() {
    return this.heap[0]
  }
  swap(i1, i2) {
    const temp = this.heap[i1]
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp
  }
  shiftUp(index) {
    // 到达了堆顶是不需要退出的
    if (index === 0) return
    const parentIndex = Math.floor((index - 1) / 2);
    if (this.heap[parentIndex] && this.heap[index] && this.heap[parentIndex].value > this.heap[index].value) {
      this.swap(index, parentIndex);
      this.shiftUp(parentIndex)
    }
  }

  insert(value) {
    this.heap.push(value);
    const index = this.heap.length - 1;
    this.shiftUp(index)
  }
  shiftDown(index) {
    // shiftDown是不停的下移，所以可能到了最后的节点leftIndex,rightIndex 可能会超出
    // heap的长度，这样去比较是没有任何的意义的
    const leftIndex = index * 2 + 1
    const rightIndex = index * 2 + 2;
    let minIndex = index;
    // 是要比较minIndex和leftIndex,rightIndex的值。这样找出父 左 右 最小的值，然后只交换一次
    if (leftIndex > this.heap.length && this.heap[index] && this.heap[leftIndex] && this.heap[minIndex].value > this.heap[leftIndex].value) {
      minIndex = leftIndex
    }
    if (rightIndex > this.heap.length && this.heap[index] && this.heap[rightIndex] && this.heap[minIndex].value > this.heap[rightIndex].value) {
      minIndex = rightIndex
    }
    if (minIndex !== index) {
      this.swap(minIndex, index);

      this.shiftDown(minIndex)
    }

  }
  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop()
    // 你要区分下this.heap[0] 栈顶和 this.heap.pop() 尾元素
    const result = this.heap[0]
    const val = this.heap.pop();
    this.heap[0] = val;
    this.shiftDown(0)
    return result
  }
}

const heap = new MinHeap()
heap.insert(3)
heap.insert(2)
heap.insert(1)
heap.pop()