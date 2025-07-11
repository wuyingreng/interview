// 链表节点
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null; // 下一个节点的引用
  }
}

// 链表
class CircularLinkedList {
  constructor() {
    this.head = null; // 链表的头节点
  }

  // 添加元素到链表末尾
  add(data) {
    const newNode = new ListNode(data);
    // console.log('newNode==>', newNode, 'this.head==>', this.head, 'CircularLinkedList==>', CircularLinkedList)
    if (!this.head) { // 如果链表为空
      this.head = newNode;
      newNode.next = this.head; // 循环链表中的唯一节点指向自己
    } else {
      /**
       * 你要理解这个while循环，退出while循环后就走到了current final==>，不会再进current==>
      */
      let current = this.head;
      console.log('current==>', current, 'this.head=>', this.head)
      while (current.next !== this.head) { // 寻找最后一个节点
        console.log('current.next !== this.head)', 'current==>', current, 'this.head=>', this.head)
        current = current.next;
      }
      console.log('current final==>', current, 'this.head=>', this.head)
      current.next = newNode; // 最后一个节点指向新节点
      newNode.next = this.head; // 新节点指向头节点，完成循环
    }
  }

  // 遍历循环链表
  traverse() {
    if (!this.head) {
      return; // 如果链表为空，则结束函数
    }

    let current = this.head;
    do {
      console.log(current.data); // 输出当前节点的数据
      current = current.next; // 移动到下一个节点
    } while (current !== this.head); // 当回到头节点时结束循环
  }
}

// 示例
const list = new CircularLinkedList();
list.add(1);
list.add(2);
list.add(3);
list.add(4);


list.traverse(); // 输出: 1 2 3


console.log('test==>', new ListNode(222))