function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}



// head的数组表示head = [1,2,3,4] 。输出应该是[2,1,4,3]
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
function swapPairs(head) {
  const dummyNode = new ListNode(0, head);
  let curNode = dummyNode;
  while (curNode && curNode.next && curNode.next.next) {
    let firstNode = curNode.next,
      secNode = curNode.next.next,
      thirdNode = curNode.next.next.next;
    curNode.next = secNode;
    secNode.next = firstNode;
    firstNode.next = thirdNode;
    curNode = firstNode;
  }
  return dummyNode.next;
};

console.log('swapPairs==>', swapPairs(head))