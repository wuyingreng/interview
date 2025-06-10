// 链表节点类
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// 创建带环链表 3 -> 2 -> 0 -> -4
const node4 = new ListNode(-4);
const node0 = new ListNode(0, node4);
const node2 = new ListNode(2, node0);
const node3 = new ListNode(3, node2);
const newLocal = node4.next = node2; // 形成环：-4 → 2