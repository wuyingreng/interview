/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

class MinHeap {
  constructor() {
    this.heap = []
  }

  size() {
    return this.heap.length
  }

  peek() {
    return this.heap[0]
  }

  swap(i1, i2) {
    const temp = this.heap[i1]
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp
  }

  shiftUp(index) {
    if (index === 0) return
    const parentIndex = Math.floor((index - 1) / 2);
    if (this.heap[parentIndex] && this.heap[index] && this.heap[parentIndex].val > this.heap[index].val) {
      this.swap(index, parentIndex);
      this.shiftUp(parentIndex)
    }
  }

  insert(node) {
    this.heap.push(node);
    const index = this.heap.length - 1;
    this.shiftUp(index)
  }

  shiftDown(index) {
    const leftIndex = index * 2 + 1
    const rightIndex = index * 2 + 2;
    let minIndex = index;

    if (leftIndex < this.heap.length && this.heap[minIndex] && this.heap[leftIndex] && this.heap[minIndex].val > this.heap[leftIndex].val) {
      minIndex = leftIndex
    }

    if (rightIndex < this.heap.length && this.heap[minIndex] && this.heap[rightIndex] && this.heap[minIndex].val > this.heap[rightIndex].val) {
      minIndex = rightIndex
    }

    if (minIndex !== index) {
      this.swap(minIndex, index);
      this.shiftDown(minIndex)
    }
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    // ✅ 修复：始终返回整个节点
    if (this.heap.length === 1) return this.heap.pop();

    const result = this.heap[0];
    const node = this.heap.pop();
    this.heap[0] = node;
    this.shiftDown(0);
    return result;
  }
}

var mergeKLists = function (lists) {
  const minHeap = new MinHeap();
  const dummy = new ListNode(0);
  let current = dummy;

  // 将所有链表的头节点加入堆
  lists.forEach((list) => {
    if (list) minHeap.insert(list);
  });

  // 不断取出最小节点
  while (minHeap.size() > 0) {
    const minNode = minHeap.pop();
    current.next = minNode;
    current = current.next;

    // ✅ 修复：直接插入下一个节点，不需要重新赋值
    if (minNode.next) {
      minHeap.insert(minNode.next);
    }
  }

  return dummy.next;
};

// 测试用例
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

// 创建测试链表
function createList(arr) {
  const dummy = new ListNode(0);
  let current = dummy;
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  return dummy.next;
}

// 测试
const lists = [
  createList([1, 4, 5]),
  createList([1, 3, 4]),
  createList([2, 6])
];

const result = mergeKLists(lists);
console.log('合并结果:', result); 