func diameterOfBinaryTree(root *TreeNode) int {
res := 0
dfs(root, &res)
return res
}func dfs(root *TreeNode, res *int) int {
if root == nil {
return 0
}

left := dfs(root.Left, res)
right := dfs(root.Right, res)
*res = max(left+right, *res)
return max(left, right)+1
}