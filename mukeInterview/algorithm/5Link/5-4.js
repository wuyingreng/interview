// 题目2：两数相加


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const l3 = new ListNode(0);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0
  // 为什么这里是或不是且，很奇怪
  while (p1 || p2) {
    const v1 = p1 ? p1.val : 0;
    const v2 = p2 ? p2.val : 0;
    const val = v1 + v2 + carry
    p3.next = new ListNode(val % 10);
    carry = Math.floor(val / 10);

    if (p1) {
      p1 = p1.next
    }
    if (p2) {
      p2 = p2.next
    }
    p3 = p3.next
  }
  if (carry) {
    // 末尾大于10,要把carry放到末尾去
    p3.next = new ListNode(carry);

  }

  return l3.next
}

const l1 = new ListNode(2, new ListNode(2, new ListNode(7, null)))
const l2 = new ListNode(5, new ListNode(6, new ListNode(4, null)))

console.log('l3==>', addTwoNumbers(l1, l2))