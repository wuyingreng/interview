const bt = require('../bt');

// const postOrder = (root) => {
//   if (!root) return
//   postOrder(root.left);
//   postOrder(root.right)
//   console.log('root.val==>', root.val)
// }
// postOrder(bt)

/**
 * 1. 把后序遍历的顺序倒置下
 * 2. 利用栈的后进先出进行访问把刚才先进先出的倒过来访问
*/

const postOrder = (root) => {
  if (!root) return;
  const stack = [root];
  const outputStack = []
  while (stack.length > 0) {
    const ele = stack.pop();
    outputStack.push(ele)
    // 后序遍历倒过来也是根右左和前序遍历不一样。所以这样要改写下
    if (ele.left) stack.push(ele.left)
    if (ele.right) stack.push(ele.right)
  }
  while (outputStack.length > 0) {
    n = outputStack.pop()
    console.log(n.val)
  }
}

postOrder(bt)