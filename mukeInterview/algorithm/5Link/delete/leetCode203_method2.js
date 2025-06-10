function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
// head = [7,7,7,7], val = 7
const head = new ListNode(7, new ListNode(7, new ListNode(7, new ListNode(7))))


var removeElements = function (head, val) {
  const dumpHead = new ListNode(0, head);
  let cur = dumpHead

  while (cur && cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next
    } else {
      // 只有在不需要删除节点的时候要移动节点。因为下一个节点可能也是需要被删除的。
      cur = cur.next
    }

  }
  return dumpHead.next

};

console.log(removeElements(head, 7))