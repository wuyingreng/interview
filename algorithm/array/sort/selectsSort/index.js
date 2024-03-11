function selectionSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    // 找到从 i 到 n-1 之间最小元素的索引
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 如果当前索引 i 不是最小值索引，交换它们
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}

// 示例用法
const array = [64, 25, 12, 22, 11];
const sortedArray = selectionSort(array);
console.log(sortedArray);
