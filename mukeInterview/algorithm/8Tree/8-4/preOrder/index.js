const binaryTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null
    }, right: {
      val: 4,
      left: null,
      right: null
    }
  }
}

/**
 * 1. 广度优先遍历用的是队列，这里用的是栈
 *     n.children.forEach(children => {
  *     console.log('children==>', children)
  *     q.push(children)
  *   });
  * 2. 这里还是有递归的。再次进入下一轮的const ele = stack.pop();
  * 又取root.right,root.left
*/
// const preOrder = (root) => {
//   if (!root) return
//   console.log('root.val==>', root.val)
//   preOrder(root.left);
//   preOrder(root.right)
// }

const preOrder = (root) => {
  // 这里要做非空判断
  if (!root) return
  const stack = [root];
  while (stack.length > 0) {
    const n = stack.pop()
    // 注意这里是n
    console.log(n.val);
    // 关键：只压入非空节点
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
}

preOrder(binaryTree)