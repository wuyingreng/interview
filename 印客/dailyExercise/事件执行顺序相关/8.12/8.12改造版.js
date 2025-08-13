async function async1() {
  try {
    await async2();
  } catch (err) {

  }

  console.log('async1');
  return 'async1 success'
}
// ？？ 要找找源码哪行代码导致的
/**
 * generatorToAsync
 * 第十三行代码：https://nwy3y7fy8w5.feishu.cn/docx/FuY8dghuxorAG7xWXn1cd2Wonic
*/
async function async2() {
  return new Promise((resolve, reject) => {
    console.log('async2') // 1. async2 感觉后面的代码不会执行了。
    reject('error')
  })
}
async1().then(res => console.log(res))

