// DOM Tree 是如何构建的？


const tokens= [
  { type: 'StartTag', name: 'html' },
  { type: 'StartTag', name: 'head' },
  { type: 'StartTag', name: 'title' },
  { type: 'Text', content: 'Hello World' },
  { type: 'EndTag', name: 'title' },
  { type: 'EndTag', name: 'head' },
  // { type: 'StartTag', name: 'body' },
  // { type: 'StartTag', name: 'h1' },
  // { type: 'Text', content: 'Welcome' },
  // { type: 'EndTag', name: 'h1' },
  // { type: 'StartTag', name: 'p' },
  // { type: 'Text', content: 'This is a paragraph.' },
  // { type: 'EndTag', name: 'p' },
  // { type: 'EndTag', name: 'body' },
  // { type: 'EndTag', name: 'html' }
]
// 可运行的DOM构建函数
function buildDOMTree(tokens) {
	// 创建一个栈
    const stack = [];
    // 创建一个总的document
    const document = { type: 'Document', children: [] };
    // currentNode指向document
    let currentNode = document;
    // 遍历token
    for (let token of tokens) {
    	// 如果是开始标签就创建元素，
        if (token.type === 'StartTag') {
            // 创建新元素
            const element = { 
                type: 'Element', 
                tagName: token.name, 
                children: [],
                attributes: {}
            };
            
            // 添加当前节点到父节点上去
            currentNode.children.push(element);
            
             // 写错的地方二： 把父节点压入到栈中
            stack.push(currentNode);
            // 把currentNode指针移向element
            currentNode = element;
            
        } else if (token.type === 'EndTag') {

            // 写错的地方一： 如果是闭合标签，就把栈元素弹出。弹出栈顶元素，就是父节点.
            currentNode = stack.pop();
               console.log('currentNode==>',token.name,currentNode)
        } else if (token.type === 'Text') {

            // 创建文本节点
            const textNode = { 
                type: 'Text', 
                content: token.content 
            };
            // 把文本标签压入到父节点中
            currentNode.children.push(textNode);
        }
    }
    
    return document;
}

buildDOMTree(tokens)