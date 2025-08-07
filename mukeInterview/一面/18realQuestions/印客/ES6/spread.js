// spread  /spred/ 

// 会打印1,2,3 。相当于执行console.log(1) console.log(2) console.log(2)
console.log(...[1, 2, 3])

const a = [1, 2, 3];
let [b, ...rest] = a
function push(arr, ...items) { return arr.push(...items) };

push([1, 2], 4, 5, 6);
// 交换元素的值
let x = 1;
let y = 2;
[x, y] = [y, x]//x=2,y=1

const arr = [1, 2, 3];
[arr[0], arr[2]] = [arr[2], arr[0]];
console.log(arr); // [3, 2, 1]

const arr1 = [1, 2, 3];

const arr2 = [1, 2, 3]

const arr3 = [1, 2, 3];

[...arr1, ...arr2, ...arr3]