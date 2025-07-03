const arr = [1, 1, 2, 3];

// 数组去重
const uniqueSet = new Set(arr);

// set转变为数组
const finalArr = [...uniqueSet];

// 查找是否有某个元素
uniqueSet.has(1)


const newSet = new Set([2, 3]);

// 求交集
const set3 = new Set([...uniqueSet].filter((ele) => newSet.has(ele)))
// // 在node中不支持会报错
// newSet.intersection(uniqueSet)