/**
 * 1. 原来的async await函数怎么写呢？
 * 2. 这个代码怎么改，能让demo看出来它和promise不一样，它返回了
 * 异步的value,而不是跟promise一样，一直在then里面取
 * 3. step 这块没有看懂.iterator是什么，iterator.next是什么。什么时候会返回done
*/

// 简单的延迟函数，返回一个Promise
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function* generatorFunction() {
  console.log('开始工作');
  yield delay(1000).then(() => {
    console.log('任务1完成')
    return ('任务1完成')
  })
  yield delay(1000).then(() => {
    console.log('任务2完成')
    return '任务2完成'
  })
  yield delay(1000).then(() => {
    console.log('任务3完成')
    return '任务3完成'
  })
  console.log('继续其他的任务')
  // 最后一个next.value有值了，而不是undefined
  return 555
}

function asyncAwait(generatorFn) {
  const iterator = generatorFn();

  console.log('iterator==>', iterator);

  /**
   * 问题2：在你的原始代码中，值 next.value 是通过调用 delay 函数返回的 Promise。
   * 每个 yield 相当于等待 Promise。
   * 这里 step 函数是通过递归回调的方式来实现迭代器的自动迭代，
   * 根据 next 对象的 done 属性判断迭代器是否迭代完毕。step 函数在每个 Promise 完成后继续执行下一个 yield 语句。
   * 因此，此代码中不需要像在常规 Promise 链中那样一直使用 then 获取 value。
  */
  function step(nextFn) {
    const next = nextFn();
    console.log('nextFn==>', nextFn, 'next', next);
    if (next.done) return next.value;
    const functiondigui = () => iterator.next()
    next.value.then(() => step(functiondigui));
  };

  const function1 = () => iterator.next()
  step(function1)
}

// 使用模拟的async/await功能
asyncAwait(generatorFunction);


