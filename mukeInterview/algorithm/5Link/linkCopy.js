function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}



// head的数组表示head = [1,2,3,4] 。输出应该是[2,1,4,3]
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log('head==>', head)

var copyList = function (head) {
  let p1 = head;
  let dummyHead = null;
  let p2 = dummyHead;

  while (p1) {
    p2.next = new ListNode(p1.val);
    p1 = p1.next;
    p2 = p2.next;
  }
  return dummyHead;
};
console.log('return val=>', copyList(head))

var copyListRecursive = function (head) {
  let dummyHead = new ListNode(0);
  let p1 = head;
  let p2 = dummyHead;

  const copyList = function (p1, p2) {
    if (!p1) return p2.next = null;
    p2.next = new ListNode(p1.val);
    copyList(p1.next, p2.next)
  }
  copyList(p1, p2);
  return dummyHead.next
};
console.log('return copyListRecursive val=>', copyListRecursive(head))