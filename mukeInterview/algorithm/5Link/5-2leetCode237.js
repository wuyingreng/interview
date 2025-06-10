const a = { val: 'a' }
const b = { val: 'b' }
const c = { val: 'c' }
const d = { val: 'd' }


a.next = b;
b.next = c;
c.next = d;

// letcode 237 只告诉你一个节点b,删除节点b
function deleteNode(node) {
  node.val = node.next.val;
  node.next = node.next.next
};
deleteNode(c)
console.log('deleteNode(c)==>', a)