// const bt = require('./bt');
const binaryTree = {
  val: 2,
  left: {
    val: 1,
    left: null,
    right: null
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
}
var inorderTraversal = function (root) {
  // 如果根节点不存在直接返回[]
  if (!root) return [];
  // 新建一个栈
  const stack = [];
  // 新建一个收集结果的数组
  const res = [];
  // 新建一个指针
  let p = root;
  // 当栈有值的时候，或者指针有值的情况下。因为当访问到左边的末尾节点，栈空了。但是指针有值了
  while (stack.length || p) {
    // 沿着左指针一直入栈
    while (p) {
      stack.push(p);
      p = p.left;
    }
    // 当左指针没有的时候就弹栈了，弹出的是末尾的指针
    const n = stack.pop();
    console.log('n==>', n, 'stack==>', stack, 'n.right=>', n.right)
    res.push(n.val)
    // 当访问到末位节点的时候，p=1.right=null。就弹出上一个节点2了。里面的while循环不会走。
    // 弹外层的
    p = n.right;
  }

  return res;
};

inorderTraversal(binaryTree)