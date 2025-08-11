async function async1() {
  console.log("async1 start");   // 同步任务2
  await async2();
  console.log("async1 end"); // 微任务1
}

async function async2() {
  console.log("async2"); // 同步任务3
}

console.log("script start"); // 同步任务1

setTimeout(function () {
  console.log("setTimeout");  // 宏任务
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1"); // 同步任务4
  resolve();
}).then(function () {
  console.log("promise2"); // 微任务2
});
console.log('script end') // 同步任务5

/**
 * 所以顺序是：
 * // 同步任务
 * "script start"
 * async1 start
 * async2
 * promise1
 * script end
 * // 微任务
 * async1 end
 * promise2
 * // 宏任务
 * setTimeout
*/