const bt = require('./bt');

const postOrder = (root) => {
  if (!root) return
  postOrder(root.left);
  postOrder(root.right)
  console.log('root.val==>', root.val)
}
postOrder(bt)