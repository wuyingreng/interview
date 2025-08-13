async function testSometing() {
  console.log("执行testSometing"); // 同步2
  return "testSometing";
}

async function testAsync() {
  console.log("执行testAsync"); // 外层微任务2 
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start..."); // 同步1
  const v1 = await testSometing();

  // 外层微任务
  console.log(v1); // 外层微任务1 testSometing
  const v2 = await testAsync();
  console.log(v2); // 内层微任务1： hello async
  console.log(v1, v2); // 内层微任务2：testSometing hello async
}

test();

var promise = new Promise(resolve => {
  console.log("promise start..."); // 同步3
  resolve("promise");
});
promise.then(val => console.log(val)); // 外层微任务3

console.log("test end..."); // 同步4


/**
 * 执行结果
 * 同步1：test start...
 * 同步2：执行testSometing
 * 同步3：promise start...
 * 同步4：test end...
 * 外层微任务1： testSometing
 * 外层微任务2:执行testAsync
 * 外层微任务3：promise
 * 内层微任务1： hello async
 * 内层微任务2：testSometing hello async
*/