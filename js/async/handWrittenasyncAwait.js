// 简单的延迟函数，返回一个Promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 生成器函数，使用yield来暂停和恢复执行
function* generatorFunction() {
  console.log('开始任务');
  // 相当于 await delay(1000)
  yield delay(1000).then(() => console.log('任务完成'));
  console.log('继续其他任务');
}

// 运行生成器函数并正确处理yield的Promise
function asyncAwait(generatorFn) {
  const iterator = generatorFn(); // 创建迭代器
  // 感觉这部分代码就是让它自执行await
  function step(nextFn) {
    const next = nextFn();
    // 这里是不是可以有很多yield delay 
    if (next.done) return next.value;
    next.value.then(() => step(() => iterator.next()));
  }
  step(() => iterator.next()); // 开始执行生成器函数
}

// 使用模拟的async/await功能
asyncAwait(generatorFunction);
