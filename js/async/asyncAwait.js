/**
 * 1. 原来的async await函数怎么写呢？
*/

async function asyncFunction() {
  console.log('开始工作');

  const value1 = await new Promise((resolve) => {
    setTimeout(resolve(1), 1000)
  });
  console.log('任务1完成', value1);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('任务2完成');

  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('任务3完成');

  console.log('继续其他的任务');
}

// 调用新的 async 函数
asyncFunction();