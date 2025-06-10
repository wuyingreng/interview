/**-----------  通过对象新建链表        ------------*/

const a = { value: 'a' }
const b = { value: 'b' }
const c = { value: 'c' }
const d = { value: 'd' }


a.next = b;
b.next = c;
c.next = d;


/**-----------  通过类新建链表        ------------*/
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

new ListNode(2, new ListNode(2, new ListNode(7, null)))

/**-----------  操作1: 遍历链表        ------------*/

let p = a;
// 保证当前节点不是null
while (p) {
  console.log('p.value==>', p.value);
  p = p.next
}

/**-----------  操作2：插入链表。在c和d之间插入了个e        ------------*/

const e = { value: 'e' };
// 把当前节点的next指向新节点
c.next = e;
// 把新节点的next指向当前节点原先的后置节点
e.next = d

/**-----------  操作3：删除链表的某个节点比如e       ------------*/
/**
 * 
 * 方法一：
 * 找到这个节点的前置节点，把这个前置节点的next 改为要删除节点的next
 * pre.next=cur.next
 * 方法二：如果没有办法找到前置节点，只拥有当前节点和后置节点的信息
 * cur.value=cur.next.value
 * cur.next=cur.next.next
 * 见：letcode 237
 * */

c.next = d;