/**
 * 问题4：修改上面的代码，使它和asyncAwait.js的代码一样，拿到每一个await的返回值
 * 答：要想在生成器函数中获得类似于 await 的行为以及得到 Promise 解决的值，
 * 1. 我们应当直接 yield Promise 对象，（感觉这块是重点）
 * 2. 并在外围辅助函数 asyncAwait 中处理 Promise 的解决，
 * 从而使得代码能够在 Promise 完成时继续执行，并获取到 Promise 的返回值。
*/

function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function* generatorFunction() {
  console.log('开始工作');
  /**
   * 使用 yield 来暂停函数执行，并等待 Promise 返回结果。
   * 这时我们将 yield 后面跟的 delay 函数调用修改为返回一个带值的 Promise。
  */
  const value1 = yield delay(1000, 'value1 任务1完成');
  console.log(value1);

  const value2 = yield delay(1000, 'value2 任务2完成');
  console.log(value2);

  const value3 = yield delay(1000, 'value3 任务3完成');
  console.log(value3);

  console.log('继续其他的任务');
  return 555;
}

// asyncAwait 函数不变
function asyncAwait(generatorFn) {
  const iterator = generatorFn();
  console.log('iterator==>', iterator);

  function step(nextFn) {
    const next = nextFn();
    // 当 asyncAwait 辅助函数接收到一个 Promise，它会等待 Promise 解决，然后再次调用 next 方法，并将 Promise 的值传入作为参数。
    // todo：后面可以再研究下yiele和if (next.done) return Promise.resolve(next.value);这块
    if (next.done) return Promise.resolve(next.value);
    return Promise.resolve(next.value).then(value => step(() => iterator.next(value)));
  }

  return step(() => iterator.next());
}

// 使用修改后的 async/await 函数
asyncAwait(generatorFunction).then(result => {
  console.log('整个流程完成，返回值:', result); // 输出: 整个流程完成，返回值: 555
});

/**
 * 在上面的 generatorFunction 中，我们使用 yield 来暂停函数执行，并等待 Promise 返回结果。这时我们将 yield 后面跟的 delay 函数调用修改为返回一个带值的 Promise。当 asyncAwait 辅助函数接收到一个 Promise，它会等待 Promise 解决，然后再次调用 next 方法，并将 Promise 的值传入作为参数。
 * 这样，在 generatorFunction 中的每个 yield，返回的值会被暂存，然后可以在它之后的语句中用变量来引用。这与 await 在 async 函数中的行为相似，因为 await 会等待 Promise 解决，并将解决的值分配给变量。
*/