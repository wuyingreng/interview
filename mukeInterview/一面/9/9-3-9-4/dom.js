/** --------------- 获取 DOM 节点 ---------------*/

const div1 = document.getElementById('div1')
// 是getElements
const divList = document.getElementsByTagName('div');
const containerList = document.getElementsByClassName('container');
console.log('div1=>', div1, 'divList=>', divList, 'containerList=>', containerList);

// querySelectorAll 接的是css选择器
const pList = document.querySelectorAll('p');

console.log('pList=>', pList);

/** --------------- 获取 DOM Property ---------------*/

const p = pList[0]
console.log(p.style.width)//获取样式

p.style.width = '100px'// 修改样式
// 不叫clas，因为clas已经是一个关键字了

console.log(p.className)//荻取 class

p.className = 'red'
//修改class
//获取 nodeName 和 nodeType
console.log(p.nodeName)
console.log(p.nodeType) //1


/** --------------- 获取 attribute  ---------------*/

/**
 * 设置的是标签的属性
*/
// const p = pList [0]
// p.getAttribute ('data-name')
// p.getAttribute('style');
// p.setAttribute('style','font-size: 30px; ')