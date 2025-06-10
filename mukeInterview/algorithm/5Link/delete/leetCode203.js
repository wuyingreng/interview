function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
// head = [1,2,6,3,4,5,6], val = 6
const head = new ListNode(1, new ListNode(2, new ListNode(6, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6)))))))


const removeElements = (head, target) => {

  // 删除头节点
  while (head !== null && head.val === target) {
    head = head.next
  }
  if (head === null) return head;

  /**
   * 要另外写删除头部节点，因为这么是判断cur.val===target，head永远都不会被删除掉。
  */
  // 删除其他节点
  let pre = head;
  let cur = pre.next;
  while (cur) {
    if (cur.val === target) {
      pre.next = pre.next.next
    } else {
      pre = pre.next
    }
    cur = pre.next
  }

  return head
};

console.log(removeElements(head, 6))