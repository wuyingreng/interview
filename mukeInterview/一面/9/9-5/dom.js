const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');

/** --------------  新建节点        --------------*/
const newP = document.createElement('p');
newP.innerHTML = 'this is newP';

/** --------------  插入节点        --------------*/
div1.appendChild(newP)

/** --------------  移动节点        --------------*/
// 对现有的节点执行插入就是移动节点
const p1 = document.getElementById('p1');
div2.appendChild(p1)

/** --------------  获取父元素        --------------*/
console.log('p1.parentNode==>', p1.parentNode)

/** --------------  获取子元素列表        --------------*/
const div1ChilNodes = div1.childNodes;
const childP = Array.from(div1ChilNodes).filter((child) => {
  // html标签的nodeType 都是1
  if (child.nodeType === 1) {
    return true
  }
  return false
})
console.log('childP==>', childP)

/** --------------  删除子元素        --------------*/
// 这样也可以删除
div1.removeChild(childP[0])