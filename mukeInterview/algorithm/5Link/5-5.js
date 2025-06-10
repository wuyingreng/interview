function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
var deleteDuplicates = function (head) {
  let p = head;
  while (p && p.next) {
    console.log('before p==>', p)
    if (p.val === p.next.val) {
      p.next = p.next.next
      /**
       * 如果当前元素和下一个元素的值相同，直接删除元素，不要移动指针
       * 因为可能当前元素和下下个元素的值可能会相同还要再算一次
      */

    } else {
      p = p.next
    }

    console.log('after p==>', p)
  }
  return head
};


const l1 = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, null)))))
const l2 = new ListNode(1, new ListNode(1, new ListNode(1)))

console.log('result==>', deleteDuplicates(l2))