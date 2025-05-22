setImmediate(() => {
    console.log('immediate')
})

async function async1 () {
    console.log('async1 start') // 同步
    await async2() // 同步
    console.log('async1 end') // await 后面的内容，异步（微任务），相当于 callback 函数里的内容
}

async function async2 () {
    console.log('async2')
}

console.log('script start')

setTimeout(function () {
    console.log('setTimeout')
}, 0)

async1() // 同步

new Promise (function (resolve) {
    console.log('promise1') // 同步
    resolve()
}).then (function () {
    console.log('promise2')
})

process.nextTick(() => {
    console.log('nextTick')
})

console.log('script end')
// 同步代码执行完成

// 同步代码执行完成之后，有哪些异步还没有被执行：
// 1. setImmediate 回调，宏任务，优先级比较低
// 2. async1 函数中，await 后面的内容，微任务
// 3. setTimeout 回调，宏任务，优先级比 setImmediate 高
// 4. promise then 回调，微任务
// 5. process.nextTick 回调，微任务，优先级在微任务中最高
