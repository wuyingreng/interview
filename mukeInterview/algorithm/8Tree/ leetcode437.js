/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
    if(!root) return 0;
    let result=0;
    const queue=[];
    queue.push(root);

    while(queue.length>0){
        const node=queue.shift();
        const val=node.val;
        dfs(node,val);
       if(node.left) queue.push(node.left);
       if(node.right)    queue.push(node.right);
    }

    const dfs=(root,curSum)=>{
        if(!root)return;
        curSum+=root.val;
        if(curSum===targetSum){
            result+=1;
        };
        dfs(root.left,curSum);
           dfs(root.right,curSum);
    };
    return result;
};