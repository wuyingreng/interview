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
  }

  return arr;



}

// 示例用法
const array = [64, 25, 12, 22, 11];
const sortedArray = selectionSort(array);
console.log(sortedArray);