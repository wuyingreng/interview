
var a;
var b = new Promise((resolve, reject) => {
  console.log('promise1'); // 同步1：promise1
  setTimeout(() => {
    resolve();
  }, 1000);
})
  .then(() => {
    console.log('promise2'); // 宏任务之后执行的微任务1：promise2
  })

  .then(() => {
    console.log('promise3'); // 宏任务之后执行的微任务2：promise3
  })
  .then(() => {
    console.log('promise4'); // 宏任务之后执行的微任务3：promise4
  });

a = new Promise(async (resolve, reject) => {
  console.log(a); // 同步2：undefined
  await b;  
  console.log(a); // 中间赋值任务先执行。await后面的微任务1：promise pending
  console.log('after1'); // await后面的微任务2：after1
  // 后面的代码不会执行了。死循环了
  await a;
  resolve(true);
  console.log('after2');
});

console.log('end'); // 同步3：end


/**
* 同步1：promise1
* 同步2：undefined
* 同步3：end
* 宏任务之后执行的微任务1：promise2
* 宏任务之后执行的微任务2：promise3
* 宏任务之后执行的微任务3：promise4
* await后面的微任务1：promise pending
* await后面的微任务2：after1
* 后面的代码不会在执行了，死循环了
* 
* 考点
* var只是声明提前不是赋值提前，所以打印出来的a 是undefined
* 
*/



