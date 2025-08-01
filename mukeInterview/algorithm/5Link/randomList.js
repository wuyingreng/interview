// 创建节点
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

// 先创建所有节点
let node0 = new Node(7);
let node1 = new Node(13);
let node1 = new Node(13);

// 设置 next 指针
node0.next = node1;
node1.next = null;

// 设置 random 指针
node0.random = null;
node1.random = node0;  // 指向索引 0


let head = node0;