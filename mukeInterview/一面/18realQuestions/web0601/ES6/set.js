// 1. 数组去重
const arr = [1, 3, 4, 4, 3, 3]
const set = new Set(arr);
// 方法1：把set转换为数组 
const newArr = [...set];

const newArr2 = Array.from(set)