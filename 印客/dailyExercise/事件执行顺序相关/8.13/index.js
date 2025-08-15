


const first = () => (new Promise((resolve, reject) => {
    console.log(3); // 同步1


    let p = new Promise((resolve, reject) => {
        console.log(7); // 同步2
        setTimeout(() => {
            console.log(5); // 宏任务1
            resolve(6);   // 这个不起作用了
            console.log(p) // 宏任务2
        }, 0)
        resolve(1);   
    });


    resolve(2);  
    p.then((arg) => {
        console.log(arg); // 微任务1 
    });
}));


first().then((arg) => {
    console.log(arg); // 微任务2: 2
});
console.log(4); // 同步3

/**
 * 最终的顺序：
 * 同步1：3
 * 同步2：7
 * 同步3：4
 * 微任务1：1
 * 微任务2：2
 * 宏任务中的同步任务1：5
 * 宏任务2：fulfiled promise, result1
 * 
 * 这道题混淆的地方：
 * 1. resolve 是给then打印的，自己是不打印的
 * 2. resolve是第一次resolve的值生效。第二次的不起作用了
 * 
 * 
 * 
 * */