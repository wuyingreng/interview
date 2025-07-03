const set = new Set();
set.add(1);
set.add(5);
set.add(5);
set.add({ a: 1 });
const o = { a: 1 }
set.add(o);

set.delete(5);

// 迭代set
for (let i in set) {
  console.log(i)
};

// console.log(set.entries())
for (let [key, val] of set.entries()) {
  debugger
  console.log('key==>', key, 'val==>', val)
}


/**
 * set和array的互转
 * 1. set转为array
*/
const arr1 = [...set];

const arr2 = Array.from(set);

/**
 * set和array的互转
 * 1. array转为set
*/

const mySet2 = new Set([4, 5, 7])

// 1. 求交集
const intersection = new Set([...set].filter(item => mySet2.has(item)));

// 1. 求差集
const difference = new Set([...set].filter(item => !mySet2.has(item)));