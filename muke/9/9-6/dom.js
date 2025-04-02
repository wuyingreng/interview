


// 不缓存 DOM 查询结果
for (let i = 0; i < document.getElementsByTagName('p').length; i++) {
  // 每次循环，都会计算 length，频繁进行 DOM 查询
}


// 缓存 DOM 査結果
const pList = document.getElementsByTaqName('p')
const length = pList.length
for (let i = 0; i < length; i++) {

}
// 缓存 length，只进行一次 DOM 查询


/*** --------------- 优化前：频繁插入DOM ---------------*/
const listNode = document.getElementsById('list');

for (let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  li.innerHTML = `List item ${i}`;
  // 插入DOM
  listNode.appendChild(li);
}

/*** --------------- 优化后：一次性插入DOM ---------------*/

// 创建一个文件片段，此时还没有插入到DOM树中。是游离在DOM树之外的，还在JS中
const frag = document.createDocumentFragment();

// 执行插入
for (let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  li.innerHTML = `List item 统一插入${i}`;
  // 插入到文档片段中
  frag.appendChild(li)
}

// 都完成之后再统一插入到DOM树中
listNode.appendChild(frag)
