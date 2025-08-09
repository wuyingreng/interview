// in-place 和 out-of-place 算法对比

// 1. 数组反转 - in-place 版本
function reverseArrayInPlace(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // 交换元素，直接在原数组上操作
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  // 不返回新数组，直接修改原数组
  // 空间复杂度: O(1)
}

// 2. 数组反转 - out-of-place 版本
function reverseArrayOutOfPlace(arr) {
  const result = [];

  // 创建新数组存储结果
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }

  return result;  // 返回新数组
  // 空间复杂度: O(n)
}

// 3. 二叉树展开 - in-place 版本 (LeetCode 114)
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function flattenInPlace(root) {
  // 直接在原树上修改，不创建新节点
  if (!root) return;

  // 将左子树展开并连接到右边
  if (root.left) {
    flattenInPlace(root.left);

    // 找到左子树的最后一个节点
    let last = root.left;
    while (last.right) {
      last = last.right;
    }

    // 将右子树连接到左子树的末尾
    last.right = root.right;
    root.right = root.left;
    root.left = null;
  } else {
    // 没有左子树，继续处理右子树
    flattenInPlace(root.right);
  }
}

// 4. 二叉树展开 - out-of-place 版本
function flattenOutOfPlace(root) {
  if (!root) return null;

  // 创建新的链表结构
  const result = new TreeNode(root.val);
  let current = result;

  // 前序遍历收集所有节点
  const nodes = [];
  function preorder(node) {
    if (!node) return;
    nodes.push(node.val);
    preorder(node.left);
    preorder(node.right);
  }

  preorder(root);

  // 创建新的链表
  for (let i = 1; i < nodes.length; i++) {
    current.right = new TreeNode(nodes[i]);
    current = current.right;
  }

  return result;  // 返回新的树结构
}

// 5. 排序算法对比

// in-place 排序 - 冒泡排序
function bubbleSortInPlace(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 直接在原数组上交换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  // 空间复杂度: O(1)
}

// out-of-place 排序 - 归并排序
function mergeSortOutOfPlace(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortOutOfPlace(arr.slice(0, mid));
  const right = mergeSortOutOfPlace(arr.slice(mid));

  // 创建新数组存储合并结果
  return merge(left, right);
  // 空间复杂度: O(n)
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}

// 测试代码
console.log('=== in-place vs out-of-place 对比 ===');

// 数组反转测试
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3, 4, 5];

console.log('\n--- 数组反转 ---');
console.log('原数组:', arr1);

// in-place 版本
reverseArrayInPlace(arr1);
console.log('in-place 结果:', arr1, '(原数组被修改)');

// out-of-place 版本
const reversed = reverseArrayOutOfPlace(arr2);
console.log('out-of-place 结果:', reversed, '(新数组)');
console.log('原数组:', arr2, '(原数组未修改)');

// 排序测试
const arr3 = [64, 34, 25, 12, 22, 11, 90];
const arr4 = [64, 34, 25, 12, 22, 11, 90];

console.log('\n--- 排序算法 ---');
console.log('原数组:', arr3);

// in-place 排序
bubbleSortInPlace(arr3);
console.log('in-place 排序结果:', arr3, '(原数组被修改)');

// out-of-place 排序
const sorted = mergeSortOutOfPlace(arr4);
console.log('out-of-place 排序结果:', sorted, '(新数组)');
console.log('原数组:', arr4, '(原数组未修改)');

// 空间复杂度对比
console.log('\n--- 空间复杂度对比 ---');
console.log('in-place 算法:');
console.log('- 数组反转: O(1)');
console.log('- 冒泡排序: O(1)');
console.log('- 二叉树展开: O(1)');

console.log('\nout-of-place 算法:');
console.log('- 数组反转: O(n)');
console.log('- 归并排序: O(n)');
console.log('- 二叉树展开: O(n)'); 