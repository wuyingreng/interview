/**
 * @param {TreeNode} root
 * @return {number[]}
 */

var rightSideView = function(root) {
	let res=[];
    let queue=[];
    queue.push([root,0]);
    while(queue.length>0){
    	const [node,l]=queue.shift();
    	if(!res[l]){
    		res[l]=[node.val];
    	}else{
    		res[l].push(node.val);
    	}

    	if(node.left){
    		queue.push([node.left,l+1])
    	}
    	if(node.right){
    		queue.push([node.right,l+1])
    	}
    }
  const result=  res.map((levelMsg,index)=>{
    	return levelMsg[levelMsg.length-1]
    })
  return result;
};