class ListNode {
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}



const mergeTwoLists = (l1, l2) => {
  // sentinel 不懂
  // 为什么这里要是new ListNode 0 
  let sentinel = new ListNode(0);
  console.log('sentinel', sentinel)
  let current = sentinel;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  current.next = (l1 === null) ? l2 : l1;
  return sentinel.next;
}

let l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
let l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
console.log('l1', l1, 'l2', l2)
let mergedList = mergeTwoLists(l1, l2);
console.log('mergedList', mergedList)
// todo: 为什么这里要多个whild。不明白，那
while (mergedList) {
  mergedList = mergedList.next;
}