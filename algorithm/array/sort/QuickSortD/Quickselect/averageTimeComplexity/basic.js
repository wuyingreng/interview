/**
 * 这段代码的主要作用是对一个数组进行排序。它实现的是一个快速排序算法的变体，称为随机化快速排序。随机化快速排序是一种高效的排序算法，它通过在标准快速排序过程中引入随机性来改善性能。这种随机性可以减少算法在最坏情况下的时间复杂度。
 * 快速排序算法通常包括以下步骤：
 * 选择一个元素作为"基准"（pivot）。
 * 重新排列数组中的元素，所有比基准小的元素都移动到基准的左边，所有比基准大的元素都移动到基准的右边。这个操作称为"分区"（partitioning）。
 * 递归地在基准左边和右边的子数组上重复步骤 1 和 2。
 * 在给定的代码中，randomPartition 方法通过随机选择一个数组元素作为基准来改进分区步骤。这有助于避免快速排序在特定情况下（如数组已经排序或所有元素相同）的最坏性能。随后，partition 方法将执行实际的分区操作，并返回基准元素的最终位置。quickSort 方法是一个递归方法，它使用 randomPartition 对数组进行分区，并递归地对子数组进行排序。最后，sortArray 方法是排序操作的入口点，它初始化快速排序的过程。
 * 总而言之，代码的作用是对输入的数组进行排序，并返回排序后的数组。
 * 
*/

class Solution {
	// 随机哨兵划分：从 array[low: high + 1] 中随机挑选一个基准数，并进行移位排序
	randomPartition(array, low, high) {
		// Ensure low and high are within the bounds of the array.
		if (low < 0 || high >= array.length) {
			throw new Error("Index out of bounds");
		}
		// 随机挑选一个基准数 保证了范围是从[low,high]
		let i = Math.floor(Math.random() * (high - low + 1) + low);
		if (i < low || i > high) {
			throw new Error("Random index out of bounds");
		}
		console.log('i==>', i, array, low)
		// 将基准数与最低位互换。 使用的是解构赋值进行换位
		[array[i], array[low]] = [array[low], array[i]];
		// 以最低位为基准数，然后将数组中比基准数大的元素移动到基准数右侧，比他小的元素移动到基准数左侧。最后将基准数放到正确位置上
		return this.partition(array, low, high);
	}

	// 哨兵划分：以第 1 位元素 array[low] 为基准数，然后将比基准数小的元素移动到基准数左侧，将比基准数大的元素移动到基准数右侧，最后将基准数放到正确位置上
	partition(array, low, high) {
		// 以第 1 位元素为基准数
		let pivot = array[low];

		let i = low, j = high;
		while (i < j) {
			// 从右向左找到第 1 个小于基准数的元素
			while (i < j && array[j] >= pivot) {
				j--;
			}
			// 从左向右找到第 1 个大于基准数的元素
			while (i < j && array[i] <= pivot) {
				i++;
			}
			// 交换元素
			[array[i], array[j]] = [array[j], array[i]];
		}

		// 将基准节点放到正确位置上
		[array[i], array[low]] = [array[low], array[i]];
		// 返回基准数的索引
		return i;
	}

	quickSort(array, low, high) {
		if (low < high) {
			// 按照基准数的位置，将数组划分为左右两个子数组
			let pivotIndex = this.randomPartition(array, low, high);
			// 对左右两个子数组分别进行递归快速排序
			this.quickSort(array, low, pivotIndex - 1);
			this.quickSort(array, pivotIndex + 1, high);
		}
		return array;
	}

	sortArray(array) {
		return this.quickSort(array, 0, array.length - 1);
	}
}

// 使用示例：
const solution = new Solution();
const sortedArray = solution.sortArray([5, 2, 3, 1]);
console.log(sortedArray);
