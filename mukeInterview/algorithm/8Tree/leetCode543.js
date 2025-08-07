function createExampleTree() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    return root;
}

const root =createExampleTree();

console.log('root==>',root);

var diameterOfBinaryTree = function(root) {
    let maxDiameter=0;
    const dfs=function(node){
        // 我为父问题服务，我返回的节点数是0
        if(!node) return 0;
        
        // 我自己作为一个问题，我的直径是左深度+右深度
        const leftDepth=dfs(node.left);
        const rightDepth=dfs(node.right);
        const currentDiameter=leftDepth+rightDepth;
        maxDiameter=Math.max(maxDiameter,currentDiameter);

         // 我为父问题服务，我返回的最大节点深度是Math.max(leftDepth,rightDepth)+1
        return Math.max(leftDepth,rightDepth)+1;
    }
    dfs(root);
    return maxDiameter;
};