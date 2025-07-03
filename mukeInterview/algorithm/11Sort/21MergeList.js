/**
 * Definition for singly-linked list.

 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

var mergeTwoLists = function (list1, list2) {
  const l = new ListNode(0);
  let res = l;
  let p1 = list1;
  let p2 = list2;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      // ??? 这里如果全部用val回怎么样
      res.next = p1;
      res = res.next;
      p1 = p1.next;
    } else {
      res.next = p2;
      res = res.next;
      p2 = p2.next;
    }
  }
  while (p1) {
    res.next = p1;
    res = res.next;
    p1 = p1.next
  }
  while (p2) {
    res.next = p2;
    res = res.next;
    p2 = p2.next
  }
  return l.next
};

const l1 = new ListNode(1);
const l2 = new ListNode(2, new ListNode(3))

mergeTwoLists(l1, l2)
