function findKthLargest(nums, k) {
	k = nums.length - k; // 转换 k 为第 k 小的问题
	let lo = 0;
	let hi = nums.length - 1;

	while (lo < hi) {
		const pivotIndex = partition(nums, lo, hi);
		if (pivotIndex < k) {
			lo = pivotIndex + 1;
		} else if (pivotIndex > k) {
			hi = pivotIndex - 1;
		} else {
			break;
		}
	}

	return nums[k];
}

function partition(nums, lo, hi) {
	const pivot = nums[hi];
	let i = lo;

	for (let j = lo; j < hi; j++) {
		if (nums[j] < pivot) {
			swap(nums, i++, j);
		}
	}
	swap(nums, i, hi);

	return i;
}

function swap(nums, i, j) {
	const temp = nums[i];
	nums[i] = nums[j];
	nums[j] = temp;
}

// 示例
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 输出: 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 输出: 4
