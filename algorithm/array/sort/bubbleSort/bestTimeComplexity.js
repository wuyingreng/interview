// 这个算法看看

function bubbleSort(arr) {
	let len = arr.length;
	let swapped;
	do {
		swapped = false; // 初始设置没有发生交换
		for (let i = 0; i < len - 1; i++) {
			if (arr[i] > arr[i + 1]) {
				// 如果当前元素大于下一个元素，则交换它们的位置
				let temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
				swapped = true; // 发生了交换
			}
		}
		len--; // 每完成一轮遍历，最大的元素已经在正确的位置，下一轮遍历时就不需要再比较它了
	} while (swapped); // 只要发生了交换就继续进行遍历
}

let array = [1, 2, 3, 4, 5]; // 已经排序好的数组
bubbleSort(array);
console.log(array); // 输出：[1, 2, 3, 4, 5]
