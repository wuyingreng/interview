/**
 * 关注点300比200后定义但是先打印
*/


console.log(100);


// 宏任务
setTimeout(()=>{console.log(200);})

// 微任务
Promise.resolve().then(()=>{console.log(300)})


console.log(400);