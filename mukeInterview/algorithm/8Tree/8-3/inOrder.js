const bt = require('./bt')
const inOrder = (root) => {

  if (!root) return
  inOrder(root.left);
  console.log('root.val==>', root.val)
  inOrder(root.right)
}
inOrder(bt)