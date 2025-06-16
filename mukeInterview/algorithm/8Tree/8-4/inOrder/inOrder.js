const bt = require('./bt');
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
  if (!root) return [];
  const stack = [];
  const res = [];
  let p = root;


  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    res.push(n.val)
    // 当访问到末位节点的时候，p=1.right=null。就弹出上一个节点2了
    p = n.right;
  }

  return res;
};

inorderTraversal(bt)