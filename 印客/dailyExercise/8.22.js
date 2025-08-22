// 今日题目：
console.log(1); // 同步1

setTimeout(() => {
    console.log(2); // 宏任务1中的同步任务1
    process.nextTick(() => {
        console.log(3); // 宏任务1中的微任务1
    });
    new Promise((resolve) => {
        console.log(4); // 宏任务1中的同步任务2
        resolve();
    }).then(() => {
        console.log(5);  // 宏任务1中的微任务2
    });
});


new Promise((resolve) => {
    console.log(7); // 同步2
    resolve();
}).then(() => {
    console.log(8); // 外层微任务1
});
process.nextTick(() => {
    console.log(6); // 外层微任务2
});


setTimeout(() => {
    console.log(9); // 宏任务2中的的同步任务1
    process.nextTick(() => {
        console.log(10);// 宏任务2中的的微任务1
    });
    new Promise((resolve) => {
        console.log(11); // 宏任务2中的的同步任务2
        resolve();
    }).then(() => {
        console.log(12); // 宏任务2中的的微任务2
    });
});

/**
 * 顺序应该是：
 * 同步：
 * console.log(1); // 同步1
 * console.log(7); // 同步2
 * 外层微任务：这里错了是68 不是86
 * console.log(8); // 外层微任务1
 * console.log(6); // 外层微任务2
 * 宏任务1：
 * console.log(2); // 宏任务1中的同步任务1
 * console.log(4); // 宏任务1中的同步任务2
 * console.log(3); // 宏任务1中的微任务1
 * console.log(5);  // 宏任务1中的微任务2
 * 宏任务2：
 * console.log(9); // 宏任务2中的的同步任务3
 * console.log(11); // 宏任务2中的的同步任务2
 * console.log(10);// 宏任务2中的的微任务1
 * console.log(12); // 宏任务2中的的微任务2
 * */