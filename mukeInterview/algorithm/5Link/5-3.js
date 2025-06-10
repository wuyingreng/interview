/**
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 * 给个头就够了,头就可以看到反转后的链表长什么样子
 * */
const a = { value: 1 }
const b = { value: 2 }
const c = { value: 3 }
const d = { value: 4 }
const e = { value: 5 }

a.next = b;
b.next = c;
c.next = d;
d.next = e;

const reverseList = (head) => {
  // 第一次p1指向第一个节点，p2指向null
  let p1 = head;
  let p2 = null;
  while (p1) {
    console.log('p1==>', p1, 'p2==>', p2)
    const tem = p1.next
    /**
     * 通过这2行代码把p2往上加。p1.next = p2;    p2 = p1
     * 比如p1={ value: 2, next: { value: 3, next: { value: 4, next: [Object] } } } 
     * p2= { value: 1, next: { value: null } }
     * p1.next=p2: p1就变成了p1={ value: 2, next: { value: 1, next: { value: null } } } 
     * p2=p1: p2={ value: 2, next: { value: 1, next: { value: null } } } 
     * 完成了累加
    */
    // 
    p1.next = p2;
    p2 = p1
    // p1=tem 实现了p1的移动
    p1 = tem
    console.log('p1after==>', p1, 'p2==>', p2)

  }
  return p2
}

reverseList(a)